import { ArrowUpRight, GraduationCap, UserRound } from 'lucide-react';
import type { Site } from '@/lib/site';

export default function AlumniPage({ site }: { site: Site }) {
  const alumni = site.people.filter(person => /alumn|former|graduated/i.test(person.role));

  return <div className="professor-page alumni-page">
    <div className="professor-container">
      <header className="professor-heading">
        <span className="professor-eyebrow"><span aria-hidden="true" />People</span>
        <h1>Alumni</h1>
        <p className="alumni-introduction">Past members of AI-SoC Laboratory.</p>
      </header>
      <section className="alumni-directory" aria-labelledby="alumni-directory-title">
        <div className="alumni-directory-heading"><h2 id="alumni-directory-title">Alumni directory</h2>{!!alumni.length && <span>{alumni.length} {alumni.length === 1 ? 'profile' : 'profiles'}</span>}</div>
        <table className="alumni-table">
          <caption className="visually-hidden">Alumni profiles, academic background and affiliations</caption>
          <thead><tr><th scope="col">Member</th><th scope="col">Degree / Year</th><th scope="col">Profile / Affiliation</th></tr></thead>
          <tbody>
            {alumni.map(person => <tr className="alumni-member" key={person.id}>
              <td><div className="alumni-member-identity"><div className="alumni-avatar">{person.image ? <img src={person.image} alt={person.name} loading="lazy" /> : <UserRound size={24} strokeWidth={1.3} aria-hidden="true" />}</div><div><h3>{person.link ? <a href={person.link} target="_blank" rel="noopener noreferrer">{person.name}<ArrowUpRight size={14} aria-hidden="true" /><span className="visually-hidden"> (opens in a new tab)</span></a> : person.name}</h3><span className="alumni-role">{person.role}</span></div></div></td>
              <td><span className="alumni-mobile-label">Degree / Year</span><p className="alumni-degree">{person.degree || '—'}</p>{person.graduationYear && <span className="alumni-graduation-year">{person.graduationYear}</span>}</td>
              <td><span className="alumni-mobile-label">Profile / Affiliation</span><p className="alumni-affiliation">{person.affiliation || person.description || '—'}</p></td>
            </tr>)}
            {!alumni.length && <tr><td className="alumni-empty-cell" colSpan={3}><div className="alumni-empty"><span className="alumni-empty-icon"><GraduationCap size={34} strokeWidth={1.3} aria-hidden="true" /></span><h3>Alumni profiles are on the way</h3><p>Our alumni directory will be updated as profiles become available.</p></div></td></tr>}
          </tbody>
        </table>
      </section>
    </div>
  </div>;
}
