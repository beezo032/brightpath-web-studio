import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './LegalPage.css';

const PrivacyPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="legal-page">
      <Helmet>
        <title>Privacy Policy | Ascend Digital Co</title>
        <meta name="description" content="Privacy Policy for Ascend Digital Co. Learn how we collect, use, and protect your personal information." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="legal-hero section-dark text-center">
        <div className="container reveal">
          <h1>Privacy Policy</h1>
          <p className="subtitle">Last updated: June 2025</p>
        </div>
      </section>

      <section className="legal-content section section-light">
        <div className="container">
          <div className="legal-body reveal">

            <h2>1. Introduction</h2>
            <p>Welcome to Ascend Digital Co ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information when you visit our website at ascenddigitalco.com (the "Site").</p>

            <h2>2. Information We Collect</h2>
            <h3>Information You Provide Directly</h3>
            <p>When you fill out our contact form or request a quote, we may collect:</p>
            <ul>
              <li>Your full name and business name</li>
              <li>Email address and phone number</li>
              <li>Your current website URL and business type</li>
              <li>Project goals, budget range, and timeline preferences</li>
              <li>Any additional details you include in your message</li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <p>When you visit our Site, we may automatically collect certain technical information, including your IP address, browser type, operating system, referring URLs, and pages viewed. This information helps us understand how visitors use our Site and improve the user experience.</p>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide the services you request</li>
              <li>Send you project proposals, updates, and relevant communications</li>
              <li>Improve our website and service offerings</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>We will <strong>never</strong> sell, rent, or share your personal information with third parties for their marketing purposes.</p>

            <h2>4. Data Retention</h2>
            <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Contact form submissions and project inquiries are retained for up to 2 years unless you request deletion.</p>

            <h2>5. Cookies</h2>
            <p>Our Site may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences. Disabling cookies may affect certain features of the Site.</p>

            <h2>6. Third-Party Services</h2>
            <p>Our Site may contain links to third-party websites or use third-party services (such as hosting and analytics providers). We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.</p>

            <h2>7. Data Security</h2>
            <p>We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

            <h2>8. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
            <p>To exercise any of these rights, please contact us at <a href="mailto:hello@ascenddigitalco.com">hello@ascenddigitalco.com</a>.</p>

            <h2>9. Children's Privacy</h2>
            <p>Our Site is not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.</p>

            <h2>10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page. Your continued use of the Site after any changes constitutes your acceptance of the updated policy.</p>

            <h2>11. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:hello@ascenddigitalco.com">hello@ascenddigitalco.com</a></li>
              <li><strong>Website:</strong> <Link to="/contact">ascenddigitalco.com/contact</Link></li>
            </ul>

            <div className="legal-back">
              <Link to="/" className="btn btn-secondary">← Back to Home</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPage;
