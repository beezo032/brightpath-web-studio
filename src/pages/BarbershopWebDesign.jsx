import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Scissors, Calendar, Smartphone, Sparkles, Star } from 'lucide-react';

const BarbershopWebDesign = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Barbershop & Salon Web Design",
    "description": "Sleek, dark-themed, conversion-optimized barbershop websites with integrated appointment systems to fill chairs.",
    "publisher": {
      "@type": "ProfessionalService",
      "name": "Signal Light Studio",
      "logo": "https://signallightstudio.com/favicon.png"
    }
  };

  return (
    <main style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-gray)', minHeight: '100vh' }}>
      <Helmet>
        <title>Barbershop & Beauty Salon Web Design | Signal Light Studio</title>
        <meta name="description" content="Custom web design for barbershops, salons, and grooming lounges. Sleek modern styling, Squirrel/Fresha scheduling integrations, and local reviews." />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      {/* Hero */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(135deg, var(--color-primary) 0%, #171717 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#f5f5f5', padding: '0.35rem 1.25rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-block', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            Niche Expertise
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'white', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Barbershop & Salon Web Design
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
            We design sleek, premium, booking-integrated websites that capture local grooming searches and keep your chairs fully booked.
          </p>
          <a href="#contact" className="btn btn-primary pulse-cta">Get a Free Barbershop Site Audit</a>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.25rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Engineered to Keep Chairs Packed</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>A modern barbershop site should feel like a premium experience before they even sit in the chair.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            <div style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-bg-gray)' }}>
              <div style={{ color: 'var(--color-accent-blue)', marginBottom: '1rem' }}><Calendar size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Squire & Booking Integration</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Link directly to Squire, Fresha, Mindbody, or custom schedulers to capture client bookings in 3 taps or less.</p>
            </div>
            <div style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-bg-gray)' }}>
              <div style={{ color: 'var(--color-accent-blue)', marginBottom: '1rem' }}><Smartphone size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Mobile Booking Optimizations</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>90% of bookings happen on phones. Our mobile-first styling provides a fluid app-like scheduler feel.</p>
            </div>
            <div style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-bg-gray)' }}>
              <div style={{ color: 'var(--color-accent-blue)', marginBottom: '1rem' }}><Star size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Review & Stylist Profiles</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Highlight your barbers, show off cuts portfolios, and map social reviews to make booking simple for new clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Details / Outcomes */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>Visual style that converts</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: '1.7' }}>
                Grooming is personal. Clients inspect your web presence to judge your style and cleanliness. A messy or dated template website makes them think twice.
              </p>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
                We design premium, high-contrast pages detailing prices, cuts portfolios, stylist bios, and reviews to guarantee bookings.
              </p>
              <a href="#contact" className="btn btn-primary">Start Your Barbershop Site Build</a>
            </div>
            <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '1.5rem', fontWeight: 700 }}>Key Barbershop Site Features:</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Sticky mobile CTA booking links
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Stylist cut galleries and rating links
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Easy price menu grids
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Map locations and street details
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BarbershopWebDesign;
