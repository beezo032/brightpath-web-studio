import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, MapPin, Search, Star, Sparkles } from 'lucide-react';

const CharlestonScWebDesign = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Signal Light Studio",
    "image": "https://signallightstudio.com/favicon.png",
    "@id": "https://signallightstudio.com/#localbusiness",
    "url": "https://signallightstudio.com/charleston-sc-web-design",
    "telephone": "hello@signallightstudio.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Charleston",
      "addressRegion": "SC",
      "postalCode": "29401",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 32.7765,
      "longitude": -79.9311
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <main style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-gray)', minHeight: '100vh' }}>
      <Helmet>
        <title>Charleston, SC Web Design & Local SEO | Signal Light Studio</title>
        <meta name="description" content="Premium, custom web design and local SEO services in Charleston, SC. We design fast, high-converting websites for local contractors, landscaping, and dental clinics." />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      {/* Hero */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(135deg, var(--color-primary) 0%, #1d4ed8 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'white', padding: '0.35rem 1.25rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-block', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            Charleston, SC Web Agency
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'white', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Charleston, SC Web Design & SEO
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
            We design high-converting, blazing-fast websites specifically engineered to help local Charleston service businesses get more inquiries and bookings.
          </p>
          <a href="#contact" className="btn btn-primary pulse-cta">Get a Free Website Audit</a>
        </div>
      </section>

      {/* Local Focus */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>Partner with a local expert</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: '1.7' }}>
                We understand the Charleston market. Whether you're a landscaper in Mount Pleasant, a contractor in West Ashley, or a dental clinic in downtown Charleston, we know how to rank your business locally.
              </p>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
                We don't build generic template sites. We build custom local sales systems complete with maps ranking setup, lead forms, and lightning fast code.
              </p>
              <a href="#contact" className="btn btn-primary">Start Your Charleston Project</a>
            </div>
            <div style={{ background: 'var(--color-bg-gray)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '1.5rem', fontWeight: 700 }}>Why Charleston Trusts Us:</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Local maps pack optimization
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> High-speed servers for mobile searchers
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Direct developer communication (no salespeople)
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Integrates with standard dispatch platforms
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CharlestonScWebDesign;
