import React, { useState, useEffect } from 'react';
import { ExternalLink, Code } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './PortfolioPage.css';

const allProjects = [
  {
    id: 1,
    title: "We Can Do It! Lawn & Landscape",
    category: "Landscaping",
    description: "Modern redesign for a local landscaping company focused on generating more quote requests and showcasing services.",
    services: ["Website Design", "Mobile Optimization", "Local SEO", "Lead Generation"],
    technologies: ["React", "Vite", "CSS"],
    results: "+45% Quote Requests",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Modern Barbershop Website",
    category: "Grooming",
    description: "Sleek, dark-themed website with integrated booking to help a local barbershop manage their growing clientele.",
    services: ["Web Design", "Booking Integration", "Local SEO"],
    technologies: ["React", "Animations", "Tailwind"],
    results: "Automated Booking Flow",
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Elite Pressure Washing Website",
    category: "Home Services",
    description: "Visually striking site highlighting dramatic before-and-after transformations to build immediate customer trust.",
    services: ["Web Design", "SEO Setup", "Speed Optimization"],
    technologies: ["React", "Vite", "CSS3"],
    results: "Top 3 Local Maps Ranking",
    demoUrl: "#",
    githubUrl: "#"
  }
];

const categories = ["All", "Landscaping", "Grooming", "Home Services"];

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(allProjects);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(allProjects);
    } else {
      setFilteredProjects(allProjects.filter(p => p.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <main className="portfolio-page">
      <Helmet>
        <title>Our Work & Portfolio | Brightpath Web Studio</title>
        <meta name="description" content="Explore our portfolio of high-converting websites designed specifically for landscaping, grooming, and local service businesses." />
        <meta property="og:title" content="Our Work & Portfolio | Brightpath Web Studio" />
        <meta property="og:description" content="Explore our portfolio of high-converting websites designed specifically for landscaping, grooming, and local service businesses." />
      </Helmet>

      <section className="portfolio-hero section-dark text-center">
        <div className="container reveal">
          <div className="badge" style={{marginBottom: '1rem'}}>Our Work</div>
          <h1>Featured Projects</h1>
          <p className="subtitle" style={{maxWidth: '700px', margin: '0 auto'}}>
            Explore websites designed to help businesses attract more customers and grow online.
          </p>
        </div>
      </section>

      <section className="portfolio-gallery section section-light">
        <div className="container">
          
          <div className="portfolio-filters reveal reveal-delay-1">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="portfolio-page-grid">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="portfolio-detail-card reveal">
                <div className="portfolio-image-container">
                  <div className="portfolio-image-placeholder">
                    <span>{project.title} Screenshot</span>
                  </div>
                  <div className="portfolio-category-badge">{project.category}</div>
                </div>
                
                <div className="portfolio-detail-content">
                  <h2>{project.title}</h2>
                  <p className="portfolio-desc">{project.description}</p>
                  
                  <div className="portfolio-meta-grid">
                    <div className="meta-column">
                      <span className="meta-title">Services Provided</span>
                      <ul className="meta-list">
                        {project.services.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                    <div className="meta-column">
                      <span className="meta-title">Technologies</span>
                      <ul className="meta-list">
                        {project.technologies.map((t, i) => <li key={i}>{t}</li>)}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="portfolio-results-box">
                    <strong>Results:</strong> {project.results}
                  </div>
                  
                  <div className="portfolio-card-actions">
                    <a href={project.demoUrl} className="btn btn-primary" style={{flex: 1}}>
                      Live Demo <ExternalLink size={18} style={{marginLeft: '0.5rem'}} />
                    </a>
                    <a href={project.githubUrl} className="btn btn-outline" style={{flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
                      <Code size={16} aria-hidden="true" /> View Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
};

export default PortfolioPage;
