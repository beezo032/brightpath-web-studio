import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  LineChart, 
  MailCheck, 
  LayoutTemplate, 
  KanbanSquare, 
  Settings,
  X 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} />, exact: true },
    { name: 'Leads', path: '/dashboard/leads', icon: <Users size={20} /> },
    { name: 'Pipeline', path: '/dashboard/pipeline', icon: <KanbanSquare size={20} /> },
    { name: 'Follow-ups', path: '/dashboard/followups', icon: <MailCheck size={20} /> },
    { name: 'Analyzer', path: '/dashboard/analyzer', icon: <LineChart size={20} /> },
    { name: 'Templates', path: '/dashboard/templates', icon: <LayoutTemplate size={20} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
      
      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-accent">Bright</span>path<span className="crm-badge">CRM</span>
          </div>
          <button className="sidebar-close" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="sidebar-nav-list">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink 
                  to={item.path} 
                  end={item.exact}
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
