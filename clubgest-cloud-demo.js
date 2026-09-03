(function(){
'use strict';
const URL='https://zdgcxbcsnlwrzhtlklih.supabase.co/rest/v1/demo_state?id=eq.clubgest-demo';
const KEY='sb_publishable_tchykrPPHUj9Yu8kxM6Xxg_u-y6_Us9';
const LOCAL='clubgest_v3';
let pulling=false,saving=false,timer=0;
const rawSet=Storage.prototype.setItem;
function headers(extra){return Object.assign({apikey:KEY,Authorization:'Bearer '+KEY,'Content-Type':'application/json'},extra||{})}
async function pull(){if(pulling)return;pulling=true;try{const r=await fetch(URL+'&select=state,updated_at',{headers:headers()});if(!r.ok)return;const rows=await r.json();const remote=rows&&rows[0]&&rows[0].state;if(!remote||!remote.teams)return;let local=null;try{local=JSON.parse(localStorage.getItem(LOCAL)||'null')}catch(e){};const rt=rows[0].updated_at||'';if(local&&local.__cloudUpdatedAt&&new Date(local.__cloudUpdatedAt)>=new Date(rt))return;const selected=local&&local.selected&&remote.teams[local.selected]?local.selected:(remote.selected||'U9');remote.selected=selected;remote.__cloudUpdatedAt=rt;rawSet.call(localStorage,LOCAL,JSON.stringify(remote));if(typeof window.render==='function')window.render();else if(document.visibilityState!=='hidden')location.reload()}catch(e){}finally{pulling=false}}
async function push(value){if(saving)return;saving=true;try{const state=JSON.parse(value);delete state.__cloudUpdatedAt;delete state.selected;const r=await fetch(URL,{method:'PATCH',headers:headers({Prefer:'return=minimal'}),body:JSON.stringify({state,updated_at:new Date().toISOString()})});if(r.ok){const local=JSON.parse(value);local.__cloudUpdatedAt=new Date().toISOString();rawSet.call(localStorage,LOCAL,JSON.stringify(local))}}catch(e){}finally{saving=false}}
Storage.prototype.setItem=function(k,v){rawSet.call(this,k,v);if(this===localStorage&&k===LOCAL&&!pulling){clearTimeout(timer);timer=setTimeout(function(){push(v)},350)}};
async function boot(){await pull();setInterval(pull,5000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
