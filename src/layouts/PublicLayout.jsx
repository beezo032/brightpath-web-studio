import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout = () => {
  const location = useLocation();
  
  return (
    <>
      <Navbar />
      <div key={location.pathname} className="page-transition-wrapper">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default PublicLayout;
