(function(){'use strict';
const ICON='/icon-192.svg?v=10';
function apply(){
 document.querySelectorAll('.crest').forEach(function(el){
  el.textContent=''; el.setAttribute('aria-label',el.getAttribute('aria-label')||'ClubGest'); el.classList.add('cg-mark');
 });
 const brand=document.querySelector('.brand');
 if(brand){
  brand.classList.add('cg-brand');
  if(!brand.dataset.cgWordmark){
   const copy=brand.querySelector(':scope > div:last-child');
   if(copy){
    const small=copy.querySelector('small');
    copy.childNodes.forEach(n=>{if(n.nodeType===3)n.remove()});
    const word=document.createElement('div'); word.className='cg-wordmark'; word.innerHTML='<span>CLUB</span><b>GEST</b>';
    copy.prepend(word); brand.dataset.cgWordmark='1';
    if(small) small.textContent='FC Déifferdeng 03 · Formação U7 · U9 · U11';
   }
  }
 }
}
const s=document.createElement('style');s.textContent=`
.crest.cg-mark{font-size:0!important;background:#090909 url('${ICON}') center/cover no-repeat!important;border:2px solid #e30613!important;box-shadow:0 8px 22px #e3061333!important;color:transparent!important}
.brand.cg-brand{color:#fff!important}.brand.cg-brand .crest{width:48px;height:48px;border-radius:15px}
.cg-wordmark{display:flex;align-items:baseline;line-height:.9;letter-spacing:-.045em;font-size:22px;font-weight:950;font-style:italic}.cg-wordmark span{color:#fff}.cg-wordmark b{color:#e30613;font-weight:950}.cg-brand small{margin-top:4px!important}
.hero .crest.cg-mark{width:86px;height:86px;border-radius:22px}
.card.stat{position:relative;overflow:hidden}.card.stat:after{content:'';position:absolute;right:-24px;bottom:-34px;width:90px;height:90px;border:2px solid #e3061322;border-radius:50%}.stat small{font-weight:700}.btn{transition:transform .18s ease,box-shadow .18s ease}.btn:hover{transform:translateY(-1px)}
@media(max-width:760px){.brand.cg-brand .crest{width:44px;height:44px}.cg-wordmark{font-size:19px}.hero .crest.cg-mark{width:70px;height:70px}}
`;
document.head.appendChild(s); apply(); new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});
})();
