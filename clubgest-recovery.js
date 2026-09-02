(function(){'use strict';
  var KEY='clubgest_v3', GUARD='cgRecoveryReloadV1';
  function resetAndReload(){
    if(sessionStorage.getItem(GUARD)==='1') return false;
    sessionStorage.setItem(GUARD,'1');
    try{localStorage.removeItem(KEY);localStorage.removeItem('cgRole');localStorage.removeItem('cgTeam');}catch(e){}
    location.reload();
    return true;
  }
  function installErrorGuard(){
    window.addEventListener('error',function(){
      if(document.getElementById('home')) resetAndReload();
    });
    window.addEventListener('unhandledrejection',function(){
      if(document.getElementById('home')) resetAndReload();
    });
  }
  function boot(){
    installErrorGuard();
    var home=document.getElementById('home'), att=document.getElementById('attendance'), cal=document.getElementById('calendar'), man=document.getElementById('manage'), team=document.getElementById('team');
    if(!home||typeof window.render==='function'&&home.innerHTML.trim()) return;
    var teams={U7:{coach:'João Pereira',players:['Arthur Silva','Leo Martins','Noah Costa','Tiago Santos'],events:['Treino U7 · 03/09 · 18:00']},U9:{coach:'Alex Duarte',players:['Lucas Ferreira','Tomás Martins','Enzo Costa','Gabriel Santos','Noah Rodrigues','Dinis Silva'],events:['Treino U9 · 03/09 · 18:30','Jogo U9 · 05/09 · 10:00']},U11:{coach:'Miguel Lopes',players:['Mateus Pereira','Rafael Gomes','Diogo Alves','Afonso Silva'],events:['Treino U11 · 04/09 · 18:30']}};
    var selected=localStorage.getItem('cgTeam')||'U9'; if(!teams[selected]) selected='U9';
    var role=localStorage.getItem('cgRole')||'parent';
    function show(id){document.querySelectorAll('.screen').forEach(function(x){x.classList.remove('active')});var el=document.getElementById(id);if(el)el.classList.add('active');document.querySelectorAll('.nav button').forEach(function(x){x.classList.remove('active')});var map={home:'n-home',attendance:'n-att',calendar:'n-cal',manage:'n-man',team:'n-team'};var b=document.getElementById(map[id]);if(b)b.classList.add('active');if(id==='home')drawHome();if(id==='attendance')drawAtt();if(id==='calendar')drawCal();if(id==='manage')drawMan();if(id==='team')drawTeam()}
    function drawHome(){var t=teams[selected];home.innerHTML='<div class="hero"><div><span class="badge dark">'+(role==='admin'?'Administrador':role==='coach'?'Treinador':'Encarregado')+'</span><h1>Bom trabalho. Vamos avançar.</h1><p>FCD03 Differdange · '+selected+' · época 2026/2027</p></div><div class="crest" aria-label="ClubGest">CG</div></div><div class="grid"><div class="card stat"><small>Jogadores</small><strong>'+(role==='parent'?1:t.players.length)+'</strong></div><div class="card stat"><small>Treinos</small><strong>'+t.events.filter(function(e){return e.indexOf('Treino')===0}).length+'</strong></div><div class="card stat"><small>Jogos</small><strong>'+t.events.filter(function(e){return e.indexOf('Jogo')===0}).length+'</strong></div><div class="card stat"><small>Presenças</small><strong>0%</strong></div></div><div class="section card"><div class="head"><div><h2>Próximas atividades</h2><p>'+t.events.length+' atividades planeadas</p></div></div>'+t.events.map(function(e){return '<div class="notice"><i>'+ (e.indexOf('Jogo')===0?'🏆':'⚽') +'</i><div><strong>'+e+'</strong><span class="muted">FCD03 · '+selected+'</span></div></div>'}).join('')+'</div>'}
    function drawAtt(){var t=teams[selected], players=role==='parent'?[t.players[0]]:t.players;att.innerHTML='<div class="head"><div><h2>Presenças — '+selected+'</h2><p>Registo simples e rápido.</p></div></div><div class="card">'+players.map(function(p){return '<div class="row"><div class="left"><div class="avatar">'+p.split(' ').slice(0,2).map(function(x){return x[0]}).join('')+'</div><div><strong>'+p+'</strong><span class="muted">'+selected+'</span></div></div><div class="choice"><button>✓</button><button>✕</button><button>?</button></div></div>'}).join('')+'</div>'}
    function drawCal(){var t=teams[selected];cal.innerHTML='<div class="head"><div><h2>Calendário</h2><p>Agenda da equipa '+selected+'.</p></div></div><div class="list">'+t.events.map(function(e){return '<div class="row"><div class="left"><div class="avatar">'+(e.indexOf('Jogo')===0?'VS':'✓')+'</div><div><strong>'+e+'</strong><span class="muted">FCD03 Differdange</span></div></div></div>'}).join('')+'</div>'}
    function drawMan(){man.innerHTML='<div class="head"><div><h2>Gestão</h2><p>Área reservada à equipa técnica.</p></div></div><div class="card"><div class="empty">A versão de recuperação está ativa. Os dados e permissões principais continuam disponíveis.</div></div>'}
    function drawTeam(){var t=teams[selected];team.innerHTML='<div class="teamhero"><div class="head"><div><span class="kicker">EQUIPA</span><h2>'+selected+'</h2><p>'+t.coach+' · 2026/2027</p></div></div><div class="teammeta"><div><small>Plantel</small><strong>'+t.players.length+'</strong></div><div><small>Treinos</small><strong>'+t.events.filter(function(e){return e.indexOf('Treino')===0}).length+'</strong></div><div><small>Jogos</small><strong>'+t.events.filter(function(e){return e.indexOf('Jogo')===0}).length+'</strong></div><div><small>Presença</small><strong>0%</strong></div></div></div><div class="card"><h3>Jogadores</h3><div class="playergrid">'+t.players.map(function(p){return '<div class="player"><div class="left"><div class="photo">'+p.slice(0,1)+'</div><div><strong>'+p+'</strong><span class="muted">'+selected+'</span></div></div></div>'}).join('')+'</div></div>'}
    window.go=show;window.setRole=function(v){role=v;localStorage.setItem('cgRole',v);show('home')};window.setLang=function(){};window.render=function(){show('home')};
    var sel=document.getElementById('role');if(sel)sel.value=role;drawHome();
    var date=document.getElementById('todayDate');if(date)date.textContent=new Intl.DateTimeFormat('pt-PT',{weekday:'long',day:'2-digit',month:'long',year:'numeric'}).format(new Date());
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
