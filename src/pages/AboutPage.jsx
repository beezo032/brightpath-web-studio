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

      {/* Why Choose Ascend Digital Co (Reuse Benefits Component) */}
      <Benefits />

      {/* CTA */}
      <FinalCTA />
    </main>
  );
};

export default AboutPage;
