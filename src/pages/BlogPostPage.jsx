import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, ArrowRight, Share2, Link as LinkIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPosts';
import './BlogPostPage.css';

const BlogPostPage = () => {
  const { id } = useParams();
  const [headings, setHeadings] = useState([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [shareSuccess, setShareSuccess] = useState(false);
  const articleRef = useRef(null);

  const post = blogPosts.find(p => p.id === id);

  // Scroll Progress Tracker
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      const element = document.documentElement;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const scrollPosition = element.scrollTop;
      if (totalHeight > 0) {
        setReadingProgress((scrollPosition / totalHeight) * 100);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic Table of Contents generation
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (articleRef.current && post) {
      const h2Elements = articleRef.current.querySelectorAll('h2');
      const headingList = Array.from(h2Elements).map((h2, idx) => {
        const headingId = `section-${idx}`;
        h2.id = headingId;
        return {
          id: headingId,
          text: h2.innerText
        };
      });
      setHeadings(headingList);
    }
  }, [id, post]);

  if (!post) {
    return (
      <main className="blog-post-page section-light" style={{ padding: '120px 0' }}>
        <div className="container text-center">
          <h2>Article Not Found</h2>
          <p className="subtitle" style={{ margin: '1rem 0 2rem' }}>
            Sorry, the blog article you are looking for does not exist or has been moved.
          </p>
          <Link to="/blog" className="btn btn-primary">
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  // Get related posts (exclude current)
  const relatedPosts = blogPosts.filter(p => p.id !== id).slice(0, 2);

  // Social Sharing Handlers
  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  const shareUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
  const shareTitle = encodeURIComponent(post.title);

  return (
    <main className="blog-post-page">
      <Helmet>
        <title>{post.title} | Signal Light Studio</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://signallightstudio.com/blog/${post.id}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://signallightstudio.com/blog/${post.id}`} />
        <meta property="og:title" content={`${post.title} | Signal Light Studio`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="article:published_time" content="2026-06-30" />
        <meta property="article:author" content={post.author} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />

        {/* JSON-LD Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": [post.image],
            "datePublished": "2026-06-30T12:00:00Z",
            "dateModified": "2026-06-30T12:00:00Z",
            "author": {
              "@type": "Person",
              "name": post.author,
              "url": "https://signallightstudio.com/about"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Signal Light Studio",
              "logo": {
                "@type": "ImageObject",
                "url": "https://signallightstudio.com/favicon.png"
              }
            },
            "description": post.excerpt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://signallightstudio.com/blog/${post.id}`
            }
          })}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://signallightstudio.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://signallightstudio.com/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://signallightstudio.com/blog/${post.id}`
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Reading Progress Indicator */}
      <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }}></div>

      {/* Hero Section */}
      <section className="blog-post-hero">
        <div className="container">
          <Link to="/blog" className="back-to-blog" aria-label="Go back to articles list">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
          <span className="blog-post-category">
            <Tag size={14} aria-hidden="true" /> {post.category}
          </span>
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <span><Calendar size={16} aria-hidden="true" /> {post.date}</span>
            <span><User size={16} aria-hidden="true" /> {post.author}</span>
            <span>⏱️ {post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Main Layout (Article + Sidebar) */}
      <div className="blog-post-container">
        <div className="blog-post-layout">
          
          {/* Main Article Column */}
          <article className="blog-post-card">
            <img src={post.image} alt={post.title} className="blog-post-featured-image" />
            
            <div ref={articleRef} className="blog-post-body">
              {post.content}
            </div>
          </article>

          {/* Sticky Sidebar Column */}
          <aside className="blog-post-sidebar">
            
            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="sidebar-widget toc-widget">
                <h3>Table of Contents</h3>
                <ul className="toc-list">
                  {headings.map(h => (
                    <li key={h.id}>
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Social Share */}
            <div className="sidebar-widget share-widget">
              <h3>Share Article</h3>
              <div className="share-buttons">
                <button onClick={handleCopyLink} className="share-btn" title="Copy Link" aria-label="Copy Link">
                  <LinkIcon size={18} />
                </button>
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="share-btn" title="Share on Twitter" aria-label="Share on Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                </a>
                <a href={`https://www.linkedin.com/shareArticle?url=${shareUrl}&title=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="share-btn" title="Share on LinkedIn" aria-label="Share on LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="share-btn" title="Share on Facebook" aria-label="Share on Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
              </div>
              {shareSuccess && <span className="share-copied-toast">Link copied!</span>}
            </div>

            {/* Sticky Lead CTA */}
            <div className="sidebar-widget sticky-sidebar-cta">
              <h4>Need More Local Customers?</h4>
              <p>We build high-converting websites optimized for local Google rankings and estimate inquiries.</p>
              <Link to="/contact" className="btn btn-primary btn-block">
                Free Studio Roadmap
              </Link>
            </div>

          </aside>

        </div>

        {/* Related Posts Panel */}
        <section className="related-posts-section">
          <h2>Related Articles</h2>
          <div className="related-posts-grid">
            {relatedPosts.map(rp => (
              <article key={rp.id} className="blog-card" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <div className="blog-card-image" style={{ height: '200px' }}>
                  <img src={rp.image} alt={rp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  <span className="blog-card-category">{rp.category}</span>
                </div>
                <div className="blog-card-content" style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{rp.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>{rp.excerpt}</p>
                  <Link to={`/blog/${rp.id}`} className="blog-read-more" style={{ fontWeight: '600' }}>
                    Read Article <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default BlogPostPage;
