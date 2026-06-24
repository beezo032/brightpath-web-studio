import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './NotFoundPage.css';

const NotFoundPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="not-found-page section-light">
      <Helmet>
        <title>Page Not Found | Ascend Digital Co</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="container text-center reveal">
        <div className="not-found-icon" aria-hidden="true">
          <Compass size={64} />
        </div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p className="subtitle" style={{maxWidth: '500px', margin: '0 auto 2rem'}}>
          Oops! It looks like you've ventured off the map. The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary pulse-cta" style={{display: 'inline-flex', alignItems: 'center'}}>
          <ArrowLeft size={18} style={{marginRight: '0.5rem'}} /> Return Home
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
