import { Resend } from 'resend';
import { handleEnquiry } from '../../server/enquiry.js';
export default request => handleEnquiry(request, {send: message => new Resend(process.env.RESEND_API_KEY).emails.send(message)});
