import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, AlertCircle, CheckCircle, Mail, Phone, CalendarPlus } from 'lucide-react';
import './FollowupsPage.css';

const FollowupsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('signalrisestudio_jwt');
      // Fetch a large number of leads to filter client-side
      const res = await fetch('/api/leads?limit=1000', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error('Failed to fetch leads for follow-ups', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateFollowUp = async (leadId, newDateStr) => {
    try {
      const token = localStorage.getItem('signalrisestudio_jwt');
      await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ followUpDate: newDateStr })
      });
      // Update local state without full refetch for snappy UI
      setLeads(leads.map(l => l._id === leadId ? { ...l, followUpDate: newDateStr } : l));
    } catch (err) {
      console.error('Failed to update follow-up date', err);
    }
  };

  const markDone = (leadId) => {
    updateFollowUp(leadId, null);
  };

  const pushForward = (leadId, days) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    updateFollowUp(leadId, d.toISOString());
  };

  // --- Categorization Logic ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const overdue = [];
  const dueToday = [];
  const upcoming = [];

  leads.forEach(lead => {
    if (!lead.followUpDate) return;
    if (['Won', 'Lost'].includes(lead.contactStatus)) return; // Ignore closed leads

    const fDate = new Date(lead.followUpDate);
    fDate.setHours(0, 0, 0, 0);

    if (fDate < today) {
      overdue.push(lead);
    } else if (fDate.getTime() === today.getTime()) {
      dueToday.push(lead);
    } else {
      upcoming.push(lead);
    }
  });

  // Sort arrays by date
  overdue.sort((a, b) => new Date(a.followUpDate) - new Date(b.followUpDate));
  dueToday.sort((a, b) => new Date(a.followUpDate) - new Date(b.followUpDate));
  upcoming.sort((a, b) => new Date(a.followUpDate) - new Date(b.followUpDate));

  const FollowUpCard = ({ lead }) => {
    const dateObj = new Date(lead.followUpDate);
    const dateStr = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

    return (
      <div className="followup-card">
        <div className="followup-info">
          <h3 className="followup-business">{lead.businessName}</h3>
          <span className={`status-badge status-${(lead.contactStatus || 'New').split(' ')[0]}`} style={{width: 'fit-content', marginTop: '0.25rem'}}>
            {lead.contactStatus || 'New'}
          </span>
          <div className="followup-date-display" style={{marginTop: '0.5rem'}}>
            <Calendar size={14} /> Scheduled: {dateStr}
          </div>
        </div>

        <div className="followup-contact">
          {lead.email ? (
            <a href={`mailto:${lead.email}`} className="contact-link"><Mail size={14} /> {lead.email}</a>
          ) : (
            <span className="contact-link disabled"><Mail size={14} /> No email</span>
          )}
          {lead.phone ? (
            <a href={`tel:${lead.phone}`} className="contact-link"><Phone size={14} /> {lead.phone}</a>
          ) : (
             <span className="contact-link disabled"><Phone size={14} /> No phone</span>
          )}
        </div>

        <div className="followup-actions">
          <button className="action-btn-sm btn-done" onClick={() => markDone(lead._id)} title="Clear Follow-up Date">
            <CheckCircle size={14} /> Done
          </button>
          <button className="action-btn-sm" onClick={() => pushForward(lead._id, 1)} title="Push to Tomorrow">
            +1 Day
          </button>
          <button className="action-btn-sm" onClick={() => pushForward(lead._id, 7)} title="Push to Next Week">
            +1 Week
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="followups-page dashboard-page">
      <Helmet><title>Follow-up Tracker | CRM</title></Helmet>

      <div className="followups-header">
        <h1>Follow-up Tracker</h1>
        <p>Your daily action plan for connecting with prospects.</p>
      </div>

      {loading ? (
        <div style={{padding: '2rem', color: '#64748b'}}>Loading your tasks...</div>
      ) : (
        <div className="followups-grid">
          
          {/* Overdue Column */}
          <div className="followup-column column-overdue">
            <div className="column-header">
              <AlertCircle size={20} color="#b91c1c" />
              <h2>Overdue</h2>
              <span className="count-badge">{overdue.length}</span>
            </div>
            {overdue.length === 0 ? (
              <div className="empty-state">No overdue tasks. Great job!</div>
            ) : (
              overdue.map(lead => <FollowUpCard key={lead._id} lead={lead} />)
            )}
          </div>

          {/* Due Today Column */}
          <div className="followup-column column-today">
            <div className="column-header">
              <Clock size={20} color="#b45309" />
              <h2>Due Today</h2>
              <span className="count-badge">{dueToday.length}</span>
            </div>
            {dueToday.length === 0 ? (
              <div className="empty-state">You're all caught up for today!</div>
            ) : (
              dueToday.map(lead => <FollowUpCard key={lead._id} lead={lead} />)
            )}
          </div>

          {/* Upcoming Column */}
          <div className="followup-column column-upcoming">
            <div className="column-header">
              <CalendarPlus size={20} color="#15803d" />
              <h2>Upcoming</h2>
              <span className="count-badge">{upcoming.length}</span>
            </div>
            {upcoming.length === 0 ? (
              <div className="empty-state">Nothing scheduled for the future yet.</div>
            ) : (
              upcoming.map(lead => <FollowUpCard key={lead._id} lead={lead} />)
            )}
          </div>

        </div>
      )}

    </div>
  );
};

export default FollowupsPage;

