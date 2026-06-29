import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit, Trash2, Copy, Check, X, FileText } from 'lucide-react';
import './TemplatesPage.css';

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [formData, setFormData] = useState({ title: '', subject: '', body: '' });
  
  // Copy State
  const [copiedId, setCopiedId] = useState(null);
  const [copiedType, setCopiedType] = useState(null); // 'subject' or 'body'

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('signallightstudio_jwt');
      const res = await fetch('/api/templates', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      // Auto-seed if empty
      if (data.templates && data.templates.length === 0) {
        await seedTemplates();
      } else {
        setTemplates(data.templates || []);
      }
    } catch (err) {
      console.error('Failed to fetch templates', err);
    }
    setLoading(false);
  };

  const seedTemplates = async () => {
    try {
      const token = localStorage.getItem('signallightstudio_jwt');
      const res = await fetch('/api/templates/seed', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.templates) setTemplates(data.templates);
    } catch (err) {
      console.error('Failed to seed templates', err);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleOpenModal = (template = null) => {
    if (template) {
      setCurrentTemplate(template);
      setFormData({
        title: template.title,
        subject: template.subject,
        body: template.body
      });
    } else {
      setCurrentTemplate(null);
      setFormData({ title: '', subject: '', body: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('signallightstudio_jwt');
    const method = currentTemplate ? 'PUT' : 'POST';
    const url = currentTemplate ? `/api/templates/${currentTemplate._id}` : '/api/templates';

    try {
      await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      setIsModalOpen(false);
      fetchTemplates();
    } catch (err) {
      console.error('Failed to save template', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this template?')) return;
    const token = localStorage.getItem('signallightstudio_jwt');
    try {
      await fetch(`/api/templates/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchTemplates();
    } catch (err) {
      console.error('Failed to delete template', err);
    }
  };

  const handleCopy = (text, id, type) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedId(null);
      setCopiedType(null);
    }, 2000);
  };

  const insertVariable = (variable) => {
    setFormData(prev => ({
      ...prev,
      body: prev.body + variable
    }));
  };

  // Helper to render text with highlighted {{Variables}}
  const renderHighlightedText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\{\{[^}]+\}\})/g);
    return parts.map((part, index) => {
      if (part.startsWith('{{') && part.endsWith('}}')) {
        return <span key={index} className="template-var">{part}</span>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="templates-page dashboard-page">
      <Helmet><title>Email Templates | CRM</title></Helmet>
      
      <div className="templates-header">
        <div>
          <h1>Email Templates</h1>
          <p>Save time with pre-written outreach and follow-up emails.</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} style={{marginRight: '0.5rem'}} /> New Template
        </button>
      </div>

      {loading ? (
        <div className="loading-state">Loading templates...</div>
      ) : templates.length === 0 ? (
        <div className="loading-state">No templates found. Create one to get started!</div>
      ) : (
        <div className="templates-grid">
          {templates.map(template => (
            <div key={template._id} className="template-card">
              <div className="template-card-header">
                <h3>{template.title}</h3>
                <div className="template-actions">
                  <button className="action-icon" onClick={() => handleOpenModal(template)} title="Edit">
                    <Edit size={16} />
                  </button>
                  <button className="action-icon delete" onClick={() => handleDelete(template._id)} title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="template-card-body">
                <div className="template-field">
                  <span className="template-field-label">Subject Line</span>
                  <div className="template-subject">{renderHighlightedText(template.subject)}</div>
                </div>
                
                <div className="template-field" style={{flex: 1}}>
                  <span className="template-field-label">Email Body</span>
                  <div className="template-content-preview">
                    {renderHighlightedText(template.body)}
                  </div>
                </div>
              </div>

              <div className="template-card-footer">
                <button 
                  className={`btn-copy ${copiedId === template._id && copiedType === 'subject' ? 'copied' : ''}`}
                  onClick={() => handleCopy(template.subject, template._id, 'subject')}
                >
                  {copiedId === template._id && copiedType === 'subject' ? <Check size={16} /> : <Copy size={16} />}
                  Subject
                </button>
                <button 
                  className={`btn-copy ${copiedId === template._id && copiedType === 'body' ? 'copied' : ''}`}
                  onClick={() => handleCopy(template.body, template._id, 'body')}
                >
                  {copiedId === template._id && copiedType === 'body' ? <Check size={16} /> : <FileText size={16} />}
                  Body
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: '700px'}}>
            <div className="modal-header">
              <h2>{currentTemplate ? 'Edit Template' : 'Create Template'}</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            
            <form className="template-form" onSubmit={handleSave}>
              <div className="form-group">
                <label>Template Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g., Cold Outreach - Plumbers"
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                />
              </div>

              <div className="form-group">
                <label>Subject Line</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g., Quick question about {{BusinessName}}"
                  value={formData.subject} 
                  onChange={e => setFormData({...formData, subject: e.target.value})} 
                />
              </div>

              <div className="form-group">
                <label>Email Body</label>
                <textarea 
                  required 
                  rows="10"
                  placeholder="Hi {{FirstName}}, ..."
                  value={formData.body} 
                  onChange={e => setFormData({...formData, body: e.target.value})} 
                ></textarea>
              </div>

              <div className="variable-hints">
                <strong>Smart Variables</strong>
                <p style={{margin: '0 0 0.5rem 0'}}>Click a variable to insert it into your email body. It will be highlighted in the preview.</p>
                <div className="variable-badges">
                  <span className="var-badge" onClick={() => insertVariable('{{BusinessName}}')}>{"{{BusinessName}}"}</span>
                  <span className="var-badge" onClick={() => insertVariable('{{FirstName}}')}>{"{{FirstName}}"}</span>
                  <span className="var-badge" onClick={() => insertVariable('{{Industry}}')}>{"{{Industry}}"}</span>
                  <span className="var-badge" onClick={() => insertVariable('{{MyName}}')}>{"{{MyName}}"}</span>
                </div>
              </div>

              <div className="modal-actions" style={{marginTop: '1rem'}}>
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{currentTemplate ? 'Save Changes' : 'Create Template'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesPage;

