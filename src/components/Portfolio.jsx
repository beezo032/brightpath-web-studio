import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import './Portfolio.css';

const projects = [
  {
    title: "We Can Do It Landscaping",
    category: "Landscaping",
    description: "A high-converting lead generation website designed to capture seasonal lawn care contracts and large landscaping quotes.",
    services: ["Web Design", "Local SEO", "Copywriting"],
    technologies: ["React", "Vite", "CSS3"],
    results: "Conversion Optimized",
    image: "https://images.unsplash.com/photo-1558661091-5cc1b64d0dc5?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Razorcut Barbershop",
    category: "Grooming",
    description: "A sleek, dark-themed website with integrated booking to help a local barbershop manage their growing clientele.",
    services: ["Redesign", "Booking Integration"],
    technologies: ["React", "Custom CSS"],
    results: "Automated Booking Flow",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "The Atma Corner",
    category: "Restaurant & Wine Bar",
    description: "A visually striking, modern site highlighting menus, reservations, and a premium dining experience.",
    services: ["Web Design", "SEO Setup"],
    technologies: ["React", "Animations"],
    results: "High Local Visibility",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop"
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio section section-light">
      <div className="container">
        <div className="section-header text-center reveal">
          <h2>Featured Projects</h2>
          <p className="subtitle">
            Take a look at how we've helped local businesses transform their online presence and dominate their market.
          </p>
        </div>
        
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div key={index} className={`project-card reveal reveal-delay-${(index % 3) + 1}`}>
              <div className="project-image-wrapper">
                <div className="project-category">{project.category}</div>
                <img src={project.image} alt={project.title} style={{width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px'}} />
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-meta">
                  <div className="meta-group">
                    <span className="meta-label">Services</span>
                    <div className="tags">
                      {project.services.map((service, i) => (
                        <span key={i} className="tag">{service}</span>
                      ))}
                    </div>
                  </div>
                  <div className="meta-group">
                    <span className="meta-label">Technologies</span>
                    <div className="tags">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="project-results">
                  <TrendingUp size={18} />
                  {project.results}
                </div>
                
                <a href="/contact" className="btn btn-outline" style={{width: '100%', textAlign: 'center'}}>
                  View Full Case Study
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="portfolio-actions reveal reveal-delay-2">
          <a href="/contact" className="btn btn-secondary pulse-cta" style={{display: 'inline-flex', alignItems: 'center'}}>
            See How We Can Transform Your Business <ArrowRight size={18} style={{marginLeft: '0.5rem'}} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
