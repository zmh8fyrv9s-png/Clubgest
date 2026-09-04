(function(){
  const K='cgProfileFixV1';
  const urlRole=new URLSearchParams(location.search).get('role');
  if(['parent','coach','admin'].includes(urlRole)){
    localStorage.setItem('cgRole',urlRole);
    localStorage.setItem('cgOnboarded','1');
    localStorage.setItem('cgDemoMode','1');
    if(urlRole!=='parent')localStorage.setItem('cgTeam','U9');
    return;
  }
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
