import React from 'react';
import { Leaf, Sprout, Droplets, Scissors, Sparkles, Church, Hammer, Utensils, ArrowRight } from 'lucide-react';
import './Industries.css';

const industries = [
  { icon: <Leaf size={24} />, title: "Landscaping", desc: "High-converting websites to secure large seasonal contracts and commercial projects." },
  { icon: <Sprout size={24} />, title: "Lawn Care", desc: "Capture local search traffic and turn website visitors into loyal weekly clients." },
  { icon: <Droplets size={24} />, title: "Pressure Washing", desc: "Highlight dramatic before-and-after transformations to build immediate trust." },
  { icon: <Scissors size={24} />, title: "Barbershops", desc: "Sleek, modern designs integrated with your booking system to keep chairs full." },
  { icon: <Sparkles size={24} />, title: "Cleaning", desc: "Professional, trustworthy sites that make requesting quotes incredibly easy." },
  { icon: <Church size={24} />, title: "Churches", desc: "Welcoming online homes that make it easy for new visitors to plan their first visit." },
  { icon: <Hammer size={24} />, title: "Contractors", desc: "Showcase your best projects and gather highly qualified leads effortlessly." },
  { icon: <Utensils size={24} />, title: "Restaurants", desc: "Mouth-watering designs with easily accessible menus and reservation integrations." }
];

const Industries = () => {
  return (
    <section id="industries" className="industries section section-light relative">
      <div className="container">
        <div className="section-header text-center reveal">
          <h2>Industries We Serve</h2>
          <p className="subtitle">We specialize in helping local service businesses stand out online.</p>
        </div>
        
        <div className="industries-grid">
          {industries.map((ind, index) => (
            <div key={index} className={`industry-card reveal reveal-delay-${(index % 4) + 1}`}>
              <div className="industry-icon-wrapper" aria-hidden="true">
                {ind.icon}
              </div>
              <h3>{ind.title}</h3>
              <p>{ind.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="section-cta text-center reveal reveal-delay-2" style={{marginTop: '4rem'}}>
          <a href="#contact" className="btn btn-primary pulse-cta" style={{display: 'inline-flex', alignItems: 'center'}}>
            Don't see your industry? Let's talk <ArrowRight size={18} style={{marginLeft: '0.5rem'}} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Industries;
