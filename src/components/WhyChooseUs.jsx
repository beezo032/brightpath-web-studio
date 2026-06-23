import React from 'react';
import { Zap, Smartphone, DollarSign, Users } from 'lucide-react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  return (
    <section className="why-us section section-dark">
      <div className="container">
        <div className="why-us-grid">
          <div className="why-us-content reveal">
            <h2>Why Choose Brightpath?</h2>
            <p className="subtitle">
              A pretty website isn't enough. You need a platform that actively works to grow your bottom line. Here is how we make that happen.
            </p>
            <div className="why-us-features">
              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true"><Zap size={24} /></div>
                <div>
                  <h4>Instantly Fast Loading</h4>
                  <p>Slow sites kill conversions. Our code is optimized for speed so you never lose a frustrated visitor.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true"><Smartphone size={24} /></div>
                <div>
                  <h4>Flawless on Mobile</h4>
                  <p>Most of your customers are searching on their phones. We ensure your site looks and works perfectly on every device.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true"><DollarSign size={24} /></div>
                <div>
                  <h4>High ROI Pricing</h4>
                  <p>Get top-tier agency quality without the bloated price tag. Your new site is an investment that pays for itself.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon" aria-hidden="true"><Users size={24} /></div>
                <div>
                  <h4>Built to Convert</h4>
                  <p>Every button, form, and layout decision is strategically placed to maximize your calls and quote requests.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="why-us-image reveal reveal-delay-2" aria-hidden="true">
            <div className="stat-card stat-1">
              <div className="stat-value">99%</div>
              <div className="stat-label">Performance Score</div>
            </div>
            <div className="stat-card stat-2">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Lead Capture</div>
            </div>
            <div className="stat-card stat-3">
              <div className="stat-value">100%</div>
              <div className="stat-label">Responsive</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
