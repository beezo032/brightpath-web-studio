import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import './FinalCTA.css';

const FinalCTA = () => {
  return (
    <section className="final-cta section relative">
      <div className="cta-bg-elements">
        <div className="cta-circle circle-1"></div>
        <div className="cta-circle circle-2"></div>
      </div>
      
      <div className="container relative text-center reveal">
        <div className="cta-content-wrapper">
          <div style={{display: 'flex', justifyContent: 'center', color: '#F59E0B', marginBottom: '1.25rem', letterSpacing: '4px', fontSize: '1.25rem'}}>
            {'★★★★★'}
          </div>
          <h2>Ready to Grow Your Business Online?</h2>
          <p className="subtitle cta-subtitle">
            Let's build a website that helps you attract more customers, generate more leads, and stand out from the competition.
          </p>
          
          <div className="cta-actions">
            <a href="#contact" className="btn btn-primary cta-btn">
              Get a Free Website Review <ArrowRight size={20} />
            </a>
            <a href="#contact" className="btn btn-outline-white cta-btn">
              <Calendar size={20} /> Schedule a Consultation
            </a>
          </div>
          
          <p className="cta-trust-text">
            No pressure. No obligation. Just honest advice and expert guidance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
