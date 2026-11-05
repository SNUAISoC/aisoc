'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { getImageProps } from 'next/image';
import { assetPath } from '@/lib/asset-path';
import { Pause, Play } from 'lucide-react';

const { props: { src: logoSource } } = getImageProps({ src: assetPath('/aisoc-logo.png'), alt: '', width: 1024, height: 341 });

const rims = [
  'M255 225 Q254 235 268 242 L450 331 Q467 340 484 331 L668 242 Q681 235 680 225',
  'M255 330 Q254 340 268 347 L450 436 Q467 445 484 436 L668 347 Q681 340 680 330',
  'M255 435 Q254 445 268 452 L450 541 Q467 550 484 541 L668 452 Q681 445 680 435',
];

export default function AnimatedHeroLogo() {
  const id = `hero-logo-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const scene = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!scene.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '40px' });
    observer.observe(scene.current);
    return () => observer.disconnect();
  }, []);

  return <div className="hero-logo-scene" ref={scene} data-paused={paused || !visible}>
    <svg className="hero-logo-art" width="2048" height="682" viewBox="0 0 2048 682" role="img" aria-label="AI-SoC — Artificial Intelligence System on Chip Laboratory">
      <defs>
        <image id={`${id}-source`} href={logoSource} width="2048" height="682" />
        <linearGradient id={`${id}-type-reveal`} gradientUnits="userSpaceOnUse" x1="690" y1="0" x2="735" y2="0"><stop offset="0" stopColor="#000" /><stop offset="1" stopColor="#fff" /></linearGradient>
        <mask id={`${id}-type-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="2048" height="682"><rect width="2048" height="682" fill={`url(#${id}-type-reveal)`} /></mask>
        <radialGradient id={`${id}-stack-fade`} gradientUnits="userSpaceOnUse" cx="465" cy="330" r="350"><stop offset="0.78" stopColor="#fff" /><stop offset="1" stopColor="#000" /></radialGradient>
        <mask id={`${id}-stack-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="710" height="682"><rect width="710" height="682" fill={`url(#${id}-stack-fade)`} /></mask>
        <clipPath id={`${id}-stack-clip`}><rect width="710" height="682" /></clipPath>
        <filter id={`${id}-rim-glow`} x="-40%" y="-80%" width="180%" height="260%"><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="glow" /><feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <radialGradient id={`${id}-ground`}><stop offset="0" stopColor="#00d9d7" stopOpacity=".25" /><stop offset="1" stopColor="#00d9d7" stopOpacity="0" /></radialGradient>
      </defs>
      <use href={`#${id}-source`} mask={`url(#${id}-type-mask)`} />
      <ellipse className="hero-stack-ground" cx="467" cy="569" rx="170" ry="29" fill={`url(#${id}-ground)`} aria-hidden="true" />
      <g className="hero-stack-motion" aria-hidden="true">
        <use href={`#${id}-source`} clipPath={`url(#${id}-stack-clip)`} mask={`url(#${id}-stack-mask)`} />
        <g className="hero-stack-effects" fill="none" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${id}-rim-glow)`}>
          {rims.map((path, index) => <g className={`hero-stack-layer hero-stack-layer-${index}`} key={path}>
            <path className="hero-stack-rim" d={path} stroke="#4cfff1" strokeWidth="2" />
            <path className="hero-stack-trace" d={path} pathLength="100" stroke="#d0ffff" strokeWidth="2.6" strokeDasharray="9 91" />
          </g>)}
          <path className="hero-stack-transfer hero-stack-transfer-1" d="M467 342 V415" stroke="#91fff3" strokeWidth="1.6" strokeDasharray="5 68" />
          <path className="hero-stack-transfer hero-stack-transfer-2" d="M467 447 V519" stroke="#91fff3" strokeWidth="1.6" strokeDasharray="5 67" />
        </g>
      </g>
    </svg>
    <button type="button" className="hero-stack-toggle" aria-label={paused ? 'Play logo animation' : 'Pause logo animation'} title={paused ? 'Play animation' : 'Pause animation'} onClick={() => setPaused(!paused)}>{paused ? <Play size={13} fill="currentColor" strokeWidth={1.5} /> : <Pause size={13} strokeWidth={1.7} />}</button>
  </div>;
}
