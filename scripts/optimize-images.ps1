$ErrorActionPreference = 'Stop'

$Root = Split-Path -Parent $PSScriptRoot
$PublicImagesDir = Join-Path $Root 'public\assets\images'
$OptimizedImagesDir = Join-Path $Root 'public\assets\images-optimized'
$TextExtensions = @('.css', '.html', '.js', '.jsx', '.ts', '.tsx')
$ImageExtensions = @('.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif')
$RasterExtensions = @('.jpg', '.jpeg', '.png', '.webp')
$Force = $args -contains '--force'
$ImageUrlPattern = [regex]"/assets/images(?:-optimized)?/([^'""``]+?\.(?:jpe?g|png|webp|gif|svg))"

function Format-Bytes([long]$Bytes) {
  if ($Bytes -lt 1024) { return "$Bytes B" }
  $Units = @('KB', 'MB', 'GB')
  $Value = $Bytes / 1024
  $UnitIndex = 0
  while ($Value -ge 1024 -and $UnitIndex -lt ($Units.Count - 1)) {
    $Value = $Value / 1024
    $UnitIndex += 1
  }
  if ($Value -ge 100) { return ("{0:N0} {1}" -f $Value, $Units[$UnitIndex]) }
  return ("{0:N1} {1}" -f $Value, $Units[$UnitIndex])
}

function Decode-UrlPath([string]$UrlPath) {
  try { return [System.Uri]::UnescapeDataString($UrlPath) } catch { return $UrlPath }
}

