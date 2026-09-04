(function(){
  'use strict';
  const SUPABASE_URL='https://zdgcxbcsnlwrzhtlklih.supabase.co';
  const SUPABASE_KEY='sb_publishable_tchykrPPHUj9Yu8kx6M6Xxg_u-y6_Us9';
  function token(){
    try{
      const direct=localStorage.getItem('sb-access-token');
      if(direct)return direct;
      for(const k of Object.keys(localStorage)){
        if(!k.startsWith('sb-')||!k.endsWith('-auth-token'))continue;
        const raw=JSON.parse(localStorage.getItem(k)||'null');
        if(raw?.access_token)return raw.access_token;
      }
    }catch(e){}
    return SUPABASE_KEY;
  }
  async function api(path,options={}){
    const headers={apikey:SUPABASE_KEY,Authorization:'Bearer '+token(),'Content-Type':'application/json',...(options.headers||{})};
    const r=await fetch(SUPABASE_URL+'/rest/v1/'+path,{...options,headers});
    if(!r.ok){let detail='';try{detail=await r.text()}catch(e){};throw new Error('ClubGestData '+r.status+(detail?' · '+detail:''));}
    if(r.status===204)return null;
    return r.json();
  }
  window.ClubGestData={
    club:()=>api('clubs?select=id,name,city,country&limit=1'),
    teams:()=>api('teams?select=id,club_id,name,season&order=name'),
    players:(teamId)=>api('players?select=id,club_id,team_id,full_name,birth_date,active&team_id=eq.'+encodeURIComponent(teamId)+'&active=eq.true&order=full_name'),
    sessions:(teamId)=>api('training_sessions?select=id,club_id,team_id,starts_at,location,notes&team_id=eq.'+encodeURIComponent(teamId)+'&order=starts_at.asc'),
    attendance:(trainingId)=>api('attendance?select=training_id,player_id,status,updated_at&training_id=eq.'+encodeURIComponent(trainingId)),
    saveAttendance:(trainingId,playerId,status)=>api('attendance?on_conflict=training_id,player_id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify({training_id:trainingId,player_id:playerId,status,updated_at:new Date().toISOString()})}),
    createSession:(payload)=>api('training_sessions',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(payload)}),
    updatePlayer:(id,payload)=>api('players?id=eq.'+encodeURIComponent(id),{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify(payload)})
  };
  const load=()=>{if(document.getElementById('cg-u9-complete-script'))return;const s=document.createElement('script');s.id='cg-u9-complete-script';s.src='/u9-complete.js?v=1';s.async=true;document.head.appendChild(s)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load);else load();
})();
