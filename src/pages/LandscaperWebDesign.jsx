import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Leaf, MapPin, Sparkles, Sprout, TrendingUp } from 'lucide-react';

const LandscaperWebDesign = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Landscaping & Lawn Care Web Design",
    "description": "Premium landscaping website design built to win seasonal maintenance contracts and high-ticket hardscaping quotes.",
    "publisher": {
      "@type": "ProfessionalService",
      "name": "SignalRise Studio",
      "logo": "https://signalrisestudio.com/favicon.png"
    }
  };

  return (
    <main style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-gray)', minHeight: '100vh' }}>
      <Helmet>
        <title>Landscaping & Lawn Care Web Design | SignalRise Studio</title>
        <meta name="description" content="Custom web design services for landscaping and lawn care businesses. Generate seasonal quotes, capture high-ticket contracts, and rank local search." />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      {/* Hero */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(135deg, var(--color-primary) 0%, #064e3b 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '0.35rem 1.25rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-block', marginBottom: '1.5rem' }}>
            Niche Expertise
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'white', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Landscaping & Lawn Care Web Design
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
            We design premium landscaping websites built to win large seasonal maintenance contracts and high-ticket hardscaping / layout quotes.
          </p>
          <a href="#contact" className="btn btn-primary pulse-cta">Get a Free Landscaping Site Audit</a>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.25rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Engineered for Lawn & Landscaping Growth</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Most landscapers have generic template sites. We build lead capture engines.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            <div style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-bg-gray)' }}>
              <div style={{ color: 'var(--color-accent-blue)', marginBottom: '1rem' }}><Leaf size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Visual Before & After Galleries</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Showcase dramatic yard transformations, hardscaping layouts, and clean retaining walls to build immediate quality trust.</p>
            </div>
            <div style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-bg-gray)' }}>
              <div style={{ color: 'var(--color-accent-blue)', marginBottom: '1rem' }}><Sprout size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Interactive Estimate Forms</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Let clients select lawn size, upload yard photos, and describe services easily to send highly qualified estimate requests to your inbox.</p>
            </div>
            <div style={{ padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'var(--color-bg-gray)' }}>
              <div style={{ color: 'var(--color-accent-blue)', marginBottom: '1rem' }}><TrendingUp size={32} /></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>Local SEO Map Dominance</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>Rank for key commercial terms like "commercial lawn maintenance near me" or "[City] landscape design" to consistently book work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Details / Outcomes */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>Show off your craftsmanship</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: '1.7' }}>
                Homeowners and commercial property managers buy with their eyes. If your site looks unprofessional, they will assume your lawns, trim work, and cleanups are unprofessional too.
              </p>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
                We structure your site with a visual design demonstrating top-tier landscaping results, client testimonials, and simple steps to request a fast service quote.
              </p>
              <a href="#contact" className="btn btn-primary">Start Your Landscape Site Build</a>
            </div>
            <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '1.5rem', fontWeight: 700 }}>Key Landscaping Site Features:</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Before-and-after interactive slider panels
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Service list cards (Mowing, Hardscaping, Cleanups)
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Mobile-friendly design for field estimates
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Map-pack coordinates for local SEO rankings
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandscaperWebDesign;
