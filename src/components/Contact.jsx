import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formState, setFormState] = useState('idle');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    url: '',
    type: '',
    help: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your full name.";
    if (!formData.business.trim()) newErrors.business = "Please tell us your business name.";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.help.trim()) newErrors.help = "Please select what you need help with.";
    if (!formData.budget.trim()) newErrors.budget = "Please select a budget range.";
    if (!formData.message.trim()) newErrors.message = "Please provide some details about your project.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstError = document.getElementById(Object.keys(validationErrors)[0]);
      if (firstError) firstError.focus();
      return;
    }
    
    setFormState('submitting');
    
    try {
      const estimatedValue = formData.budget === 'premium' ? 1999 : (formData.budget === 'growth' ? 999 : 499);
      
      const payload = {
        businessName: formData.business,
        industry: formData.type || 'Unknown',
        websiteUrl: formData.url,
        email: formData.email,
        phone: formData.phone,
        estimatedValue,
        notes: `Contact Name: ${formData.name}\nHelp With: ${formData.help}\nTimeline: ${formData.timeline}\nMessage: ${formData.message}`,
        contactStatus: 'New'
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to submit');

      setFormState('success');
      setFormData({
        name: '', business: '', email: '', phone: '', url: '', type: '', help: '', budget: '', timeline: '', message: ''
      });
    } catch (error) {
      console.error(error);
      setErrors({ message: 'Something went wrong. Please try again.' });
      setFormState('idle');
    }
  };

  return (
    <section id="contact" className="contact section section-gray">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Ready to Get More Leads?</h2>
            <p className="subtitle">
              Let's talk about how we can upgrade your online presence to drive more calls and quote requests. Fill out the form, and we'll reply with honest next steps.
            </p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon"><Phone size={20} /></div>
                <div>
                  <h4>Call Us</h4>
                  <p>(555) 123-4567</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="method-icon"><Mail size={20} /></div>
                <div>
                  <h4>Email Us</h4>
                  <p>hello@ascenddigitalcoweb.com</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="method-icon"><MapPin size={20} /></div>
                <div>
                  <h4>Location</h4>
                  <p>Serving Local Businesses Nationwide</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-wrapper">
            {formState === 'success' ? (
              <div className="success-message animate-fade-in">
                <div className="success-icon">✓</div>
                <h3>Request Received!</h3>
                <p>Thank you for reaching out. We're reviewing your information and will be in touch shortly to discuss how we can help your business grow.</p>
                <button className="btn btn-secondary" onClick={() => setFormState('idle')}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe" 
                      className={errors.name ? 'error-input' : ''}
                    />
                    {errors.name && <span className="error-text"><AlertCircle size={14} /> {errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="business">Business Name *</label>
                    <input 
                      type="text" 
                      id="business" 
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="John's Landscaping" 
                      className={errors.business ? 'error-input' : ''}
                    />
                    {errors.business && <span className="error-text"><AlertCircle size={14} /> {errors.business}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com" 
                      className={errors.email ? 'error-input' : ''}
                    />
                    {errors.email && <span className="error-text"><AlertCircle size={14} /> {errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000" 
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="url">Current Website URL</label>
                    <input 
                      type="url" 
                      id="url" 
                      value={formData.url}
                      onChange={handleChange}
                      placeholder="https://example.com" 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Type of Business</label>
                    <input 
                      type="text" 
                      id="type" 
                      value={formData.type}
                      onChange={handleChange}
                      placeholder="e.g. Plumbing, Cleaning..." 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="help">What do you need help with? *</label>
                    <select 
                      id="help" 
                      value={formData.help}
                      onChange={handleChange}
                      className={errors.help ? 'error-input' : ''}
                    >
                      <option value="">Select an option</option>
                      <option value="new_site">I need a brand new website</option>
                      <option value="redesign">I need to redesign my current website</option>
                      <option value="seo">I need help with Local SEO & Google visibility</option>
                      <option value="care">I need website maintenance</option>
                      <option value="other">Other / Not sure</option>
                    </select>
                    {errors.help && <span className="error-text"><AlertCircle size={14} /> {errors.help}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="budget">Budget Range *</label>
                    <select 
                      id="budget" 
                      value={formData.budget}
                      onChange={handleChange}
                      className={errors.budget ? 'error-input' : ''}
                    >
                      <option value="">Select your budget</option>
                      <option value="starter">$499 - $999</option>
                      <option value="growth">$999 - $1,999</option>
                      <option value="premium">$1,999+</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                    {errors.budget && <span className="error-text"><AlertCircle size={14} /> {errors.budget}</span>}
                  </div>
                </div>

                <div className="form-group full-width" style={{marginBottom: '1rem'}}>
                  <label htmlFor="timeline">Expected Timeline</label>
                  <select 
                    id="timeline" 
                    value={formData.timeline}
                    onChange={handleChange}
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">As soon as possible</option>
                    <option value="1month">Within 1 month</option>
                    <option value="3months">Within 3 months</option>
                    <option value="just_looking">Just researching</option>
                  </select>
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="message">Message *</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us a bit about your goals and what makes your business unique..."
                    className={errors.message ? 'error-input' : ''}
                  ></textarea>
                  {errors.message && <span className="error-text"><AlertCircle size={14} /> {errors.message}</span>}
                </div>
                
                <button 
                  type="submit" 
                  className={`btn btn-primary submit-btn pulse-cta ${formState === 'submitting' ? 'loading' : ''}`}
                  disabled={formState === 'submitting' || formState === 'success'}
                >
                  {formState === 'submitting' ? 'Sending...' : formState === 'success' ? 'Sent!' : 'Get Your Free Custom Proposal'}
                </button>
                <p className="contact-trust-note" style={{marginTop: '1rem', textAlign: 'center'}}>
                  No pressure. We'll review your request and reply with honest next steps.<br/>
                  <strong style={{color: 'var(--color-primary)'}}>100% Privacy Guaranteed. No spam.</strong>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
