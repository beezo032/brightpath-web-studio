import React from 'react';
import { Menu, Bell, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Topbar.css';

const Topbar = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="dashboard-topbar">
      <div className="topbar-left">
        <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Menu size={24} />
        </button>
        <div className="topbar-search">
          <label htmlFor="topbar-search-input" className="sr-only">Search leads</label>
          <input
            type="text"
            id="topbar-search-input"
            placeholder="Search leads..."
            aria-label="Search leads"
            disabled
            title="Global search coming soon"
          />
        </div>
      </div>
      
      <div className="topbar-right">
        <div className="topbar-user">
          <UserCircle size={24} aria-hidden="true" />
          <span className="user-name">Admin</span>
        </div>
        
        <button className="topbar-btn logout-btn" onClick={handleLogout} aria-label="Logout" title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
