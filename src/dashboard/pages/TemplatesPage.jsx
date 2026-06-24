import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Copy, Check, Edit2, Trash2, X } from 'lucide-react';
import './TemplatesPage.css';

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [formData, setFormData] = useState({ title: '', subject: '', body: '' });

  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem('brightpath_jwt');
      const res = await fetch('/api/templates', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.templates && data.templates.length > 0) {
        setTemplates(data.templates);
      } else {
        // Seed default templates if empty
        const seedRes = await fetch('/api/templates/seed', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const seedData = await seedRes.json();
        if (seedData.templates) setTemplates(seedData.templates);
      }
    } catch (err) {
      console.error('Failed to fetch templates', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleCopy = (template) => {
    const textToCopy = `Subject: ${template.subject}\n\n${template.body}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(template._id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const openModal = (template = null) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({ title: template.title, subject: template.subject, body: template.body });
    } else {
      setEditingTemplate(null);
      setFormData({ title: '', subject: '', body: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTemplate(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('brightpath_jwt');
    const url = editingTemplate ? `/api/templates/${editingTemplate._id}` : '/api/templates';
    const method = editingTemplate ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        fetchTemplates();
        closeModal();
      }
    } catch (err) {
      console.error('Failed to save template', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this template?')) return;
    const token = localStorage.getItem('brightpath_jwt');
    try {
      const res = await fetch(`/api/templates/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchTemplates();
    } catch (err) {
      console.error('Failed to delete template', err);
    }
  };

  return (
    <div className="templates-page dashboard-page">
      <Helmet><title>Email Templates | CRM</title></Helmet>
      
      <div className="templates-header">
        <div>
          <h1>Email Templates</h1>
          <p>Save and copy standard outreach and follow-up emails.</p>
        </div>
        <button className="btn btn-primary btn-icon-text" onClick={() => openModal()} style={{padding: '0.75rem 1.5rem'}}>
          <Plus size={18} /> New Template
        </button>
      </div>

      {loading ? (
        <div style={{padding: '2rem'}}>Loading templates...</div>
      ) : (
        <div className="templates-grid">
          {templates.map(template => (
            <div key={template._id} className="template-card">
              <div className="template-card-header">
                <div className="template-title">{template.title}</div>
              </div>
              
              <div className="template-subject">
                <strong>Subject:</strong> {template.subject}
              </div>
              
              <div className="template-body">
                {template.body}
              </div>

              <div className="template-actions">
                <button 
                  className={`btn-icon-text btn-copy ${copiedId === template._id ? 'copied' : ''}`}
                  onClick={() => handleCopy(template)}
                >
                  {copiedId === template._id ? <><Check size={16}/> Copied!</> : <><Copy size={16}/> Copy to Clipboard</>}
                </button>
                <button className="btn-icon-text btn-edit" onClick={() => openModal(template)} title="Edit">
                  <Edit2 size={16} />
                </button>
                <button className="btn-icon-text btn-delete" onClick={() => handleDelete(template._id)} title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingTemplate ? 'Edit Template' : 'Create Template'}</h2>
              <button className="btn-close" onClick={closeModal}><X size={24} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Template Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Cold Outreach #1"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email Subject</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Quick question about {{BusinessName}}"
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email Body</label>
                  <textarea 
                    className="form-control" 
                    placeholder="Type your email content here. Use {{Variable}} for placeholders."
                    value={formData.body}
                    onChange={e => setFormData({...formData, body: e.target.value})}
                    required 
                  />
                  <small style={{color: 'var(--color-text-muted)', marginTop: '0.5rem', display: 'block'}}>
                    Tip: Use placeholders like <code>{'{{FirstName}}'}</code> or <code>{'{{BusinessName}}'}</code> to make customization easier after copying.
                  </small>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-cancel btn-icon-text" onClick={closeModal} style={{borderRadius: 'var(--border-radius)'}}>Cancel</button>
                <button type="submit" className="btn btn-save btn-icon-text" style={{borderRadius: 'var(--border-radius)'}}>
                  {editingTemplate ? 'Save Changes' : 'Create Template'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesPage;
