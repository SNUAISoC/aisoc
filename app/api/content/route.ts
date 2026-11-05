import { NextResponse } from 'next/server';
import { authenticated } from '@/lib/auth';
import { getSite, saveSite, validSite } from '@/lib/site';
import { revalidatePath } from 'next/cache';
export async function GET(){if(!await authenticated())return NextResponse.json({error:'Unauthorized'},{status:401});return NextResponse.json(getSite());}
export async function PUT(req:Request){
 if(!await authenticated())return NextResponse.json({error:'Unauthorized'},{status:401});
 const text=await req.text();if(text.length>250000)return NextResponse.json({error:'Payload too large'},{status:413});
 let json;try{json=JSON.parse(text)}catch{return NextResponse.json({error:'Invalid JSON'},{status:400})}
 if(!validSite(json))return NextResponse.json({error:'Invalid site content'},{status:400});
 try{saveSite(json)}catch{return NextResponse.json({error:'Could not save data. Check server write permissions.'},{status:500})}
 for(const p of ['/','/research','/people','/publications','/news','/contact','/about'])revalidatePath(p);
 return NextResponse.json({ok:true});
}
