import fs from 'node:fs';
import path from 'node:path';

export type Research = { id:string; number:string; title:string; subtitle:string; description:string; tags:string[] };
export type News = { id:string; date:string; category:string; title:string; description:string; link:string };
export type Person = { id:string; name:string; role:string; description:string; image?:string; link?:string; degree?:string; graduationYear?:string; affiliation?:string };
export type Publication = { id:string; year:string; title:string; authors:string; venue:string; link:string; type?:'conference'|'journal'; note?:string; sourceUrl?:string };
export type Site = {
 siteName:string; heroEyebrow:string; heroTitle:string; heroDescription:string; aboutTitle:string; aboutDescription:string; missionQuote:string;
 research:Research[]; news:News[]; people:Person[]; publications:Publication[];
 contactEmail:string; contactName:string; contactInstitution:string; recruitingText:string;
 theme:{accent:string;background:string;font:string;bodySize:number;headingScale:number;radius:number;sectionSpacing:number};
 visibility:Record<'about'|'research'|'news'|'people'|'publications'|'contact',boolean>;
};
const dataPath=path.join(process.cwd(),'data','site.json');
export function getSite():Site {return JSON.parse(fs.readFileSync(dataPath,'utf8')) as Site;}
export function saveSite(data:Site){const temp=dataPath+'.tmp';fs.writeFileSync(temp,JSON.stringify(data,null,2)+'\n','utf8');fs.renameSync(temp,dataPath);}
export function validSite(x:unknown): x is Site {
 if(!x || typeof x!=='object')return false;
 const v=x as Partial<Site>;
 const strings=['siteName','heroEyebrow','heroTitle','heroDescription','aboutTitle','aboutDescription','missionQuote','contactEmail','contactName','contactInstitution','recruitingText'];
 if(!strings.every(k=>typeof (v as any)[k]==='string' && (v as any)[k].length<=5000))return false;
 if(!Array.isArray(v.research)||!Array.isArray(v.news)||!Array.isArray(v.people)||!Array.isArray(v.publications))return false;
 if([v.research,v.news,v.people,v.publications].some(a=>a.length>100))return false;
 if(!v.publications.every(p=>p&&typeof p==='object'&&['id','year','title','authors','venue','link'].every(key=>typeof (p as any)[key]==='string')&&(p.type===undefined||p.type==='conference'||p.type==='journal')&&(p.note===undefined||typeof p.note==='string')&&(p.sourceUrl===undefined||typeof p.sourceUrl==='string')))return false;
 if(!v.theme||!v.visibility)return false;
 if(!/^#[\da-fA-F]{6}$/.test(v.theme.accent)||!/^#[\da-fA-F]{6}$/.test(v.theme.background))return false;
 if(!['Inter','Manrope','Space Grotesk','Georgia','Arial'].includes(v.theme.font))return false;
 if(!Number.isFinite(v.theme.bodySize)||v.theme.bodySize<12||v.theme.bodySize>22)return false;
 if(!Number.isFinite(v.theme.headingScale)||v.theme.headingScale<0.7||v.theme.headingScale>1.5)return false;
 if(!Number.isFinite(v.theme.radius)||v.theme.radius<0||v.theme.radius>40)return false;
 if(!Number.isFinite(v.theme.sectionSpacing)||v.theme.sectionSpacing<40||v.theme.sectionSpacing>160)return false;
 return true;
}
