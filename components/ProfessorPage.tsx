import { Award, BriefcaseBusiness, GraduationCap, Mail, Phone, UserRound, UsersRound } from 'lucide-react';

const sections = [
  { id: 'education', title: 'Education', icon: GraduationCap, period: 'Year — Year', primary: 'Degree / Program', secondary: 'Institution / Department' },
  { id: 'experience', title: 'Experience', icon: BriefcaseBusiness, period: 'Year — Year', primary: 'Position / Role', secondary: 'Organization / Institution' },
  { id: 'activities', title: 'Activities', icon: UsersRound, period: 'Year — Year', primary: 'Activity / Role', secondary: 'Organization / Committee' },
  { id: 'awards', title: 'Awards', icon: Award, period: 'Year', primary: 'Name of award', secondary: 'Awarding organization' },
];

export default function ProfessorPage() {
  return <div className="professor-page">
    <div className="professor-container">
      <header className="professor-heading">
        <span className="professor-eyebrow"><span aria-hidden="true" />People</span>
        <h1>Professor</h1>
      </header>
      <div className="professor-layout">
        <aside className="professor-sidebar" aria-label="Professor profile template">
          <div className="professor-portrait" role="img" aria-label="Placeholder for professor portrait">
            <UserRound size={76} strokeWidth={1} aria-hidden="true" />
            <span>Professor photo</span>
          </div>
          <section className="professor-identity" aria-labelledby="professor-name">
            <span className="professor-profile-label">Faculty profile</span>
            <h2 id="professor-name">Professor name</h2>
            <p className="professor-position">Position · Department</p>
            <dl className="professor-contact">
              <div><dt><Mail size={16} strokeWidth={1.6} /><span className="visually-hidden">Email</span></dt><dd>Email address</dd></div>
              <div><dt><Phone size={16} strokeWidth={1.6} /><span className="visually-hidden">Phone</span></dt><dd>Phone number</dd></div>
            </dl>
          </section>
        </aside>
        <div className="professor-background" aria-label="Academic background template">
          {sections.map(({ id, title, icon: Icon, period, primary, secondary }) => <section key={id} className="professor-section" aria-labelledby={`professor-${id}`}>
            <div className="professor-section-heading"><span className="professor-section-icon"><Icon size={20} strokeWidth={1.6} aria-hidden="true" /></span><h2 id={`professor-${id}`}>{title}</h2></div>
            <div className="professor-template-row"><span className="professor-template-period">{period}</span><div className="professor-template-entry"><p>{primary}</p><span>{secondary}</span></div></div>
          </section>)}
        </div>
      </div>
    </div>
  </div>;
}
