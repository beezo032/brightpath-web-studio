import React from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

const reviews = [
  {
    name: "Michael R.",
    business: "Elite Pressure Washing",
    review: "Ascend Digital Co completely transformed our online presence. We went from getting 1-2 calls a week to 3-5 a day. The site paid for itself in the first month."
  },
  {
    name: "Sarah J.",
    business: "Spotless Cleaning Co.",
    review: "The process was incredibly smooth. They understood exactly what my cleaning business needed. The new lead capture form has been a game changer for our quoting process."
  },
  {
    name: "David T.",
    business: "Tanner Contracting",
    review: "Fast, professional, and responsive. I've worked with other agencies before, but Ascend Digital Co delivered a better product for a fraction of the price. Highly recommend."
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials section section-light">
      <div className="container">
        <div className="section-header text-center reveal">
          <h2>Client Success Stories</h2>
          <p className="subtitle">Don't just take our word for it. See what our clients have to say.</p>
        </div>
        
        <div className="testimonials-grid">
          {reviews.map((review, index) => (
            <div key={index} className={`testimonial-card reveal reveal-delay-${(index % 3) + 1}`}>
              <div className="stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={20} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <p className="review-text">"{review.review}"</p>
              <div className="reviewer">
                <div className="reviewer-avatar">
                  {review.name.charAt(0)}
                </div>
                <div className="reviewer-info">
                  <div className="reviewer-name">{review.name}</div>
                  <div className="reviewer-business">{review.business}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="section-cta text-center reveal reveal-delay-2" style={{marginTop: '4rem'}}>
          <a href="#contact" className="btn btn-primary pulse-cta" style={{display: 'inline-flex', alignItems: 'center'}}>
            Become Our Next Success Story <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '0.5rem'}}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
