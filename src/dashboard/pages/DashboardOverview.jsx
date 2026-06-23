import React from 'react';
import { Users, UserPlus, PhoneCall, ThumbsUp, Trophy, DollarSign } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './DashboardPages.css';

const StatCard = ({ title, value, icon, trend, isPositive }) => (
  <div className="stat-card">
    <div className="stat-card-header">
      <div className="stat-icon">{icon}</div>
      <div className={`stat-trend ${isPositive ? 'positive' : 'negative'}`}>
        {trend}
      </div>
    </div>
    <div className="stat-card-body">
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  </div>
);

const DashboardOverview = () => {
  return (
    <div className="dashboard-page">
      <Helmet><title>Dashboard Overview | CRM</title></Helmet>
      
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your agency today.</p>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Leads" value="142" icon={<Users />} trend="+12%" isPositive={true} />
        <StatCard title="New Leads" value="18" icon={<UserPlus />} trend="+5%" isPositive={true} />
        <StatCard title="Contacted Leads" value="84" icon={<PhoneCall />} trend="+2%" isPositive={true} />
        <StatCard title="Interested Leads" value="32" icon={<ThumbsUp />} trend="-1%" isPositive={false} />
        <StatCard title="Won Clients" value="15" icon={<Trophy />} trend="+8%" isPositive={true} />
        <StatCard title="Revenue Generated" value="$42,500" icon={<DollarSign />} trend="+15%" isPositive={true} />
      </div>
      
      <div className="dashboard-widgets">
        <div className="widget-card">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            <li><strong>John Doe</strong> submitted a new lead form. <span className="time">2 hours ago</span></li>
            <li><strong>Acme Corp</strong> moved to "Proposal Sent". <span className="time">5 hours ago</span></li>
            <li><strong>Jane Smith</strong> replied to your follow-up. <span className="time">1 day ago</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
