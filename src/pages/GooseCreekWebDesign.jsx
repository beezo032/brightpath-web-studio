import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2 } from 'lucide-react';

const GooseCreekWebDesign = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Signal Light Studio",
    "image": "https://www.signallightstudio.com/favicon.png",
    "@id": "https://www.signallightstudio.com/#goosecreek-localbusiness",
    "url": "https://www.signallightstudio.com/goose-creek-web-design",
    "telephone": "hello@signallightstudio.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Goose Creek",
      "addressRegion": "SC",
      "postalCode": "29445",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 32.9482,
      "longitude": -80.0131
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
        "name": "How much does a custom website cost in Goose Creek, SC?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our high-converting starter packages begin at $499, and our premium custom web design and booking engine packages range from $2,499+ depending on integrations."
        }
      },
      {
        "@type": "Question",
        "name": "How will web design and SEO help my local Goose Creek business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A fast, professional site optimized for mobile search builds trust instantly. When paired with local schema markup and Google Maps SEO, it helps you rank higher when local clients search for your services."
        }
      },
      {
        "@type": "Question",
        "name": "Can I manage the website content myself after launch?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we build our sites to be easily editable. We provide video walkthroughs showing you how to change text, photos, and services, or you can use our monthly maintenance plan starting at $49/mo."
        }
      }
    ]
  };

  return (
    <main style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-gray)', minHeight: '100vh' }}>
      <Helmet>
        <title>Goose Creek, SC Web Design & Local SEO | Signal Light Studio</title>
        <meta name="description" content="Premium, custom web design and local SEO services in Goose Creek, SC. Fast, search-optimized websites designed to generate more customer leads." />
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
            Goose Creek, SC Web Agency
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'white', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Goose Creek, SC Web Design & SEO
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
            We design high-end, conversion-focused websites that position your Goose Creek business as the absolute premium choice in your local service area.
          </p>
          <a href="#contact" className="btn btn-primary pulse-cta">Get a Free Website Audit</a>
        </div>
      </section>

      {/* Local Focus */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>Attract more local clients in Goose Creek & Hanahan</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: '1.7' }}>
                Goose Creek is growing rapidly. If your contracting, landscaping, or HVAC business is still using an old, slow, or template-based website, you are losing customers to competitors who present a more premium image.
              </p>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
                Our sites load in under 1 second, scale beautifully on every mobile device, and are structured with local SEO schemas to rank high in the Google local map pack.
              </p>
              <a href="#contact" className="btn btn-primary">Start Your Goose Creek Project</a>
            </div>
            <div style={{ background: 'var(--color-bg-gray)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '1.5rem', fontWeight: 700 }}>Our Strategy:</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Local schema markup for search engines
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Conversion rate optimized (CRO) layouts
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> Dynamic reviews and social proof widgets
                </li>
                <li style={{ display: 'flex', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent-blue)', flexShrink: 0 }} /> High-quality, fast-loading images
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
                How much does a custom website cost in Goose Creek, SC?
              </h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Our high-converting starter packages begin at $499, and our premium custom web design and booking engine packages range from $2,499+ depending on integrations.
              </p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '0.75rem', fontWeight: 600 }}>
                How will web design and SEO help my local Goose Creek business?
              </h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                A fast, professional site optimized for mobile search builds trust instantly. When paired with local schema markup and Google Maps SEO, it helps you rank higher when local clients search for your services.
              </p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '0.75rem', fontWeight: 600 }}>
                Can I manage the website content myself after launch?
              </h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Yes, we build our sites to be easily editable. We provide video walkthroughs showing you how to change text, photos, and services, or you can use our monthly maintenance plan starting at $49/mo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GooseCreekWebDesign;
