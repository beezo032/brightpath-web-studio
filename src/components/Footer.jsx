import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer reveal">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="logo">
              <span className="logo-accent">Bright</span>path
            </a>
            <p className="footer-desc">
              Building high-converting, premium websites for local service businesses. We help you turn visitors into paying customers.
            </p>
          </div>
          
          <nav className="footer-links" aria-label="Services navigation">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Custom Web Design</a></li>
              <li><a href="#services">Website Redesign</a></li>
              <li><a href="#services">Local SEO</a></li>
              <li><a href="#services">Google Business Profile</a></li>
            </ul>
          </nav>
          
          <nav className="footer-links" aria-label="Company navigation">
            <h4>Company</h4>
            <ul>
              <li><a href="#portfolio">Our Work</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#process">Process</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          
          <nav className="footer-links" aria-label="Legal navigation">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </nav>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Brightpath Web Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
