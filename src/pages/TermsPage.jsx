import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main style={{ paddingTop: '120px', minHeight: '100vh', backgroundColor: 'var(--color-bg-gray)' }}>
      <Helmet>
        <title>Terms of Service | Ascend Digital Co</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem 6rem' }}>
        <Link to="/" style={{ color: 'var(--color-accent-blue)', fontWeight: 500, display: 'inline-block', marginBottom: '2rem' }}>
          ← Back to Home
        </Link>

        <div style={{ background: 'white', padding: '3rem', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-md)' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Terms of Service</h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>1. Services</h2>
            <p>Ascend Digital Co ("we", "us") provides website design, development, and related digital services to clients ("you"). The specific scope, deliverables, and payment terms for each project are agreed upon in a separate written proposal or contract.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>2. Payment</h2>
            <p>Projects typically require a deposit before work begins, with remaining payments tied to project milestones as outlined in your proposal. All fees are non-refundable once work on the agreed milestone has begun.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>3. Ownership</h2>
            <p>Upon receipt of final payment, you own 100% of the completed website and all its design assets. We retain the right to showcase completed work in our portfolio unless you request otherwise in writing.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>4. Client Responsibilities</h2>
            <p>You are responsible for providing accurate content, images, and feedback in a timely manner. Delays caused by late client feedback may affect project timelines without constituting a breach on our part.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>5. Limitation of Liability</h2>
            <p>We are not liable for any indirect, incidental, or consequential damages arising from the use of your website. Our total liability is limited to the fees paid for the specific project in question.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>6. Contact</h2>
            <p>For any questions regarding these terms, contact us at <a href="mailto:hello@ascenddigitalco.com" style={{ color: 'var(--color-accent-blue)' }}>hello@ascenddigitalco.com</a>.</p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
