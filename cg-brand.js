(function(){'use strict';
const MARK='<svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="c" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ff4a4a"/><stop offset=".55" stop-color="#e30613"/><stop offset="1" stop-color="#8f000a"/></linearGradient><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".5" stop-color="#d9d9d9"/><stop offset="1" stop-color="#888"/></linearGradient></defs><rect width="192" height="192" rx="42" fill="#090909"/><rect x="4" y="4" width="184" height="184" rx="38" fill="none" stroke="#e30613" stroke-width="2"/><path d="M93 45H54c-22 0-40 17-40 38s18 38 40 38h18l12-15H54c-13 0-23-10-23-23s10-23 23-23h26z" fill="url(#c)"/><path d="M100 72h38c22 0 40 17 40 38s-18 38-40 38h-43l-14-15h57c13 0 23-10 23-23s-10-23-23-23h-27z" fill="url(#g)"/><path d="M71 121l14-15 17-19 13 10-19 21-12 13z" fill="#050505"/></svg>';
function apply(){
 document.querySelectorAll('.crest').forEach(function(el){
  if(!el.classList.contains('cg-mark')){
   el.innerHTML=MARK;
   el.setAttribute('aria-label',el.getAttribute('aria-label')||'ClubGest');
   el.classList.add('cg-mark');
  }
 });
 const brand=document.querySelector('.brand');
 if(brand){
  brand.classList.add('cg-brand');
  if(!brand.dataset.cgWordmark){
   const copy=brand.querySelector(':scope > div:last-child');
   if(copy){
    const small=copy.querySelector('small');
    copy.childNodes.forEach(n=>{if(n.nodeType===3)n.remove()});
    const word=document.createElement('div');word.className='cg-wordmark';word.innerHTML='<span>CLUB</span><b>GEST</b>';
    copy.prepend(word);brand.dataset.cgWordmark='1';
    if(small)small.textContent='FC Déifferdeng 03 · Formação U7 · U9 · U11';
   }
  }
 }
 const legacy=document.querySelector('.brand small');
 if(legacy && /U16/.test(legacy.textContent)) legacy.textContent='FC Déifferdeng 03 · Formação U7 · U9 · U11';
}
function addAppPolish(){
 if(document.getElementById('cg-quickbar'))return;
 const main=document.querySelector('.main');
 const today=document.querySelector('.today');
 if(!main||!today)return;
 const bar=document.createElement('div');
 bar.id='cg-quickbar';
 bar.innerHTML='<button type="button" data-go="home"><span>⌂</span><b>Início</b></button><button type="button" data-go="attendance"><span>✓</span><b>Presenças</b></button><button type="button" data-go="calendar"><span>▣</span><b>Hoje</b></button><button type="button" data-go="team"><span>CG</span><b>Equipa</b></button>';
 today.insertAdjacentElement('afterend',bar);
 bar.addEventListener('click',function(e){const b=e.target.closest('button[data-go]');if(!b)return;const fn=window.go;if(typeof fn==='function')fn(b.dataset.go);});
}
const s=document.createElement('style');s.textContent=`
.crest.cg-mark{font-size:0!important;background:#090909!important;border:2px solid #e30613!important;box-shadow:0 8px 22px #e3061333!important;color:transparent!important;overflow:hidden!important;padding:0!important}.crest.cg-mark svg{width:100%;height:100%;display:block}.brand.cg-brand{color:#111!important}.brand.cg-brand .crest{width:48px;height:48px;border-radius:15px}.cg-wordmark{display:flex;align-items:baseline;line-height:.9;letter-spacing:-.045em;font-size:22px;font-weight:950;font-style:italic}.cg-wordmark span{color:#111}.cg-wordmark b{color:#e30613;font-weight:950}.cg-brand small{margin-top:4px!important}.hero .crest.cg-mark{width:86px;height:86px;border-radius:22px}.card.stat{position:relative;overflow:hidden}.card.stat:after{content:'';position:absolute;right:-24px;bottom:-34px;width:90px;height:90px;border:2px solid #e3061322;border-radius:50%}.stat small{font-weight:700}.btn{transition:transform .18s ease,box-shadow .18s ease}.btn:hover{transform:translateY(-1px)}
#cg-quickbar{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:0 0 14px}#cg-quickbar button{min-height:58px;background:#fff;border:1px solid #e7e9ee;border-radius:16px;display:flex;align-items:center;justify-content:center;gap:6px;flex-direction:column;color:#344054;box-shadow:0 5px 16px #1018280a;-webkit-tap-highlight-color:transparent;touch-action:manipulation}#cg-quickbar button span{width:26px;height:26px;border-radius:8px;display:grid;place-items:center;background:#f2f4f7;font-size:14px;font-weight:900}#cg-quickbar button:first-child span,#cg-quickbar button:nth-child(2) span{background:#fdebed;color:#c8102e}#cg-quickbar b{font-size:10px}#cg-quickbar button:active{transform:scale(.97)}
.nav{padding-bottom:max(0px,env(safe-area-inset-bottom))}.navin{padding-bottom:env(safe-area-inset-bottom)}.nav button{min-height:54px;touch-action:manipulation;-webkit-tap-highlight-color:transparent}.select,.btn,button,input,select,textarea{touch-action:manipulation}@media(max-width:760px){.brand.cg-brand .crest{width:44px;height:44px}.cg-wordmark{font-size:19px} .hero .crest.cg-mark{width:70px;height:70px}#cg-quickbar{gap:6px}#cg-quickbar button{min-height:60px;border-radius:15px}#cg-quickbar b{font-size:9px}.today{margin-bottom:10px}}
@media(min-width:761px){#cg-quickbar{max-width:720px}}
`;
document.head.appendChild(s);
apply();addAppPolish();
const observer=new MutationObserver(function(){apply();addAppPolish();});
observer.observe(document.documentElement,{childList:true,subtree:true});
})();