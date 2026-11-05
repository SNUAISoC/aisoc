import Image from './SiteImage';
import { assetPath } from '@/lib/asset-path';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import type { Site } from '@/lib/site';

const scales = [
  { number: '01', label: 'Device', detail: 'On-device applications' },
  { number: '02', label: 'System', detail: 'Board-level integration' },
  { number: '03', label: 'Silicon', detail: 'AI acceleration' },
];

export default function ResearchPage({ site }: { site: Site }) {
  const area = site.research.find(item => item.id === 'soc');

  return <div className="professor-page research-overview-page">
    <div className="professor-container">
      <header className="professor-heading">
        <span className="professor-eyebrow"><span aria-hidden="true" />Our research</span>
        <h1>Research</h1>
      </header>
      <section className="soc-research" aria-labelledby="soc-research-title">
        <div className="soc-research-heading">
          <h2 id="soc-research-title"><span aria-hidden="true" />{area?.title || 'AI System-on-Chip'}</h2>
          <a href={assetPath('/research/ai-soc-overview-v2.png')} target="_blank" rel="noopener noreferrer" className="soc-image-link">View full image <ArrowUpRight size={15} aria-hidden="true" /><span className="visually-hidden"> (opens in a new tab)</span></a>
        </div>
        <figure className="soc-research-figure">
          <div className="soc-research-image">
            <Image src="/research/ai-soc-overview-v2.png" alt="Reference illustration: a smartphone, its internal board, and an enlarged semiconductor die with the AI accelerator highlighted, connected by dashed magnification lines." width={1947} height={808} priority sizes="(max-width: 700px) calc(100vw - 64px), (max-width: 1272px) calc(100vw - 176px), 1096px" />
          </div>
          <figcaption><div className="soc-research-scales">
            {scales.map(({ number, label, detail }, index) => <div className="soc-research-scale" key={number}>
              <span className="soc-scale-number">{number}</span><div><span className="soc-scale-label">{label}</span><p>{detail}</p></div>{index < scales.length - 1 && <MoveRight size={20} strokeWidth={1.4} className="soc-scale-arrow" aria-hidden="true" />}
            </div>)}
          </div><p className="soc-illustration-note">Device-to-silicon overview · Reference illustration</p></figcaption>
        </figure>
        {area?.description && <div className="soc-research-description"><span>{area.subtitle}</span><p>{area.description}</p></div>}
      </section>
    </div>
  </div>;
}
