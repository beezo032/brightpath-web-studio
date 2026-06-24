import React, { useState, useEffect } from 'react';
import { Mail, Clock, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './ContactPage.css';

const ContactPage = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  const [formState, setFormState] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    businessType: '',
    website: '',
    websiteStatus: '',
    primaryGoal: '',
    budget: '',
    timeline: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    { q: "How long does a website project take?", a: "Most custom websites are completed within 3 to 6 weeks depending on complexity and content readiness." },
    { q: "Do you offer payment plans?", a: "Yes, we typically structure payments in milestones, with an initial deposit to begin work." },
    { q: "Will I own the website?", a: "Absolutely. Once the final payment is made, you own 100% of the website and all its assets." }
  ];

  const goals = ["More leads", "More calls", "New website", "Website redesign", "SEO help"];
  const budgets = ["Under $499", "$499 - $999", "$999 - $1,999", "$1,999+", "Not sure yet"];
  const websiteStatuses = [
    "I don't have a website yet",
    "I have one, but it's outdated",
    "I have one, but it doesn't generate leads",
    "I have one, just need minor changes"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSelection = (name, value) => {
    setFormState(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formState.name.trim()) newErrors.name = "Please enter your name.";
      if (!formState.businessName.trim()) newErrors.businessName = "Please enter your business name.";
      if (!formState.email.trim() || !/^\S+@\S+\.\S+$/.test(formState.email)) newErrors.email = "Please enter a valid email address.";
    } else if (currentStep === 2) {
      if (!formState.businessType.trim()) newErrors.businessType = "Please enter your type of business.";
      if (!formState.websiteStatus) newErrors.websiteStatus = "Please select your website status.";
    } else if (currentStep === 3) {
      if (!formState.primaryGoal) newErrors.primaryGoal = "Please select a primary goal.";
      if (!formState.budget) newErrors.budget = "Please select an estimated budget.";
    }
    return newErrors;
  };

  const nextStep = () => {
    const validationErrors = validateStep(step);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep(step);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setStatus('loading');

    try {
      const budgetMap = {
        '$1,999+': 1999,
        '$999 - $1,999': 999,
        '$499 - $999': 499,
      };
      const estimatedValue = budgetMap[formState.budget] || 0;

      const payload = {
        businessName: formState.businessName,
        industry: formState.businessType || 'Unknown',
        websiteUrl: formState.website,
        email: formState.email,
        phone: formState.phone,
        estimatedValue,
        notes: `Contact: ${formState.name}\nGoal: ${formState.primaryGoal}\nWebsite Status: ${formState.websiteStatus}\nTimeline: ${formState.timeline}\nMessage: ${formState.message}`,
        contactStatus: 'New'
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to submit');

      setStatus('success');
      setFormState({
        name: '', businessName: '', email: '', phone: '', businessType: '', website: '', websiteStatus: '', primaryGoal: '', budget: '', timeline: '', message: ''
      });
      setStep(1);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const progressPercent = ((step) / totalSteps) * 100;

  return (
    <main className="contact-page">
      <Helmet>
        <title>Get a Quote | Ascend Digital Co</title>
        <meta name="description" content="Get your free website review today. Fill out our project inquiry form and we'll get back to you within 24 hours to discuss your web design project." />
        <meta property="og:title" content="Get a Quote | Ascend Digital Co" />
        <meta property="og:description" content="Get your free website review today. Fill out our project inquiry form and we'll get back to you within 24 hours to discuss your web design project." />
      </Helmet>

      <section className="contact-hero section-dark text-center">
        <div className="container reveal">
          <h1>Let's Talk About Your Website</h1>
          <p className="subtitle" style={{maxWidth: '700px', margin: '0 auto'}}>
            Ready to grow your business online? Answer a few quick questions to help us understand your project.
          </p>
        </div>
      </section>

      <section className="contact-content-section section">
        <div className="container">
          <div className="contact-grid">
            
            <div className="contact-form-wrapper reveal">
              
              {status === 'success' ? (
                <div className="contact-success-state animate-fade-in">
                  <div className="success-icon-wrapper" aria-hidden="true">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3>Request Received!</h3>
                  <p>Thank you for reaching out. We've received your project details and will be in touch within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="btn btn-outline mt-4">Send Another Message</button>
                </div>
              ) : (
                <div className="form-wizard-container">
                  <div className="wizard-header">
                    <div className="wizard-progress-bar">
                      <div className="wizard-progress-fill" style={{width: `${progressPercent}%`}}></div>
                    </div>
                    <div className="wizard-step-indicator">Step {step} of {totalSteps}</div>
                  </div>

                  <form className="premium-contact-form" onSubmit={handleSubmit} noValidate>
                    
                    {/* STEP 1: Basic Info */}
                    {step === 1 && (
                      <div className="wizard-step animate-fade-in">
                        <div className="form-header">
                          <h2>Your Information</h2>
                          <p>Let's start with the basics so we know who we're talking to.</p>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="name">Full Name *</label>
                            <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} className={errors.name ? 'error-input' : ''} placeholder="Your full name" />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                          </div>
                          <div className="form-group">
                            <label htmlFor="businessName">Business Name *</label>
                            <input type="text" id="businessName" name="businessName" value={formState.businessName} onChange={handleChange} className={errors.businessName ? 'error-input' : ''} placeholder="Acme Corp" />
                            {errors.businessName && <span className="error-text">{errors.businessName}</span>}
                          </div>
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} className={errors.email ? 'error-input' : ''} placeholder="your@email.com" />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                          </div>
                          <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" value={formState.phone} onChange={handleChange} placeholder="Your phone number" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Business Profile */}
                    {step === 2 && (
                      <div className="wizard-step animate-fade-in">
                        <div className="form-header">
                          <h2>Business Profile</h2>
                          <p>Tell us a little bit about your current digital presence.</p>
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="businessType">Type of Business *</label>
                            <input type="text" id="businessType" name="businessType" value={formState.businessType} onChange={handleChange} className={errors.businessType ? 'error-input' : ''} placeholder="e.g. Landscaping, Plumber, Accountant" />
                            {errors.businessType && <span className="error-text">{errors.businessType}</span>}
                          </div>
                          <div className="form-group">
                            <label htmlFor="website">Current Website URL</label>
                            <input type="url" id="website" name="website" value={formState.website} onChange={handleChange} placeholder="https://yourbusiness.com" />
                          </div>
                        </div>

                        <div className="form-group mt-4">
                          <label>Current Website Status *</label>
                          <div className="selection-grid vertical">
                            {websiteStatuses.map((statusOption) => (
                              <button 
                                type="button" 
                                key={statusOption}
                                className={`selection-pill ${formState.websiteStatus === statusOption ? 'selected' : ''}`}
                                onClick={() => handleSelection('websiteStatus', statusOption)}
                              >
                                {statusOption}
                              </button>
                            ))}
                          </div>
                          {errors.websiteStatus && <span className="error-text">{errors.websiteStatus}</span>}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Goals & Budget */}
                    {step === 3 && (
                      <div className="wizard-step animate-fade-in">
                        <div className="form-header">
                          <h2>Goals & Scope</h2>
                          <p>Help us understand what you want to achieve.</p>
                        </div>
                        
                        <div className="form-group">
                          <label>Primary Goal *</label>
                          <div className="selection-grid">
                            {goals.map((goal) => (
                              <button 
                                type="button" 
                                key={goal}
                                className={`selection-pill ${formState.primaryGoal === goal ? 'selected' : ''}`}
                                onClick={() => handleSelection('primaryGoal', goal)}
                              >
                                {goal}
                              </button>
                            ))}
                          </div>
                          {errors.primaryGoal && <span className="error-text">{errors.primaryGoal}</span>}
                        </div>

                        <div className="form-group mt-4">
                          <label>Estimated Budget *</label>
                          <div className="selection-grid">
                            {budgets.map((budget) => (
                              <button 
                                type="button" 
                                key={budget}
                                className={`selection-pill ${formState.budget === budget ? 'selected' : ''}`}
                                onClick={() => handleSelection('budget', budget)}
                              >
                                {budget}
                              </button>
                            ))}
                          </div>
                          {errors.budget && <span className="error-text">{errors.budget}</span>}
                        </div>

                        <div className="form-group mt-4">
                          <label htmlFor="timeline">Desired Launch Timeline</label>
                          <select id="timeline" name="timeline" value={formState.timeline} onChange={handleChange}>
                            <option value="">Select a timeline</option>
                            <option value="asap">ASAP</option>
                            <option value="1-month">Within 1 month</option>
                            <option value="2-3-months">2-3 months</option>
                            <option value="flexible">Flexible</option>
                          </select>
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="message">Additional Project Details</label>
                          <textarea id="message" name="message" value={formState.message} onChange={handleChange} rows="4" placeholder="Anything else we should know?"></textarea>
                        </div>
                      </div>
                    )}

                    {/* Wizard Controls */}
                    <div className="wizard-controls">
                      {step > 1 ? (
                        <button type="button" className="btn btn-secondary" onClick={prevStep}>
                          <ArrowLeft size={18} /> Back
                        </button>
                      ) : (
                        <div></div>
                      )}
                      
                      {step < totalSteps ? (
                        <button type="button" className="btn btn-primary" onClick={nextStep}>
                          Next Step <ArrowRight size={18} />
                        </button>
                      ) : (
                        <button type="submit" className={`btn btn-primary submit-btn pulse-cta ${status === 'loading' ? 'loading' : ''}`} disabled={status === 'loading'}>
                          {status === 'loading' ? 'Submitting...' : 'Submit Request'}
                        </button>
                      )}
                    </div>
                    
                    <p className="contact-trust-note text-center" style={{marginTop: '1.5rem'}}>
                      <strong style={{color: 'var(--color-primary)'}}><ShieldCheck size={16} style={{display: 'inline', marginBottom: '-3px'}} aria-hidden="true" /> 100% Privacy Guaranteed. No spam.</strong>
                    </p>
                  </form>
                </div>
              )}
            </div>
            
            {/* Sidebar Info */}
            <div className="contact-sidebar reveal reveal-delay-1">
              <div className="sidebar-card info-card">
                <h3>Direct Contact</h3>
                <div className="info-item">
                  <Mail className="info-icon" aria-hidden="true" />
                  <div>
                    <span className="info-label">Email Us</span>
                    <a href="mailto:hello@ascenddigitalco.com" className="info-value">hello@ascenddigitalco.com</a>
                  </div>
                </div>
                <div className="info-item">
                  <Clock className="info-icon" aria-hidden="true" />
                  <div>
                    <span className="info-label">Response Time</span>
                    <span className="info-value">Within 24 Hours</span>
                  </div>
                </div>
              </div>
              
              <div className="sidebar-card faq-sidebar-card">
                <h3>Common Questions</h3>
                <div className="sidebar-accordion">
                  {faqs.map((faq, index) => (
                    <div key={index} className={`sidebar-faq-item ${openFaq === index ? 'open' : ''}`}>
                      <button 
                        className="sidebar-faq-question" 
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        aria-expanded={openFaq === index}
                      >
                        {faq.q}
                        {openFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                      <div className="sidebar-faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="sidebar-trust">
                <div className="trust-stars" aria-hidden="true">★★★★★</div>
                <p>"Ascend Digital Co completely transformed our online presence. Our lead volume has tripled since launching the new site."</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
