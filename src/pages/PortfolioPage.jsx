import React, { useState, useEffect } from 'react';
import { ExternalLink, Code } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './PortfolioPage.css';

const allProjects = [
  {
    id: 1,
    title: "Aster House Dental",
    category: "Dental",
    description: "A premium website for a luxury boutique dental clinic featuring relationship-first dentistry and calm, patient-focused experiences.",
    services: ["Website Design", "Online Scheduling", "Smile Gallery", "HIPAA-Compliant Layouts"],
    technologies: ["React", "TypeScript", "Vite", "Framer Motion"],
    results: "600+ Google Reviews",
    demoUrl: "https://aster-house-dental.vercel.app/",
    githubUrl: "https://github.com/beezo032/Aster-House-Dental",
    image: "/aster_house_dental.png"
  },
  {
    id: 2,
    title: "Northstar Heating & Air",
    category: "HVAC",
    description: "Charlotte’s dependable cooling and heating service site with upfront pricing guides, 24/7 dispatcher, and easy bookings.",
    services: ["AC Repair & Install", "Heating Services", "Indoor Air Quality", "Emergency Response"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    results: "4.9 Local Rating",
    demoUrl: "https://northstar-heating.vercel.app/",
    githubUrl: "https://github.com/beezo032/Northstar--Heating",
    image: "/northstar_heating.png"
  },
  {
    id: 3,
    title: "Vesper Tattoo Co.",
    category: "Tattoo Studio",
    description: "Richmond's private, award-winning tattoo shop with custom black & grey, fine line, and realism artwork galleries.",
    services: ["Custom Tattooing", "Fine Line Work", "Portrait & Realism", "Strategic Cover-ups"],
    technologies: ["React", "TypeScript", "Vite", "Vanilla CSS"],
    results: "327+ Five-Star Reviews",
    demoUrl: "https://vesper-tattoo.vercel.app/",
    githubUrl: "https://github.com/beezo032/Vesper-Tattoo",
    image: "/vesper_tattoo.png"
  }
];

const categories = ["All", "Dental", "HVAC", "Tattoo Studio"];

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
        <title>Our Work & Portfolio | SignalRise Studio</title>
        <meta name="description" content="Explore our portfolio of high-converting websites designed specifically for landscaping, grooming, and local service businesses." />
        <meta property="og:title" content="Our Work & Portfolio | SignalRise Studio" />
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
              <div key={project.id} className="portfolio-detail-card">
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

