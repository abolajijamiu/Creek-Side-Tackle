import fs from 'node:fs';
import { symbol, pineHook, horizontal, primary } from './lib/logo.mjs';
const big = (s,w)=>s.replace(/width="[\d.]+" height="[\d.]+"/, `style="width:${w}px;height:auto"`);
let h='<body style="margin:0;padding:20px;background:#F2F1E9;display:flex;gap:30px;align-items:center;flex-wrap:wrap">';
h+=big(symbol(),360)+big(pineHook(),300)+big(symbol(),48)+big(symbol(),32)+big(symbol(),16)+big(pineHook(),24)+big(symbol('mono-spruce'),32);
h+=`<div style="width:100%"></div>`+big(horizontal(),520)+big(horizontal(),180)+big(primary(),160);
fs.writeFileSync(process.argv[2],h);
