import React, { useState, useEffect } from 'react';
import './PromoBanner.css';
import { X } from 'lucide-react';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('promo_america250_dismissed_v2');
    if (!isDismissed) {
      setIsVisible(true);
      document.documentElement.style.setProperty('--promo-banner-height', '48px');
    } else {
      document.documentElement.style.setProperty('--promo-banner-height', '0px');
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('promo_america250_dismissed_v2', 'true');
    document.documentElement.style.setProperty('--promo-banner-height', '0px');
  };

  if (!isVisible) return null;

  return (
    <div className="promo-banner" role="alert" aria-label="Promotional offer">
      <div className="promo-banner-content">
        <span className="promo-banner-text">
          <span className="promo-icon" aria-hidden="true">🇺🇸</span> 
          <strong>America 250 Small Business Launch</strong> &mdash; Professionally Designed Websites for $250 <span className="promo-strike">(Normally $499)</span>
        </span>
        <a href="/#pricing" className="promo-banner-btn">Claim Offer</a>
      </div>
      <button 
        className="promo-banner-close" 
        onClick={handleDismiss} 
        aria-label="Dismiss promotional banner"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default PromoBanner;
