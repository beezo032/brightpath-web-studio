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
          {/* Starter Launch */}
          <div className="pricing-card reveal reveal-delay-1">
            <div className="pricing-header">
              <h3>Starter Launch</h3>
              <div className="price"><span>$</span>499</div>
              <p>Perfect for new businesses that need a professional online presence.</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li><Check className="check-icon" /> Up to 3 pages</li>
                <li><Check className="check-icon" /> Custom design</li>
                <li><Check className="check-icon" /> Mobile responsive</li>
                <li><Check className="check-icon" /> Contact form</li>
                <li><Check className="check-icon" /> Basic local SEO setup</li>
                <li><Check className="check-icon" /> Google Maps integration</li>
                <li><Check className="check-icon" /> Social media links</li>
                <li><Check className="check-icon" /> 1 round of revisions</li>
              </ul>
            </div>
            <div className="pricing-footer">
              <a href="#contact" className="btn btn-secondary full-width" style={{textAlign: 'center', display: 'block'}}>Get Started</a>
            </div>
          </div>
          
          {/* Growth Package */}
          <div className="pricing-card popular reveal reveal-delay-2">
            <div className="popular-badge">Most Popular</div>
            <div className="pricing-header">
              <h3>Growth Package</h3>
              <div className="price"><span>$</span>999</div>
              <p>Designed for businesses ready to consistently generate leads.</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li><Check className="check-icon" /> Everything in Starter</li>
                <li><Check className="check-icon" /> Up to 7 pages</li>
                <li><Check className="check-icon" /> Advanced local SEO</li>
                <li><Check className="check-icon" /> Google Business Profile optimization</li>
                <li><Check className="check-icon" /> Lead capture forms</li>
                <li><Check className="check-icon" /> Testimonials section</li>
                <li><Check className="check-icon" /> Photo gallery</li>
                <li><Check className="check-icon" /> Speed optimization</li>
                <li><Check className="check-icon" /> 2 rounds of revisions</li>
              </ul>
            </div>
            <div className="pricing-cta">
              <a href="#contact" className="btn btn-primary pulse-cta" style={{width: '100%', textAlign: 'center', display: 'block'}}>Get Started</a>
            </div>
          </div>
          
          {/* Premium Authority */}
          <div className="pricing-card reveal reveal-delay-3">
            <div className="pricing-header">
              <h3>Premium Authority</h3>
              <div className="price"><span>$</span>1,999<span>+</span></div>
              <p>For businesses that want a stronger online presence and more advanced lead systems.</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li><Check className="check-icon" /> Everything in Growth</li>
                <li><Check className="check-icon" /> 10+ pages</li>
                <li><Check className="check-icon" /> Blog/CMS setup</li>
                <li><Check className="check-icon" /> CRM integration</li>
                <li><Check className="check-icon" /> Automated lead notifications</li>
                <li><Check className="check-icon" /> Booking system integration</li>
                <li><Check className="check-icon" /> Custom animations</li>
                <li><Check className="check-icon" /> Priority support</li>
                <li><Check className="check-icon" /> Competitor analysis</li>
                <li><Check className="check-icon" /> Ongoing strategy consultation</li>
              </ul>
            </div>
            <div className="pricing-footer">
              <a href="#contact" className="btn btn-secondary full-width" style={{textAlign: 'center', display: 'block'}}>Get Started</a>
            </div>
          </div>
        </div>
        
        {/* Optional Care Plan */}
        <div className="monthly-care reveal reveal-delay-1">
          <div className="monthly-content">
            <h3>Optional Website Care Plan</h3>
            <div className="price">$99<span>/month</span></div>
            <p>Keep your website secure, updated, and running smoothly.</p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-dark)' }}>
                <Check className="check-icon" style={{width: '18px', height: '18px'}} /> Hosting
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-dark)' }}>
                <Check className="check-icon" style={{width: '18px', height: '18px'}} /> Security updates
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-dark)' }}>
                <Check className="check-icon" style={{width: '18px', height: '18px'}} /> Backups
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-dark)' }}>
                <Check className="check-icon" style={{width: '18px', height: '18px'}} /> Minor content edits
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-dark)' }}>
                <Check className="check-icon" style={{width: '18px', height: '18px'}} /> Uptime monitoring
              </li>
            </ul>
          </div>
          <div className="monthly-action">
             <a href="#contact" className="btn btn-dark">Add Care Plan</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
