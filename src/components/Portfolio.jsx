import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import './Portfolio.css';

const projects = [
  {
    title: "Aster House Dental",
    category: "Dental",
    description: "A premium website for a luxury boutique dental clinic featuring relationship-first dentistry and calm, patient-focused experiences.",
    services: ["Web Design", "Local SEO", "Custom Booking"],
    technologies: ["React", "TypeScript", "Vite", "Framer Motion"],
    results: "600+ Google Reviews",
    slug: "aster-house-dental",
    image: "/aster_house_dental.webp"
  },
  {
    title: "Northstar Heating & Air",
    category: "HVAC",
    description: "Charlotte’s dependable cooling and heating service site with upfront pricing guides, 24/7 dispatcher, and easy bookings.",
    services: ["Web Design", "SEO Setup", "Speed Optimization"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    results: "4.9 Local Rating",
    slug: "northstar-heating-air",
    image: "/northstar_heating.webp"
  },
  {
    title: "Vesper Tattoo Co.",
    category: "Tattoo Studio",
    description: "Richmond's private, award-winning tattoo shop with custom black & grey, fine line, and realism artwork galleries.",
    services: ["Redesign", "Booking Integration", "Portfolio Gallery"],
    technologies: ["React", "TypeScript", "Vite", "Vanilla CSS"],
    results: "327+ Five-Star Reviews",
    slug: "vesper-tattoo",
    image: "/vesper_tattoo.webp"
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
                <img src={project.image} alt={project.title} width={380} height={240} loading="lazy" style={{width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px'}} />
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
                
                <a href={`/portfolio/${project.slug}`} className="btn btn-outline" style={{width: '100%', textAlign: 'center'}}>
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
