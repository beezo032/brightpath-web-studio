import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, Calendar, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import './FollowupsPage.css';

const FollowupsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('brightpath_jwt');
      const res = await fetch('/api/leads?limit=1000', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Failed to fetch leads', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleMarkComplete = async (leadId) => {
    try {
      const token = localStorage.getItem('brightpath_jwt');
      // Set followUpDate to null, and update lastContactedDate to today
      await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          followUpDate: null,
          lastContactedDate: new Date().toISOString()
        })
      });
      // Optimistically update UI
      setLeads(leads.filter(l => l._id !== leadId));
    } catch (error) {
      console.error('Failed to update lead status', error);
    }
  };

  // Helper to normalize dates to start-of-day for accurate comparisons
  const getStartOfDay = (dateString) => {
    const d = new Date(dateString);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };

  const todayTime = getStartOfDay(new Date());

  // Filter and categorize leads
  const categorizedLeads = leads.reduce((acc, lead) => {
    if (!lead.followUpDate) return acc;

    const followUpTime = getStartOfDay(lead.followUpDate);
    
    if (followUpTime < todayTime) {
      acc.overdue.push(lead);
    } else if (followUpTime === todayTime) {
      acc.today.push(lead);
    } else {
      acc.upcoming.push(lead);
    }
    return acc;
  }, { overdue: [], today: [], upcoming: [] });

  // Sort upcoming by soonest first
  categorizedLeads.upcoming.sort((a, b) => new Date(a.followUpDate) - new Date(b.followUpDate));

  if (loading) {
    return <div className="dashboard-page" style={{padding: '2rem'}}>Loading follow-ups...</div>;
  }

  const renderLeadCard = (lead) => (
    <div key={lead._id} className="followup-item">
      <div className="followup-info">
        <div className="followup-name">{lead.businessName}</div>
        {lead.industry && <div className="followup-industry">{lead.industry}</div>}
        
        <div className="followup-contact">
          {lead.email && (
            <div className="contact-detail">
              <Mail size={14} /> {lead.email}
            </div>
          )}
          {lead.phone && (
            <div className="contact-detail">
              <Phone size={14} /> {lead.phone}
            </div>
          )}
        </div>
      </div>

      <div className="followup-actions">
        {lead.email && (
          <a href={`mailto:${lead.email}`} className="btn-email">
            <Mail size={16} /> Email
          </a>
        )}
        <button 
          className="btn-complete" 
          onClick={() => handleMarkComplete(lead._id)}
          title="Clear from queue"
        >
          <CheckCircle size={16} /> Mark Complete
        </button>
      </div>
    </div>
  );

  return (
    <div className="followups-page dashboard-page">
      <Helmet><title>Follow-up Tracking | CRM</title></Helmet>
      
      <div className="followups-header">
        <h1>Follow-up Tracking</h1>
        <p>Your daily outreach to-do list. Automatically organized based on scheduled dates.</p>
      </div>

      <div className="followups-container">
        
        {/* Overdue Section */}
        {categorizedLeads.overdue.length > 0 && (
          <div className="followup-section section-overdue">
            <div className="section-header">
              <h2><AlertCircle size={20} /> Overdue</h2>
              <span className="count-badge">{categorizedLeads.overdue.length}</span>
            </div>
            <div className="followup-list">
              {categorizedLeads.overdue.map(renderLeadCard)}
            </div>
          </div>
        )}

        {/* Today Section */}
        <div className="followup-section section-today">
          <div className="section-header">
            <h2><CheckCircle size={20} /> Due Today</h2>
            <span className="count-badge">{categorizedLeads.today.length}</span>
          </div>
          <div className="followup-list">
            {categorizedLeads.today.length > 0 ? (
              categorizedLeads.today.map(renderLeadCard)
            ) : (
              <div className="empty-state">No follow-ups scheduled for today. Great job!</div>
            )}
          </div>
        </div>

        {/* Upcoming Section */}
        <div className="followup-section section-upcoming">
          <div className="section-header">
            <h2><Clock size={20} /> Upcoming Later</h2>
            <span className="count-badge">{categorizedLeads.upcoming.length}</span>
          </div>
          <div className="followup-list">
            {categorizedLeads.upcoming.length > 0 ? (
              categorizedLeads.upcoming.map(renderLeadCard)
            ) : (
              <div className="empty-state">No upcoming follow-ups scheduled.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FollowupsPage;
