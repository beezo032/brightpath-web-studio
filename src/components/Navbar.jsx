import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <span className="logo-accent">Bright</span>path
        </Link>
        
        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <NavLink to="/about" className={({isActive}) => isActive ? 'active-link' : ''} onClick={() => setMobileMenuOpen(false)}>About</NavLink>
          <NavLink to="/services" className={({isActive}) => isActive ? 'active-link' : ''} onClick={() => setMobileMenuOpen(false)}>Services</NavLink>
          <NavLink to="/portfolio" className={({isActive}) => isActive ? 'active-link' : ''} onClick={() => setMobileMenuOpen(false)}>Work</NavLink>
          <Link to="/#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <Link to="/contact" className="btn btn-primary pulse-cta" onClick={() => setMobileMenuOpen(false)}>Get a Quote</Link>
        </nav>

        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
