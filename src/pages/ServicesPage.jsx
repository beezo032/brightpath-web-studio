import React, { useEffect } from 'react';
import { Layout, PenTool, Search, MapPin, ShieldCheck, Target, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import { Helmet } from 'react-helmet-async';
import './ServicesPage.css';

const servicesData = [
  {
    id: "custom-design",
    title: "Custom Website Design",
    icon: <Layout size={32} />,
    description: "We build premium, custom websites from scratch, tailored perfectly to your brand identity and business goals. No generic templates, just high-converting designs.",
    benefits: ["Stand out from local competitors", "Build immediate trust with prospects", "Capture more high-value leads"],
    features: ["Bespoke UI/UX Design", "Mobile-First Architecture", "Fast Load Times", "Custom Animations"],
  },
  {
    id: "redesign",
    title: "Website Redesign",
    icon: <PenTool size={32} />,
    description: "Is your current website looking outdated or failing to generate leads? We'll overhaul your existing site into a modern, conversion-optimized powerhouse.",
    benefits: ["Refresh your brand image", "Improve user experience", "Increase conversion rates"],
    features: ["Content Migration", "Modern Visual Overhaul", "Performance Upgrades", "SEO Preservation"],
  },
  {
    id: "local-seo",
    title: "Local SEO Setup",
    icon: <Search size={32} />,
    description: "Rank higher on Google when local customers search for your services. We implement proven on-page SEO strategies to maximize your local visibility.",
    benefits: ["Get found by ready-to-buy customers", "Dominate local search results", "Reduce reliance on paid ads"],
    features: ["Keyword Optimization", "Meta Tag Engineering", "Schema Markup", "Site Structure Setup"],
  },
  {
    id: "gbp",
    title: "Google Business Profile Optimization",
    icon: <MapPin size={32} />,
    description: "Your Google Business Profile is often the first thing customers see. We optimize it fully so you appear in the coveted Google 'Local Pack'.",
    benefits: ["Increase map visibility", "Drive more direct phone calls", "Build social proof with reviews"],
    features: ["Profile Claiming & Verification", "Category Optimization", "Photo & Post Strategy", "Review Management Setup"],
  },
  {
    id: "care-plans",
    title: "Monthly Website Care Plans",
    icon: <ShieldCheck size={32} />,
    description: "Never worry about your website going down or getting hacked. Our care plans handle all the technical heavy lifting so you can focus on your business.",
    benefits: ["Total peace of mind", "Save hours of technical frustration", "Keep your site fast and secure"],
    features: ["Premium Hosting", "Daily Backups", "Security Monitoring", "Monthly Content Updates"],
  },
  {
    id: "lead-gen",
    title: "Lead Generation Websites",
    icon: <Target size={32} />,
    description: "Websites engineered specifically to capture contact information and quote requests. Perfect for service businesses relying on steady inbound leads.",
    benefits: ["Turn clicks into customers", "Automate your lead funnel", "Grow your revenue predictably"],
    features: ["High-Converting Landing Pages", "Strategic CTA Placement", "CRM Integrations", "Lead Magnet Delivery"],
  }
];

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="services-page">
      <Helmet>
        <title>Our Services | Ascend Digital Co</title>
        <meta name="description" content="Custom website design, local SEO, and monthly care plans engineered to turn visitors into paying customers." />
        <meta property="og:title" content="Our Services | Ascend Digital Co" />
        <meta property="og:description" content="Custom website design, local SEO, and monthly care plans engineered to turn visitors into paying customers." />
      </Helmet>
      
      {/* Hero */}
      <section className="services-hero section-dark text-center">
        <div className="container reveal">
          <div className="badge" style={{marginBottom: '1rem'}}>Our Expertise</div>
          <h1>Website Services Designed to Help Local Businesses Grow</h1>
          <p className="subtitle" style={{maxWidth: '800px', margin: '0 auto'}}>
            We build modern websites that generate more leads, calls, and customers.
          </p>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="services-detailed section section-light">
        <div className="container">
          <div className="services-detailed-list">
            {servicesData.map((service, index) => (
              <div key={service.id} className="service-detail-block reveal" style={{animationDelay: `${(index % 3) * 0.1}s`}}>
                <div className="service-detail-header">
                  <div className="service-icon-large" aria-hidden="true">
                    {service.icon}
                  </div>
                  <h2>{service.title}</h2>
                </div>
                
                <p className="service-desc-large">{service.description}</p>
                
                <div className="service-meta-container">
                  <div className="service-meta-box">
                    <h4>Key Benefits</h4>
                    <ul className="service-check-list">
                      {service.benefits.map((benefit, i) => (
                        <li key={i}><CheckCircle2 className="check-icon" size={18} /> {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="service-meta-box">
                    <h4>What's Included</h4>
                    <ul className="service-check-list">
                      {service.features.map((feature, i) => (
                        <li key={i}><CheckCircle2 className="check-icon" size={18} /> {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="service-action" style={{marginTop: '2rem'}}>
                  <Link to="/#contact" className="btn btn-primary pulse-cta" style={{display: 'inline-flex', alignItems: 'center'}}>
                    Get a Quote for this Service <ArrowRight size={18} style={{marginLeft: '0.5rem'}} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & FAQ integration */}
      <Pricing />
      <FAQ />
      <FinalCTA />
    </main>
  );
};

export default ServicesPage;
