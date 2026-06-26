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
        <Link to="/" className="logo" aria-label="SignalRise Studio - Home">
              <span className="logo-accent">Signal</span>Rise Studio
            </Link>
            <p className="footer-desc">
              Building high-converting, premium websites for local service businesses. We help you turn visitors into paying customers.
            </p>
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
          <p>&copy; {currentYear} SignalRise Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

