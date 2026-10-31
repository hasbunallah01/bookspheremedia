// Usage: node tools/add-uniting-the-states.mjs   (expects incoming/kilmeade-cover.jpg + incoming/kilmeade-photo.jpg)
// Loads DATABASE_URL from .env and BLOB_READ_WRITE_TOKEN from .env.blob; never prints them.
import fs from 'node:fs'; import crypto from 'node:crypto'; import {execFileSync} from 'node:child_process';
import {neon} from '@neondatabase/serverless'; import {put} from '@vercel/blob';
const env=f=>Object.fromEntries(fs.readFileSync(f,'utf8').split('\n').filter(l=>/^\w+=/.test(l)).map(l=>{const i=l.indexOf('=');return [l.slice(0,i),l.slice(i+1).replace(/^"|"$/g,'')]}));
const DB=env('.env').DATABASE_URL, TOKEN=env('.env.blob').BLOB_READ_WRITE_TOKEN;
execFileSync('python3',['-c',`
from PIL import Image, ImageChops
c=Image.open('incoming/kilmeade-cover.jpg').convert('RGB')
bg=Image.new('RGB',c.size,(255,255,255)); d=ImageChops.difference(c,bg).convert('L').point(lambda v:255 if v>28 else 0)
b=d.getbbox(); c=c.crop((b[0]+2,b[1]+2,b[2]-2,b[3]-2)); c.save('incoming/kilmeade-cover-cropped.jpg',quality=92); print('cover',c.size)
p=Image.open('incoming/kilmeade-photo.jpg').convert('RGB'); box=(62,0,522,460); q=p.crop(box).resize((800,800),Image.LANCZOS); q.save('incoming/kilmeade-photo-cropped.jpg',quality=92); print('photo',box)
`],{stdio:'inherit'});
if(process.argv[2]==='--crop-only') process.exit(0);
const up=async(f,folder)=>(await put(`uploads/${folder}/${crypto.randomUUID()}.jpg`,fs.readFileSync(f),{access:'public',contentType:'image/jpeg',token:TOKEN})).url;
const sql=neon(DB);
if((await sql`select 1 from "Book" where slug='uniting-the-states'`).length){console.log('book exists, abort');process.exit(1)}
const cover=await up('incoming/kilmeade-cover-cropped.jpg','covers'), photo=await up('incoming/kilmeade-photo-cropped.jpg','authors');
const bio=fs.readFileSync('tools/kilmeade-bio.txt','utf8').trim();
const cuid=()=>'c'+crypto.randomBytes(12).toString('hex').slice(0,24);
const [{m}]=await sql`select coalesce(max("sortOrder"),0) m from "Author" where demo=false`;
const [{bm}]=await sql`select coalesce(max("sortOrder"),0) bm from "Book" where demo=false`;
// shift demo rows down to keep real items first (same pattern as earlier additions)
await sql`update "Author" set "sortOrder"="sortOrder"+1 where demo=true`; await sql`update "Book" set "sortOrder"="sortOrder"+1 where demo=true`;
const aid=cuid(), bid=cuid();
await sql`insert into "Author"(id,slug,name,genres,bio,photo,demo,"sortOrder","updatedAt") values(${aid},'brian-kilmeade','Brian Kilmeade','["Nonfiction","History"]',${bio},${photo},false,${m+1},now())`;
await sql`insert into "Book"(id,slug,title,subtitle,"authorId",genre,tags,hook,description,cover,"realCover",tone,"addedAt",visible,featured,demo,"sortOrder","updatedAt")
 values(${bid},'uniting-the-states','Uniting the States','Six Crucial Moments That Forged the American Miracle',${aid},'Nonfiction','["History"]','Six crucial moments that forged the American miracle.','[]',${cover},true,'umber','2026-10-29',true,false,false,${bm+1},now())`;
console.log('done',{cover,photo});
