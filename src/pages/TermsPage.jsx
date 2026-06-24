import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './LegalPage.css';

const TermsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="legal-page">
      <Helmet>
        <title>Terms of Service | Ascend Digital Co</title>
        <meta name="description" content="Terms of Service for Ascend Digital Co. Review the terms and conditions governing our web design services." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="legal-hero section-dark text-center">
        <div className="container reveal">
          <h1>Terms of Service</h1>
          <p className="subtitle">Last updated: June 2025</p>
        </div>
      </section>

      <section className="legal-content section section-light">
        <div className="container">
          <div className="legal-body reveal">

            <h2>1. Agreement to Terms</h2>
            <p>By accessing or using the website of Ascend Digital Co ("Company," "we," "our," or "us") located at ascenddigitalco.com (the "Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Site or services.</p>

            <h2>2. Services</h2>
            <p>Ascend Digital Co provides professional web design, development, and related digital marketing services for local businesses. The specific scope, deliverables, timeline, and pricing for each project are defined in a separate written agreement or proposal provided to the client prior to the commencement of work.</p>

            <h2>3. Payment Terms</h2>
            <ul>
              <li>A <strong>50% deposit</strong> is required before any design or development work begins.</li>
              <li>The remaining <strong>50% balance</strong> is due upon project completion and before the website goes live.</li>
              <li>All invoices are due within 7 days of the invoice date unless otherwise agreed in writing.</li>
              <li>Late payments may result in a pause of services until the outstanding balance is settled.</li>
            </ul>

            <h2>4. Revisions</h2>
            <p>Each project package includes a set number of revision rounds as specified in the project proposal. Revisions are defined as minor changes to existing content or design. Additional revisions beyond the included rounds, or significant scope changes, will be billed at our standard hourly rate.</p>

            <h2>5. Client Responsibilities</h2>
            <p>The client agrees to:</p>
            <ul>
              <li>Provide all necessary content (text, images, logos) in a timely manner</li>
              <li>Provide timely feedback during revision rounds</li>
              <li>Ensure all content provided is owned by the client or properly licensed</li>
              <li>Designate a single point of contact to streamline communications</li>
            </ul>
            <p>Delays caused by the client's failure to provide required materials or feedback may extend the project timeline at no additional cost to the client.</p>

            <h2>6. Intellectual Property & Ownership</h2>
            <p>Upon receipt of final payment in full, the client will own all custom design work and code created specifically for their project. Ascend Digital Co retains the right to display completed projects in our portfolio and marketing materials unless the client requests otherwise in writing.</p>
            <p>Third-party assets (stock photos, fonts, plugins) remain subject to their respective licenses.</p>

            <h2>7. Confidentiality</h2>
            <p>Both parties agree to keep confidential any proprietary or sensitive business information shared during the course of the project and not to disclose such information to third parties without prior written consent.</p>

            <h2>8. Warranties & Disclaimer</h2>
            <p>Ascend Digital Co warrants that all work will be completed in a professional and workmanlike manner. However, we do not guarantee specific business results such as increased sales, leads, or search engine rankings, as these depend on many factors outside our control.</p>
            <p>THE SITE AND SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW.</p>

            <h2>9. Limitation of Liability</h2>
            <p>In no event shall Ascend Digital Co be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or website. Our total liability for any claim arising under these Terms shall not exceed the total amount paid by you for the specific service giving rise to the claim.</p>

            <h2>10. Termination</h2>
            <p>Either party may terminate a project engagement with written notice. In the event of client-initiated termination, the deposit is non-refundable. Any completed work up to the termination date will be invoiced and must be paid. In the event of company-initiated termination without cause, a prorated refund of the deposit will be provided for work not yet completed.</p>

            <h2>11. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the United States. Any disputes arising under these Terms will be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.</p>

            <h2>12. Changes to Terms</h2>
            <p>We reserve the right to update these Terms at any time. Changes will be effective upon posting to this page. Your continued use of our Site or services after any changes constitutes acceptance of the updated Terms.</p>

            <h2>13. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
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

export default TermsPage;
