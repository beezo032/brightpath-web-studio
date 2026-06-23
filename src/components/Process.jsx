import React from 'react';
import { Search, PenTool, Code, Rocket, HeadphonesIcon } from 'lucide-react';
import './Process.css';

const steps = [
  {
    icon: <Search className="process-icon" />,
    title: "1. Strategy Session",
    description: "We dive deep into your business goals, target customers, and what makes you unique so we can position you to win."
  },
  {
    icon: <PenTool className="process-icon" />,
    title: "2. Custom Mockup",
    description: "You'll see exactly how your new website will look and function before we write a single line of code."
  },
  {
    icon: <Code className="process-icon" />,
    title: "3. Development",
    description: "We build your site to be lightning-fast, secure, and perfectly optimized for both mobile phones and desktop computers."
  },
  {
    icon: <Rocket className="process-icon" />,
    title: "4. Go Live",
    description: "We handle all the technical details of launching your site, connecting your domain, and setting up analytics."
  },
  {
    icon: <HeadphonesIcon className="process-icon" />,
    title: "5. Ongoing Growth",
    description: "Our relationship doesn't end at launch. We provide affordable monthly care to keep your site updated and secure."
  }
];

const Process = () => {
  return (
    <section id="process" className="process section section-gray">
      <div className="container">
        <div className="section-header text-center reveal">
          <h2>Our Proven Process</h2>
          <p className="subtitle">From idea to launch, we make getting a new website simple and stress-free.</p>
        </div>
        
        <div className="process-timeline">
          {steps.map((step, index) => (
            <div key={index} className={`process-step reveal reveal-delay-${Math.min(index + 1, 3)}`}>
              <div className="process-icon-wrapper">
                {step.icon}
              </div>
              <div className="process-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="process-connector"></div>}
            </div>
          ))}
        </div>

        <div className="section-cta text-center reveal reveal-delay-2" style={{marginTop: '4rem'}}>
          <a href="#contact" className="btn btn-primary pulse-cta">
            Start Your Journey Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;
