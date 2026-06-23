import React from 'react';
import { Award, Briefcase, Smartphone, Users } from 'lucide-react';
import './AboutFounder.css';

const AboutFounder = () => {
  return (
    <section id="about" className="about section section-light">
      <div className="container">
        <div className="about-grid">
          
          <div className="about-image-wrapper reveal">
            <div className="founder-photo-placeholder" aria-label="Brandon - Founder of Brightpath Web Studio">
              <span>Photo</span>
            </div>
            
            {/* Floating Badges */}
            <div className="floating-badge badge-1">
              <Award className="badge-icon" aria-hidden="true" />
              <div>
                <span className="badge-value">5+</span>
                <span className="badge-label">Years Experience</span>
              </div>
            </div>
            <div className="floating-badge badge-2">
              <Briefcase className="badge-icon" aria-hidden="true" />
              <div>
                <span className="badge-value">50+</span>
                <span className="badge-label">Sites Launched</span>
              </div>
            </div>
          </div>
          
          <div className="about-content reveal reveal-delay-2">
            <h2>Meet the Founder</h2>
            <p className="founder-bio">
              Hi, I'm Brandon, founder of Brightpath Web Studio. I help local businesses grow online by building fast, modern websites designed to generate more calls, leads, and customers.
            </p>
            <p className="founder-mission">
              "My mission is simple: create websites that not only look great but also help businesses grow."
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
