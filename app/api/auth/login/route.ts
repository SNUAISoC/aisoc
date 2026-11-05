import { NextResponse } from 'next/server';
import { configured, passwordMatches, makeToken, cookieName } from '@/lib/auth';
export async function POST(req:Request){
 if(!configured())return NextResponse.json({error:'Admin credentials are not configured. See README.'},{status:503});
 const body=await req.json().catch(()=>({}));
 if(typeof body.password!=='string'||!passwordMatches(body.password))return NextResponse.json({error:'Incorrect password'},{status:401});
 const res=NextResponse.json({ok:true});res.cookies.set(cookieName,makeToken(),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:60*60*12});return res;
}
