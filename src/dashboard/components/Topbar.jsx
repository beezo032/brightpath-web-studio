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
        <button className="menu-toggle" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="topbar-search">
          <input type="text" placeholder="Search leads..." />
        </div>
      </div>
      
      <div className="topbar-right">
        <button className="topbar-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        
        <div className="topbar-user">
          <UserCircle size={24} />
          <span className="user-name">Admin</span>
        </div>
        
        <button className="topbar-btn logout-btn" onClick={handleLogout} title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
