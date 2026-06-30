import React from 'react';
import { Award, Briefcase, Smartphone, Users } from 'lucide-react';
import './AboutFounder.css';

const AboutFounder = () => {
  return (
    <section id="about" className="about section section-light">
      <div className="container">
        <div className="about-grid">
          
          <div className="about-image-wrapper reveal">
            <div className="founder-photo-placeholder" role="img" aria-label="Signal Light Studio - Web Design & SEO">
              <span style={{fontSize: '3.5rem', fontWeight: '800', color: 'white', lineHeight: 1}}>S</span>
            </div>
            
            {/* Floating Badges */}
            <div className="floating-badge badge-1">
              <Award className="badge-icon" aria-hidden="true" />
              <div>
                <span className="badge-value">100%</span>
                <span className="badge-label">Custom Built</span>
              </div>
            </div>
            <div className="floating-badge badge-2">
              <Briefcase className="badge-icon" aria-hidden="true" />
              <div>
                <span className="badge-value">SEO</span>
                <span className="badge-label">Optimized</span>
              </div>
            </div>
          </div>
          
          <div className="about-content reveal reveal-delay-2">
            <h2>Our Studio</h2>
            <p className="founder-bio">
              Signal Light Studio helps local service businesses grow online. We build fast, premium, and high-converting websites engineered to rank on Google and turn online visitors into paying customers.
            </p>
            <p className="founder-mission">
              "Our mission is simple: create websites that not only look great but also serve as your business's primary growth driver."
            </p>
            
            <div className="about-features">
              <div className="about-feature">
                <div className="feature-icon-wrapper" aria-hidden="true">
                  <Smartphone size={20} />
                </div>
                <span>Mobile-First</span>
              </div>
              <div className="about-feature">
                <div className="feature-icon-wrapper" aria-hidden="true">
                  <Users size={20} />
                </div>
                <span>Customer-Focused</span>
              </div>
            </div>
            
            <a href="#contact" className="btn btn-primary">
              Let's Build Your Website
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutFounder;

