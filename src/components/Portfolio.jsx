import React from 'react';
import { ExternalLink } from 'lucide-react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio section section-light">
      <div className="container">
        <div className="section-header reveal">
          <h2>Featured Work</h2>
          <p className="subtitle">
            Take a look at how we've helped local businesses transform their online presence.
          </p>
        </div>
        
        <div className="case-study reveal reveal-delay-1">
          <div className="case-study-image" aria-label="Mockup of GreenScapes Landscaping website">
            <div className="browser-mockup">
              <div className="browser-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="browser-content">
                <div className="placeholder-website-image">
                  <div className="site-hero">
                    <div className="site-title">GreenScapes Landscaping</div>
                    <div className="site-btn">Get a Quote</div>
                  </div>
                  <div className="site-body">
                    <div className="site-card"></div>
                    <div className="site-card"></div>
                    <div className="site-card"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="case-study-content">
            <div className="case-study-tag">Landscaping Company</div>
            <h3>GreenScapes Complete Redesign</h3>
            <p className="case-study-desc">
              GreenScapes needed a website that matched the quality of their work. We built a custom, mobile-first design focused on capturing leads for high-value hardscaping projects.
            </p>
            
            <div className="results-grid">
              <div className="result-item">
                <div className="result-number">+145%</div>
                <div className="result-label">More Leads</div>
              </div>
              <div className="result-item">
                <div className="result-number">#1</div>
                <div className="result-label">Local Ranking</div>
              </div>
              <div className="result-item">
                <div className="result-number">2.1s</div>
                <div className="result-label">Load Time</div>
              </div>
            </div>
            
            <a href="#contact" className="btn btn-secondary">
              View Live Site <ExternalLink size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
