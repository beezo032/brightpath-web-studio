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
        <title>About Us | Brightpath Web Studio</title>
        <meta name="description" content="Learn about our mission to help local businesses succeed online with premium web design and transparent partnerships." />
        <meta property="og:title" content="About Us | Brightpath Web Studio" />
        <meta property="og:description" content="Learn about our mission to help local businesses succeed online with premium web design and transparent partnerships." />
      </Helmet>
      
      {/* Hero */}
      <section className="about-hero section-dark text-center">
        <div className="container reveal">
          <div className="badge" style={{marginBottom: '1rem'}}>Our Story</div>
          <h1>Helping Local Businesses Succeed Online</h1>
        </div>
      </section>

      {/* Founder Story & Mission */}
      <section className="about-story section section-light">
        <div className="container">
          <div className="story-grid">
            <div className="story-content reveal">
              <h2>Meet the Founder</h2>
              <div className="story-text">
                <p>Hi, I'm Brandon, founder of Brightpath Web Studio.</p>
                <p>I started Brightpath with one mission: to help local businesses compete online through modern, high-performing websites.</p>
                <p>Too often, local business owners get stuck with outdated templates that don't reflect the quality of their services, or they get overcharged by agencies that disappear after launch. I wanted to build a different kind of agency—one focused on transparency, real partnerships, and tangible results.</p>
              </div>
              
              <div className="mission-box mt-4">
                <h3>Our Mission</h3>
                <p className="mission-text">"Our mission is to create websites that not only look great but also help businesses generate more customers."</p>
              </div>
            </div>
            
            <div className="story-image-wrapper reveal reveal-delay-1">
              <div className="founder-placeholder">
                <div className="founder-placeholder-inner">
                  <span>Photo Placeholder</span>
                  <span className="founder-name">Brandon Johnson</span>
                </div>
              </div>
              <div className="experience-badge">
                <span className="badge-number">100%</span>
                <span className="badge-text">Dedicated to Local Business</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="about-values section bg-gray">
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

      {/* Why Choose Brightpath (Reuse Benefits Component) */}
      <Benefits />

      {/* CTA */}
      <FinalCTA />
    </main>
  );
};

export default AboutPage;
