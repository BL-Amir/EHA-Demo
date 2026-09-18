import test from 'node:test';
import assert from 'node:assert/strict';
import { handleEnquiry } from './enquiry.js';
const env={ENQUIRY_ENABLED:'true',RESEND_API_KEY:'mock',ENQUIRY_FROM:'sender@example.com',ENQUIRY_TO:'recipient@example.com',RECAPTCHA_SECRET_KEY:'mock',RECAPTCHA_HOSTNAMES:'example.com'};
const valid=()=>({success:true,action:'enquiry',hostname:'example.com',score:.9,challenge_ts:new Date().toISOString()});
for(const [name,change,status] of [
 ['accepted',()=>{},200],['rejected',r=>r.success=false,403],['wrong action',r=>r.action='login',403],
 ['wrong hostname',r=>r.hostname='other.com',403],['low score',r=>r.score=.1,403],
 ['missing score',r=>delete r.score,403],['expired',r=>r.challenge_ts='2020-01-01',403],
 ['missing token',()=>{},400],['missing secret',()=>{},503],['network failure',()=>{},503],['provider failure',()=>{},502]
]) test(name,async()=>{
 let sends=0;const result=valid();change(result);
 const response=await handleEnquiry(new Request('https://example.com/enquiry',{method:'POST',body:JSON.stringify({name:'Test',email:'test@example.com',message:'A project',recaptchaToken:name==='missing token'?'':'token'})}),{
 env:{...env,...(name==='missing secret'?{RECAPTCHA_SECRET_KEY:''}:{})},
 fetcher:async()=>{if(name==='network failure')throw Error('offline');return Response.json(result)},
 send:async()=>{sends++;return name==='provider failure'?{error:{message:'rejected'}}:{data:{id:'mock'}}}
 });
 assert.equal(response.status,status);assert.equal(sends,status===200||name==='provider failure'?1:0);
});
