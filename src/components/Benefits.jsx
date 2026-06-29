import React from 'react';
import { Smartphone, Search, Zap, MessageCircle, HeadphonesIcon, Code, ArrowRight } from 'lucide-react';
import './Benefits.css';

const benefits = [
  { icon: <Smartphone size={28} />, title: "Mobile-First Design", text: "Every website is engineered to look flawless and load instantly on all smartphones and tablets." },
  { icon: <Search size={28} />, title: "SEO-Friendly Development", text: "Built from the ground up with clean code and local SEO best practices to help you rank higher on Google." },
  { icon: <Zap size={28} />, title: "Fast Turnaround", text: "We deliver premium, high-converting websites quickly, so you can start generating leads sooner." },
  { icon: <MessageCircle size={28} />, title: "Direct Communication", text: "You work directly with the developer—no confusing jargon, no middlemen, just clear updates." },
  { icon: <HeadphonesIcon size={28} />, title: "Ongoing Support", text: "We handle all the technical updates, hosting, and security so you can focus entirely on your business." },
  { icon: <Code size={28} />, title: "Fully Custom Websites", text: "No generic templates. Your website is custom-built to reflect your unique brand and business goals." }
];

const Benefits = () => {
  return (
    <section id="benefits" className="benefits section section-light relative">
      <div className="container relative z-10">
        <div className="section-header text-center reveal">
          <h2>Why Businesses Choose Signal Light Studio</h2>
          <p className="subtitle" style={{maxWidth: '700px', margin: '0 auto'}}>
            We build websites designed to help local businesses grow online and generate more customers.
          </p>
        </div>
        
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className={`benefit-card reveal reveal-delay-${(index % 3) + 1}`}>
              <div className="benefit-icon-wrapper" aria-hidden="true">
                {benefit.icon}
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </div>
          ))}
        </div>
        
        <div className="section-cta text-center reveal reveal-delay-2" style={{marginTop: '4rem'}}>
          <a href="#contact" className="btn btn-primary pulse-cta" style={{display: 'inline-flex', alignItems: 'center'}}>
            Become Our Next Success Story <ArrowRight size={18} style={{marginLeft: '0.5rem'}} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Benefits;

