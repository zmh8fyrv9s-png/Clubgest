(function(){
'use strict';
function boot(){
 if(document.getElementById('fcd03-theme'))return;
 const s=document.createElement('style');s.id='fcd03-theme';s.textContent=`
:root{--ink:#111;--muted:#667085;--line:#e6e6e6;--soft:#f5f5f5;--dark:#090909;--brand:#fd0200;--brand2:#b90000;--white:#fff;--radius:20px}
body{background:linear-gradient(180deg,#f7f7f7 0,#fff 35%,#f4f4f4 100%)}
.top{background:rgba(8,8,8,.96);border-bottom:2px solid var(--brand);color:#fff}.topin{max-width:1240px;padding:10px 18px}.brand{color:#fff}.brand small{color:#bdbdbd}.crest{background:#fff!important;color:#111!important;border:2px solid var(--brand);box-shadow:0 8px 22px #fd020033}.brand .crest{font-size:0;background:#fff url('https://upload.wikimedia.org/wikipedia/commons/8/8b/Logo_fcd_grand.svg') center/contain no-repeat!important}
.select{background:#171717;color:#fff;border-color:#3b3b3b}.main{max-width:1240px}.today{border-left:4px solid var(--brand);box-shadow:0 8px 25px #1111110d}.badge.red{background:#ffe9e9;color:#a40000}.badge.dark{background:#090909}.btn.red{background:linear-gradient(135deg,#fd0200,#b90000);box-shadow:0 7px 16px #fd020026}.btn.green{background:#171717}.hero{background:radial-gradient(circle at 90% 10%,#4b0000 0,#111 42%,#080808 100%);border:1px solid #2a2a2a;box-shadow:0 18px 40px #00000024}.hero .crest{background:#fff url('https://upload.wikimedia.org/wikipedia/commons/8/8b/Logo_fcd_grand.svg') center/contain no-repeat!important;color:transparent}.card{box-shadow:0 8px 26px #1111110d}.stat strong{color:#111}.section .head h2,.section .head h3{position:relative}.section .head h2:before,.section .head h3:before{content:'';display:inline-block;width:5px;height:20px;background:var(--brand);border-radius:9px;margin-right:8px;vertical-align:-3px}.nav{background:rgba(8,8,8,.97);border-top:2px solid var(--brand)}.nav button{color:#bdbdbd}.nav button.active{background:var(--brand);color:#fff;box-shadow:0 5px 18px #fd020044}.avatar{background:#111;color:#fff;border:2px solid #fff;box-shadow:0 0 0 2px #fd0200}.progress i{background:var(--brand)}.tabs button.active{background:#111}.choice button.yes.active{background:#111}.choice button.no.active{background:var(--brand)}
.fcd-banner{margin:0 0 14px;padding:10px 13px;border-radius:15px;background:#0a0a0a;color:#fff;display:flex;align-items:center;gap:10px;border:1px solid #242424}.fcd-banner img{width:30px;height:30px;object-fit:contain;background:#fff;border-radius:8px;padding:2px}.fcd-banner b{font-size:11px}.fcd-banner span{display:block;color:#aaa;font-size:9px;margin-top:2px}
@media(max-width:760px){.topin{padding:8px 10px}.brand small{font-size:9px}.crest{width:40px;height:40px}.fcd-banner{margin-bottom:10px}}
`;
 document.head.appendChild(s);
 const main=document.querySelector('.main');
 if(main&&!document.getElementById('fcd-banner')){const b=document.createElement('div');b.id='fcd-banner';b.className='fcd-banner';b.innerHTML='<img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Logo_fcd_grand.svg"><div><b>FC DÉIFFERDENG 03</b><span>ClubGest · Formação · U7 · U9 · U11</span></div>';main.prepend(b)}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
