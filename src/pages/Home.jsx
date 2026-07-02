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
      
      {/* Below-the-fold components */}
      <BeforeAfter />
      <Testimonials />
      <Process />
      <Pricing />
      <Benefits />
      <FAQ />
      <Contact />
    </main>
  );
};

export default Home;
