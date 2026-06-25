import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from './BlogPage';
import './BlogPostPage.css';

const postContents = {
  "landscaping-website": (
    <>
      <p>As a landscaping business owner, your work is highly visual, seasonal, and localized. For years, the industry relied heavily on word-of-mouth recommendations. While word-of-mouth is still incredibly powerful, today's customers shop differently. When someone needs a lawn cut, a tree removed, or a complete backyard redesign, their first action is to search on their phone.</p>
      
      <p>If you don't have a professional website, you're invisible to a massive segment of your local market. Here is why a custom website is no longer optional for landscaping companies, and how it acts as your best 24/7 salesperson.</p>

      <h2>1. Visual Proof of Quality (Your Digital Portfolio)</h2>
      <p>Landscaping is all about transformation. Homeowners want to see what you're capable of before they hire you. A professional website lets you display high-resolution before-and-after galleries of your best work. Instead of trying to describe a retaining wall or a sod installation over the phone, you can send prospects directly to your portfolio. It builds immediate trust and sets expectations of quality.</p>

      <h2>2. Capturing Leads While You're in the Field</h2>
      <p>When you are busy operating a mower, driving a truck, or managing a crew, you can't always answer the phone. If a prospect calls and gets voicemail, they will likely hang up and call your competitor. A website solves this by offering a 24/7 quote request form. Homeowners can upload photos of their yard, describe their project, and submit their details at any hour of the day or night. You wake up to fresh leads ready to be estimated.</p>

      <blockquote>
        "A website shouldn't just be an online business card. It should be a lead generation machine that qualifies prospects and collects project details automatically."
      </blockquote>

      <h2>3. Dominating Local Search (SEO)</h2>
      <p>When local residents search for "lawn care service near me" or "landscapers in [Your City]," Google decides who to display. A optimized website, combined with a Google Business Profile, makes sure your company is in those top results. Without a website, you cannot rank for most of these high-value commercial search terms, leaving all that business to competitors.</p>

      <h2>4. Showcasing Your Full Range of Services</h2>
      <p>Many lawn care companies lose out on lucrative landscaping work simply because customers don't know they offer it. A website allows you to dedicate pages to each of your services, such as:</p>
      <ul>
        <li>Lawn Mowing & Maintenance</li>
        <li>Hardscaping (Patios, Walkways, Retaining Walls)</li>
        <li>Sod Installation & Seeding</li>
        <li>Spring/Fall Yard Cleanups</li>
        <li>Commercial Snow Removal</li>
      </ul>
      <p>When clients see the full scope of what you do, they are much more likely to hire you for multi-service contracts.</p>

      <h2>Conclusion: Investing in Long-Term Growth</h2>
      <p>A website isn't an expense; it's an asset. Once built, it belongs to you and continues to generate brand awareness and estimate requests month after month. If you want to raise your prices, win bigger residential contracts, or land commercial maintenance agreements, a premium website is the first step.</p>
    </>
  ),
  "lose-customers": (
    <>
      <p>Getting traffic to your website is only half the battle. If your site is poorly optimized, confusing, or outdated, you might actually be driving customers straight into the arms of your local competitors. Many business owners assume that just "having a website" is enough. Unfortunately, an ineffective site can do more damage to your reputation than having no site at all.</p>
      
      <p>Here are five common ways local service businesses lose customers online every single day, and how you can fix them immediately.</p>

      <h2>1. Hidden or Missing Contact Information</h2>
      <p>When a visitor lands on your website, they want to take action quickly. If they have to search through three pages just to find your phone number or email address, they will leave. Your phone number should be highly visible in the top header on every page, and there should be a clear, simple contact button in the main navigation menu.</p>

      <h2>2. Unoptimized for Mobile Devices</h2>
      <p>Over 60% of all web traffic now comes from mobile phones. For local service searches (like emergency plumbing or towing), that number is often higher than 80%. If your website is slow to load, requires pinching and zooming, or has buttons that are too small to tap on a phone screen, users will leave within seconds. Mobile responsiveness is critical for user experience and Google ranking.</p>

      <blockquote>
        "If your website takes more than 3 seconds to load on a mobile device, you've already lost half of your potential visitors."
      </blockquote>

      <h2>3. Too Many Fields on Contact Forms</h2>
      <p>Form fatigue is real. If your "Request a Quote" form requires 10 different fields, including home address, budget range, secondary phone number, and a detailed project description, conversion rates will plummet. Keep your forms as short as possible. Ask only for their Name, Email, Phone, and a brief message. You can get the rest of the details once they are on the phone.</p>

      <h2>4. Lack of Trust Signals and Reviews</h2>
      <p>Before a homeowner invites a contractor, landscaper, or service provider to their house, they need to feel safe. A site without testimonials, reviews, or badges of certification looks suspicious. Make sure to display 3 to 5 real reviews from past clients on your homepage, preferably with their names and photos if possible. Links to your Google Business Profile reviews also add immediate credibility.</p>

      <h2>5. Generic or Plagiarized Copywriting</h2>
      <p>If your website reads exactly like every other competitor in your city, you become a commodity. Using stock phrases like "We are the best" or "Quality service guaranteed" doesn't differentiate you. Instead, write about what makes you unique: do you offer a 100% satisfaction guarantee? Are your techs background-checked? Do you show up on time, every time? Focus on solving your client's specific pain points.</p>
    </>
  ),
  "increase-leads": (
    <>
      <p>Many business owners view their website as a digital brochure—a static page that exists simply because they need an online presence. But a high-quality website should be your most active employee. It should be working 24 hours a day, 7 days a week, to turn casual website visitors into qualified leads for your pipeline.</p>
      
      <p>If your current website isn't bringing in consistent phone calls or form submissions, it's time to restructure it. Here is how strategic design choices can turn your website into an automated lead generation machine.</p>

      <h2>1. The Power of a Single, Clear Call-To-Action (CTA)</h2>
      <p>If your website asks visitors to "Call Us," "Read Our Blog," "Follow Us on Facebook," and "Sign Up for Our Newsletter" all at once, you will paralyze them. Confused users do nothing. Determine your primary business goal. If you want quote requests, make "Request a Free Quote" your primary button. Use a contrasting color, place it prominently in the header, and repeat it at the end of every section.</p>

      <h2>2. Creating a Trust-First Layout</h2>
      <p>People buy from brands they trust. To build trust immediately, your website layout should present key signals in a specific order:
        <br />
        <strong>Hero Section:</strong> Clear headline stating exactly what you do and a primary CTA.
        <br />
        <strong>Social Proof:</strong> Trust badges, ratings (e.g., "5.0 rating on Google"), or notable client logos directly under the hero.
        <br />
        <strong>Benefits:</strong> Explain what the customer gets, not just what you do. Focus on their outcomes.
        <br />
        <strong>Testimonials:</strong> Real, detailed reviews from local clients.
      </p>

      <blockquote>
        "Design is not just what it looks like. Design is how it works, how it guides the user's eyes, and how easily it solves their problem."
      </blockquote>

      <h2>3. Simplifying the User Journey</h2>
      <p>Every click you force a user to make is an opportunity for them to leave your site. Keep your site structure simple. A clean, single-page layout or a website with only 4-5 pages is usually best for local service businesses. Make sure navigation is intuitive, and use anchor links to help users jump directly to sections they care about, like pricing or reviews.</p>

      <h2>4. Fast Page Speed</h2>
      <p>Slow websites kill conversions. Google penalizes slow-loading websites in search results, and users get frustrated. Optimizing your images, using clean code frameworks (like React/Vite), and avoiding unnecessary third-party scripts will keep your load time under 2 seconds. A fast website feels premium and professional.</p>

      <h2>Summary: Focus on the User</h2>
      <p>A website that converts doesn't need to be complex; it just needs to be helpful. By focusing on mobile optimization, highlighting trust, and offering a frictionless path to contact you, you will see a massive lift in leads without changing anything else about your business.</p>
    </>
  ),
  "mobile-friendly": (
    <>
      <p>We live in a mobile-first world. While you might design and review your business website on a desktop computer, the vast majority of your customers will see it on their phones. If your mobile website experience is an afterthought, you are actively turning away customers and hurting your search engine optimization (SEO).</p>
      
      <p>Let's look at why mobile-friendly websites are the absolute standard for local services, and what elements make a mobile site truly great.</p>

      <h2>1. Speed and Convenience for On-The-Go Searches</h2>
      <p>When someone is searching for a service on their phone, they are often looking for an immediate solution. They might be sitting in their car, at work, or dealing with an urgent issue at home. They do not have the patience for a site that loads slowly or displays broken layouts. A mobile-responsive site loads instantly and presents information in a readable, single-column format.</p>

      <h2>2. Tap-to-Call Buttons</h2>
      <p>On mobile, the phone number should not just be text. It must be an active link that launches the user's phone app when tapped. Having a prominent "Tap to Call" button anchored to the bottom of the screen as the user scrolls makes contacting you effortless. This simple change can increase mobile phone inquiries by 30% or more.</p>

      <blockquote>
        "The best mobile websites remove all friction. If a user can call you or request a booking with a single thumb tap, they will."
      </blockquote>

      <h2>3. Simplified Navigation Menus</h2>
      <p>Standard desktop menus don't fit on mobile screens. A mobile-friendly site uses a "hamburger menu" (the three horizontal lines) that opens a clean overlay. The links should be large enough to easily tap with a thumb, preventing accidental clicks. Keep the menu options limited to the essentials: Services, Gallery, Pricing, and Contact.</p>

      <h2>4. Google's Mobile-First Indexing</h2>
      <p>Google rank sites based on their mobile version, not their desktop version. If your desktop site looks perfect but your mobile site is slow or hard to navigate, Google will lower your overall search ranking. Mobile optimization is no longer an add-on service; it is the foundation of modern SEO.</p>

      <h2>Conclusion</h2>
      <p>Test your website on your own phone today. Try submitting a form, clicking links, and reading the text. If anything feels difficult or slow, resolve it immediately. A mobile-friendly site shows clients that you run a modern, professional, and accessible business.</p>
    </>
  ),
  "seo-tips": (
    <>
      <p>Search Engine Optimization (SEO) can feel like a black box. Many local business owners think they need to hire expensive agencies or understand complex algorithms to rank on Google. While SEO does require effort, the fundamentals of ranking in local search results are actually very straightforward.</p>
      
      <p>Here are actionable SEO tips you can implement yourself to raise your search visibility, show up in Google Maps, and outrank local competitors.</p>

      <h2>1. Claim and Optimize Your Google Business Profile</h2>
      <p>Your Google Business Profile (formerly Google My Business) is the single most important factor for local SEO. It determines whether you appear in the "Local Map Pack" at the top of search results.
        <br />
        - Complete every section: add your address, phone number, website URL, and hours.
        <br />
        - Select the correct primary business category (e.g., "Lawn Care Service" vs. "Landscape Designer").
        <br />
        - Upload high-quality photos of your team, trucks, and projects regularly.
      </p>

      <h2>2. Target Localized Keywords</h2>
      <p>Don't just optimize for "lawn care." Optimize for "lawn care service in [Your Town]" or "[City] landscaping company." These are the search terms high-intent customers use. Include these localized keywords in your website's main headers (H1 and H2 tags), within the page copy, and in your meta description tags.</p>

      <blockquote>
        "SEO is about matching search intent. If someone searches for a service in your city, Google wants to show a local, relevant authority."
      </blockquote>

      <h2>3. Gather Google Reviews Consistently</h2>
      <p>Google loves active, well-reviewed businesses. A steady stream of 5-star reviews tells Google's algorithm that you are active and trustworthy. Create a short link to your review form and send it to clients as soon as you finish a job. Politely ask them to mention the specific service you provided (e.g., "sod installation" or "weekly mowing") in their review, as this helps boost your rankings for those search terms.</p>

      <h2>4. Create Dedicated Pages for Specific Services</h2>
      <p>If you put all your services on a single page, Google will struggle to understand your primary expertise. Instead, create individual pages for your main services. If you offer sod installation, write a page all about sod installation, how you prepare the soil, and your maintenance tips. This gives you a much higher chance of ranking for search terms specific to that service.</p>

      <h2>5. Focus on Site Speed and Mobile Usability</h2>
      <p>Google penalizes websites that are slow or frustrating to use on mobile devices. Ensure your website has clean code, compressed images, and a fully responsive design. A fast, modern site keeps visitors on the page longer, signaling to Google that your site is a high-quality resource.</p>
    </>
  )
};

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

  return (
    <main className="blog-post-page">
      <Helmet>
        <title>{post.title} | Ascend Digital Co</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | Ascend Digital Co`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
      </Helmet>

      {/* Hero */}
      <section className="blog-post-hero">
        <div className="container">
          <Link to="/blog" className="back-to-blog" style={{ color: '#818cf8' }}>
            <ArrowLeft size={18} /> Back to Blog
          </Link>
          <span className="blog-post-category">
            <Tag size={14} /> {post.category}
          </span>
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <span><Calendar size={16} /> {post.date}</span>
            <span><User size={16} /> {post.author}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="blog-post-container">
        <article className="blog-post-card">
          <img src={post.image} alt={post.title} className="blog-post-featured-image" />
          
          <div className="blog-post-body">
            {postContents[post.id] || (
              <>
                <p>{post.excerpt}</p>
                <p>Full content for this article is being updated soon. Stay tuned for expert insights and strategies on web design, local SEO, and digital growth for your business.</p>
              </>
            )}
          </div>

          {/* Call to Action Card */}
          <div className="blog-post-cta-card">
            <h3>Need More Leads for Your Local Business?</h3>
            <p>We build premium, custom websites engineered to rank on Google and turn online visitors into paying customers.</p>
            <Link to="/contact" className="btn btn-primary pulse-cta">
              Get a Free Website Review
            </Link>
          </div>
        </article>

        {/* Related Posts */}
        <section className="related-posts-section">
          <h2 style={{ fontSize: '1.75rem', color: 'var(--color-text-dark)', marginBottom: '1.5rem' }}>Related Articles</h2>
          <div className="related-posts-grid">
            {relatedPosts.map(rp => (
              <div key={rp.id} className="blog-card" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <div className="blog-card-image" style={{ position: 'relative', height: '180px' }}>
                  <img src={rp.image} alt={rp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="blog-card-category" style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'var(--color-accent-blue)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{rp.category}</span>
                </div>
                <div className="blog-card-content" style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>{rp.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{rp.excerpt}</p>
                  <Link to={`/blog/${rp.id}`} className="blog-read-more" style={{ color: 'var(--color-accent-blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', textDecoration: 'none' }}>
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default BlogPostPage;
