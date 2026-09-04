const SB_URL='https://zdgcxbcsnlwrzhtlklih.supabase.co';
const SB_KEY='sb_publishable_tchykrPPHUj9Yu8kx6M6Xxg_u-y6_Us9';
const CLUB_ID='f7ba0680-d3b5-4064-8e6e-92ee4a85ccbf';
const DEMO_UIDS={parent:'00000000-0000-0000-0000-000000000001',coach:'00000000-0000-0000-0000-000000000002',admin:'00000000-0000-0000-0000-000000000003'};
function headers(){return {'apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY,'Content-Type':'application/json'}}
module.exports=async function(req,res){
  try{
    if(req.method==='GET'){
      const r=await fetch(SB_URL+'/rest/v1/chat_messages?select=id,sender_profile_id,sender_name,body,created_at&club_id=eq.'+CLUB_ID+'&order=created_at.asc&limit=100',{headers:headers()});
      const text=await r.text();res.status(r.status).setHeader('Cache-Control','no-store').send(text);return;
    }
    if(req.method!=='POST'){res.status(405).send('Method not allowed');return}
    const b=req.body||{};const sender=b.sender||'';const role=b.role||'';const name=String(b.sender_name||'').slice(0,120);const body=String(b.body||'').trim().slice(0,2000);
    const expected=DEMO_UIDS[role];
    if(!expected||sender!==expected||!body){res.status(400).json({error:'invalid chat data'});return}
    const r=await fetch(SB_URL+'/rest/v1/rpc/cg_beta_chat_insert',{method:'POST',headers:headers(),body:JSON.stringify({p_sender:sender,p_sender_name:name,p_body:body})});
    const text=await r.text();res.status(r.status).setHeader('Cache-Control','no-store').send(text);
  }catch(e){res.status(500).json({error:'chat proxy failed'});}
};
