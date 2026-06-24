import React from 'react';
import { Construction } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './DashboardPages.css';

// Reusable placeholder component for the remaining pages
const PlaceholderPage = ({ title }) => (
  <div className="dashboard-page">
    <Helmet><title>{title} | CRM</title></Helmet>
    <div className="dashboard-header">
      <h1>{title}</h1>
    </div>
    <div className="placeholder-page widget-card">
      <Construction size={48} />
      <h2>Under Construction</h2>
      <p>The {title} module is currently being built.</p>
    </div>
  </div>
);

export const LeadDetailPage = () => <PlaceholderPage title="Lead Details" />;
export const SettingsPage = () => <PlaceholderPage title="CRM Settings" />;
