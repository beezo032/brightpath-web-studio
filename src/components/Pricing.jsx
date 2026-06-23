import React from 'react';
import { Check } from 'lucide-react';
import './Pricing.css';

const Pricing = () => {
  return (
    <section id="pricing" className="pricing section section-light">
      <div className="container">
        <div className="section-header text-center reveal">
          <h2>High ROI Pricing</h2>
          <p className="subtitle">Agency-quality websites that pay for themselves in new business.</p>
        </div>
        
        <div className="pricing-grid">
          <div className="pricing-card reveal reveal-delay-1">
            <div className="pricing-header">
              <h3>Starter Site</h3>
              <div className="price"><span>$</span>750</div>
              <p>Perfect for new businesses.</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li><Check className="check-icon" /> 3-Page Custom Design</li>
                <li><Check className="check-icon" /> Mobile Responsive</li>
                <li><Check className="check-icon" /> Basic SEO Setup</li>
                <li><Check className="check-icon" /> Lead Capture Form</li>
                <li><Check className="check-icon" /> 1 Round of Revisions</li>
              </ul>
            </div>
            <div className="pricing-footer">
              <a href="#contact" className="btn btn-secondary full-width">Get Started</a>
            </div>
          </div>
          
          <div className="pricing-card popular reveal reveal-delay-2">
            <div className="popular-badge">Most Popular</div>
            <div className="pricing-header">
              <h3>Growth Site</h3>
              <div className="price"><span>$</span>1,500</div>
              <p>For established local businesses ready to dominate their market and handle a steady flow of new leads.</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li><Check className="check-icon" /> 5 to 7-Page Design</li>
                <li><Check className="check-icon" /> Flawless on Mobile</li>
                <li><Check className="check-icon" /> Advanced Local SEO</li>
                <li><Check className="check-icon" /> Automated Lead Capture</li>
                <li><Check className="check-icon" /> Google Business Setup</li>
                <li><Check className="check-icon" /> Speed Optimization</li>
              </ul>
            </div>
            <div className="pricing-footer">
              <a href="#contact" className="btn btn-primary full-width">Get Started</a>
            </div>
          </div>
          
          <div className="pricing-card reveal reveal-delay-3">
            <div className="pricing-header">
              <h3>Premium Site</h3>
              <div className="price"><span>$</span>2,500<span>+</span></div>
              <p>For complex businesses that need advanced features, integrations, or custom content management.</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li><Check className="check-icon" /> 10+ Pages</li>
                <li><Check className="check-icon" /> Custom Integrations</li>
                <li><Check className="check-icon" /> CMS / Blog Setup</li>
                <li><Check className="check-icon" /> Advanced Animations</li>
                <li><Check className="check-icon" /> Priority Support</li>
              </ul>
            </div>
            <div className="pricing-footer">
              <a href="#contact" className="btn btn-secondary full-width">Get Started</a>
            </div>
          </div>
        </div>
        
        <div className="monthly-care reveal reveal-delay-1">
          <div className="monthly-content">
            <h3>Stress-Free Monthly Care</h3>
            <div className="price">$99<span>/month</span></div>
            <p>Focus on running your business, not updating plugins. Our care plan covers premium hosting, SSL security, daily backups, uptime monitoring, and content updates.</p>
          </div>
          <a href="#contact" className="btn btn-dark">Learn More</a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
