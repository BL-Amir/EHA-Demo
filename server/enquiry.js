import { verifyRecaptcha } from './recaptcha.js';
export async function handleEnquiry(request, {env = process.env, send, fetcher = fetch} = {}) {
 const respond=(status,body)=>Response.json(body,{status});
 if(request.method!=='POST')return respond(405,{error:'Use POST'});
 let data;try{data=await request.json()}catch{return respond(400,{error:'Invalid JSON'})}
 if(!data||typeof data!=='object')return respond(400,{error:'Invalid enquiry'});
 if(data['bot-field'])return respond(400,{error:'Invalid enquiry'});
 for(const [key,max] of Object.entries({name:200,email:254,projectType:200,message:10000})) {
  if(data[key]!=null&&(typeof data[key]!=='string'||data[key].length>max))return respond(400,{error:'Invalid field'});
 }
 if(!data.name?.trim()||!data.message?.trim()||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email||''))return respond(400,{error:'Check required fields'});
 if(env.ENQUIRY_ENABLED!=='true'||!env.RESEND_API_KEY||!env.ENQUIRY_FROM||!env.ENQUIRY_TO)return respond(503,{error:'Enquiries are not connected'});
 const verification = await verifyRecaptcha(data.recaptchaToken, env, fetcher);
 if (verification) return respond(verification.status, {error: verification.error});
 try {
  const result=await send({from:env.ENQUIRY_FROM,to:env.ENQUIRY_TO,replyTo:data.email,subject:'Website enquiry',text:`Name: ${data.name}\nEmail: ${data.email}\nProject type: ${data.projectType||'Not specified'}\n\n${data.message}`});
  if(result.error||!result.data?.id)return respond(502,{error:'Unable to send enquiry'});
  return respond(200,{status:'sent'});
 }catch{return respond(502,{error:'Unable to send enquiry'})}
}
