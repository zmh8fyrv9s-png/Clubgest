(function(){
'use strict';
let scheduled=false;
function isParent(){return (localStorage.getItem('cgRole')||'parent')==='parent'}
function enforce(){
 scheduled=false;
 const b=document.getElementById('cg-profile');
 if(b && localStorage.getItem('cgOnboarded')==='1'){
  b.style.display='none';b.disabled=true;b.onclick=null;b.setAttribute('aria-hidden','true');b.tabIndex=-1;
 }
 if(!isParent())return;
 const home=document.getElementById('home'),team=document.getElementById('team'),att=document.getElementById('attendance');
 if(home) home.querySelectorAll('.grid').forEach(x=>x.style.display='none');
 if(team){
  team.querySelectorAll('.teammeta').forEach(x=>x.style.display='none');
  const grid=team.querySelector('.playergrid');
  if(grid){
   [...grid.querySelectorAll('.player')].forEach(row=>{
    const name=row.querySelector('.left strong')?.textContent?.trim()||'';
    const key=((window.data&&window.data.selected)||'U9')+'|'+name;
    if(!(window.data&&window.data.attendance&&window.data.attendance[key]==='present'))row.remove();
   });
   if(!team.querySelector('[data-parent-presence-title]')){const title=document.createElement('div');title.dataset.parentPresenceTitle='1';title.className='head';title.innerHTML='<div><h3>Presentes</h3><p>Para organizar boleias e o treino</p></div>';team.insertBefore(title,grid)}
   if(!grid.querySelector('.player')&&!grid.querySelector('.empty')){const empty=document.createElement('div');empty.className='empty';empty.textContent='Ainda não há presenças confirmadas.';grid.appendChild(empty)}
  }
 }
 if(att){
  att.querySelectorAll('.choice').forEach(x=>x.remove());
  [...att.querySelectorAll('.row')].forEach(row=>{const name=row.querySelector('.left strong')?.textContent?.trim()||'';const key=((window.data&&window.data.selected)||'U9')+'|'+name;if(!(window.data&&window.data.attendance&&window.data.attendance[key]==='present'))row.remove()});
 }
}
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(enforce)}
enforce();
new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});
window.addEventListener('storage',schedule);
})();
