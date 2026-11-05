import Link from 'next/link';
import Image from './SiteImage';
import { ArrowUpRight, ArrowUp, Cpu, Layers3, DatabaseZap, MapPin } from 'lucide-react';
import SiteNavigation from './SiteNavigation';
import ProfessorPage from './ProfessorPage';
import ResearchersPage from './ResearchersPage';
import ResearchPage from './ResearchPage';
import PublicationsPage from './PublicationsPage';
import ContactPage from './ContactPage';
import NewsPage from './NewsPage';
import AlumniPage from './AlumniPage';
import AnimatedHeroLogo from './AnimatedHeroLogo';
import type { Site } from '@/lib/site';

const svgs=[Cpu,Layers3,DatabaseZap];
function Title({eyebrow,title,sub}: {eyebrow:string;title:string;sub?:string}) {return <div className="section-intro"><span className="eyebrow dark-eyebrow"><span className="tiny-square"/>{eyebrow}</span><h2>{title}</h2>{sub&&<p>{sub}</p>}</div>}
export function Shell({site,children}:{site:Site;children:React.ReactNode}){
 const theme=site.theme;
 const vars={'--accent':theme.accent,'--dark':theme.background,'--body-size':theme.bodySize+'px','--heading-scale':theme.headingScale.toString(),'--rad':theme.radius+'px','--section-gap':theme.sectionSpacing+'px','--font-body':theme.font==='Georgia'?'Georgia,serif':`"${theme.font}",Arial,sans-serif`} as React.CSSProperties;
 return <div className="site-shell" style={vars} id="top">
 <a className="skip-link" href="#main-content">Skip to content</a>
 <SiteNavigation visibility={site.visibility}/>
 <main id="main-content">{children}</main>
 <footer className="site-footer"><div className="site-footer-grid">
   <div className="footer-identity"><Link href="/" aria-label="AI-SoC Laboratory home"><Image src="/aisoc-logo.png" alt="AI-SoC Laboratory" width={2048} height={682} sizes="(max-width: 760px) 300px, 380px"/></Link><p>Computing systems for<br/>next-generation intelligence.</p></div>
   <div className="footer-column"><h2>Visit</h2><address>Room 422, Building 18<br/>1 Gwanak-ro, Gwanak-gu<br/>Seoul 08826, Republic of Korea</address><a className="footer-map" href="https://www.google.com/maps/search/?api=1&query=Seoul+National+University+Building+18" target="_blank" rel="noopener noreferrer">Open map <MapPin size={17}/></a></div>
   <div className="footer-column"><h2>Contact</h2><a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a><a href="tel:+8228808476">+82 2 880 8476</a></div>
   <nav className="footer-column footer-navigation" aria-label="Footer navigation"><h2>Navigate</h2>{site.visibility.research&&<Link href="/research">Research</Link>}{site.visibility.people&&<><Link href="/people?group=professor">Professor</Link><Link href="/people?group=researchers">Researchers</Link></>}{site.visibility.contact&&<Link href="/contact">Contact</Link>}</nav>
 </div><div className="site-footer-bottom"><span>© {new Date().getFullYear()} AI SOC LABORATORY, SEOUL NATIONAL UNIVERSITY.</span><a href="#top">Back to top <ArrowUp size={17}/></a></div></footer>
 </div>;
}
export function Hero({site}:{site:Site}) {return <><section className="landing-hero" aria-labelledby="home-title"><h1 id="home-title" className="visually-hidden">{site.siteName} — Artificial Intelligence System on Chip Laboratory</h1><AnimatedHeroLogo/></section><div className="hero-info-strip" aria-label="Laboratory affiliation and location"><span>Department of Electrical & Computer Engineering</span><span>Seoul National University <span className="hero-info-divider" aria-hidden="true">·</span> Seoul, Korea</span><span className="hero-info-coordinates">37.459° N / 126.952° E</span></div></>}

