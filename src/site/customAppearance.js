export const validHex = value => /^#[0-9a-f]{6}$/i.test(value);
export function readPreference(key, fallback) { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } }
export function savePreference(key, value) { try { localStorage.setItem(key,value); } catch {} }
const rgb = hex => [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
export const luminance = hex => rgb(hex).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((n,x,i)=>n+x*[.2126,.7152,.0722][i],0);
const mix = (hex,target,amount) => '#'+rgb(hex).map((v,i)=>Math.round(v+(rgb(target)[i]-v)*amount).toString(16).padStart(2,'0')).join('');
const paletteVars=['--bg','--black','--off-black','--mid','--light','--rule','--surface','--bg-elevated','--white','--hover-bg','--overlay','--arch-black','--arch-off-white','--arch-muted','--arch-rule-dark','--arch-rule-soft'];
export function applyCustomAppearance() {
 const root=document.documentElement;
 paletteVars.forEach(k=>root.style.removeProperty(k));
 ['--accent','--accent-ink'].forEach(k=>root.style.removeProperty(k));
 const theme=readPreference('eh-theme','dark');
 const tones={'tone-1':'#1f1d1b','brown-1':'#151410','brown-2':'#1a1813','brown-3':'#201d17'};
 if(theme==='custom'||tones[theme]) {
  const saved=tones[theme]||readPreference('eh-custom-palette','#19130f'), bg=validHex(saved)?saved:'#19130f';
  const dark=luminance(bg)<.179, text=dark?'#ffffff':'#111111';
  root.dataset.theme=theme;
  const values=[bg,text,mix(bg,text,.78),mix(bg,text,.65),mix(bg,text,.56),mix(bg,text,.22),mix(bg,text,.06),mix(bg,text,.09),bg,mix(bg,text,.09),mix(bg,text,.12),bg,text,mix(bg,text,.65),mix(bg,text,.22),mix(bg,text,.22)];
  paletteVars.forEach((k,i)=>root.style.setProperty(k,values[i]));
 }
 if(readPreference('eh-accent','orange')==='custom') {
  const saved=readPreference('eh-custom-accent','#e18a48'), accent=validHex(saved)?saved:'#e18a48';
  root.dataset.accent='custom';root.style.setProperty('--accent',accent);root.style.setProperty('--accent-ink',luminance(accent)>.179?'#111111':'#ffffff');
 }
}

// Normalise typed colours for the existing saved appearance settings.
export function parseColour(value) {
 const input=value.trim();
 const hex=input.match(/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i);
 if(hex) return '#'+(hex[1].length===3?[...hex[1]].map(c=>c+c).join(''):hex[1]).toLowerCase();
 const rgb=input.match(/^(?:rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)|(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3}))$/i);
 if(!rgb)return null;
 const channels=(rgb[1]?[rgb[1],rgb[2],rgb[3]]:[rgb[4],rgb[5],rgb[6]]).map(Number);
 return channels.every(v=>v<=255)?'#'+channels.map(v=>v.toString(16).padStart(2,'0')).join(''):null;
}
