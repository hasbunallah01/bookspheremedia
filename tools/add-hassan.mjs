import fs from 'node:fs'; import crypto from 'node:crypto'; import {neon} from '@neondatabase/serverless'; import {put} from '@vercel/blob';
const env=f=>Object.fromEntries(fs.readFileSync(f,'utf8').split('\n').filter(l=>/^\w+=/.test(l)).map(l=>{const i=l.indexOf('=');return [l.slice(0,i),l.slice(i+1).replace(/^"|"$/g,'')]}));
const sql=neon(env('.env').DATABASE_URL);
if((await sql`select 1 from "Affiliate" where slug='hassan-book-club'`).length){console.log('exists');process.exit(1)}
const up=async p=>(await put(`uploads/affiliates/${crypto.randomUUID()}.webp`,fs.readFileSync(p),{access:'public',contentType:'image/webp',token:env('.env.blob').BLOB_READ_WRITE_TOKEN})).url;
const b={url:await up('incoming/hassan-logo.webp')}, bn=await up('incoming/hassan-banner.webp');
const id='c'+crypto.randomBytes(12).toString('hex');
await sql`insert into "Affiliate"(id,name,slug,tagline,description,logo,banner,link,"sortOrder",visible,"updatedAt") values(${id},'Hassan Book Club','hassan-book-club',null,'A book club on Facebook',${b.url},${bn},'https://www.facebook.com/profile.php?id=61595448637493',5,true,now())`;
console.log(b.url,bn);
