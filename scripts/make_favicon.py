# Book Sphere favicon set from the brand mark (navy B, gold half-disc + dot, fanned pages)
# centred on a cream rounded square. Source mark: public/brand/lockup.svg (nav logo).
import io, os, re, cairosvg
from PIL import Image
ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),"..")
lock=open(f"{ROOT}/public/brand/lockup.svg").read()
MARK=re.search(r'<g transform="translate\(95 150\)">(.*?</g>)\s*</g>',lock,re.S).group(1)
BG="#F7F2EA"; CX,CY,MW,MH=73,79,140,152   # mark bbox centre / size in mark units
# Simplified fan for 16/32px: one white wedge with three bold navy page lines (fine lines vanish at that size).
SIMPLE_FAN=('<path d="M47 139 Q37 98 50 55 L68 62 L104 68 L109 80 L110 93 L108 106 L104 117 Q82 132 47 139 Z" fill="#FFFFFF"/>'
  '<g fill="none" stroke="#1B2233" stroke-width="{w}" stroke-linecap="round"><path d="M49 134 Q52 100 68 64"/><path d="M50 134 Q70 110 108 82"/><path d="M51 136 Q79 127 106 108"/></g>')
def svg(size=512, fill=0.86, radius=0.22, bstroke=3.2, pstroke=3.4, bg=True, simple=False):
    s=size*fill/MH; m=MARK
    if simple: m=re.sub(r'<g fill="#FFFFFF".*?</g>',SIMPLE_FAN.format(w=pstroke),m,flags=re.S)
    m=m.replace('stroke-width="3.2"',f'stroke-width="{bstroke}"').replace('stroke-width="3.4"',f'stroke-width="{pstroke}"')
    rect=f'<rect width="{size}" height="{size}" rx="{size*radius:.1f}" fill="{BG}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">{rect}'
            f'<g transform="translate({size/2} {size/2}) scale({s:.4f}) translate({-CX} {-CY})">{m}</g></svg>')
def render(t,px):
    im=Image.open(io.BytesIO(cairosvg.svg2png(bytestring=t.encode(),output_width=px,output_height=px))).convert("RGBA"); im.info={}; return im
app=f"{ROOT}/public/brand"; main=svg()
open(f"{app}/icon-v3.svg","w").write(main)
render(main,512).save(f"{app}/icon-v3.png",optimize=True)
render(svg(radius=0,fill=0.80),180).convert("RGB").save(f"{app}/apple-icon-v3.png")   # iOS rounds corners itself
render(main,192).save(f"{ROOT}/public/brand/icon-192.png"); render(main,512).save(f"{ROOT}/public/brand/icon-512.png")
small=svg(fill=0.92,radius=0.18,bstroke=5,pstroke=7,simple=True)   # 16/32: bigger mark, heavier B outline, lighter page lines so the fan reads white
ico=[render(small,16),render(small,32),render(svg(fill=0.90,pstroke=2.8),48)]
ico[2].save(f"{app}/favicon-v3.ico",format="ICO",sizes=[(16,16),(32,32),(48,48)],append_images=ico[:2])
import shutil; shutil.copy(f"{app}/favicon-v3.ico",f"{ROOT}/public/favicon.ico"); shutil.copy(f"{app}/apple-icon-v3.png",f"{ROOT}/public/apple-touch-icon.png")
