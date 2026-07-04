import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone } from 'lucide-react';
import './PipelinePage.css';

const STATUS_COLUMNS = [
  'New', 
  'Contacted', 
  'Meeting Scheduled', 
  'Proposal Sent', 
  'Won', 
  'Lost'
];

const PipelinePage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedLeadId, setDraggedLeadId] = useState(null);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('signallightstudio_jwt');
      // Fetch all leads (high limit for Kanban board)
      const res = await fetch('/api/leads?limit=500', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch  {
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDragStart = (e, leadId) => {
    setDraggedLeadId(leadId);
    // Needed for Firefox
    e.dataTransfer.setData('text/plain', leadId);
    e.dataTransfer.effectAllowed = 'move';
    
    // Slight delay to allow the drag ghost image to capture correctly before making the original semi-transparent
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedLeadId(null);
    // Remove drag-over classes from all columns
    document.querySelectorAll('.pipeline-column').forEach(col => {
      col.classList.remove('drag-over');
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const column = e.currentTarget;
    if (!column.classList.contains('drag-over')) {
      column.classList.add('drag-over');
    }
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    if (!draggedLeadId) return;

    // Find the lead being dragged
    const draggedLead = leads.find(l => l._id === draggedLeadId);
    if (!draggedLead || draggedLead.contactStatus === newStatus) return;

    // Optimistically update the UI
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead._id === draggedLeadId 
          ? { ...lead, contactStatus: newStatus } 
          : lead
      )
    );

    // Sync with backend
    try {
      const token = localStorage.getItem('signallightstudio_jwt');
      await fetch(`/api/leads/${draggedLeadId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ contactStatus: newStatus })
      });
    } catch  {
      // If it fails, revert the optimistic update by re-fetching
      fetchLeads();
    }
  };

  // Group leads by status
  const leadsByStatus = STATUS_COLUMNS.reduce((acc, status) => {
    acc[status] = leads.filter(lead => lead.contactStatus === status);
    return acc;
  }, {});

  if (loading) {
    return <div className="dashboard-page" style={{padding: '2rem'}}>Loading pipeline...</div>;
  }

  return (
    <div className="pipeline-page dashboard-page">
      <Helmet><title>Sales Pipeline | CRM</title></Helmet>
      
      <div className="pipeline-header">
        <h1>Sales Pipeline</h1>
        <p>Drag and drop leads through your sales stages to instantly update their status.</p>
      </div>

      <div className="pipeline-board">
        {STATUS_COLUMNS.map(status => (
          <div 
            key={status} 
            className="pipeline-column"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className="column-header">
              <span>{status}</span>
              <span className="column-count">{leadsByStatus[status]?.length || 0}</span>
            </div>
            
            <div className="column-cards">
              {leadsByStatus[status]?.map(lead => (
                <div 
                  key={lead._id} 
                  className={`pipeline-card status-${status.split(' ')[0]}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead._id)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="card-title">{lead.businessName}</div>
                  {lead.industry && <div className="card-industry">{lead.industry}</div>}
                  
                  <div className="card-details">
                    {lead.email && (
                      <div className="card-detail-item">
                        <Mail size={14} /> 
                        <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{lead.email}</span>
                      </div>
                    )}
                    {lead.phone && (
                      <div className="card-detail-item">
                        <Phone size={14} /> 
                        <span>{lead.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="card-date">
                    Added {new Date(lead.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelinePage;

