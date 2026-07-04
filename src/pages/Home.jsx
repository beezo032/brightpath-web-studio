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

const Home = () => {
  return (
    <main className="home-page">
      <Helmet>
        <title>Signal Light Studio | High-Converting Web Design for Local Businesses</title>
        <meta name="description" content="We build custom, fast-loading, mobile-friendly websites that help local service businesses get more leads and quote requests." />
        <meta property="og:title" content="Signal Light Studio | High-Converting Web Design for Local Businesses" />
        <meta property="og:description" content="We build custom, fast-loading, mobile-friendly websites that help local service businesses get more leads and quote requests." />
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
