(function(){
  'use strict';
  function enforce(){
    const b=document.getElementById('cg-profile');
    if(b && localStorage.getItem('cgOnboarded')==='1'){
      b.style.display='none';
      b.disabled=true;
      b.onclick=null;
      b.setAttribute('aria-hidden','true');
      b.tabIndex=-1;
    }
  }
  enforce();
  const mo=new MutationObserver(enforce);
  mo.observe(document.documentElement,{childList:true,subtree:true});
  setInterval(enforce,500);
})();
