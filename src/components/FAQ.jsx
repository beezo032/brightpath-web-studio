import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    question: "How much does a website cost?",
    answer: "Our Starter Launch package begins at $499, and our most popular Growth Package is $999. Every project is unique, so we'll provide a custom quote after our initial strategy session based on your specific needs."
  },
  {
    question: "How long does a website project take?",
    answer: "Most of our local business websites take between 2 to 4 weeks to launch from the moment we start. More complex projects may take a bit longer, but we always keep you updated every step of the way."
  },
  {
    question: "Do you offer monthly maintenance?",
    answer: "Yes! We highly recommend our Stress-Free Monthly Care plan for $99/month. We handle all hosting, security updates, daily backups, and minor content changes so you can focus entirely on running your business."
  },
  {
    question: "Will my website work on mobile devices?",
    answer: "Absolutely. Over half of all local searches happen on smartphones. We use a mobile-first design approach to ensure your website looks flawless and loads instantly on every device."
  },
  {
    question: "Can you redesign my current website?",
    answer: "Yes, we specialize in modernizing outdated websites. A strategic redesign can dramatically improve your brand perception, load times, and ability to convert visitors into paying customers."
  },
  {
    question: "Do you provide hosting assistance?",
    answer: "We do! Our monthly care plans include premium, lightning-fast hosting. If you prefer to host it yourself, we will gladly assist you in setting everything up on your preferred platform."
  },
  {
    question: "Will my website be SEO optimized?",
    answer: "Yes. Every website we build includes foundational Local SEO best practices. We optimize your structure, headings, page speed, and mobile responsiveness to give you a massive head start on Google."
  },
  {
    question: "How do we get started?",
    answer: "It's simple. Fill out our contact form or give us a call. We'll schedule a brief, no-pressure discovery session to understand your goals, after which we'll send over a custom proposal and next steps."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq section section-gray">
      <div className="container">
        <div className="section-header text-center reveal">
          <h2>Frequently Asked Questions</h2>
          <p className="subtitle">Got questions? We've got answers to help you make the best decision for your business.</p>
        </div>
        
        <div className="faq-accordion reveal reveal-delay-1">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.question}</span>
                <ChevronDown className={`faq-icon ${openIndex === index ? 'rotate' : ''}`} size={20} />
              </button>
              <div 
                id={`faq-answer-${index}`}
                className="faq-answer-wrapper"
                aria-hidden={openIndex !== index}
              >
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="section-cta text-center reveal reveal-delay-2" style={{marginTop: '4rem', background: 'white', padding: '3rem', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)'}}>
          <h3 style={{marginBottom: '1rem', color: 'var(--color-primary)'}}>Still have questions?</h3>
          <p style={{color: 'var(--color-text-muted)', marginBottom: '1.5rem'}}>We're happy to answer them. Hop on a quick call with us.</p>
          <a href="#contact" className="btn btn-primary pulse-cta">Speak directly with our team</a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
