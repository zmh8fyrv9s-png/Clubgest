(function(){
'use strict';
const TEAMS=['U7','U9','U11'];
function isPrivileged(){const r=localStorage.getItem('cgRole')||'';return r==='admin'||r==='coach'}
function getState(){try{return JSON.parse(localStorage.getItem('clubgest_v3')||'null')}catch(e){return null}}
function switchTeam(team){
  if(!isPrivileged()||TEAMS.indexOf(team)<0)return;
  const d=getState(); if(!d||!d.teams||!d.teams[team])return;
  d.selected=team;
  try{localStorage.setItem('clubgest_v3',JSON.stringify(d))}catch(e){}
  localStorage.setItem('cgViewTeam',team);
  const badge=document.getElementById('todayTeam');if(badge)badge.textContent=team;
  if(typeof window.render==='function')window.render();
  else if(typeof window.ClubGestNav?.go==='function')window.ClubGestNav.go('home');
}
function mount(){
  if(!isPrivileged())return;
  const top=document.querySelector('.topin');if(!top||document.getElementById('cg-team-view'))return;
  const sel=document.createElement('select');sel.id='cg-team-view';sel.className='select';sel.title='Ver equipa';
  sel.setAttribute('aria-label','Ver equipa');
  const d=getState();const current=(d&&TEAMS.indexOf(d.selected)>=0?d.selected:null)||localStorage.getItem('cgViewTeam')||'U9';
  TEAMS.forEach(t=>{const o=document.createElement('option');o.value=t;o.textContent='Ver '+t;sel.appendChild(o)});
  sel.value=current;sel.onchange=function(){switchTeam(this.value)};
  top.insertBefore(sel,top.querySelector('#role')||null);
}
function refresh(){
  const old=document.getElementById('cg-team-view');if(old)old.remove();mount();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
window.addEventListener('storage',refresh);
new MutationObserver(function(){if(isPrivileged()&&!document.getElementById('cg-team-view'))mount()}).observe(document.documentElement,{childList:true,subtree:true});
window.ClubGestTeamView={switchTeam:switchTeam,refresh:refresh};
})();
