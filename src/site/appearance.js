import { applyCustomAppearance } from './customAppearance';
export const accentOptions = [
 {value:'taupe',label:'Pebble Grey / RAL 7032',dark:'#b9b4a5',light:'#b9b4a5'},
 {value:'none',label:'Neutral'},
 {value:'amber',label:'Amber',dark:'#daa047',light:'#885500'},
 {value:'orange',label:'Orange',dark:'#e18a48',light:'#a54e17'},
 {value:'copper',label:'Copper',dark:'#c9835a',light:'#985026'},
 {value:'burnt-orange',label:'Burnt Orange',dark:'#cf784c',light:'#a84925'},
 {value:'custom',label:'Custom…'},
];
export const paletteOptions = ['dark','classic-dark','brown-1','brown-2','brown-3','tone-1','custom'];
export const paletteLabels = {dark:'Brown (#10100E)','classic-dark':'Dark grey (#111111)','brown-1':'Deep Brown (#151410)','brown-2':'Earth Brown (#1A1813)','brown-3':'Soft Brown (#201D17)','tone-1':'Charcoal (#1F1D1B)'};
const fontLabels = {
  "helvetica-bold": "Helvetica Bold",
  futura: "Futura",
  "dm-sans": "DM Sans",
  "space-grotesk": "Space Grotesk",
  jost: "Jost",
  spartan: "Spartan",
  kumbh: "Kumbh Sans",
  "sofia-sans": "Sofia Sans",
  finlandica: "Finlandica",
  cantarell: "Cantarell",
  lato: "Lato",
  hanken: "Hanken Grotesk",
};
export const headingFonts = Object.entries(fontLabels)
  .filter(([value]) => value !== "hanken")
  .map(([value, label]) => ({ value, label }));
export const bodyFonts = [
  ...headingFonts.slice(0, 3),
  { value: "hanken", label: "Hanken Grotesk" },
  ...headingFonts.slice(3),
];
export function initializeAppearance() {
  const root = document.documentElement;
  let read = () => null;
  try {
    read = (key) => localStorage.getItem(key);
  } catch {}
  const safeRead = (key) => {
    try {
      return read(key);
    } catch {
      return null;
    }
  };
  // Apply the agreed background once, then retain later demo palette selections.
  const theme = safeRead("eh-palette-version") === "1"
    ? safeRead("eh-theme")
    : "classic-dark";
  const validTheme = paletteOptions.includes(theme) ? theme : "classic-dark";
  try {
    localStorage.setItem("eh-theme", validTheme);
    localStorage.setItem("eh-palette-version", "1");
  } catch {}
  if (validTheme === "light") delete root.dataset.theme;
  else root.dataset.theme = validTheme;
  root.dataset.style = "architectural";
  for (const [key, attr, options, fallback] of [
    ["eh-font", "font", headingFonts, "space-grotesk"],
    ["eh-font-body", "fontBody", bodyFonts, "dm-sans"],
  ]) {
    const value = key === "eh-font-body" && safeRead("eh-body-font-version") !== "1"
      ? "dm-sans"
      : safeRead(key);
    root.dataset[attr] = options.some((o) => o.value === value)
      ? value
      : fallback;
  }
  try {
    localStorage.setItem("eh-font-body", root.dataset.fontBody);
    localStorage.setItem("eh-body-font-version", "1");
  } catch {}
  let accent = safeRead("eh-accent");
  if (
    safeRead("eh-appearance-version") !== "3" ||
    !accentOptions.some((o) => o.value === accent)
  )
    accent = "taupe";
  root.dataset.accent = accent;
  try {
    localStorage.setItem("eh-accent", accent);
    localStorage.setItem("eh-appearance-version", "3");
  } catch {}
  applyCustomAppearance();
}
