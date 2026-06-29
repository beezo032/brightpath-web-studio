import React from 'react';
import { Smartphone, Search, Zap, MessageCircle, HeadphonesIcon, Code } from 'lucide-react';
import './WhyChooseUs.css';

const trustCards = [
  { icon: <Smartphone size={24} />, title: "Mobile-First Design", text: "Sites engineered to perform flawlessly on any device." },
  { icon: <Search size={24} />, title: "SEO Optimized", text: "Built from the ground up for maximum local search visibility." },
  { icon: <Zap size={24} />, title: "Fast Turnaround", text: "We deliver premium websites quickly without cutting corners." },
  { icon: <MessageCircle size={24} />, title: "Direct Communication", text: "You work directly with the developer, no middlemen." },
  { icon: <HeadphonesIcon size={24} />, title: "Ongoing Support", text: "Reliable maintenance so you never have to worry about your site." },
  { icon: <Code size={24} />, title: "Fully Custom Websites", text: "Unique designs tailored specifically to your business goals." }
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="why-us section section-dark relative">
      <div className="why-us-bg-glow"></div>
      
      <div className="container relative">
        <div className="section-header text-center reveal">
          <h2>Why Businesses Trust Signal Light Studio</h2>
          <p className="subtitle">
            We combine high-end design with proven growth strategies to deliver reliable results.
          </p>
        </div>
        
        {/* Statistics Section */}
        <div className="trust-stats reveal reveal-delay-1">
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Mobile Friendly</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">Fast</span>
            <span className="stat-label">Performance</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">Local</span>
            <span className="stat-label">Business Focus</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">Custom</span>
            <span className="stat-label">Built Solutions</span>
          </div>
        </div>
        
        {/* 6 Trust Cards */}
        <div className="trust-grid-6">
          {trustCards.map((card, index) => (
            <div key={index} className={`trust-card-new reveal reveal-delay-${(index % 3) + 1}`}>
              <div className="trust-icon-glass" aria-hidden="true">
                {card.icon}
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
        
        <div className="section-cta text-center reveal reveal-delay-2" style={{marginTop: '4rem'}}>
          <a href="#contact" className="btn btn-primary pulse-cta" style={{display: 'inline-flex', alignItems: 'center'}}>
            Experience the Signal Light Studio Difference <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '0.5rem'}}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

