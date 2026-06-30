import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Calendar, Users, MapPin, Award } from 'lucide-react';

const DentalWebDesign = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Dental Practice Web Design",
    "description": "Premium, conversion-optimized dental website design to attract new patients, schedule appointments, and build trust.",
    "publisher": {
      "@type": "ProfessionalService",
      "name": "Signal Light Studio",
      "logo": "https://www.signallightstudio.com/favicon.png"
    }
  };

  return (
    <main style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-gray)', minHeight: '100vh' }}>
      <Helmet>
        <title>Dental Practice Web Design | Signal Light Studio</title>
        <meta name="description" content="Custom dental website design built to attract new patients, automate appointment scheduling, and highlight patient reviews." />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      {/* Hero */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(135deg, var(--color-primary) 0%, #1e1b4b 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          <span style={{ backgroundColor: 'var(--color-accent-blue-dim)', color: 'var(--color-accent-blue)', padding: '0.35rem 1.25rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-block', marginBottom: '1.5rem' }}>
            Niche Expertise
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'white', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Dental Practice Web Design
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
            We design premium dental websites built to turn local searches into scheduled cleanings and high-value cosmetic patient appointments.
          </p>
          <a href="#contact" className="btn btn-primary pulse-cta">Get a Free Dental Site Audit</a>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.25rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>How We Get You More Patients</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Our sites focus on three core pillars: visibility, trust, and booking automation.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            <div style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-bg-gray)' }}>
              <div style={{ color: 'var(--color-accent-blue)', marginBottom: '1rem' }}><Calendar size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Automated Scheduling</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Seamlessly integrate LocalMed, Dentrix, or custom schedulers so patients can book 24/7 without calling your front desk.</p>
            </div>
            <div style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-bg-gray)' }}>
              <div style={{ color: 'var(--color-accent-blue)', marginBottom: '1rem' }}><ShieldCheck size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>HIPAA & Security Standards</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Form routing is securely encrypted and compliant with patient privacy standards to keep your practice protected.</p>
            </div>
            <div style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-bg-gray)' }}>
              <div style={{ color: 'var(--color-accent-blue)', marginBottom: '1rem' }}><Users size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Review & Trust Engines</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Import local Google Map and Yelp ratings dynamically to show fresh five-star patient reviews directly on your site.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Details / Outcomes */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>Designed For Patient Conversion</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: '1.7' }}>
                Local patients don't care about generic stock photos of perfect teeth. They care about finding an office that is friendly, nearby, and takes their insurance.
              </p>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
                We structure your site with a visual hierarchy showing your actual doctors, your clean office, clear insurance lists, and maps location.
              </p>
              <a href="#contact" className="btn btn-primary">Start Your Practice Redesign</a>
            </div>
            <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '1.5rem', fontWeight: 700 }}>Key Dental Site Features:</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Mobile-first patient onboarding forms
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Prominent insurance networks panel
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> High-end SEO targeting cosmetic, implants & general queries
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Fast-load times for emergency dentistry searches
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DentalWebDesign;
