import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Plus, Download, Upload, Edit, Trash2, X } from 'lucide-react';
import './LeadsPage.css';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const [importing, setImporting] = useState(false);
  const [importMessage, setImportMessage] = useState(null);
  
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
    websiteScore: '', estimatedValue: '', notes: '', followUpDate: ''
  });

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('signallightstudio_jwt');
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
        websiteScore: '', estimatedValue: '', notes: '', followUpDate: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveLead = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('signallightstudio_jwt');
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
    const token = localStorage.getItem('signallightstudio_jwt');
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

  const handleCSVImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImporting(true);
    setImportMessage(null);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const csvText = event.target.result;
        
        // Simple but robust CSV parser that handles quotes and commas
        const lines = [];
        let row = [''];
        let inQuotes = false;

        for (let i = 0; i < csvText.length; i++) {
          const char = csvText[i];
          const nextChar = csvText[i + 1];

          if (char === '"') {
            if (inQuotes && nextChar === '"') {
              row[row.length - 1] += '"';
              i++; // skip next quote
            } else {
              inQuotes = !inQuotes;
            }
          } else if (char === ',' && !inQuotes) {
            row.push('');
          } else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') {
              i++; // skip LF
            }
            lines.push(row);
            row = [''];
          } else {
            row[row.length - 1] += char;
          }
        }
        if (row.length > 1 || row[0] !== '') {
          lines.push(row);
        }

        if (lines.length < 2) {
          throw new Error('CSV is empty or invalid.');
        }

        const headers = lines[0].map(h => h.trim().toLowerCase());
        
        // Find column mappings based on aliases
        const mapCol = (aliases) => {
          return headers.findIndex(h => aliases.some(alias => h.includes(alias)));
        };

        const nameIdx = mapCol(['company', 'business', 'name', 'title', 'organization']);
        const phoneIdx = mapCol(['phone', 'tel', 'cell', 'mobile']);
        const emailIdx = mapCol(['email', 'e-mail', 'mail']);
        const websiteIdx = mapCol(['website', 'site', 'url', 'link']);
        const industryIdx = mapCol(['industry', 'category', 'niche', 'type', 'specialty']);
        const cityIdx = mapCol(['city', 'town', 'locality']);
        const stateIdx = mapCol(['state', 'region', 'province']);
        const notesIdx = mapCol(['notes', 'note', 'description', 'about', 'summary']);

        // Default name column to 0 if not explicitly found
        const finalNameIdx = nameIdx >= 0 ? nameIdx : 0;

        const parsedLeads = [];
        for (let idx = 1; idx < lines.length; idx++) {
          const columns = lines[idx];
          if (!columns || columns.length === 0) continue;
          
          const getVal = (colIdx) => (colIdx >= 0 && colIdx < columns.length ? columns[colIdx].trim() : '');

          const businessName = getVal(finalNameIdx);
          if (!businessName) continue; // required field

          parsedLeads.push({
            businessName,
            email: getVal(emailIdx),
            phone: getVal(phoneIdx),
            websiteUrl: getVal(websiteIdx),
            industry: getVal(industryIdx),
            city: getVal(cityIdx),
            state: getVal(stateIdx),
            notes: getVal(notesIdx),
            contactStatus: 'New'
          });
        }

        if (parsedLeads.length === 0) {
          throw new Error('No valid leads with a business name found in the file.');
        }

        const token = localStorage.getItem('signallightstudio_jwt');
        const response = await fetch('/api/leads/bulk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(parsedLeads)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to save leads to database.');
        }

        setImportMessage({ type: 'success', text: `Successfully imported ${parsedLeads.length} leads!` });
        fetchLeads();
      } catch (err) {
        console.error(err);
        setImportMessage({ type: 'error', text: err.message || 'Error importing CSV.' });
      } finally {
        setImporting(false);
        e.target.value = ''; // clear input
      }
    };

    reader.onerror = () => {
      setImportMessage({ type: 'error', text: 'Error reading file.' });
      setImporting(false);
      e.target.value = '';
    };

    reader.readAsText(file);
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
    link.setAttribute('download', 'signallightstudio_leads.csv');
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
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleCSVImport} 
            style={{ display: 'none' }} 
            accept=".csv" 
          />
          <button className="btn btn-outline" onClick={() => fileInputRef.current.click()} disabled={importing}>
            <Upload size={18} style={{marginRight: '0.5rem'}} /> {importing ? 'Importing...' : 'Import CSV'}
          </button>
          <button className="btn btn-outline" onClick={exportCSV}>
            <Download size={18} style={{marginRight: '0.5rem'}} /> Export CSV
          </button>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            <Plus size={18} style={{marginRight: '0.5rem'}} /> Add Lead
          </button>
        </div>
      </div>

      {importMessage && (
        <div className={`import-alert ${importMessage.type}`}>
          <span>{importMessage.text}</span>
          <button onClick={() => setImportMessage(null)} className="alert-close">
            <X size={16} />
          </button>
        </div>
      )}

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
              <div className="form-row">
                <div className="form-group">
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
                <div className="form-group">
                  <label>Follow-up Date</label>
                  <input 
                    type="date" 
                    className="form-control"
                    value={formData.followUpDate ? formData.followUpDate.split('T')[0] : ''} 
                    onChange={e => setFormData({...formData, followUpDate: e.target.value})} 
                  />
                </div>
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

