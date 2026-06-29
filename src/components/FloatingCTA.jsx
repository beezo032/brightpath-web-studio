import React, { useState, useEffect } from 'react';
import { Mail, Clipboard, X, Gift, Sparkles, MessageSquare } from 'lucide-react';
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
        <a href="mailto:hello@signalrisestudio.com" className="sticky-btn call-btn">
          <Mail size={18} /> Email Us
        </a>
        <a href="#contact" className="sticky-btn audit-btn">
          <Clipboard size={18} /> Free Roadmap
        </a>
      </div>

      {/* Desktop Slide-In Video Audit Offer */}
      <div className={`desktop-audit-widget ${showAuditWidget ? 'active' : ''}`} role="dialog" aria-label="Free Growth Roadmap Promotion">
        <button className="widget-close" onClick={handleClose} aria-label="Close promotion">
          <X size={16} />
        </button>
        <div className="widget-icon">
          <Gift size={24} />
        </div>
        <div className="widget-content">
          <h4>Free Growth Roadmap</h4>
          <p>Send us your goals and we'll draft a custom strategy roadmap and pricing quote for your project.</p>
          <a href="#contact" className="btn btn-primary btn-sm pulse-cta" onClick={() => setShowAuditWidget(false)}>
            Get My Roadmap <Sparkles size={14} style={{ marginLeft: '0.25rem' }} />
          </a>
        </div>
      </div>
    </>
  );
};

export default FloatingCTA;
