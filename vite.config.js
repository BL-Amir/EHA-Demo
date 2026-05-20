import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

const imagesDir = path.resolve(__dirname, '../../images folders')

function serveImagesPlugin() {
  return {
    name: 'serve-images-folders',
    configureServer(server) {
      server.middlewares.use('/assets/images', (req, res, next) => {
        const urlPath = decodeURIComponent(req.url.split('?')[0])
        const filePath = path.join(imagesDir, urlPath)
        try {
          if (fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase()
            const mime = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif' }
            res.setHeader('Content-Type', mime[ext] || 'application/octet-stream')
            fs.createReadStream(filePath).pipe(res)
            return
          }
        } catch (_) {}
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), serveImagesPlugin()],
})
