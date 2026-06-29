import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Phone, Shield, ShieldCheck, Flame, Compass } from 'lucide-react';

const HvacWebDesign = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "HVAC & Plumbing Web Design",
    "description": "Emergency service web design for HVAC, Plumbing, and Electrical companies. Capture emergency calls, schedule tune-ups, and dominate local search.",
    "publisher": {
      "@type": "ProfessionalService",
      "name": "Signal Light Studio",
      "logo": "https://signallightstudio.com/favicon.png"
    }
  };

  return (
    <main style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-gray)', minHeight: '100vh' }}>
      <Helmet>
        <title>HVAC, Plumbing & Electrical Web Design | Signal Light Studio</title>
        <meta name="description" content="Custom web design services for HVAC, plumbers, and home service providers. Optimize for tap-to-call emergency leads, map SEO, and local booking." />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      {/* Hero */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(135deg, var(--color-primary) 0%, #1e3a8a 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          <span style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', padding: '0.35rem 1.25rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-block', marginBottom: '1.5rem' }}>
            Niche Expertise
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'white', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            HVAC & Plumbing Web Design
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
            We build high-converting home services websites optimized to capture urgent emergency calls and schedule seasonal maintenance agreements automatically.
          </p>
          <a href="#contact" className="btn btn-primary pulse-cta">Get a Free HVAC Site Audit</a>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.25rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Turn Emergency Searches into Service Calls</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>When an AC breaks or a pipe bursts, customers want help fast. Your site must deliver.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            <div style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-bg-gray)' }}>
              <div style={{ color: 'var(--color-accent-blue)', marginBottom: '1rem' }}><Phone size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Tap-To-Call Phone CTAs</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Prominent, screen-anchored buttons make calling your dispatch team effortless for stressed mobile searchers.</p>
            </div>
            <div style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-bg-gray)' }}>
              <div style={{ color: 'var(--color-accent-blue)', marginBottom: '1rem' }}><ShieldCheck size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Service Titan / Housecall Pro</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Integrate your dispatch and scheduling calendars directly to capture bookings straight into your dispatch system.</p>
            </div>
            <div style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-bg-gray)' }}>
              <div style={{ color: 'var(--color-accent-blue)', marginBottom: '1rem' }}><Flame size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Emergency SEO Setup</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Rank locally for high-intent search queries like "ac repair near me" or "emergency plumber [City]" when services are needed most.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Details / Outcomes */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>Be the team they trust</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: '1.7' }}>
                Emergency searches happen in seconds on phones. If your page takes too long to load or looks broken, customers will hit the back button and call the next listing.
              </p>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
                We structure fast, light pages showing response guarantees, coupon codes, service areas, and reviews to win the job instantly.
              </p>
              <a href="#contact" className="btn btn-primary">Start Your Home Service Site Build</a>
            </div>
            <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '1.5rem', fontWeight: 700 }}>Key HVAC Site Features:</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Sticky mobile call and booking buttons
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Coupon and maintenance agreement showcases
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> 24/7 service request form integrations
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Service area zip-code routing tables
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HvacWebDesign;
