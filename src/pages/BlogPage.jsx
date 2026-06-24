import React, { useState, useEffect } from 'react';
import { Search, Tag, Calendar, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './BlogPage.css';

const blogPosts = [
  {
    id: "landscaping-website",
    title: "Why Every Landscaping Company Needs a Website",
    excerpt: "In today's digital age, relying on word-of-mouth is no longer enough for landscaping businesses. Discover how a custom website can act as your 24/7 salesperson.",
    category: "Industry",
    date: "June 20, 2026",
    author: "Brandon Johnson",
    featured: true,
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "lose-customers",
    title: "5 Ways Local Businesses Lose Customers Online",
    excerpt: "Are you unknowingly driving prospects to your competitors? Learn the top 5 mistakes local businesses make with their online presence.",
    category: "Strategy",
    date: "June 15, 2026",
    author: "Brandon Johnson",
    featured: false,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "increase-leads",
    title: "How a Better Website Can Increase Leads",
    excerpt: "A website shouldn't just be an online brochure. See how strategic design choices can turn your site into an automated lead generation machine.",
    category: "Design",
    date: "June 10, 2026",
    author: "Brandon Johnson",
    featured: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "mobile-friendly",
    title: "Why Mobile-Friendly Websites Matter",
    excerpt: "Over 60% of local searches happen on mobile devices. If your website isn't optimized for phones, you're leaving money on the table.",
    category: "Development",
    date: "June 5, 2026",
    author: "Brandon Johnson",
    featured: false,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "seo-tips",
    title: "SEO Tips for Local Service Businesses",
    excerpt: "Want to rank higher on Google Maps and local search results? Implement these fundamental SEO strategies today to outrank your competitors.",
    category: "SEO",
    date: "June 1, 2026",
    author: "Brandon Johnson",
    featured: false,
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const categories = ["All", "Industry", "Strategy", "Design", "Development", "SEO"];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredPost = blogPosts.find(post => post.featured);
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && !post.featured;
  });

  return (
    <main className="blog-page">
      <Helmet>
        <title>Digital Growth Blog | Ascend Digital Co</title>
        <meta name="description" content="Actionable web design and digital marketing advice to help local service businesses dominate their market and acquire more customers online." />
        <meta property="og:title" content="Digital Growth Blog | Ascend Digital Co" />
        <meta property="og:description" content="Actionable web design and digital marketing advice to help local service businesses dominate their market and acquire more customers online." />
      </Helmet>

      <section className="blog-hero section-dark text-center">
        <div className="container reveal">
          <h1>Digital Growth Blog</h1>
          <p className="subtitle" style={{maxWidth: '700px', margin: '0 auto'}}>
            Actionable web design and marketing advice to help local service businesses dominate their market.
          </p>
        </div>
      </section>

      <section className="blog-content section">
        <div className="container">
          
          <div className="blog-controls reveal">
            <div className="blog-search">
              <Search className="search-icon" size={20} aria-hidden="true" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search articles"
              />
            </div>
            
            <div className="blog-categories" aria-label="Blog categories">
              {categories.map(category => (
                <button 
                  key={category}
                  className={`category-pill ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {activeCategory === "All" && searchQuery === "" && featuredPost && (
            <div className="featured-post-card reveal reveal-delay-1">
              <div className="featured-image">
                <img src={featuredPost.image} alt={featuredPost.title} loading="lazy" />
                <div className="featured-badge">Featured</div>
              </div>
              <div className="featured-content">
                <span className="post-category"><Tag size={14} aria-hidden="true" /> {featuredPost.category}</span>
                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.excerpt}</p>
                <div className="post-meta">
                  <span><Calendar size={14} aria-hidden="true" /> {featuredPost.date}</span>
                  <span><User size={14} aria-hidden="true" /> {featuredPost.author}</span>
                </div>
                <Link to={`/blog/${featuredPost.id}`} className="btn btn-primary pulse-cta mt-4" style={{display: 'inline-flex', alignItems: 'center'}}>
                  Read Full Article <ArrowRight size={18} style={{marginLeft: '0.5rem'}} aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}

          <div className="blog-grid">
            {filteredPosts.map((post, index) => (
              <div key={post.id} className="blog-card reveal" style={{animationDelay: `${(index % 3) * 0.1}s`}}>
                <div className="blog-card-image">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  <span className="blog-card-category">{post.category}</span>
                </div>
                <div className="blog-card-content">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <span><Calendar size={14} aria-hidden="true" /> {post.date}</span>
                  </div>
                  <Link to={`/blog/${post.id}`} className="blog-read-more">
                    Read More <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
             <div className="no-results text-center">
               <h3>No articles found</h3>
               <p>We couldn't find any articles matching your search criteria.</p>
               <button className="btn btn-outline mt-3" onClick={() => {setSearchQuery(""); setActiveCategory("All");}}>Clear Filters</button>
             </div>
          )}

        </div>
      </section>
    </main>
  );
};

export default BlogPage;
