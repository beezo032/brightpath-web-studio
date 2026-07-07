import React, { useEffect } from 'react';
import { Shield, MessageSquare, Star, TrendingUp, Handshake } from 'lucide-react';
import Benefits from '../components/Benefits';
import FinalCTA from '../components/FinalCTA';
import { Helmet } from 'react-helmet-async';
import './AboutPage.css';

const valuesData = [
  { icon: <Shield size={32} />, title: "Integrity", text: "We provide honest advice and transparent pricing. No hidden fees or confusing technical jargon." },
  { icon: <MessageSquare size={32} />, title: "Communication", text: "You always know the status of your project. We respond quickly and communicate clearly." },
  { icon: <Star size={32} />, title: "Quality", text: "We never cut corners. Every website is custom-engineered to meet the highest industry standards." },
  { icon: <TrendingUp size={32} />, title: "Growth", text: "Your success is our success. Our primary focus is building tools that generate real ROI for your business." },
  { icon: <Handshake size={32} />, title: "Long-Term Partnerships", text: "We don't just launch your site and disappear. We act as your long-term digital growth partner." }
];

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="about-page">
      <Helmet>
        <title>About Signal Light Studio | Web Design Agency, Charleston SC</title>
        <meta name="description" content="Signal Light Studio is a web design studio based in Charleston, SC specializing in high-converting websites for local service businesses. Learn about our mission and values." />
        <link rel="canonical" href="https://www.signallightstudio.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Signal Light Studio | Web Design Agency, Charleston SC" />
        <meta property="og:description" content="We build premium websites that help local businesses attract more customers, generate more leads, and grow sustainably online." />
        <meta property="og:image" content="https://www.signallightstudio.com/hero_mockup.webp" />
        <meta property="og:url" content="https://www.signallightstudio.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Signal Light Studio" />
        <meta name="twitter:description" content="Web design studio based in Charleston, SC. Premium websites for local service businesses." />
        <meta name="twitter:image" content="https://www.signallightstudio.com/hero_mockup.webp" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.signallightstudio.com/" },
            { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.signallightstudio.com/about" }
          ]
        })}</script>
      </Helmet>
      
      {/* Hero */}
      <section className="about-hero section-dark text-center">
        <div className="container reveal">
          <div className="badge" style={{marginBottom: '1rem'}}>Our Story</div>
          <h1>Helping Local Businesses Succeed Online</h1>
        </div>
      </section>


      {/* Core Values */}
      <section className="about-values section section-gray">
        <div className="container">
          <div className="section-header text-center reveal">
            <h2>Our Core Values</h2>
            <p className="subtitle">The principles that guide every project we take on.</p>
          </div>
          
          <div className="values-grid">
            {valuesData.map((value, index) => (
              <div key={index} className={`value-card reveal reveal-delay-${(index % 3) + 1}`}>
                <div className="value-icon-wrapper" aria-hidden="true">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Signal Light Studio (Reuse Benefits Component) */}
      <Benefits />

      {/* CTA */}
      <FinalCTA />
    </main>
  );
};

export default AboutPage;

