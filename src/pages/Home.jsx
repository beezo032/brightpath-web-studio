import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Industries from '../components/Industries';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Pricing from '../components/Pricing';
import WhyChooseUs from '../components/WhyChooseUs';
import Benefits from '../components/Benefits';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import FinalCTA from '../components/FinalCTA';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <main className="home-page">
      <Helmet>
        <title>Brightpath Web Studio | High-Converting Web Design for Local Businesses</title>
        <meta name="description" content="We build custom, fast-loading, mobile-friendly websites that help local service businesses get more calls and quote requests." />
        <meta property="og:title" content="Brightpath Web Studio | High-Converting Web Design for Local Businesses" />
        <meta property="og:description" content="We build custom, fast-loading, mobile-friendly websites that help local service businesses get more calls and quote requests." />
      </Helmet>
      
      {/* Hero Section */}
      <Hero />
      <Services />
      <Industries />
      <Portfolio />
      <Process />
      <Pricing />
      <WhyChooseUs />
      <Benefits />
      <FAQ />
      <Contact />
      <FinalCTA />
    </main>
  );
};

export default Home;
