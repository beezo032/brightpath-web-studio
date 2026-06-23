import React from 'react';
import { Layout, RefreshCw, TrendingUp, MapPin, ClipboardList, ShieldCheck } from 'lucide-react';
import './Services.css';

const services = [
  {
    icon: <Layout className="service-icon" />,
    title: "High-Converting Web Design",
    description: "Get a beautiful, mobile-friendly site designed specifically to turn casual visitors into paying customers."
  },
  {
    icon: <RefreshCw className="service-icon" />,
    title: "Strategic Website Redesigns",
    description: "Stop losing leads to a dated website. We'll modernize your online presence to build instant trust and authority."
  },
  {
    icon: <TrendingUp className="service-icon" />,
    title: "Local Search Dominance",
    description: "Rank higher on Google so when people search for your services in your area, your phone rings instead of your competitors'."
  },
  {
    icon: <MapPin className="service-icon" />,
    title: "Google Business Optimization",
    description: "Maximize your visibility in local maps and reviews to capture the most engaged, ready-to-buy customers."
  },
  {
    icon: <ClipboardList className="service-icon" />,
    title: "Automated Lead Capture",
    description: "Make it incredibly easy for prospects to request a quote or book an appointment right from their phone."
  },
  {
    icon: <ShieldCheck className="service-icon" />,
    title: "Stress-Free Monthly Support",
    description: "Focus on running your business. We'll handle hosting, security, and updates so your site stays fast and secure."
  }
];

const Services = () => {
  return (
    <section id="services" className="services section section-gray">
      <div className="container">
        <div className="section-header text-center reveal">
          <h2>Everything You Need to Grow Online</h2>
          <p className="subtitle">
            We handle the technical details so you can focus on what you do best—running your local business.
          </p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`service-card reveal reveal-delay-${(index % 3) + 1}`}
            >
              <div className="service-icon-wrapper" aria-hidden="true">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="section-cta text-center reveal reveal-delay-2" style={{marginTop: '4rem', background: 'var(--color-bg-gray)', padding: '3rem', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--color-border)'}}>
          <h3 style={{marginBottom: '1rem', color: 'var(--color-primary)'}}>Not sure exactly what you need?</h3>
          <p style={{color: 'var(--color-text-muted)', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem'}}>Every business is different. Let's hop on a quick call to figure out the best approach for your specific goals.</p>
          <a href="#contact" className="btn btn-primary pulse-cta">Get a Free Website Audit</a>
        </div>
      </div>
    </section>
  );
};

export default Services;
