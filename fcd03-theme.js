(function(){
'use strict';
const FCD_LOGO='https://upload.wikimedia.org/wikipedia/commons/8/8b/Logo_fcd_grand.svg';
function roleUI(){
 const role=localStorage.getItem('cgRole')||'';document.body.dataset.cgRole=role;
 const man=document.getElementById('n-man');if(man)man.style.display=(role==='parent'||role==='player')?'none':'';
 const att=document.getElementById('n-att');if(att)att.style.display=role==='player'?'none':'';
 const manage=document.getElementById('manage');if(manage&&role==='player')manage.innerHTML='<div class="hero"><div><span class="kicker">FCD03 · ÁREA DO JOGADOR</span><h1>O teu futebol começa aqui.</h1><p>Equipa, agenda e atividades — simples e direto.</p></div><div class="crest" aria-label="FC Déifferdeng 03"></div></div>';
}
function boot(){
 if(document.getElementById('fcd03-theme')){roleUI();return}
 const s=document.createElement('style');s.id='fcd03-theme';s.textContent=`
:root{--ink:#111;--muted:#667085;--line:#e6e6e6;--soft:#f5f5f5;--dark:#090909;--brand:#e30613;--brand2:#b4000d;--white:#fff;--radius:20px}
body{background:linear-gradient(180deg,#f7f7f7 0,#fff 35%,#f4f4f4 100%)}
.top{background:rgba(8,8,8,.97);border-bottom:3px solid var(--brand);color:#fff}.topin{max-width:1240px;padding:10px 18px}.brand{color:#fff}.brand small{color:#bdbdbd}.crest{background:#fff!important;color:#111!important;border:2px solid var(--brand);box-shadow:0 8px 22px #e3061333}.brand .crest{font-size:0;background:#fff url('${FCD_LOGO}') center/contain no-repeat!important}
.select{background:#171717;color:#fff;border-color:#3b3b3b}.main{max-width:1240px}.today{border-left:4px solid var(--brand);box-shadow:0 8px 25px #1111110d}.badge.red{background:#ffe9e9;color:#a40000}.badge.dark{background:#090909}.btn.red{background:linear-gradient(135deg,#e30613,#b4000d);box-shadow:0 7px 16px #e3061326}.btn.green{background:#171717}.hero{background:radial-gradient(circle at 90% 10%,#4b0000 0,#111 42%,#080808 100%);border:1px solid #2a2a2a;box-shadow:0 18px 40px #00000024}.hero .crest{background:#fff url('${FCD_LOGO}') center/contain no-repeat!important;color:transparent}.card{box-shadow:0 8px 26px #1111110d}.stat strong{color:#111}.section .head h2,.section .head h3{position:relative}.section .head h2:before,.section .head h3:before{content:'';display:inline-block;width:5px;height:20px;background:var(--brand);border-radius:9px;margin-right:8px;vertical-align:-3px}.nav{background:rgba(8,8,8,.97);border-top:3px solid var(--brand)}.nav button{color:#bdbdbd}.nav button.active{background:var(--brand);color:#fff;box-shadow:0 5px 18px #e3061344}.avatar{background:#111;color:#fff;border:2px solid #fff;box-shadow:0 0 0 2px var(--brand)}.progress i{background:var(--brand)}.tabs button.active{background:#111}.choice button.yes.active{background:#111}.choice button.no.active{background:var(--brand)}
.fcd-banner{margin:0 0 14px;padding:10px 13px;border-radius:15px;background:#0a0a0a;color:#fff;display:flex;align-items:center;gap:10px;border:1px solid #242424}.fcd-banner img{width:30px;height:30px;object-fit:contain;background:#fff;border-radius:8px;padding:2px}.fcd-banner b{font-size:11px;letter-spacing:.02em}.fcd-banner span{display:block;color:#aaa;font-size:9px;margin-top:2px}.fcd-official{margin-top:8px;font-size:9px;color:#888}.fcd-official a{color:#e30613;font-weight:800;text-decoration:none}
@media(max-width:760px){.topin{padding:8px 10px}.brand small{font-size:9px}.crest{width:40px;height:40px}.fcd-banner{margin-bottom:10px}}
`;
 document.head.appendChild(s);
 const main=document.querySelector('.main');
 if(main&&!document.getElementById('fcd-banner')){const b=document.createElement('div');b.id='fcd-banner';b.className='fcd-banner';b.innerHTML='<img src="'+FCD_LOGO+'" alt="FC Déifferdeng 03"><div><b>FC DÉIFFERDENG 03</b><span>ClubGest · Formação · U7 · U9 · U11</span><div class="fcd-official">Identidade do clube · <a href="https://www.fcd03.lu/" target="_blank" rel="noopener">site oficial fcd03.lu</a></div></div>';main.prepend(b)}
 const brand=document.querySelector('.brand');if(brand){const small=brand.querySelector('small');if(small)small.textContent='FC Déifferdeng 03 · Formação U7 · U9 · U11'}
 roleUI();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
setInterval(roleUI,1000);
})();
