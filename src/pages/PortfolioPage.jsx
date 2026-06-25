import React, { useState, useEffect } from 'react';
import { ExternalLink, Code } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './PortfolioPage.css';

const allProjects = [
  {
    id: 1,
    title: "We Can Do It Landscaping",
    category: "Landscaping",
    description: "Modern redesign for a local landscaping company focused on generating more quote requests and showcasing services.",
    services: ["Website Design", "Mobile Optimization", "Local SEO", "Lead Generation"],
    technologies: ["React", "Vite", "CSS"],
    results: "+45% Quote Requests",
    demoUrl: "#",
    githubUrl: "#",
    image: "https://images.unsplash.com/photo-1558661091-5cc1b64d0dc5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Razorcut Barbershop",
    category: "Grooming",
    description: "Sleek, dark-themed website with integrated booking to help a local barbershop manage their growing clientele.",
    services: ["Web Design", "Booking Integration", "Local SEO"],
    technologies: ["React", "Animations", "Tailwind"],
    results: "Automated Booking Flow",
    demoUrl: "#",
    githubUrl: "#",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "The Atma Corner",
    category: "Restaurant & Wine Bar",
    description: "Visually striking site highlighting menus and reservations to build immediate customer trust.",
    services: ["Web Design", "SEO Setup", "Speed Optimization"],
    technologies: ["React", "Vite", "CSS3"],
    results: "Top 3 Local Maps Ranking",
    demoUrl: "#",
    githubUrl: "#",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Razor Cuts Barbershop Demo",
    category: "Barbershop / Beauty Salon",
    description: "A modern barbershop website concept designed to increase bookings, calls, and local trust.",
    services: ["Website Design", "Mobile Optimization", "Booking CTA", "Local SEO", "Lead Capture"],
    technologies: ["React", "Vite", "Vanilla CSS"],
    results: "Demo Concept",
    demoUrl: "https://beezo032.github.io/razor-cuts/",
    caseStudyUrl: "/portfolio/razor-cuts-demo",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop"
  }
];

const categories = ["All", "Landscaping", "Grooming", "Restaurant & Wine Bar", "Barbershop / Beauty Salon"];

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
            {filteredProjects.map((project) => (
              <div key={project.id} className="portfolio-detail-card reveal">
                <div className="portfolio-image-container">
                  <img 
                    src={project.image} 
                    alt={`Screenshot of ${project.title} website`} 
                    style={{width: '100%', height: '300px', objectFit: 'cover', borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}} 
                  />
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
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{flex: 1}}>
                      View Demo <ExternalLink size={18} style={{marginLeft: '0.5rem'}} />
                    </a>
                    {project.caseStudyUrl ? (
                      <a href={project.caseStudyUrl} className="btn btn-outline" style={{flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
                        View Case Study
                      </a>
                    ) : (
                      <a href={project.githubUrl} className="btn btn-outline" style={{flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Code size={16} aria-hidden="true" /> View Code
                      </a>
                    )}
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
