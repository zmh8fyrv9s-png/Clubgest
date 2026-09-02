(function(){
  function lock(){
    const b=document.getElementById('cg-profile');
    if(!b){setTimeout(lock,200);return}
    if(localStorage.getItem('cgOnboarded')==='1'){
      b.style.display='none';
      b.disabled=true;
      b.onclick=null;
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',lock);else lock();
})();
