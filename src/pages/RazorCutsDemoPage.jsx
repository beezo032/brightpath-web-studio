import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const RazorCutsDemoPage = () => {
  return (
    <main className="portfolio-detail-page" style={{paddingTop: '100px', minHeight: '100vh', backgroundColor: '#f9fafb'}}>
      <Helmet>
        <title>Razor Cuts Barbershop Demo | Signal Light Studio</title>
        <meta name="description" content="Case study for Razor Cuts Barbershop Demo." />
      </Helmet>

      <div className="container" style={{maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem'}}>
        <Link to="/portfolio" style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#6366f1', marginBottom: '2rem', textDecoration: 'none', fontWeight: '500'}}>
          <ArrowLeft size={18} /> Back to Portfolio
        </Link>
        
        <div style={{backgroundColor: 'white', borderRadius: '8px', padding: '3rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'}}>
          <div className="badge" style={{display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: '#e0e7ff', color: '#4f46e5', borderRadius: '50px', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem'}}>
            Barbershop / Beauty Salon
          </div>
          <h1 style={{fontSize: '2.5rem', color: '#111827', marginBottom: '1rem'}}>Razor Cuts Barbershop Demo</h1>
          <p style={{fontSize: '1.1rem', color: '#4b5563', marginBottom: '2rem', lineHeight: '1.6'}}>
            A modern barbershop website concept designed to increase bookings, calls, and local trust. This project demonstrates our ability to create high-converting, visually striking local business websites.
          </p>

          <div style={{borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', padding: '2rem 0', marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>
            <div>
              <h3 style={{fontSize: '1.2rem', color: '#111827', marginBottom: '1rem'}}>Services Provided</h3>
              <ul style={{listStyle: 'disc', paddingLeft: '1.5rem', color: '#4b5563', lineHeight: '1.8'}}>
                <li>Website Design</li>
                <li>Mobile Optimization</li>
                <li>Booking CTA</li>
                <li>Local SEO</li>
                <li>Lead Capture</li>
              </ul>
            </div>
            <div>
              <h3 style={{fontSize: '1.2rem', color: '#111827', marginBottom: '1rem'}}>Technologies Used</h3>
              <ul style={{listStyle: 'disc', paddingLeft: '1.5rem', color: '#4b5563', lineHeight: '1.8'}}>
                <li>React & Vite</li>
                <li>Vanilla CSS</li>
                <li>Lucide Icons</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p style={{color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.95rem'}}>Interested in a website like this for your business?</p>
            <a href="/#contact" className="btn btn-primary" style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem'}}>
              Get a Free Quote <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RazorCutsDemoPage;

