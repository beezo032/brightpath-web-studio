import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <Helmet>
        <title>Admin Login | SignalRise Studio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <Lock size={32} />
            </div>
            <h1>Agency Login</h1>
            <p>Access the SignalRise Studio CRM Dashboard.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@signalrisestudio.local"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Admin Password</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error && <div className="error-text" style={{marginBottom: '1rem', color: '#ef4444', fontSize: '0.9rem', textAlign: 'left'}}>{error}</div>}
            
            <button type="submit" className="btn btn-primary login-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Authenticating...' : (
                <>Login to CRM <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;

