import React from 'react';
import { ArrowRight, Zap, Smartphone, Search, HeadphonesIcon, MessageCircle } from 'lucide-react';
import './Hero.css';

const trustFeatures = [
  { icon: <Zap size={20} />, title: "Fast Turnaround", text: "We launch websites quickly without sacrificing quality." },
  { icon: <Smartphone size={20} />, title: "Mobile-First Design", text: "Every website is designed to look perfect on phones, tablets, and desktops." },
  { icon: <Search size={20} />, title: "SEO Optimized", text: "Built with local search visibility and lead generation in mind." },
  { icon: <HeadphonesIcon size={20} />, title: "Ongoing Support", text: "Affordable monthly maintenance and website updates available." },
  { icon: <MessageCircle size={20} />, title: "Direct Communication", text: "Work directly with the developer from start to finish." }
];

const Hero = () => {
  return (
    <>
      <section id="hero" className="hero section">
        {/* Background Effects */}
        <div className="hero-bg-effects">
          <div className="hero-glow glow-1"></div>
          <div className="hero-glow glow-2"></div>
          <div className="hero-grid"></div>
        </div>

        <div className="container hero-container relative">
          <div className="hero-content reveal">
            <h1>Websites Built to Generate More Leads, Calls & Customers</h1>
            <p className="hero-subtitle">
              Signal Light Studio designs fast, mobile-friendly websites that help local businesses stand out online, generate more leads, and convert visitors into paying customers.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary pulse-cta" aria-label="Get a Free Website Review">
                Get a Free Website Review <ArrowRight size={20} />
              </a>
              <a href="#portfolio" className="btn btn-secondary">
                View Our Work
              </a>
            </div>
            
            <div className="hero-badges" style={{marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '2rem'}}>
              <div className="hero-badge-item" style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <div style={{color: '#F59E0B', fontSize: '1.1rem', display: 'flex', gap: '2px'}}>
                  {'★★★★★'}
                </div>
                <div>
                  <p style={{margin: 0, fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-dark)'}}>Google 5-Star Rated</p>
                  <p style={{margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)'}}>Based on 25+ local reviews</p>
                </div>
              </div>
              <div className="hero-badge-item" style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <div style={{background: '#EFF6FF', color: 'var(--color-accent-blue)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <div>
                  <p style={{margin: 0, fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-dark)'}}>#1 Local Growth Partner</p>
                  <p style={{margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)'}}>Charleston & surrounding areas</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-image reveal reveal-delay-2">
            <div className="hero-image-wrapper" aria-label="Mockup of a local business website on desktop and mobile">
              <img src="/hero_mockup.webp" alt="Modern Local Business Website Design" className="hero-mockup-img" width={640} height={380} fetchPriority="high" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }} />
              <div className="floating-card lead-card" aria-hidden="true" style={{ bottom: '-20px', left: '-20px' }}>
                <div className="lead-icon">🎉</div>
                <div className="lead-text">
                  <p className="lead-title">New Lead</p>
                  <p className="lead-desc">Just received a quote request!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section directly below hero */}
      <section className="hero-trust-section">
        <div className="container">
          <div className="trust-grid">
            {trustFeatures.map((feature, index) => (
              <div key={index} className={`trust-card reveal reveal-delay-${Math.min(index + 1, 4)}`}>
                <div className="trust-icon-wrapper" aria-hidden="true">
                  {feature.icon}
                </div>
                <div className="trust-content">
                  <strong>{feature.title}</strong>
                  <p>{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;

