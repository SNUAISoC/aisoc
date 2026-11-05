import { ArrowUpRight, Building2, FlaskConical, Mail, Phone } from 'lucide-react';
import type { Site } from '@/lib/site';

export default function ContactPage({ site }: { site: Site }) {
  return <div className="professor-page contact-information-page">
    <div className="professor-container">
      <header className="professor-heading">
        <span className="professor-eyebrow"><span aria-hidden="true" />Contact</span>
        <h1>Contact Information</h1>
      </header>
      <div className="contact-information-list">
        <section className="contact-information-item" aria-labelledby="contact-office-title">
          <span className="contact-information-icon"><Building2 size={22} strokeWidth={1.5} aria-hidden="true" /></span>
          <div className="contact-information-content">
            <h2 id="contact-office-title">Office</h2>
            <address><span className="contact-address-primary">Room #422, Building 18</span><span className="contact-address-line">1 Gwanak-ro, Gwanak-gu, Seoul, Republic of Korea (08826)</span></address>
          </div>
        </section>
        <section className="contact-information-item" aria-labelledby="contact-lab-title">
          <span className="contact-information-icon"><FlaskConical size={22} strokeWidth={1.5} aria-hidden="true" /></span>
          <div className="contact-information-content">
            <h2 id="contact-lab-title">Lab</h2>
            <address><span className="contact-address-primary">1 Gwanak-ro, Gwanak-gu, Seoul</span><span className="contact-address-line">Republic of Korea (08826)</span></address>
          </div>
        </section>
        <section className="contact-information-item" aria-labelledby="contact-phone-title">
          <span className="contact-information-icon"><Phone size={21} strokeWidth={1.5} aria-hidden="true" /></span>
          <div className="contact-information-content">
            <h2 id="contact-phone-title">Tel.</h2>
            <a className="contact-information-link" href="tel:+8228808476"><span>+82 2 880 8476</span><ArrowUpRight size={19} strokeWidth={1.6} aria-hidden="true" /></a>
          </div>
        </section>
        <section className="contact-information-item" aria-labelledby="contact-email-title">
          <span className="contact-information-icon"><Mail size={22} strokeWidth={1.5} aria-hidden="true" /></span>
          <div className="contact-information-content">
            <h2 id="contact-email-title">E-mail</h2>
            <a className="contact-information-link" href={`mailto:${site.contactEmail}`}><span>{site.contactEmail}</span><ArrowUpRight size={19} strokeWidth={1.6} aria-hidden="true" /></a>
          </div>
        </section>
      </div>
    </div>
  </div>;
}
