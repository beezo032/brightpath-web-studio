import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, MapPin, Search, Star, Sparkles, MessageSquare } from 'lucide-react';

const SummervilleScWebDesign = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SignalRise Studio",
    "image": "https://signalrisestudio.com/favicon.png",
    "@id": "https://signalrisestudio.com/#summerville-localbusiness",
    "url": "https://signalrisestudio.com/summerville-sc-web-design",
    "telephone": "hello@signalrisestudio.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Summerville",
      "addressRegion": "SC",
      "postalCode": "29483",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.0185,
      "longitude": -80.1757
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does a web design project cost in Summerville, SC?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our high-converting starter growth packages begin at $499, and our premium custom web design and booking engine packages start from $2,499+ depending on your business requirements."
        }
      },
      {
        "@type": "Question",
        "name": "Do you help Summerville businesses rank on Google Maps?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, absolutely! Local SEO is built directly into our websites. We optimize your page structure, implement local schema markup, and assist in configuring your Google Business Profile to help you rank in the local map pack."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to design and launch a local business site?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard service business websites typically launch within 2 to 4 weeks. Custom enterprise projects with advanced CRM or booking engine integrations may take 4 to 6 weeks."
        }
      }
    ]
  };

  return (
    <main style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-gray)', minHeight: '100vh' }}>
      <Helmet>
        <title>Summerville, SC Web Design & Local SEO | SignalRise Studio</title>
        <meta name="description" content="Premium, custom web design and local SEO services in Summerville, SC. We design fast, high-converting websites for contractors, dentists, and home service providers." />
        <script type="application/ld+json">
          {JSON.stringify(businessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Hero */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(135deg, var(--color-primary) 0%, #1e40af 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'white', padding: '0.35rem 1.25rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-block', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            Summerville, SC Web Agency
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'white', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Summerville, SC Web Design & SEO
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
            We build lightning-fast, premium websites that turn Google searchers into scheduled bookings and inquiries for Summerville service providers.
          </p>
          <a href="#contact" className="btn btn-primary pulse-cta">Get a Free Website Audit</a>
        </div>
      </section>

      {/* Local Focus */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>Dominating the local search market in Flowertown</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: '1.7' }}>
                We understand the local landscape of Summerville. From Main Street shops to home contractors servicing Nexton and Cane Bay, we help your business capture the local traffic that matters.
              </p>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
                We design sites that build trust instantly with premium typography, fast load speeds, and seamless booking widgets that integrate with your day-to-day operations.
              </p>
              <a href="#contact" className="btn btn-primary">Start Your Summerville Project</a>
            </div>
            <div style={{ background: 'var(--color-bg-gray)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '1.5rem', fontWeight: 700 }}>Built For Conversion:</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Mobile-first layouts optimized for local mobile searches
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Google Business Profile optimization and map rank setup
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Extreme page speed performance (Lighthouse 95+)
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> One-click tap-to-call & booking form integrations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQ */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-bg-gray)' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.25rem', color: 'var(--color-primary)', marginBottom: '3rem' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '0.75rem', fontWeight: 600 }}>
                How much does a web design project cost in Summerville, SC?
              </h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Our high-converting starter growth packages begin at $499, and our premium custom web design and booking engine packages start from $2,499+ depending on your business requirements.
              </p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '0.75rem', fontWeight: 600 }}>
                Do you help Summerville businesses rank on Google Maps?
              </h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Yes, absolutely! Local SEO is built directly into our websites. We optimize your page structure, implement local schema markup, and assist in configuring your Google Business Profile to help you rank in the local map pack.
              </p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '0.75rem', fontWeight: 600 }}>
                How long does it take to design and launch a local business site?
              </h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Standard service business websites typically launch within 2 to 4 weeks. Custom enterprise projects with advanced CRM or booking engine integrations may take 4 to 6 weeks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SummervilleScWebDesign;
