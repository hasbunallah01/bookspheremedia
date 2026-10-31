import fs from 'node:fs'; import crypto from 'node:crypto'; import {neon} from '@neondatabase/serverless'; import {put} from '@vercel/blob';
const env=f=>Object.fromEntries(fs.readFileSync(f,'utf8').split('\n').filter(l=>/^\w+=/.test(l)).map(l=>{const i=l.indexOf('=');return [l.slice(0,i),l.slice(i+1).replace(/^"|"$/g,'')]}));
const sql=neon(env('.env').DATABASE_URL);
const [old]=await sql`select photo from "Author" where slug='brian-kilmeade'`;
const b=await put(`uploads/authors/${crypto.randomUUID()}.jpg`,fs.readFileSync('incoming/kilmeade-photo-redtie.jpg'),{access:'public',contentType:'image/jpeg',token:env('.env.blob').BLOB_READ_WRITE_TOKEN});
await sql`update "Author" set photo=${b.url}, "updatedAt"=now() where slug='brian-kilmeade'`;
console.log({old:old.photo,new:b.url});
