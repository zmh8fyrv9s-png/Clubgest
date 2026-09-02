(function(){'use strict';
const ICON='/icon-192.svg?v=10';
function apply(){
 document.querySelectorAll('.crest').forEach(function(el){
  el.textContent=''; el.setAttribute('aria-label',el.getAttribute('aria-label')||'ClubGest'); el.classList.add('cg-mark');
 });
 const brand=document.querySelector('.brand');
 if(brand){brand.classList.add('cg-brand'); const small=brand.querySelector('small'); if(small) small.textContent='FC Déifferdeng 03 · Formação U7 · U9 · U11';}
}
const s=document.createElement('style');s.textContent=`
.crest.cg-mark{font-size:0!important;background:#090909 url('${ICON}') center/cover no-repeat!important;border:2px solid #e30613!important;box-shadow:0 8px 22px #e3061333!important;color:transparent!important}
.brand.cg-brand{color:#fff!important}.brand.cg-brand .crest{width:48px;height:48px;border-radius:15px}
.hero .crest.cg-mark{width:86px;height:86px;border-radius:22px}
@media(max-width:760px){.brand.cg-brand .crest{width:44px;height:44px}.hero .crest.cg-mark{width:70px;height:70px}}
`;
document.head.appendChild(s); apply(); new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});
})();
