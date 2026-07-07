import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer reveal">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
        <Link to="/" className="logo" aria-label="Signal Light Studio - Home">
              <span className="logo-accent">Signal</span>Light Studio
            </Link>
            <p className="footer-desc">
              Building high-converting, premium websites for local service businesses. We help you turn visitors into paying customers.
            </p>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
              <a href="mailto:hello@signallightstudio.com" style={{ color: 'var(--color-accent-blue)', fontWeight: 600 }}>hello@signallightstudio.com</a>
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="https://www.facebook.com/profile.php?id=61591269344521" target="_blank" rel="noopener noreferrer" aria-label="Signal Light Studio on Facebook" style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>Facebook</a>
            </div>
          </div>
          
          <nav className="footer-links" aria-label="Services navigation">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Custom Web Design</Link></li>
              <li><Link to="/services">Website Redesign</Link></li>
              <li><Link to="/services">Local SEO</Link></li>
              <li><Link to="/services">Google Business Profile</Link></li>
            </ul>
          </nav>

          <nav className="footer-links" aria-label="Niche Web Design">
            <h4>Industries</h4>
            <ul>
              <li><Link to="/dental-web-design">Dental Practices</Link></li>
              <li><Link to="/landscaper-web-design">Landscaping</Link></li>
              <li><Link to="/contractor-web-design">Contractors</Link></li>
              <li><Link to="/hvac-web-design">HVAC & Plumbing</Link></li>
              <li><Link to="/barbershop-web-design">Barbershops</Link></li>
            </ul>
          </nav>

          <nav className="footer-links" aria-label="Local SEO Areas">
            <h4>Local Services</h4>
            <ul>
              <li><Link to="/charleston-sc-web-design">Charleston, SC</Link></li>
              <li><Link to="/summerville-sc-web-design">Summerville, SC</Link></li>
              <li><Link to="/goose-creek-web-design">Goose Creek, SC</Link></li>
            </ul>
          </nav>
          
          <nav className="footer-links" aria-label="Company navigation">
            <h4>Company</h4>
            <ul>
              <li><Link to="/portfolio">Our Work</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/#pricing">Pricing</Link></li>
              <li><Link to="/#process">Process</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
          
          <nav className="footer-links" aria-label="Legal navigation">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </nav>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Signal Light Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

