import React, { useState, useEffect } from 'react';
import { Phone, Clipboard, X, Gift, Sparkles, MessageSquare } from 'lucide-react';
import './FloatingCTA.css';

const FloatingCTA = () => {
  const [showAuditWidget, setShowAuditWidget] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && !closed) {
        setShowAuditWidget(true);
      } else {
        setShowAuditWidget(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [closed]);

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAuditWidget(false);
    setClosed(true);
  };

  return (
    <>
      {/* Mobile Sticky Bottom Bar */}
      <div className="mobile-sticky-bar" aria-label="Quick contact links">
        <a href="tel:hello@signalrisestudio.com" className="sticky-btn call-btn">
          <Phone size={18} /> Call Now
        </a>
        <a href="#contact" className="sticky-btn audit-btn">
          <Clipboard size={18} /> Free Review
        </a>
      </div>

      {/* Desktop Slide-In Video Audit Offer */}
      <div className={`desktop-audit-widget ${showAuditWidget ? 'active' : ''}`} role="dialog" aria-label="Free Website Audit Promotion">
        <button className="widget-close" onClick={handleClose} aria-label="Close promotion">
          <X size={16} />
        </button>
        <div className="widget-icon">
          <Gift size={24} />
        </div>
        <div className="widget-content">
          <h4>Free Website Video Audit</h4>
          <p>We'll record a custom 5-minute video showing exactly how to get more calls from your website.</p>
          <a href="#contact" className="btn btn-primary btn-sm pulse-cta" onClick={() => setShowAuditWidget(false)}>
            Claim Free Audit <Sparkles size={14} style={{ marginLeft: '0.25rem' }} />
          </a>
        </div>
      </div>
    </>
  );
};

export default FloatingCTA;
