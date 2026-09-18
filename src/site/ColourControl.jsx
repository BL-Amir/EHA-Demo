import {useState,useEffect,useRef} from 'react';
import {accentOptions,paletteOptions,paletteLabels} from './appearance';
import {luminance,parseColour,validHex,readPreference,savePreference,applyCustomAppearance} from './customAppearance';
export function ColourControl({kind}) {
 const palette=kind==='palette', key=palette?'eh-theme':'eh-accent', customKey=`eh-custom-${kind}`;
 const [appearanceTick,setAppearanceTick]=useState(0);
 useEffect(()=>{const update=()=>setAppearanceTick(n=>n+1);window.addEventListener('appearance-change',update);return()=>window.removeEventListener('appearance-change',update)},[]);
 const neutral=getComputedStyle(document.documentElement).getPropertyValue('--off-black').trim();
 const options=palette?paletteOptions.filter(v=>v!=='custom').map(value=>({value,label:paletteLabels[value]})):accentOptions.filter(o=>o.value!=='custom').map(o=>{const colour=o.value==='none'?neutral:o.dark;return {...o,colour,label:`${o.label} (${colour.toUpperCase()})`}}).sort((a,b)=>luminance(b.colour)-luminance(a.colour));
 const [value,setValue]=useState(()=>readPreference(key,palette?'dark':'orange'));
 const [hex,setHex]=useState(()=>{const v=readPreference(customKey,palette?'#19130f':'#e18a48');return validHex(v)?v:palette?'#19130f':'#e18a48'});
 const [draft,setDraft]=useState(hex),[open,setOpen]=useState(false),ref=useRef(null);
 useEffect(()=>{const close=e=>{if(!ref.current?.contains(e.target))setOpen(false)};const escape=e=>{if(e.key==='Escape')setOpen(false)};document.addEventListener('pointerdown',close);document.addEventListener('keydown',escape);return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',escape)}},[]);
 const select=v=>{setValue(v);savePreference(key,v);const root=document.documentElement;if(palette){if(v==='light')delete root.dataset.theme;else root.dataset.theme=v}else root.dataset.accent=v;applyCustomAppearance();window.dispatchEvent(new Event('appearance-change'));if(v!=='custom')setOpen(false)};
 const change=v=>{setDraft(v);const parsed=parseColour(v);if(parsed){setHex(parsed);savePreference(customKey,parsed);applyCustomAppearance()}};
 return <div className="theme-switcher-wrap" ref={ref}>
 <button className="theme-switcher" type="button" aria-label={`Select ${kind}`} aria-expanded={open} onClick={()=>setOpen(!open)}>{value==='custom'?'Custom…':options.find(o=>o.value===value)?.label}</button>
 {open&&<div className="theme-switcher__menu"><div role="listbox" aria-label={kind}>{[...options,{value:'custom',label:'Custom…'}].map(o=><button className="theme-switcher__option" type="button" role="option" aria-selected={value===o.value} key={o.value} onClick={()=>select(o.value)}>{o.label}</button>)}</div>
 {value==='custom'&&<div className="custom-colour"><label>Hex or RGB<input aria-label={`${kind} hex or RGB colour`} placeholder="#e18a48 or rgb(225, 138, 72)" value={draft} aria-invalid={!parseColour(draft)} onChange={e=>change(e.target.value)} onBlur={()=>setDraft(hex)}/></label></div>}</div>}
 </div>
}
