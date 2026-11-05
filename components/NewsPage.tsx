import { ArrowUpRight, Mail, Newspaper } from 'lucide-react';
import type { News, Site } from '@/lib/site';

function displayDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(date);
}

export default function NewsPage({ site }: { site: Site }) {
  const groups = new Map<string, News[]>();
  for (const item of [...site.news].sort((a, b) => b.date.localeCompare(a.date, undefined, { numeric: true }))) {
    const year = item.date.match(/^\d{4}/)?.[0] || 'Updates';
    groups.set(year, [...(groups.get(year) || []), item]);
  }

  return <div className="professor-page updates-page">
    <div className="professor-container">
      <header className="professor-heading">
        <span className="professor-eyebrow"><span aria-hidden="true" />From the lab</span>
        <h1>News</h1>
        <p className="updates-introduction">Updates, announcements, and opportunities from AI-SoC Laboratory.</p>
      </header>
      <div className="updates-section-heading"><h2>Latest updates</h2><span aria-hidden="true" /></div>
      <div className="updates-archive">
        {[...groups].map(([year, items]) => <section className="updates-year-group" key={year} aria-labelledby={`updates-year-${year}`}>
          <div className="updates-year-label"><h2 id={`updates-year-${year}`}>{year}</h2><span>{items.length} {items.length === 1 ? 'update' : 'updates'}</span></div>
          <div className="updates-entries">
            {items.map(item => <article className="updates-entry" key={item.id}>
              <div className="updates-entry-meta">{item.category && <span className="updates-category">{item.category}</span>}{item.date !== year && <span className="updates-entry-date">{displayDate(item.date)}</span>}</div>
              <h3>{item.title}</h3>
              {item.description && <p className="updates-entry-description">{item.description}</p>}
              {item.link && <div className="updates-entry-footer"><a href={item.link} className="updates-entry-link">{item.link.startsWith('mailto:') ? <><Mail size={15} strokeWidth={1.6} aria-hidden="true" />Email the lab</> : <>Read more</>}<ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" /></a></div>}
            </article>)}
          </div>
        </section>)}
        {!site.news.length && <div className="updates-empty"><span className="updates-empty-icon"><Newspaper size={28} strokeWidth={1.3} aria-hidden="true" /></span><h2>Stay connected</h2><p>News and announcements will be shared here.</p></div>}
      </div>
    </div>
  </div>;
}
