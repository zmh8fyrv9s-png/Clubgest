const SB_URL='https://zdgcxbcsnlwrzhtlklih.supabase.co';
const SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkZ2N4YmNzbmx3cnpodGxrbGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyOTcwNTcsImV4cCI6MjEwMzg3MzA1N30.5ON7VO8Up7-px12LksP6VBXFb2RgRo4mD41Lhdbfegg';
const CLUB_ID='f7ba0680-d3b5-4064-8e6e-92ee4a85ccbf';
function headers(){return {apikey:SB_KEY,Authorization:'Bearer '+SB_KEY,'Content-Type':'application/json'}}
module.exports=async function(req,res){try{
 if(req.method==='GET'){const r=await fetch(SB_URL+'/rest/v1/chat_messages?select=id,sender_profile_id,sender_name,body,created_at&club_id=eq.'+CLUB_ID+'&order=created_at.asc&limit=100',{headers:headers()});const text=await r.text();res.status(r.status).setHeader('Cache-Control','no-store').send(text);return}
 if(req.method!=='POST'){res.status(405).send('Method not allowed');return}
 const b=req.body||{},role=String(b.role||''),sender=String(b.sender||''),body=String(b.body||'').trim().slice(0,2000),name=String(b.sender_name||'').trim().slice(0,120);
 if(!['parent','coach','admin'].includes(role)||!sender||!name||!body){res.status(400).json({error:'invalid chat data'});return}
 const p=await fetch(SB_URL+'/rest/v1/beta_profiles?id=eq.'+encodeURIComponent(sender)+'&select=id,role,display_name&limit=1',{headers:headers()});const profiles=await p.json();if(!Array.isArray(profiles)||!profiles[0]||profiles[0].role!==role){res.status(403).json({error:'profile not registered'});return}
 const r=await fetch(SB_URL+'/rest/v1/rpc/cg_beta_chat_insert',{method:'POST',headers:headers(),body:JSON.stringify({p_sender:sender,p_sender_name:name,p_body:body})});const text=await r.text();if(!r.ok){res.status(r.status).setHeader('Cache-Control','no-store').send(text);return}
 await fetch(SB_URL+'/rest/v1/rpc/cg_beta_notification',{method:'POST',headers:headers(),body:JSON.stringify({p_actor:sender,p_type:'chat',p_title:'Nova mensagem no chat',p_body:name+': '+body.slice(0,140)})});res.status(200).setHeader('Cache-Control','no-store').send(text);
 }catch(e){res.status(500).json({error:'chat proxy failed'})}};