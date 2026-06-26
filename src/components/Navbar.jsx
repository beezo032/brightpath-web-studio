import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
          <span className="logo-accent">Signal</span>Rise Studio
        </Link>
        
        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <NavLink to="/about" className={({isActive}) => isActive ? 'active-link' : ''} onClick={() => setMobileMenuOpen(false)}>About</NavLink>
          <NavLink to="/services" className={({isActive}) => isActive ? 'active-link' : ''} onClick={() => setMobileMenuOpen(false)}>Services</NavLink>
          
          <div 
            className={`nav-dropdown ${dropdownOpen ? 'active' : ''}`}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button 
              className="dropdown-trigger" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              Industries <ChevronDown size={14} />
            </button>
            <div className="dropdown-menu">
              <Link to="/dental-web-design" className="dropdown-item" onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }}>Dental Web Design</Link>
              <Link to="/landscaper-web-design" className="dropdown-item" onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }}>Landscaper Web Design</Link>
              <Link to="/contractor-web-design" className="dropdown-item" onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }}>Contractor Web Design</Link>
              <Link to="/hvac-web-design" className="dropdown-item" onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }}>HVAC Web Design</Link>
              <Link to="/barbershop-web-design" className="dropdown-item" onClick={() => { setMobileMenuOpen(false); setDropdownOpen(false); }}>Barbershop Web Design</Link>
            </div>
          </div>

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

