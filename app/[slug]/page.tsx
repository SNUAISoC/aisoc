import {notFound} from 'next/navigation';
import {getSite} from '@/lib/site';
import {InnerPage} from '@/components/PublicSite';
export const dynamic='force-dynamic';
const allowed=['about','research','people','publications','news','contact'];
export default async function Page({params,searchParams}:{params:Promise<{slug:string}>;searchParams:Promise<{group?:string;type?:string}>}){const {slug}=await params;if(!allowed.includes(slug))notFound();const site=getSite();if(!site.visibility[slug as keyof typeof site.visibility])notFound();const {group,type}=await searchParams;return <InnerPage site={site} slug={slug} group={group} publicationType={type}/>}
