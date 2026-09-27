
(function(){
 const routes={
  "home":"index.html","home 1":"index.html","home 2":"home-2.html",
  "categories":"products.html", "products":"products.html","product catalog":"products.html","shop":"products.html",
  "zephyr pro":"product-zephyr-pro.html","product detail":"product-zephyr-pro.html",
  "beach gear":"beach-gear.html","outdoor beach gear":"beach-gear.html",
  "events":"events.html","events & festivals":"events.html","festivals":"events.html",
  "buying guide":"buying-guide.html","wind buying guide":"buying-guide.html",
  "contact":"contact.html","gear support":"contact.html","support":"contact.html"
 };
 const norm=s=>(s||"").replace(/\s+/g," ").trim().toLowerCase();
 function toast(msg){
  let t=document.getElementById("kite-toast"); if(!t)return;
  t.textContent=msg;t.classList.add("show");clearTimeout(window.__kiteToast);
  window.__kiteToast=setTimeout(()=>t.classList.remove("show"),1500);
 }
 function controls(){
  const toastEl=document.createElement("div");toastEl.id="kite-toast";document.body.appendChild(toastEl);
  
  const thToggle = document.getElementById("theme-toggle");
  if(thToggle){
   thToggle.onclick=()=>{
    const n=document.documentElement.dataset.theme==="dark"?"light":"dark";
    document.documentElement.dataset.theme=n;localStorage.setItem("kite-theme",n);update();toast(n==="dark"?"Dark theme enabled":"Light theme enabled");
   };
  }
  
  const rtlToggle = document.getElementById("rtl-toggle");
  if(rtlToggle){
   rtlToggle.onclick=()=>{
    const n=document.documentElement.dir==="rtl"?"ltr":"rtl";
    document.documentElement.dir=n;localStorage.setItem("kite-dir",n);update();toast(n==="rtl"?"RTL enabled":"LTR enabled");
   };
  }

  if(!thToggle || !rtlToggle) {
   if(document.getElementById("kite-controls"))return;
   const d=document.createElement("div");d.id="kite-controls";
   d.innerHTML='<button id="kite-theme" title="Toggle theme">☾</button><button id="kite-dir" title="Toggle RTL">RTL</button>';
   document.body.appendChild(d);
   document.getElementById("kite-theme").onclick=()=>{
    const n=document.documentElement.dataset.theme==="dark"?"light":"dark";
    document.documentElement.dataset.theme=n;localStorage.setItem("kite-theme",n);update();toast(n==="dark"?"Dark theme enabled":"Light theme enabled");
   };
   document.getElementById("kite-dir").onclick=()=>{
    const n=document.documentElement.dir==="rtl"?"ltr":"rtl";
    document.documentElement.dir=n;localStorage.setItem("kite-dir",n);update();toast(n==="rtl"?"RTL enabled":"LTR enabled");
   };
  }
 }
 function update(){
  const dark=document.documentElement.dataset.theme==="dark";
  const rtl=document.documentElement.dir==="rtl";
  const th=document.getElementById("kite-theme"),di=document.getElementById("kite-dir");
  if(th){th.textContent=dark?"☀":"☾";th.title=dark?"Switch to light theme":"Switch to dark theme"}
  if(di){di.textContent=rtl?"LTR":"RTL";di.title=rtl?"Switch to LTR":"Switch to RTL"}
  
  const themeIcon=document.getElementById("theme-icon");
  if(themeIcon){themeIcon.textContent=dark?"light_mode":"dark_mode";}
  if(dark){document.documentElement.classList.add("dark");}
  else{document.documentElement.classList.remove("dark");}
 }
 function links(){
  document.querySelectorAll('a[href="#"]').forEach(a=>{
   const txt=norm(a.textContent);
   const path=a.getAttribute('data-path');
   let target=null;
   if(path==="coastal-winds") target="index.html";
   else if(path==="mountain-pro") target="home-2.html";
   else {
    const keys=Object.keys(routes).sort((x,y)=>y.length-x.length);
    for(const k of keys) if(txt===k || txt.includes(k)){target=routes[k];break}
   }
   if(!target && /categories|shop|browse|catalog|buy now|view product|add to cart/.test(txt)) target="products.html";
   if(!target && /contact|support|quote|enquir|help/.test(txt)) target="contact.html";
   if(!target && /guide|how to choose/.test(txt)) target="buying-guide.html";
   if(!target && /event|festival/.test(txt)) target="events.html";
   if(target)a.href=target;
  });
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(a=>a.addEventListener("click",e=>{
   const el=document.querySelector(a.getAttribute("href"));if(el){e.preventDefault();el.scrollIntoView({behavior:"smooth"})}
  }));
 }
 function forms(){
  document.querySelectorAll("form").forEach(f=>f.addEventListener("submit",e=>{
   e.preventDefault();
   const bad=[...f.querySelectorAll("[required]")].find(x=>!x.value.trim());
   if(bad){bad.focus();toast("Please complete the required fields");return}
   f.reset();toast("Your request was submitted successfully");
  }));
 }
 document.documentElement.dataset.theme=localStorage.getItem("kite-theme")||"light";
 document.documentElement.dir=localStorage.getItem("kite-dir")||"ltr";
 const init = ()=>{controls();update();links();forms()};
 if(document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
 } else {
  init();
 }
})();
