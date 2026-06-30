import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Hammer, Image, Star, Shield, HardHat } from 'lucide-react';

const ContractorWebDesign = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Contractor & Construction Web Design",
    "description": "Premium contractor website design engineered to showcase your projects and capture high-value remodel or construction leads.",
    "publisher": {
      "@type": "ProfessionalService",
      "name": "Signal Light Studio",
      "logo": "https://www.signallightstudio.com/favicon.png"
    }
  };

  return (
    <main style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-gray)', minHeight: '100vh' }}>
      <Helmet>
        <title>Contractor & Home Services Web Design | Signal Light Studio</title>
        <meta name="description" content="Custom web design for general contractors, remodelers, roofers, and home services. Showcase craftsmanship, win high-end quotes, and stand out locally." />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      {/* Hero */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(135deg, var(--color-primary) 0%, #1e293b 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', padding: '0.35rem 1.25rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-block', marginBottom: '1.5rem' }}>
            Niche Expertise
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'white', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Contractor & Construction Web Design
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
            We design premium contractor websites built to showcase your projects, qualify leads, and secure high-value remodeling and custom home bids.
          </p>
          <a href="#contact" className="btn btn-primary pulse-cta">Get a Free Contractor Site Audit</a>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.25rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Engineered for High-Value Contracting Bids</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Don't let a generic template website discount the premium work you do in the field.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            <div style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-bg-gray)' }}>
              <div style={{ color: 'var(--color-accent-blue)', marginBottom: '1rem' }}><Image size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Premium Work Portfolio</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Display high-resolution project cards, grouped by remodel type, showing detailed materials and finished job layouts.</p>
            </div>
            <div style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-bg-gray)' }}>
              <div style={{ color: 'var(--color-accent-blue)', marginBottom: '1rem' }}><Shield size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Lead Qualification Forms</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Filter out tire-kickers by collecting key budget ranges, remodel timeline specs, and project drawings prior to calls.</p>
            </div>
            <div style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-bg-gray)' }}>
              <div style={{ color: 'var(--color-accent-blue)', marginBottom: '1rem' }}><Star size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Local Trust Signals</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Feature dynamic local reviews, license numbers, BBB ratings, and insurance verification to ease homeowner anxiety.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Details / Outcomes */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>Stand out from the crowd</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: '1.7' }}>
                When homeowners are planning $20k - $100k+ remodeling projects, they inspect your online reputation carefully. A slow website or missing photo galleries will cause them to question your quality.
              </p>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
                We design sites that establish absolute authority, showing off premium craftsmanship, licensing credentials, and structured lead forms.
              </p>
              <a href="#contact" className="btn btn-primary">Start Your Contractor Site Redesign</a>
            </div>
            <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '1.5rem', fontWeight: 700 }}>Key Contractor Site Features:</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Responsive project photo albums and specs
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Pre-quote budget questionnaire routing
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Map overlays showing local project locations
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Live credentials & license badge highlights
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContractorWebDesign;
