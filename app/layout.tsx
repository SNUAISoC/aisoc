import './globals.css';
import './landing.css';
import './professor.css';
import './researchers.css';
import './research.css';
import './publications.css';
import './contact.css';
import './news.css';
import './alumni.css';
import './hero-logo.css';
import type { Metadata } from 'next';
export const metadata:Metadata={title:{default:'AI-SoC Laboratory | Seoul National University',template:'%s | AI-SoC Laboratory'},description:'AI-SoC Laboratory at Seoul National University. Research in AI accelerators, System-on-Chip, VLSI and processing-in-memory.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
