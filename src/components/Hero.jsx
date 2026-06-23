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
            <div className="badge" style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
              <span style={{fontSize: '1.2rem'}}>🔥</span> Limited availability for {new Date().toLocaleString('default', { month: 'long' })}
            </div>
            <h1>Websites Built to Help Local Businesses Get More Calls, Leads, and Customers</h1>
            <p className="hero-subtitle">
              Brightpath Web Studio designs fast, mobile-friendly websites that help local businesses stand out online, generate more leads, and convert visitors into paying customers.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary pulse-cta" aria-label="Get a Free Website Review">
                Get a Free Website Review <ArrowRight size={20} />
              </a>
              <a href="#portfolio" className="btn btn-secondary bg-white-blur">
                View Our Work
              </a>
            </div>
            <div className="hero-trust-signals" style={{marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <div style={{display: 'flex', color: '#F59E0B'}}>
                {'★★★★★'}
              </div>
              <span style={{fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: '500'}}>
                Built for Local Business Growth
              </span>
            </div>
          </div>
          <div className="hero-image reveal reveal-delay-2">
            <div className="hero-image-placeholder" aria-label="Mockup of a local business website on desktop and mobile">
              <div className="mockup-window">
                <div className="mockup-header">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="mockup-body">
                  <div className="mockup-hero"></div>
                  <div className="mockup-cards">
                    <div className="mockup-card"></div>
                    <div className="mockup-card"></div>
                  </div>
                </div>
              </div>
              <div className="floating-card lead-card" aria-hidden="true">
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
                  <h4>{feature.title}</h4>
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
