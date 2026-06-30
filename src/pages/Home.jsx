import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Industries from '../components/Industries';
import Portfolio from '../components/Portfolio';
import BeforeAfter from '../components/BeforeAfter';
import Testimonials from '../components/Testimonials';
import Process from '../components/Process';
import Pricing from '../components/Pricing';
import Benefits from '../components/Benefits';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import LazySection from '../components/LazySection';
import { Helmet } from 'react-helmet-async';

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
      <Services />
      <Industries />
      <Portfolio />
      
      {/* Below-the-fold components loaded progressively */}
      <LazySection height="500px">
        <BeforeAfter />
      </LazySection>
      
      <LazySection height="400px">
        <Testimonials />
      </LazySection>
      
      <LazySection height="500px">
        <Process />
      </LazySection>
      
      <LazySection height="500px">
        <Pricing />
      </LazySection>
      
      <LazySection height="400px">
        <Benefits />
      </LazySection>
      
      <LazySection height="500px">
        <FAQ />
      </LazySection>
      
      <LazySection height="600px">
        <Contact />
      </LazySection>
    </main>
  );
};

export default Home;
