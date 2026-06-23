import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import './Portfolio.css';

const projects = [
  {
    title: "We Can Do It! Lawn & Landscape",
    category: "Landscaping",
    description: "A high-converting lead generation website designed to capture seasonal lawn care contracts and large landscaping quotes.",
    services: ["Web Design", "Local SEO", "Copywriting"],
    technologies: ["React", "Vite", "CSS3"],
    results: "+45% Quote Requests",
  },
  {
    title: "Premium Barbershop Demo",
    category: "Grooming",
    description: "A sleek, dark-themed website with integrated booking to help a local barbershop manage their growing clientele.",
    services: ["Redesign", "Booking Integration"],
    technologies: ["React", "Custom CSS"],
    results: "Fully Booked Schedule",
  },
  {
    title: "Elite Pressure Washing Demo",
    category: "Home Services",
    description: "A visually striking site highlighting dramatic before-and-after transformations to build immediate customer trust.",
    services: ["Web Design", "SEO Setup"],
    technologies: ["React", "Animations"],
    results: "Top 3 Local Maps Ranking",
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
                {/* Placeholder for screenshot */}
                <div className="project-image-placeholder">
                  <span>Screenshot Coming Soon</span>
                </div>
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
                
                <a href="#contact" className="btn btn-outline" style={{width: '100%', textAlign: 'center'}}>
                  View Full Case Study
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="portfolio-actions reveal reveal-delay-2">
          <a href="#contact" className="btn btn-secondary pulse-cta" style={{display: 'inline-flex', alignItems: 'center'}}>
            See How We Can Transform Your Business <ArrowRight size={18} style={{marginLeft: '0.5rem'}} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
