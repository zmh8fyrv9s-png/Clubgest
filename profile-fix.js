(function(){
  const K='cgProfileFixV1';
  function boot(){
    if(localStorage.getItem(K)==='1') return;
    const b=document.getElementById('cg-profile');
    if(!b){setTimeout(boot,150);return}
    localStorage.removeItem('cgOnboarded');
    localStorage.removeItem('cgRole');
    localStorage.setItem(K,'1');
    b.click();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
