import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Industries from './components/Industries';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Pricing from './components/Pricing';
import WhyChooseUs from './components/WhyChooseUs';
import Benefits from './components/Benefits';
import FAQ from './components/FAQ';
import AboutFounder from './components/AboutFounder';
import Contact from './components/Contact';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Industries />
        <Portfolio />
        <Process />
        <Pricing />
        <WhyChooseUs />
        <Benefits />
        <FAQ />
        <AboutFounder />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
