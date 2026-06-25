import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main style={{ paddingTop: '120px', minHeight: '100vh', backgroundColor: 'var(--color-bg-gray)' }}>
      <Helmet>
        <title>Privacy Policy | Ascend Digital Co</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem 6rem' }}>
        <Link to="/" style={{ color: 'var(--color-accent-blue)', fontWeight: 500, display: 'inline-block', marginBottom: '2rem' }}>
          ← Back to Home
        </Link>

        <div style={{ background: 'white', padding: '3rem', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-md)' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Privacy Policy</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>1. Information We Collect</h2>
            <p>When you submit a contact form on this site, we collect your name, email address, phone number, and any other information you voluntarily provide. We do not collect any data automatically beyond standard server logs.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>2. How We Use Your Information</h2>
            <p>We use the information you provide solely to respond to your inquiry and to communicate about potential or ongoing projects. We do not sell, rent, or share your data with third parties for marketing purposes.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>3. Data Storage</h2>
            <p>Contact form submissions are processed through Formspree and stored securely. We retain records of client communications for the duration of our working relationship and up to 2 years after project completion.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>4. Cookies</h2>
            <p>This website does not use tracking cookies or third-party analytics by default. If analytics are added in the future, this policy will be updated accordingly.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>5. Your Rights</h2>
            <p>You may request to view, correct, or delete any personal data we hold about you at any time by contacting us at <a href="mailto:hello@ascenddigitalco.com" style={{ color: 'var(--color-accent-blue)' }}>hello@ascenddigitalco.com</a>.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>6. Contact</h2>
            <p>For any privacy-related questions, contact us at <a href="mailto:hello@ascenddigitalco.com" style={{ color: 'var(--color-accent-blue)' }}>hello@ascenddigitalco.com</a>.</p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPage;