function Convert-ToPosixPath([string]$FilePath) {
  return $FilePath.Replace('\', '/')
}

function Get-RelativePathCompat([string]$BasePath, [string]$TargetPath) {
  $FullBasePath = [System.IO.Path]::GetFullPath($BasePath)
  if (-not $FullBasePath.EndsWith([System.IO.Path]::DirectorySeparatorChar)) {
    $FullBasePath = $FullBasePath + [System.IO.Path]::DirectorySeparatorChar
  }
  $BaseUri = New-Object System.Uri($FullBasePath)
  $TargetUri = New-Object System.Uri([System.IO.Path]::GetFullPath($TargetPath))
  return [System.Uri]::UnescapeDataString($BaseUri.MakeRelativeUri($TargetUri).ToString()).Replace('/', [System.IO.Path]::DirectorySeparatorChar)
}

function Get-PathWithExtension([string]$FilePath, [string]$Extension) {
  $Directory = Split-Path -Parent $FilePath
  $Name = [System.IO.Path]::GetFileNameWithoutExtension($FilePath)
  if ([string]::IsNullOrEmpty($Directory)) { return "$Name$Extension" }
  return Join-Path $Directory "$Name$Extension"
}

function Get-OptimizedRelativePath([string]$OriginalRelativePath) {
  $Extension = [System.IO.Path]::GetExtension($OriginalRelativePath).ToLowerInvariant()
  if ($RasterExtensions -notcontains $Extension) { return $OriginalRelativePath }
  return Get-PathWithExtension $OriginalRelativePath '.webp'
}

$AllOriginalImages = Get-ChildItem -LiteralPath $PublicImagesDir -Recurse -File | Where-Object {
  $ImageExtensions -contains $_.Extension.ToLowerInvariant()
}

function Find-OriginalByRelativePath([string]$RelativePath) {
  $ParsedDirectory = Split-Path -Parent $RelativePath
  $ParsedName = [System.IO.Path]::GetFileNameWithoutExtension($RelativePath)
  $Candidates = New-Object System.Collections.Generic.List[string]
  $Candidates.Add($RelativePath)

  foreach ($Extension in $ImageExtensions) {
    if ([string]::IsNullOrEmpty($ParsedDirectory)) {
      $Candidates.Add("$ParsedName$Extension")
    } else {
      $Candidates.Add((Join-Path $ParsedDirectory "$ParsedName$Extension"))
    }
  }

  foreach ($Candidate in $Candidates) {
    $FullPath = Join-Path $PublicImagesDir $Candidate
    if (Test-Path -LiteralPath $FullPath -PathType Leaf) { return (Get-Item -LiteralPath $FullPath) }
  }

  $FirstSegment = ($RelativePath -split '[\\/]')[0].ToLowerInvariant()
  $WantedBasename = [System.IO.Path]::GetFileName($RelativePath).ToLowerInvariant()
  $WantedName = [System.IO.Path]::GetFileNameWithoutExtension($RelativePath).ToLowerInvariant()

  foreach ($Image in $AllOriginalImages) {
    $OriginalRelative = (Get-RelativePathCompat $PublicImagesDir $Image.FullName).ToLowerInvariant()
    $SameFile = $Image.Name.ToLowerInvariant() -eq $WantedBasename -or [System.IO.Path]::GetFileNameWithoutExtension($Image.Name).ToLowerInvariant() -eq $WantedName
    if ($SameFile -and ([string]::IsNullOrEmpty($FirstSegment) -or $OriginalRelative.Contains($FirstSegment))) {
      return $Image
    }
  }

  return $null
}

function Optimize-Image([string]$SourcePath, [string]$OutputPath) {
  $OutputDirectory = Split-Path -Parent $OutputPath
  New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null

  $Extension = [System.IO.Path]::GetExtension($SourcePath).ToLowerInvariant()
  if ($RasterExtensions -notcontains $Extension) {
    if ($Force -or -not (Test-Path -LiteralPath $OutputPath -PathType Leaf)) {
      Copy-Item -LiteralPath $SourcePath -Destination $OutputPath -Force
    }
    return
  }

  if (-not $Force -and (Test-Path -LiteralPath $OutputPath -PathType Leaf)) {
    $SourceItem = Get-Item -LiteralPath $SourcePath
    $OutputItem = Get-Item -LiteralPath $OutputPath
    if ($OutputItem.LastWriteTimeUtc -ge $SourceItem.LastWriteTimeUtc) { return }
  }

  $ScaleFilter = "scale='if(gt(iw,ih),min(2400,iw),-2)':'if(gt(iw,ih),-2,min(2400,ih))'"
  & ffmpeg -hide_banner -loglevel error -y -i $SourcePath -map_metadata -1 -vf $ScaleFilter -c:v libwebp -preset photo -quality 82 -compression_level 6 $OutputPath
  if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed for $SourcePath" }
}

$TextFiles = New-Object System.Collections.Generic.List[System.IO.FileInfo]
Get-ChildItem -LiteralPath (Join-Path $Root 'src') -Recurse -File | Where-Object {
  $TextExtensions -contains $_.Extension.ToLowerInvariant()
} | ForEach-Object { $TextFiles.Add($_) }
$TextFiles.Add((Get-Item -LiteralPath (Join-Path $Root 'index.html')))

$AssetEntries = @{}
$Replacements = @{}

foreach ($TextFile in $TextFiles) {
  $Text = Get-Content -LiteralPath $TextFile.FullName -Raw
  $Matches = $ImageUrlPattern.Matches($Text)

  foreach ($Match in $Matches) {
    $OriginalUrl = $Match.Value
    $AlreadyOptimized = $OriginalUrl.StartsWith('/assets/images-optimized/')
    $MatchedRelativePath = Decode-UrlPath $Match.Groups[1].Value
    $SourceItem = Find-OriginalByRelativePath $MatchedRelativePath

    if ($null -eq $SourceItem) {
      $RelativeTextFile = Get-RelativePathCompat $Root $TextFile.FullName
      throw "No source image found for $OriginalUrl in $RelativeTextFile"
    }

    $OriginalRelativePath = Get-RelativePathCompat $PublicImagesDir $SourceItem.FullName
    $OptimizedRelativePath = Get-OptimizedRelativePath $OriginalRelativePath
    $OptimizedPath = Join-Path $OptimizedImagesDir $OptimizedRelativePath
    $OptimizedUrl = "/assets/images-optimized/$(Convert-ToPosixPath $OptimizedRelativePath)"

    $AssetEntries[$SourceItem.FullName] = $OptimizedPath
    if (-not $AlreadyOptimized) { $Replacements[$OriginalUrl] = $OptimizedUrl }
  }
}

$OriginalBytes = 0L
$OptimizedBytes = 0L

foreach ($SourcePath in $AssetEntries.Keys) {
  $OptimizedPath = $AssetEntries[$SourcePath]
  Optimize-Image $SourcePath $OptimizedPath
  $OriginalBytes += (Get-Item -LiteralPath $SourcePath).Length
  $OptimizedBytes += (Get-Item -LiteralPath $OptimizedPath).Length
}

foreach ($TextFile in $TextFiles) {
  $Text = Get-Content -LiteralPath $TextFile.FullName -Raw
  $NextText = $Text

  foreach ($From in $Replacements.Keys) {
    $NextText = $NextText.Replace($From, $Replacements[$From])
  }

  if ($NextText -ne $Text) {
    Set-Content -LiteralPath $TextFile.FullName -Encoding UTF8 -NoNewline -Value $NextText
  }
}

Write-Output "Optimized $($AssetEntries.Count) referenced images."
Write-Output "Referenced original size: $(Format-Bytes $OriginalBytes)"
Write-Output "Optimized size: $(Format-Bytes $OptimizedBytes)"
Write-Output "Rewrote $($Replacements.Count) image URL patterns."