export function Announcements({site}:{site:Site}) {
 return <section className="announcements" aria-labelledby="announcement-title"><div className="announcement-heading"><span className="announcement-eyebrow">News & opportunities</span><h2 id="announcement-title">Announcements</h2></div><ul className="announcement-list">{site.news.length ? site.news.map(item => <li key={item.id}><span className="announcement-bullet" aria-hidden="true"/><div className="announcement-copy"><div className="announcement-meta"><span>{item.category}</span><span className="announcement-date">{item.date}</span></div><h3>{item.link ? <a className="announcement-title" href={item.link}><span>{item.title}</span><span className="announcement-link-icon"><ArrowUpRight size={21} aria-hidden="true"/></span></a> : <span className="announcement-title">{item.title}</span>}</h3>{item.description&&<p>{item.description}</p>}</div></li>) : <li><span className="announcement-bullet" aria-hidden="true"/><p className="announcement-empty">There are no announcements at the moment.</p></li>}</ul></section>;
}
export function AboutSection({site}:{site:Site}){return <section className="about-section" id="about"><div className="container about-layout"><div><span className="eyebrow"><span className="tiny-square"/> ABOUT OUR LAB</span><h2>{site.aboutTitle}</h2></div><div className="about-copy"><p>{site.aboutDescription}</p><Link href="/about" className="inline-link">Our approach <ArrowUpRight size={18}/></Link></div></div><div className="container stats-strip"><div><span>01</span><p>Algorithms &<br/>Applications</p></div><div className="stats-arrow">→</div><div><span>02</span><p>Architecture &<br/>Microarchitecture</p></div><div className="stats-arrow">→</div><div><span>03</span><p>VLSI &<br/>Silicon Systems</p></div></div></section>}
export function ResearchSection({site, full=false}:{site:Site;full?:boolean}){return <section className="research-section"><div className="container"><div className="section-head"><Title eyebrow="OUR RESEARCH" title="Ideas engineered to scale." sub="Exploring the intersection of AI algorithms, computing architecture, and VLSI design."/>{!full&&<Link href="/research" className="inline-link">View all research <ArrowUpRight size={18}/></Link>}</div><div className="research-grid">{site.research.map((r,i)=>{const Icon=svgs[i%svgs.length];return <article className="research-card" key={r.id}><div className="research-card-top"><span>{r.number||String(i+1).padStart(2,'0')} / RESEARCH AREA</span><Icon size={27} strokeWidth={1.4}/></div><div className="research-visual"><div className={`research-graphic graphic-${i%3}`}><span/><span/><span/></div></div><div className="research-card-body"><h3>{r.title}</h3><p className="research-subtitle">{r.subtitle}</p><p>{r.description}</p><div className="tag-list">{r.tags.map(t=><span key={t}>{t}</span>)}</div></div></article>})}</div></div></section>}
export function NewsSection({site,full=false}:{site:Site;full?:boolean}){return <section className="news-section"><div className="container"><div className="section-head"><Title eyebrow="LATEST UPDATES" title="From the lab."/>{!full&&<Link href="/news" className="inline-link">All updates <ArrowUpRight size={18}/></Link>}</div><div className="news-list">{site.news.length?site.news.map(n=><a key={n.id} href={n.link||'#'} className="news-item"><span className="news-date">{n.date}</span><span className="news-summary"><span className="news-category">{n.category}</span><strong>{n.title}</strong><small>{n.description}</small></span><span className="news-icon"><ArrowUpRight size={21}/></span></a>):<div className="empty-content">New updates will appear here.</div>}</div></div></section>}
export function JoinSection({site}:{site:Site}){return <section className="join-section"><div className="container join-content"><div><span className="eyebrow"><span className="tiny-square"/> JOIN AI-SoC</span><h2>Great ideas need<br/><em>great minds.</em></h2><p>{site.recruitingText}</p></div><a href={`mailto:${site.contactEmail}`} className="join-action">Get in touch <ArrowUpRight size={22}/></a></div><div className="join-ornament">AI</div></section>}
export function Home({site}:{site:Site}){return <Shell site={site}><div className="landing-page"><Hero site={site}/>{site.visibility.news&&<Announcements site={site}/>}</div></Shell>}
export function InnerPage({site,slug,group,publicationType}:{site:Site;slug:string;group?:string;publicationType?:string}){
 if(slug==='news')return <Shell site={site}><NewsPage site={site}/></Shell>;
 if(slug==='people'&&group==='alumni')return <Shell site={site}><AlumniPage site={site}/></Shell>;
 if(slug==='contact')return <Shell site={site}><ContactPage site={site}/></Shell>;
 if(slug==='publications')return <Shell site={site}><PublicationsPage site={site} selectedType={publicationType}/></Shell>;
 if(slug==='research')return <Shell site={site}><ResearchPage site={site}/></Shell>;
 if(slug==='people'&&group==='professor')return <Shell site={site}><ProfessorPage/></Shell>;
 if(slug==='people'&&group==='researchers')return <Shell site={site}><ResearchersPage/></Shell>;
 const memberGroups:Record<string,string>={professor:'Professor',researchers:'Researchers',alumni:'Alumni'};
 const memberTitle=group&&memberGroups[group]||'Meet the team.';
 const isProfessor=(role:string)=>/professor|faculty/i.test(role);
 const isAlumni=(role:string)=>/alumn|former|graduated/i.test(role);
 const people=site.people.filter(person=>!group||!memberGroups[group]||(group==='professor'?isProfessor(person.role)&&!isAlumni(person.role):group==='alumni'?isAlumni(person.role):!isProfessor(person.role)&&!isAlumni(person.role)));
 const labels:Record<string,[string,string,string]>={
 about:['THE LAB','Thinking beyond the model.','Our philosophy, approach, and motivation.'],
 research:['RESEARCH','Research at the frontier.','Computing systems for the next wave of intelligent applications.'],
 people:['OUR TEAM','The people behind the silicon.','A collaborative environment for curious engineers.'],
 publications:['PUBLICATIONS','Ideas worth sharing.','Our research contributions and scholarly publications.'],
 news:['UPDATES','News & announcements.','Stay connected with the AI-SoC Laboratory.'],
 contact:['CONTACT','Let’s build what’s next.','Connect with our lab at Seoul National University.']};
 const [eyebrow,heading,desc]=labels[slug]||labels.about;
 return <Shell site={site}><section className="inner-hero"><div className="container"><span className="eyebrow"><span className="tiny-square"/>{eyebrow}</span><h1>{heading}</h1><p>{desc}</p><div className="inner-deco"><div/><div/><div/></div></div></section>
 {slug==='about'&&<><AboutSection site={site}/><section className="quote-section"><div className="container"><span>OUR PHILOSOPHY</span><blockquote>“{site.missionQuote}”</blockquote><p>Co-designing across the full computing stack.</p></div></section></>}
 {slug==='research'&&<ResearchSection site={site} full/>}
 {slug==='people'&&<section className="listing-section"><div className="container"><Title eyebrow="PEOPLE" title={memberTitle}/><div className="people-grid">{people.length?people.map(p=><article className="person-card" key={p.id}><div className="person-avatar">{p.image?<img src={p.image} alt={p.name}/>:p.name.slice(0,1)}</div><div><span>{p.role}</span><h3>{p.name}</h3><p>{p.description}</p>{p.link&&<a href={p.link}>More <ArrowUpRight size={14}/></a>}</div></article>):<div className="empty-content">Team profiles will be published here soon.</div>}</div></div></section>}
 </Shell>
}
