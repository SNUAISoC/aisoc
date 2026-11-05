'use client';

import Link from 'next/link';
import Image from './SiteImage';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import type { Site } from '@/lib/site';

type NavigationItem = { label: string; href?: string; children?: { label: string; href: string }[] };

export default function SiteNavigation({ visibility }: { visibility: Site['visibility'] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const items: NavigationItem[] = [
    { label: 'Home', href: '/' },
    ...(visibility.people ? [{ label: 'Members', children: [
      { label: 'Professor', href: '/people?group=professor' },
      { label: 'Researchers', href: '/people?group=researchers' },
      { label: 'Alumni', href: '/people?group=alumni' },
    ] }] : []),
    ...(visibility.news ? [{ label: 'News', href: '/news' }] : []),
    ...(visibility.research ? [{ label: 'Research', href: '/research' }] : []),
    ...(visibility.publications ? [{ label: 'Publication', children: [
      { label: 'International Conferences', href: '/publications?type=conference' },
      { label: 'Journals', href: '/publications?type=journal' },
    ] }] : []),
    ...(visibility.contact ? [{ label: 'Contact', href: '/contact' }] : []),
  ];

  function close() { setExpanded(null); setMobileOpen(false); }

  useEffect(() => {
    function outside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) close();
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (expanded) header.current?.querySelector<HTMLButtonElement>(`[aria-controls="nav-${expanded}"]`)?.focus();
        else if (mobileOpen) header.current?.querySelector<HTMLButtonElement>('.mobile-nav-toggle')?.focus();
        close();
      }
    }
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [expanded, mobileOpen]);

  return <header className="site-header" ref={header}>
    <Link href="/" className="header-brand" aria-label="AI-SoC Laboratory home" onClick={close}>
      <Image src="/aisoc-logo.png" alt="AI-SoC Laboratory" width={2048} height={682} sizes="(max-width: 760px) 200px, 270px" priority />
    </Link>
    <button className="mobile-nav-toggle" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} aria-controls="main-navigation" onClick={() => { setMobileOpen(!mobileOpen); setExpanded(null); }}>
      {mobileOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
    <nav id="main-navigation" className={`main-navigation${mobileOpen ? ' is-open' : ''}`} aria-label="Main navigation">
      <ul>{items.map(item => {
        const active = item.href ? pathname === item.href : item.children?.some(child => pathname === child.href.split('?')[0]);
        return <li key={item.label} className={expanded === item.label ? 'nav-item is-expanded' : 'nav-item'}
          onMouseEnter={() => { if (window.matchMedia('(hover: hover) and (min-width: 761px)').matches) setExpanded(item.children ? item.label : null); }}
          onMouseLeave={() => { if (window.matchMedia('(hover: hover) and (min-width: 761px)').matches) setExpanded(null); }}
          onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setExpanded(null); }}>
          {item.href ? <Link className={`navigation-link${active ? ' is-active' : ''}`} href={item.href} aria-current={active ? 'page' : undefined} onClick={close}>{item.label}</Link> : <>
            <button className={`navigation-link navigation-trigger${active ? ' is-active' : ''}`} aria-expanded={expanded === item.label} aria-controls={`nav-${item.label}`} onClick={() => setExpanded(expanded === item.label ? null : item.label)}>
              {item.label}<span className="navigation-chevron"><ChevronDown size={19} strokeWidth={2} /></span>
            </button>
            <ul id={`nav-${item.label}`} className="navigation-dropdown" hidden={expanded !== item.label}>
              {item.children?.map(child => <li key={child.href}><Link href={child.href} onClick={close}>{child.label}</Link></li>)}
            </ul>
          </>}
        </li>;
      })}</ul>
    </nav>
  </header>;
}
