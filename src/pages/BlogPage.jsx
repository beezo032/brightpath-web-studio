import React, { useState, useEffect } from 'react';
import { Search, Tag, Calendar, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts, categories } from '../data/blogPosts';
import './BlogPage.css';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(""); // '', 'loading', 'success', 'error'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredPost = blogPosts.find(post => post.featured);
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // If search or category is active, show everything including featured post in grid
    const isSearchOrFilterActive = searchQuery !== "" || activeCategory !== "All";
    if (isSearchOrFilterActive) {
      return matchesCategory && matchesSearch;
    }
    
    // Otherwise, exclude the featured post from the grid list
    return matchesCategory && matchesSearch && !post.featured;
  });

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = filteredPosts.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterStatus("loading");
    setTimeout(() => {
      setNewsletterStatus("success");
      setEmail("");
    }, 800);
  };

  return (
    <main className="blog-page">
      <Helmet>
        <title>Digital Growth Blog | Signal Light Studio</title>
        <meta name="description" content="Actionable web design and digital marketing advice to help local service businesses dominate their market and acquire more customers online." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://signallightstudio.com/blog" />
        <meta property="og:title" content="Digital Growth Blog | Signal Light Studio" />
        <meta property="og:description" content="Actionable web design and digital marketing advice to help local service businesses dominate their market." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://signallightstudio.com/blog" />
        <meta property="twitter:title" content="Digital Growth Blog | Signal Light Studio" />
        <meta property="twitter:description" content="Actionable web design and digital marketing advice to help local service businesses dominate their market." />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" />

        <link rel="canonical" href="https://signallightstudio.com/blog" />
      </Helmet>

      {/* Hero Section */}
      <section className="blog-hero section-dark text-center">
        <div className="container reveal">
          <h1>Digital Growth Blog</h1>
          <p className="subtitle" style={{maxWidth: '700px', margin: '0 auto'}}>
            Actionable web design, local SEO, and client-acquisition strategies built specifically for local service businesses.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="blog-content section">
        <div className="container">
          
          {/* Search & Categories Bar */}
          <div className="blog-controls reveal">
            <div className="blog-search">
              <Search className="search-icon" size={20} aria-hidden="true" />
              <input 
                type="text" 
                placeholder="Search articles or tags..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(6); // Reset visible count on search
                }}
                aria-label="Search articles"
              />
            </div>
            
            <div className="blog-categories" aria-label="Blog categories">
              {categories.map(category => (
                <button 
                  key={category}
                  className={`category-pill ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(category);
                    setVisibleCount(6); // Reset visible count on category change
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post Card (Only shown on index view with no filters active) */}
          {activeCategory === "All" && searchQuery === "" && featuredPost && (
            <div className="featured-post-card reveal reveal-delay-1">
              <div className="featured-image">
                <img src={featuredPost.image} alt={featuredPost.title} loading="lazy" />
                <div className="featured-badge">Featured Article</div>
              </div>
              <div className="featured-content">
                <span className="post-category"><Tag size={14} aria-hidden="true" /> {featuredPost.category}</span>
                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.excerpt}</p>
                <div className="post-meta">
                  <span><Calendar size={14} aria-hidden="true" /> {featuredPost.date}</span>
                  <span><User size={14} aria-hidden="true" /> {featuredPost.author}</span>
                  <span style={{ marginLeft: 'auto', fontWeight: '500', color: 'var(--color-accent-blue)' }}>{featuredPost.readTime}</span>
                </div>
                <Link to={`/blog/${featuredPost.id}`} className="btn btn-primary pulse-cta mt-4" style={{display: 'inline-flex', alignItems: 'center'}}>
                  Read Article <ArrowRight size={18} style={{marginLeft: '0.5rem'}} aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}

          {/* Articles Grid */}
          <div className="blog-grid">
            {displayedPosts.map((post, index) => (
              <article key={post.id} className="blog-card reveal" style={{animationDelay: `${(index % 3) * 0.1}s`}}>
                <div className="blog-card-image">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  <span className="blog-card-category">{post.category}</span>
                </div>
                <div className="blog-card-content">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <span><Calendar size={14} aria-hidden="true" /> {post.date}</span>
                    <span style={{ marginLeft: 'auto', color: 'var(--color-text-muted)' }}>{post.readTime}</span>
                  </div>
                  <Link to={`/blog/${post.id}`} className="blog-read-more">
                    Read Article <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
             <div className="no-results text-center">
               <h3>No articles found</h3>
               <p>We couldn't find any articles matching your search criteria.</p>
               <button className="btn btn-outline mt-3" onClick={() => {setSearchQuery(""); setActiveCategory("All");}}>Clear Filters</button>
             </div>
          )}

          {/* Pagination / Load More Button */}
          {hasMore && (
            <div className="text-center mt-5 reveal">
              <button className="btn btn-outline" onClick={handleLoadMore}>
                Load More Articles
              </button>
            </div>
          )}

          {/* Newsletter / Signup CTA */}
          <div className="newsletter-cta-card reveal" style={{ marginTop: '5rem' }}>
            <div className="newsletter-content">
              <h3>Get Weekly Agency Strategies</h3>
              <p>Subscribe to our newsletter to receive actionable web design, local SEO checklists, and marketing tips to scale your service business.</p>
            </div>
            <div className="newsletter-form-container">
              {newsletterStatus === "success" ? (
                <div className="newsletter-success">
                  <h4>🎉 You're Subscribed!</h4>
                  <p>Check your inbox soon for your first digital growth playbook.</p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email Address for newsletter"
                  />
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={newsletterStatus === "loading"}
                  >
                    {newsletterStatus === "loading" ? "Subscribing..." : "Join Playbook"}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default BlogPage;
