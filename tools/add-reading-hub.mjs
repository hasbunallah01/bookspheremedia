import fs from 'node:fs'; import crypto from 'node:crypto'; import {neon} from '@neondatabase/serverless'; import {put} from '@vercel/blob';
const env=f=>Object.fromEntries(fs.readFileSync(f,'utf8').split('\n').filter(l=>/^\w+=/.test(l)).map(l=>{const i=l.indexOf('=');return [l.slice(0,i),l.slice(i+1).replace(/^"|"$/g,'')]}));
const sql=neon(env('.env').DATABASE_URL);
if((await sql`select 1 from "Affiliate" where slug='book-sphere-reading-hub'`).length){console.log('exists');process.exit(1)}
const b=await put(`uploads/affiliates/${crypto.randomUUID()}.webp`,fs.readFileSync('incoming/reading-hub-logo.webp'),{access:'public',contentType:'image/webp',token:env('.env.blob').BLOB_READ_WRITE_TOKEN});
const id='c'+crypto.randomBytes(12).toString('hex');
await sql`insert into "Affiliate"(id,name,slug,tagline,description,logo,banner,link,"sortOrder",visible,"updatedAt") values(${id},'Book Sphere Reading Hub','book-sphere-reading-hub',null,'A readers community on Facebook',${b.url},null,'https://www.facebook.com/share/19nvRF3oek/',4,true,now())`;
console.log(b.url);
