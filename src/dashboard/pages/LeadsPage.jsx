import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Plus, Download, Edit, Trash2, X } from 'lucide-react';
import './LeadsPage.css';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Filtering
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    businessName: '', email: '', phone: '', industry: '', 
    city: '', state: '', websiteUrl: '', contactStatus: 'New', 
    websiteScore: '', estimatedValue: '', notes: ''
  });

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('brightpath_jwt');
      const res = await fetch(`/api/leads?page=${page}&search=${search}&status=${statusFilter}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setLeads(data.leads || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch leads', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, [page, search, statusFilter]);

  const handleOpenModal = (lead = null) => {
    if (lead) {
      setCurrentLead(lead);
      setFormData(lead);
    } else {
      setCurrentLead(null);
      setFormData({
        businessName: '', email: '', phone: '', industry: '', 
        city: '', state: '', websiteUrl: '', contactStatus: 'New', 
        websiteScore: '', estimatedValue: '', notes: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveLead = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('brightpath_jwt');
    const method = currentLead ? 'PUT' : 'POST';
    const url = currentLead ? `/api/leads/${currentLead._id}` : '/api/leads';

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
      fetchLeads();
    } catch (err) {
      console.error('Failed to save lead', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    const token = localStorage.getItem('brightpath_jwt');
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchLeads();
    } catch (err) {
      console.error('Failed to delete lead', err);
    }
  };

  const exportCSV = () => {
    if (!leads.length) return;
    const headers = ['Business Name', 'Email', 'Phone', 'Industry', 'Status', 'Date Added'];
    const csvContent = [
      headers.join(','),
      ...leads.map(l => `"${l.businessName}","${l.email || ''}","${l.phone || ''}","${l.industry || ''}","${l.contactStatus}","${new Date(l.createdAt).toLocaleDateString()}"`)
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'brightpath_leads.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="leads-page dashboard-page">
      <Helmet><title>Lead Management | CRM</title></Helmet>
      
      <div className="leads-header">
        <div>
          <h1>Lead Management</h1>
          <p>Track, update, and export your agency leads.</p>
        </div>
        <div className="leads-actions">
          <button className="btn btn-outline" onClick={exportCSV}>
            <Download size={18} style={{marginRight: '0.5rem'}} /> Export CSV
          </button>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            <Plus size={18} style={{marginRight: '0.5rem'}} /> Add Lead
          </button>
        </div>
      </div>

      <div className="leads-controls">
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Meeting Scheduled">Meeting Scheduled</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      <div className="table-container">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Business Name</th>
              <th>Contact Info</th>
              <th>Industry</th>
              <th>Status</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{textAlign: 'center'}}>Loading leads...</td></tr>
            ) : (leads || []).length === 0 ? (
              <tr><td colSpan="6" style={{textAlign: 'center'}}>No leads found.</td></tr>
            ) : (
              (leads || []).map(lead => (
                <tr key={lead._id}>
                  <td><strong>{lead.businessName}</strong></td>
                  <td>
                    <div>{lead.email}</div>
                    <div style={{fontSize: '0.85rem', color: 'var(--color-text-muted)'}}>{lead.phone}</div>
                  </td>
                  <td>{lead.industry}</td>
                  <td>
                    <span className={`status-badge status-${(lead.contactStatus || 'New').split(' ')[0]}`}>
                      {lead.contactStatus || 'New'}
                    </span>
                  </td>
                  <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-btns">
                      <button className="action-btn" onClick={() => handleOpenModal(lead)} title="Edit"><Edit size={18} /></button>
                      <button className="action-btn delete" onClick={() => handleDelete(lead._id)} title="Delete"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {!loading && totalPages > 1 && (
          <div className="pagination">
            <span>Page {page} of {totalPages}</span>
            <div className="pagination-controls">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="pagination-btn">Previous</button>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="pagination-btn">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{currentLead ? 'Edit Lead' : 'Add New Lead'}</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <form className="lead-form" onSubmit={handleSaveLead}>
              <div className="form-row">
                <div className="form-group">
                  <label>Website Score (0-100)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={formData.websiteScore} 
                    onChange={e => setFormData({...formData, websiteScore: e.target.value})} 
                    min="0" max="100"
                  />
                </div>
                <div className="form-group">
                  <label>Estimated Value ($)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={formData.estimatedValue} 
                    onChange={e => setFormData({...formData, estimatedValue: e.target.value})} 
                  />
                </div>
              </div>
              
              <div>
                <label>Business Name *</label>
                <input required type="text" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} />
              </div>
              <div>
                <label>Industry</label>
                <input type="text" value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} />
              </div>
              <div>
                <label>Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label>Phone</label>
                <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div>
                <label>Status</label>
                <select value={formData.contactStatus} onChange={e => setFormData({...formData, contactStatus: e.target.value})}>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Meeting Scheduled">Meeting Scheduled</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
              <div>
                <label>Website URL</label>
                <input type="url" value={formData.websiteUrl} onChange={e => setFormData({...formData, websiteUrl: e.target.value})} />
              </div>
              <div className="form-full-width">
                <label>Notes</label>
                <textarea rows="3" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{currentLead ? 'Save Changes' : 'Create Lead'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsPage;
