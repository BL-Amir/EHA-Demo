import { getEnquiryToken } from './recaptcha';
const live = import.meta.env.VITE_ENQUIRY_LIVE === 'true';
export const confirmationTitle = live ? 'Thank you â€” your enquiry is on its way.' : 'Demo enquiry complete. Nothing has been sent.';
export async function submitEnquiry(values) {
 if(!live){await new Promise(resolve=>setTimeout(resolve,700));return;}
 const recaptchaToken = await getEnquiryToken();
 const response=await fetch('/.netlify/functions/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...values, recaptchaToken})});
 const data=await response.json();
 if(!response.ok||data.status!=='sent')throw new Error('Enquiry was not sent');
}
