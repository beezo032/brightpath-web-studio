import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, DollarSign, Target, TrendingUp } from 'lucide-react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import './DashboardOverview.css';

const STATUS_COLORS = {
  'New': '#3b82f6',
  'Contacted': '#8b5cf6',
  'Meeting Scheduled': '#f59e0b',
  'Proposal Sent': '#ec4899',
  'Won': '#10b981',
  'Lost': '#ef4444'
};

const DashboardOverview = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllLeads = async () => {
      try {
        const token = localStorage.getItem('signallightstudio_jwt');
        const res = await fetch('/api/leads?limit=1000', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.leads) setLeads(data.leads);
      } catch  {
      }
      setLoading(false);
    };
    fetchAllLeads();
  }, []);

  if (loading) {
    return <div className="dashboard-page" style={{padding: '2rem'}}>Loading analytics...</div>;
  }

  // --- Calculations ---
  
  // Total Leads
  const totalLeads = leads.length;
  
  // Total Revenue Won
  const wonLeads = leads.filter(l => l.contactStatus === 'Won');
  const revenueWon = wonLeads.reduce((sum, l) => sum + (Number(l.estimatedValue) || 0), 0);
  
  // Pipeline Value (Active leads not Won/Lost)
  const activeLeads = leads.filter(l => !['Won', 'Lost'].includes(l.contactStatus));
  const pipelineValue = activeLeads.reduce((sum, l) => sum + (Number(l.estimatedValue) || 0), 0);
  
  // Win Rate
  const closedLeads = leads.filter(l => ['Won', 'Lost'].includes(l.contactStatus));
  const winRate = closedLeads.length > 0 
    ? Math.round((wonLeads.length / closedLeads.length) * 100) 
    : 0;

  // Formatter for currency
  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  // --- Chart Data Preparation ---

  // 1. Pipeline Status Breakdown (Pie Chart)
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.contactStatus] = (acc[lead.contactStatus] || 0) + 1;
    return acc;
  }, {});
  
  const pipelineData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status],
    color: STATUS_COLORS[status] || '#cbd5e1'
  })).sort((a, b) => b.value - a.value);

  // 2. Leads by Industry (Bar Chart)
  const industryCounts = leads.reduce((acc, lead) => {
    const ind = lead.industry || 'Unknown';
    acc[ind] = (acc[ind] || 0) + 1;
    return acc;
  }, {});
  
  const industryData = Object.keys(industryCounts)
    .map(ind => ({ name: ind, count: industryCounts[ind] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 7); // Top 7 industries

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="label">{payload[0].name || payload[0].payload.name}</div>
          <div className="desc">Count: {payload[0].value}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-overview dashboard-page">
      <Helmet><title>Dashboard Analytics | CRM</title></Helmet>
      
      <div className="overview-header">
        <div>
          <h1>Overview & Analytics</h1>
          <p>Real-time metrics on your agency's pipeline and revenue.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon icon-blue"><Users size={28} /></div>
          <div className="metric-info">
            <span className="metric-label">Total Leads</span>
            <span className="metric-value">{totalLeads}</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon icon-purple"><Target size={28} /></div>
          <div className="metric-info">
            <span className="metric-label">Pipeline Value</span>
            <span className="metric-value">{formatCurrency(pipelineValue)}</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon icon-green"><DollarSign size={28} /></div>
          <div className="metric-info">
            <span className="metric-label">Revenue Won</span>
            <span className="metric-value">{formatCurrency(revenueWon)}</span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon icon-orange"><TrendingUp size={28} /></div>
          <div className="metric-info">
            <span className="metric-label">Win Rate</span>
            <span className="metric-value">{winRate}%</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        
        {/* Pipeline Distribution Chart */}
        <div className="chart-card">
          <h3>Pipeline Distribution</h3>
          {pipelineData.length > 0 ? (
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pipelineData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div style={{textAlign: 'center', padding: '3rem', color: '#94a3b8'}}>No pipeline data available. Add some leads!</div>
          )}
        </div>

        {/* Top Industries Chart */}
        <div className="chart-card">
          <h3>Top Industries</h3>
          {industryData.length > 0 ? (
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
             <div style={{textAlign: 'center', padding: '3rem', color: '#94a3b8'}}>No industry data available. Add some leads!</div>
          )}
        </div>

      </div>

    </div>
  );
};

export default DashboardOverview;

