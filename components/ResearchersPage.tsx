import { GraduationCap, Mail, Phone, UserRound } from 'lucide-react';

export default function ResearchersPage() {
  return <div className="professor-page researchers-page">
    <div className="professor-container">
      <header className="professor-heading">
        <span className="professor-eyebrow"><span aria-hidden="true" />People</span>
        <h1>Researchers</h1>
      </header>
      <section aria-labelledby="researcher-group-title">
        <div className="researcher-group-heading"><h2 id="researcher-group-title">M.S./Ph.D. Students</h2><span className="researcher-group-line" aria-hidden="true" /></div>
        <div className="researcher-list">
          {[1, 2, 3].map(index => <article className="researcher-profile" key={index} aria-labelledby={`researcher-name-${index}`}>
            <div className="researcher-sidebar">
              <div className="researcher-portrait" role="img" aria-label={`Placeholder for researcher ${index} portrait`}>
                <UserRound size={61} strokeWidth={1} aria-hidden="true" />
                <span>Researcher photo</span>
              </div>
              <dl className="researcher-contact">
                <div><dt><Mail size={15} strokeWidth={1.6} aria-hidden="true" /><span className="visually-hidden">Email</span></dt><dd>Email address</dd></div>
                <div><dt><Phone size={15} strokeWidth={1.6} aria-hidden="true" /><span className="visually-hidden">Phone</span></dt><dd>Phone number</dd></div>
              </dl>
            </div>
            <div className="researcher-details">
              <header className="researcher-identity">
                <span className="researcher-profile-label">Student profile <span aria-hidden="true">/</span> {String(index).padStart(2, '0')}</span>
                <h3 id={`researcher-name-${index}`}>Researcher name</h3>
                <p>Program / Research interests</p>
              </header>
              <section className="researcher-education" aria-labelledby={`researcher-education-${index}`}>
                <div className="researcher-education-heading"><span><GraduationCap size={19} strokeWidth={1.6} aria-hidden="true" /></span><h4 id={`researcher-education-${index}`}>Education</h4></div>
                <div className="researcher-education-row"><span className="researcher-period">Year — Year</span><div><p>Degree / Program</p><span>Institution / Department</span></div></div>
              </section>
            </div>
          </article>)}
        </div>
      </section>
    </div>
  </div>;
}
