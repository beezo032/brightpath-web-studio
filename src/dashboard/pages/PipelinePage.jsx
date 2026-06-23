import React from 'react';
import { Helmet } from 'react-helmet-async';
import './DashboardPages.css';

const PipelinePage = () => {
  const columns = [
    { id: 'new', title: 'New Leads', items: [{ id: 1, title: 'John Doe', company: 'JD Landscaping', tag: 'Website' }] },
    { id: 'contacted', title: 'Contacted', items: [{ id: 2, title: 'Jane Smith', company: 'JS Plumbing', tag: 'SEO' }] },
    { id: 'meeting', title: 'Meeting Scheduled', items: [{ id: 3, title: 'Mike Johnson', company: 'Mike\'s HVAC', tag: 'Redesign' }] },
    { id: 'proposal', title: 'Proposal Sent', items: [{ id: 4, title: 'Sarah Davis', company: 'Davis Roofing', tag: 'Website' }] },
    { id: 'won', title: 'Won', items: [{ id: 5, title: 'Tom Wilson', company: 'Wilson Law', tag: 'SEO' }] },
  ];

  return (
    <div className="dashboard-page">
      <Helmet><title>Sales Pipeline | CRM</title></Helmet>
      
      <div className="dashboard-header">
        <h1>Sales Pipeline</h1>
        <p>Drag and drop leads through your sales stages.</p>
      </div>

      <div className="kanban-board">
        {columns.map(col => (
          <div key={col.id} className="kanban-column">
            <div className="kanban-column-header">
              <span>{col.title}</span>
              <span className="kanban-count">{col.items.length}</span>
            </div>
            {col.items.map(item => (
              <div key={item.id} className="kanban-card">
                <h4>{item.title}</h4>
                <p>{item.company}</p>
                <div className="kanban-tags">
                  <span className="k-tag">{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelinePage;
