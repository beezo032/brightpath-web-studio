import React, { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import { Helmet } from 'react-helmet-async';

const Services = lazy(() => import('../components/Services'));
const Industries = lazy(() => import('../components/Industries'));
const Portfolio = lazy(() => import('../components/Portfolio'));
const BeforeAfter = lazy(() => import('../components/BeforeAfter'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Process = lazy(() => import('../components/Process'));
const Pricing = lazy(() => import('../components/Pricing'));
const Benefits = lazy(() => import('../components/Benefits'));
const FAQ = lazy(() => import('../components/FAQ'));
const Contact = lazy(() => import('../components/Contact'));

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.signallightstudio.com/#organization",
  "name": "Signal Light Studio",
  "url": "https://www.signallightstudio.com",
  "logo": "https://www.signallightstudio.com/favicon-64.png",
  "description": "Signal Light Studio builds premium, high-converting websites for local service businesses in Charleston, SC and across the United States.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Charleston",
    "addressRegion": "SC",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "City", "name": "Charleston" },
    { "@type": "City", "name": "Summerville" },
    { "@type": "City", "name": "Goose Creek" }
  ],
  "serviceType": ["Web Design", "Local SEO", "Website Redesign", "Website Maintenance"],
  "priceRange": "$$",
  "email": "hello@signallightstudio.com",
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61591269344521"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How much does a website cost?", "acceptedAnswer": { "@type": "Answer", "text": "Our Starter Launch package begins at $499. Our most popular Growth Package is $999. We provide a custom quote after a free strategy session." } },
    { "@type": "Question", "name": "How long does a website project take?", "acceptedAnswer": { "@type": "Answer", "text": "Most local business websites launch within 2 to 4 weeks. More complex projects may take longer." } },
    { "@type": "Question", "name": "Do you offer monthly maintenance?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our Website Care Plan is $99/month and includes hosting, security updates, daily backups, and minor content changes." } },
    { "@type": "Question", "name": "Will my website work on mobile devices?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We use a mobile-first design approach so your site looks and performs perfectly on every device." } }
  ]
};

const Home = () => {
  return (
    <main className="home-page">
      <Helmet>
        <title>Signal Light Studio | Web Design for Local Businesses in Charleston, SC</title>
        <meta name="description" content="Signal Light Studio builds premium, high-converting websites for local service businesses. Custom design, local SEO, and care plans starting at $499. Based in Charleston, SC." />
        <link rel="canonical" href="https://www.signallightstudio.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Signal Light Studio | Web Design for Local Businesses" />
        <meta property="og:description" content="Premium websites built to get local businesses more calls, leads, and customers. Starting at $499." />
        <meta property="og:image" content="https://www.signallightstudio.com/hero_mockup.webp" />
        <meta property="og:url" content="https://www.signallightstudio.com/" />
        <meta property="og:site_name" content="Signal Light Studio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Signal Light Studio | Web Design for Local Businesses" />
        <meta name="twitter:description" content="Premium websites built to get local businesses more calls, leads, and customers. Starting at $499." />
        <meta name="twitter:image" content="https://www.signallightstudio.com/hero_mockup.webp" />
        <meta name="geo.region" content="US-SC" />
        <meta name="geo.placename" content="Charleston, South Carolina" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      
      {/* Above-the-fold content rendered eagerly */}
      <Hero />
      <Suspense fallback={null}>
        <Services />
        <Industries />
        <Portfolio />

        {/* Below-the-fold components */}
        <BeforeAfter />
        <Testimonials />
        <Process />
        <Pricing />
        <Benefits />
        <FAQ />
        <Contact />
      </Suspense>
    </main>
  );
};

export default Home;
