import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
const cookieName='aisoc_admin';
export function configured(){return Boolean(process.env.ADMIN_PASSWORD && process.env.SESSION_SECRET && process.env.ADMIN_PASSWORD!=='REPLACE_WITH_A_STRONG_PASSWORD' && process.env.SESSION_SECRET.length>=32);}
function sig(message:string){return createHmac('sha256',process.env.SESSION_SECRET||'').update(message).digest('hex');}
export function makeToken(){const exp=(Date.now()+1000*60*60*12).toString();return `${exp}.${sig(exp)}`;}
export async function authenticated(){if(!configured())return false;const token=(await cookies()).get(cookieName)?.value||'';const [exp,signature]=token.split('.');if(!exp||!signature||!/^\d+$/.test(exp)||Number(exp)<Date.now())return false;const expected=sig(exp);return signature.length===expected.length && timingSafeEqual(Buffer.from(signature),Buffer.from(expected));}
export function passwordMatches(pwd:string){const expected=process.env.ADMIN_PASSWORD||'';if(!configured())return false;const a=Buffer.from(pwd);const b=Buffer.from(expected);return a.length===b.length && timingSafeEqual(a,b);}
export {cookieName};
