import React from 'react';
import { Layout, RefreshCw, TrendingUp, MapPin, ClipboardList, ShieldCheck } from 'lucide-react';
import './Services.css';

const services = [
  {
    icon: <Layout className="service-icon" />,
    title: "Custom Website Design",
    description: "Get a beautiful, custom, responsive website built from scratch. No generic templates, no cutting corners. Engineered specifically to convert local visitors into paying customers."
  },
  {
    icon: <RefreshCw className="service-icon" />,
    title: "Website Redesign",
    description: "Stop losing business to a dated, slow website. We'll completely modernize your online brand, optimize the user experience, and structure it to double your conversion rate."
  },
  {
    icon: <TrendingUp className="service-icon" />,
    title: "Local SEO",
    description: "Dominate search queries in your town. We build local authority to rank your website and Google Business Profile in the top results so customers call you first."
  },
  {
    icon: <ShieldCheck className="service-icon" />,
    title: "Website Maintenance",
    description: "Enjoy total peace of mind. We handle high-speed hosting, daily cloud backups, SSL security, updates, and content changes so your site stays fast and secure 24/7."
  },
  {
    icon: <MapPin className="service-icon" />,
    title: "Dental Website Design",
    description: "A tailored patient-generation solution for dental practices. High-converting layouts displaying credentials, reviews, and easy appointment scheduling."
  },
  {
    icon: <ClipboardList className="service-icon" />,
    title: "CRM Integration",
    description: "Connect your forms directly to pipelines (like our built-in CRM or ServiceTitan, Housecall Pro, Calendly) to manage leads, followups, and jobs automatically."
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
