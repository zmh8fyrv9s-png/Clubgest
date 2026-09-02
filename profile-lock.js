(function(){
'use strict';
let scheduled=false;
function enforce(){
 scheduled=false;
 const b=document.getElementById('cg-profile');
 if(b && localStorage.getItem('cgOnboarded')==='1'){
  b.style.display='none';
  b.disabled=true;
  b.onclick=null;
  b.setAttribute('aria-hidden','true');
  b.tabIndex=-1;
 }
}
function schedule(){
 if(scheduled)return;
 scheduled=true;
 requestAnimationFrame(enforce);
}
enforce();
const mo=new MutationObserver(schedule);
mo.observe(document.documentElement,{childList:true,subtree:true});
window.addEventListener('storage',schedule);
})();
