(function(){
  const SUPABASE_URL='https://zdgcxbcsnlwrzhtlklih.supabase.co';
  const SUPABASE_KEY='sb_publishable_tchykrPPHUj9Yu8kxM6Xxg_u-y6_Us9';
  const api=(path,body)=>fetch(SUPABASE_URL+'/rest/v1/'+path,{method:body?'POST':'GET',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined}).then(r=>r.ok?r.json():Promise.reject(r));
  window.ClubGestData={
    teams:()=>api('teams?select=id,name,season&order=name'),
    players:(teamId)=>api('players?select=id,team_id,full_name,birth_date,active&team_id=eq.'+encodeURIComponent(teamId)+'&active=eq.true&order=full_name'),
    events:(teamId)=>api('training_events?select=id,team_id,title,event_type,starts_at,ends_at,location,notes&team_id=eq.'+encodeURIComponent(teamId)+'&order=starts_at.desc'),
    attendance:(eventId)=>api('attendance?select=id,event_id,player_id,status,updated_at&event_id=eq.'+encodeURIComponent(eventId))
  };
})();
