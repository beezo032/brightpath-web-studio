import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Save, Trash2, Building, Phone, Mail, Globe, MapPin, DollarSign, Calendar } from 'lucide-react';
import { readJsonResponse } from '../../utils/apiResponse';
import './LeadDetailPage.css';

const STATUS_OPTIONS = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

const LeadDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    email: '',
    phone: '',
    websiteUrl: '',
    city: '',
    state: '',
    estimatedValue: 0,
    contactStatus: 'New',
    followUpDate: '',
    notes: ''
  });

  useEffect(() => {
    fetchLead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchLead = async () => {
    try {
      const token = localStorage.getItem('signallightstudio_jwt');
      const res = await fetch(`/api/leads/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await readJsonResponse(res, 'Failed to fetch lead details');
      setLead(data);
      
      // Populate form data
      setFormData({
        businessName: data.businessName || '',
        industry: data.industry || '',
        email: data.email || '',
        phone: data.phone || '',
        websiteUrl: data.websiteUrl || '',
        city: data.city || '',
        state: data.state || '',
        estimatedValue: data.estimatedValue || 0,
        contactStatus: data.contactStatus || 'New',
        followUpDate: data.followUpDate ? data.followUpDate.split('T')[0] : '',
        notes: data.notes || ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setSuccessMsg('');
  };

  const handleStatusChange = (status) => {
    setFormData(prev => ({ ...prev, contactStatus: status }));
    setSuccessMsg('');
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setError('');
    setSuccessMsg('');

    try {
      const token = localStorage.getItem('signallightstudio_jwt');
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      await readJsonResponse(res, 'Failed to save changes');

      setSuccessMsg('Changes saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('signallightstudio_jwt');
      const res = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to delete lead');
      
      navigate('/dashboard/leads');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page" style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error && !lead) {
    return (
      <div className="dashboard-page">
        <button onClick={() => navigate('/dashboard/leads')} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
          <ArrowLeft size={18} /> Back to Leads
        </button>
        <div className="widget-card" style={{ color: '#ef4444' }}>
          <h2>Error loading lead</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lead-detail-page dashboard-page">
      <Helmet><title>{formData.businessName || 'Lead Details'} | CRM</title></Helmet>

      <button onClick={() => navigate('/dashboard/leads')} className="btn" style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 0 }}>
        <ArrowLeft size={18} /> Back to Leads
      </button>

      <form onSubmit={handleSave}>
        <div className="lead-header">
          <div>
            <h1>{formData.businessName || 'Unnamed Business'}</h1>
            {formData.industry && <span className="lead-industry">{formData.industry}</span>}
          </div>
          <div className="header-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 500 }}>{error}</div>}
        {successMsg && <div style={{ color: '#10b981', marginBottom: '1rem', fontWeight: 500 }}>{successMsg}</div>}

        {/* Pipeline Status */}
        <div className="widget-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Pipeline Status</h2>
          <div className="status-selector">
            {STATUS_OPTIONS.map(status => (
              <button
                key={status}
                type="button"
                className={`status-pill ${formData.contactStatus === status ? 'active' : ''}`}
                onClick={() => handleStatusChange(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="lead-grid">
          {/* Left Column */}
          <div className="grid-left">
            <div className="widget-card" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building size={18} /> Contact Information
              </h2>
              
              <div className="form-group">
                <label>Business Name</label>
                <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label><Phone size={14} style={{ display: 'inline', marginRight: '4px' }}/> Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(555) 555-5555" />
                </div>
                <div className="form-group">
                  <label><Mail size={14} style={{ display: 'inline', marginRight: '4px' }}/> Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="contact@business.com" />
                </div>
              </div>

              <div className="form-group">
                <label><Globe size={14} style={{ display: 'inline', marginRight: '4px' }}/> Website URL</label>
                <input type="url" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} placeholder="https://..." />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label><MapPin size={14} style={{ display: 'inline', marginRight: '4px' }}/> City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="widget-card">
              <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Notes & Activity</h2>
              <div className="form-group">
                <textarea 
                  name="notes" 
                  value={formData.notes} 
                  onChange={handleChange} 
                  rows="8" 
                  placeholder="Add meeting notes, background context, or interaction logs here..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid-right">
            <div className="widget-card" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Sales Data</h2>
              
              <div className="form-group">
                <label><DollarSign size={14} style={{ display: 'inline', marginRight: '4px' }}/> Estimated Deal Value</label>
                <input type="number" name="estimatedValue" value={formData.estimatedValue} onChange={handleChange} min="0" step="100" />
              </div>
              
              <div className="form-group">
                <label><Calendar size={14} style={{ display: 'inline', marginRight: '4px' }}/> Next Follow-Up Date</label>
                <input type="date" name="followUpDate" value={formData.followUpDate} onChange={handleChange} />
              </div>
            </div>

            <div className="danger-zone">
              <h3>Danger Zone</h3>
              <p>Permanently delete this lead and all associated data from the CRM.</p>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                <Trash2 size={18} /> Delete Lead
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LeadDetailPage;

