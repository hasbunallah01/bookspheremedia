from playwright.sync_api import sync_playwright
B="http://localhost:3000"
with sync_playwright() as p:
    b=p.chromium.launch()
    def shot(path,name,w,full=True):
        pg=b.new_page(viewport={"width":w,"height":900});pg.goto(B+path,wait_until="networkidle")
        pg.evaluate("async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}}");pg.wait_for_timeout(800);pg.evaluate("window.scrollTo(0,0)");pg.wait_for_timeout(300)
        print(name,"scrollW",pg.evaluate("document.documentElement.scrollWidth"),"broken",pg.evaluate("[...document.images].filter(i=>!i.complete||!i.naturalWidth).length"))
        pg.screenshot(path=f"shots/{name}",full_page=full)
    shot("/","home-desktop.png",1440);shot("/","home-mobile.png",390);shot("/founder","founder-desktop.png",1440)
    shot("/discover","discover-desktop.png",1440);shot("/submit","submit-desktop.png",1440)
    shot("/books/10-04","book-10-04.png",1440);shot("/authors/sarah-j-maas","author-maas.png",1440)
    for u in ["/","/discover","/books","/books/10-04","/books/the-quiet-hour","/authors","/authors/sarah-j-maas","/authors/mara-ellison","/founder","/submit","/contact","/features","/about","/faq","/genres","/join","/privacy","/terms","/discover?genre=fantasy","/nope"]:
        pg=b.new_page(viewport={"width":390,"height":800});r=pg.goto(B+u,wait_until="networkidle");pg.evaluate("async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,40))}}");pg.wait_for_timeout(500)
        print(u,r.status,pg.evaluate("document.documentElement.scrollWidth"),"broken",pg.evaluate("[...document.images].filter(i=>!i.complete||!i.naturalWidth).length"));pg.close()
