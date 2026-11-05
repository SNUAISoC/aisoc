import Link from 'next/link';
import { ArrowUpRight, Award } from 'lucide-react';
import type { Publication, Site } from '@/lib/site';
import { publicationKind, type PublicationKind } from '@/lib/publications';

const categories = [
  { type: 'conference' as const, label: 'International Conferences' },
  { type: 'journal' as const, label: 'Journals' },
];

function Authors({ text }: { text: string }) {
  return <p className="publication-authors">{text.split(/(Jun-Seok Park)/g).map((part, index) => part === 'Jun-Seok Park' ? <strong key={index}>{part}</strong> : part)}</p>;
}

export default function PublicationsPage({ site, selectedType }: { site: Site; selectedType?: string }) {
  const activeType: PublicationKind = selectedType === 'journal' ? 'journal' : 'conference';
  const activeCategory = categories.find(category => category.type === activeType)!;
  const papers = site.publications.filter(publication => publicationKind(publication) === activeType);
  const groups = new Map<string, Publication[]>();
  for (const paper of papers) groups.set(paper.year, [...(groups.get(paper.year) || []), paper]);
  const years = [...groups.keys()].sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));

  return <div className="professor-page publications-page">
    <div className="professor-container">
      <header className="professor-heading">
        <span className="professor-eyebrow"><span aria-hidden="true" />Research publications</span>
        <h1>Publications</h1>
      </header>
      <div className="publication-toolbar">
        <nav className="publication-categories" aria-label="Publication categories">
          {categories.map(category => <Link key={category.type} href={`/publications?type=${category.type}`} className={`publication-category${category.type === activeType ? ' is-selected' : ''}`} aria-current={category.type === activeType ? 'page' : undefined}>
            <span>{category.label}</span><span className="publication-count">{site.publications.filter(publication => publicationKind(publication) === category.type).length}</span>
          </Link>)}
        </nav>
      </div>
      {!!years.length && <nav className="publication-years" aria-label="Jump to publication year"><span className="publication-year-caption">Year</span>{years.map(year => <a key={year} href={`#publication-year-${year}`}>{year}</a>)}</nav>}
      <div className="publication-year-groups" aria-label={activeCategory.label}>
        {years.map(year => <section className="publication-year-group" key={year} aria-labelledby={`publication-year-${year}`}>
          <div className="publication-year-label"><h2 id={`publication-year-${year}`}>{year}</h2><span>{groups.get(year)!.length} {groups.get(year)!.length === 1 ? 'publication' : 'publications'}</span></div>
          <ol className="publication-papers">
            {groups.get(year)!.map(paper => <li key={paper.id}>
              <article className="publication-paper">
                <h3>{paper.link ? <a href={paper.link} target="_blank" rel="noopener noreferrer">{paper.title}<ArrowUpRight size={17} aria-hidden="true" /><span className="visually-hidden"> (opens in a new tab)</span></a> : paper.title}</h3>
                <Authors text={paper.authors} />
                <div className="publication-details"><p className="publication-venue">{paper.venue}</p>{paper.note && <span className={`publication-note${/best paper/i.test(paper.note) ? ' is-award' : ''}`}>{/best paper/i.test(paper.note) && <Award size={13} aria-hidden="true" />}{paper.note}</span>}</div>
              </article>
            </li>)}
          </ol>
        </section>)}
        {!papers.length && <div className="publication-empty">Publications will be added here.</div>}
      </div>
    </div>
  </div>;
}
