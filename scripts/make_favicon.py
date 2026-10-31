# Generates the Book Sphere favicon set: navy rounded square, cream bold B, gold dot.
from PIL import Image, ImageDraw
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
import os
NAVY="#1f2a44"; CREAM="#fbf6ec"; GOLD="#d4a63a"
SERIF="/usr/share/fonts/truetype/sand-box/google/IBM Plex Serif/IBMPlexSerif-Bold.ttf"
SANS="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
def glyph_path(font, ch="B"):
    f=TTFont(font); gs=f.getGlyphSet(); g=f.getBestCmap()[ord(ch)]
    bp=BoundsPen(gs); gs[g].draw(bp); sp=SVGPathPen(gs); gs[g].draw(sp)
    return sp.getCommands(), bp.bounds
def svg(font, size=512, radius=0.22, bh=0.60, dot=0.085):
    d,(x0,y0,x1,y1)=glyph_path(font); gw,gh=x1-x0,y1-y0
    s=size*bh/gh; w=gw*s; tx=(size-w)/2 - x0*s - size*0.03; ty=(size+gh*s)/2 + y0*s
    cx=tx+x1*s+size*0.02; cy=(size-gh*s)/2+size*0.03
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">
<rect width="{size}" height="{size}" rx="{size*radius:.1f}" fill="{NAVY}"/>
<path transform="translate({tx:.2f} {ty:.2f}) scale({s:.5f} {-s:.5f})" fill="{CREAM}" d="{d}"/>
<circle cx="{cx:.1f}" cy="{cy+size*dot:.1f}" r="{size*dot:.1f}" fill="{GOLD}"/>
</svg>'''
def render(svgtxt, px):
    import cairosvg, io
    png=cairosvg.svg2png(bytestring=svgtxt.encode(), output_width=px, output_height=px)
    im=Image.open(io.BytesIO(png)).convert("RGBA"); im.info={}; return im
out=os.path.join(os.path.dirname(__file__),"..","app")
big=svg(SERIF); small=svg(SANS, bh=0.66, dot=0.11)
open(f"{out}/icon.svg","w").write(big)
render(big,512).save(f"{out}/icon.png", optimize=True)
# apple: full-bleed square (iOS rounds it itself)
render(big.replace('rx="112.6"','rx="0"'),180).convert("RGB").save(f"{out}/apple-icon.png")
os.makedirs(f"{out}/../public/brand",exist_ok=True)
render(big,192).save(f"{out}/../public/brand/icon-192.png"); render(big,512).save(f"{out}/../public/brand/icon-512.png")
ico=[render(small,16),render(small,32),render(big,48)]
ico[2].save(f"{out}/favicon.ico", format="ICO", sizes=[(16,16),(32,32),(48,48)], append_images=ico[:2])
for i in ico: i.save(f"/tmp/fav{i.width}.png")
