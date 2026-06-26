import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';

const PublicLayout = () => {
  const location = useLocation();
  
  return (
    <>
      <Navbar />
      <div key={location.pathname} className="page-transition-wrapper">
        <Outlet />
      </div>
      <Footer />
      <FloatingCTA />
    </>
  );
};

export default PublicLayout;
