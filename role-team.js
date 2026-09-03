(function(){
'use strict';
const TEAMS=['U7','U9','U11'];
const ROLE_KEY='cgRole', CHILDREN_KEY='cgParentChildren';
function role(){return localStorage.getItem(ROLE_KEY)||'parent'}
function readChildren(){try{const a=JSON.parse(localStorage.getItem(CHILDREN_KEY)||'[]');return Array.isArray(a)?a.filter(x=>x&&x.name&&TEAMS.includes(x.team)):[]}catch(e){return[]}}
function saveChildren(a){localStorage.setItem(CHILDREN_KEY,JSON.stringify(a))}
function appData(){try{return JSON.parse(localStorage.getItem('clubgest_v3')||'{}')}catch(e){return{}}}
function saveTeam(team){const d=appData();if(!d.teams||!d.teams[team])return;d.selected=team;localStorage.setItem('clubgest_v3',JSON.stringify(d));if(typeof window.render==='function')window.render()}
function coachTeam(){const u=(localStorage.getItem('cgUser')||'').toUpperCase();const t=localStorage.getItem('cgTeam');return TEAMS.includes(t)?t:(u.match(/U(7|9|11)$/)||[])[0]||'U9'}
function setTeam(team){
 const r=role();
 if(r==='coach'){team=coachTeam()}
 if(!TEAMS.includes(team))team='U9';
 if(r==='parent'){
  const kids=readChildren(); const kid=kids.find(x=>x.team===team);
  if(kid)localStorage.setItem('cgActiveChild',kid.name);
 }
 localStorage.setItem('cgViewTeam',team);saveTeam(team);renderChrome();
}
function injectStyles(){if(document.getElementById('cg-team-css'))return;const s=document.createElement('style');s.id='cg-team-css';s.textContent='.cg-team-wrap{display:flex;align-items:center;gap:7px}.cg-team-label{font-size:9px;font-weight:850;color:#667085;letter-spacing:.08em}.cg-team-select{border:1px solid #dfe3e8;background:#fff;border-radius:11px;padding:9px 10px;min-height:40px;font-weight:800}.cg-team-select:disabled{opacity:.9}.cg-parent-box{margin-top:14px;padding:16px;border:1px solid #e7e9ee;border-radius:20px;background:#fff}.cg-parent-kids{display:grid;gap:8px}.cg-child{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:11px;border:1px solid #eef0f2;border-radius:14px}.cg-child b{font-size:13px}.cg-child small{display:block;color:#667085;font-size:10px;margin-top:2px}.cg-child button{padding:8px 10px;border-radius:10px;background:#111827;color:#fff;font-size:10px;font-weight:800}.cg-parent-form{display:grid;grid-template-columns:1.5fr .8fr auto;gap:8px;margin-top:10px}.cg-parent-form input,.cg-parent-form select{min-height:40px;border:1px solid #dfe3e8;border-radius:10px;padding:9px;background:#fff}.cg-parent-form button{border:0;border-radius:10px;padding:9px 12px;background:#e30613;color:#fff;font-weight:800}@media(max-width:760px){.cg-parent-form{grid-template-columns:1fr 1fr}.cg-parent-form button{grid-column:1/-1}}';document.head.appendChild(s)}
function ensureHeader(){const top=document.querySelector('.topin');if(!top)return;let w=document.getElementById('cg-team-wrap');if(!w){w=document.createElement('div');w.id='cg-team-wrap';w.className='cg-team-wrap';const lang=document.getElementById('lang');top.insertBefore(w,lang||null)}const r=role();const current=localStorage.getItem('cgViewTeam')||appData().selected||'U9';const kids=readChildren();const opts=(r==='coach'?[coachTeam()]:TEAMS).map(t=>'<option value="'+t+'">'+t+'</option>').join('');w.innerHTML='<span class="cg-team-label">'+(r==='parent'?'EQUIPA':'EQUIPA')+'</span><select id="cg-team-select" class="cg-team-select">'+opts+'</select>';const sel=document.getElementById('cg-team-select');sel.value=(r==='coach'?coachTeam():(TEAMS.includes(current)?current:(kids[0]?.team||'U9')));sel.disabled=r==='coach';sel.onchange=function(){setTeam(this.value)};if(r==='coach'&&sel.value!==current)saveTeam(sel.value)}
function ensureParentHome(){if(role()!=='parent')return;const home=document.getElementById('home');if(!home)return;let box=document.getElementById('cg-parent-box');if(!box){box=document.createElement('div');box.id='cg-parent-box';box.className='cg-parent-box';home.appendChild(box)}const kids=readChildren();const active=localStorage.getItem('cgActiveChild')||'';box.innerHTML='<div class="head"><div><h3>Os meus filhos</h3><p>Escolha o grupo de cada filho para ver a equipa certa.</p></div></div><div class="cg-parent-kids">'+(kids.length?kids.map((k,i)=>'<div class="cg-child"><div><b>'+escapeHtml(k.name)+'</b><small>'+k.team+(k.name===active?' · selecionado':'')+'</small></div><button type="button" data-child="'+i+'">Ver '+k.team+'</button></div>').join(''):'<div class="empty">Adicione o nome e o grupo do seu filho.</div>')+'</div><div class="cg-parent-form"><input id="cg-child-name" placeholder="Nome do filho"><select id="cg-child-team"><option>U7</option><option>U9</option><option>U11</option></select><button type="button" id="cg-child-add">Adicionar</button></div>';box.querySelectorAll('[data-child]').forEach(b=>b.onclick=function(){const k=readChildren()[Number(this.dataset.child)];if(k){localStorage.setItem('cgActiveChild',k.name);setTeam(k.team)}});box.querySelector('#cg-child-add').onclick=function(){const n=(box.querySelector('#cg-child-name').value||'').trim();const t=box.querySelector('#cg-child-team').value;if(!n)return;const a=readChildren();a.push({name:n,team:t});saveChildren(a);localStorage.setItem('cgActiveChild',n);setTeam(t)}}
function escapeHtml(v){return String(v).replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\\':'&#92;','"':'&quot;'}[m]))}
function renderChrome(){injectStyles();ensureHeader();ensureParentHome()}
function sync(){const r=role();let t=localStorage.getItem('cgViewTeam');if(r==='coach')t=coachTeam();if(r==='parent'&&!TEAMS.includes(t)){const k=readChildren()[0];t=k?.team||'U9'}if(!TEAMS.includes(t))t='U9';if(localStorage.getItem('cgViewTeam')!==t)localStorage.setItem('cgViewTeam',t);const d=appData();if(d.teams&&d.teams[t]&&d.selected!==t){d.selected=t;localStorage.setItem('clubgest_v3',JSON.stringify(d))}renderChrome()}
const oldRender=window.render; if(typeof oldRender==='function')window.render=function(){oldRender();setTimeout(renderChrome,0)};
const obs=new MutationObserver(function(){renderChrome()});
function boot(){injectStyles();sync();obs.observe(document.body,{childList:true,subtree:true});window.addEventListener('storage',sync)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
window.ClubGestTeam={setTeam,setChildren:readChildren};
})();
