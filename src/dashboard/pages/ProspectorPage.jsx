import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, MapPin, Phone, Globe, Star, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import './ProspectorPage.css';

const ProspectorPage = () => {
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMockData, setIsMockData] = useState(false);
  const [importedIds, setImportedIds] = useState(new Set());

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!industry || !location) return;

    setLoading(true);
    setError('');
    setResults([]);
    setIsMockData(false);

    try {
      const token = localStorage.getItem('brightpath_jwt');
      const res = await fetch('/api/prospector/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ industry, location })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch prospects');
      }

      setResults(data.results || []);
      if (data.mockData) {
        setIsMockData(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (prospect) => {
    if (importedIds.has(prospect.place_id)) return;

    try {
      const token = localStorage.getItem('brightpath_jwt');
      
      const newLead = {
        businessName: prospect.name,
        industry: industry, // Use the searched industry
        phone: prospect.formatted_phone_number || '',
        websiteUrl: prospect.website || '',
        contactStatus: 'New',
        notes: `Imported via Lead Prospector.\nAddress: ${prospect.formatted_address}\nYelp Rating: ${prospect.rating} (${prospect.user_ratings_total} reviews)`,
        // Set a default follow-up date for today
        followUpDate: new Date().toISOString()
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newLead)
      });

      if (res.ok) {
        setImportedIds(new Set([...importedIds, prospect.place_id]));
      } else {
        throw new Error('Failed to import lead');
      }
    } catch (err) {
      console.error(err);
      alert('Error importing lead to CRM.');
    }
  };

  return (
    <div className="prospector-page dashboard-page">
      <Helmet><title>Lead Prospector | CRM</title></Helmet>

      <div className="prospector-header">
        <h1>Lead Prospector</h1>
        <p>Instantly pull local business data into your CRM.</p>
      </div>

      <div className="search-panel">
        <h2>Find Prospects</h2>
        <form className="search-inputs" onSubmit={handleSearch}>
          <div className="input-group">
            <label>Industry / Niche</label>
            <input 
              type="text" 
              className="prospector-input" 
              placeholder="e.g. Plumbers, Roofers, Dentists" 
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>City & State</label>
            <input 
              type="text" 
              className="prospector-input" 
              placeholder="e.g. Austin, TX" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-search" disabled={loading}>
            <Search size={18} /> {loading ? 'Searching...' : 'Find Leads'}
          </button>
        </form>

        {error && <div style={{color: '#ef4444', fontWeight: 500}}>{error}</div>}
      </div>

      {isMockData && !loading && results.length > 0 && (
        <div className="mock-warning">
          <AlertTriangle size={24} style={{flexShrink: 0}} />
          <div>
            <strong>Using Mock Data!</strong> 
            <p style={{margin: '0.25rem 0 0', fontSize: '0.95rem'}}>
              The <code>YELP_API_KEY</code> environment variable is not set. 
              The system is returning simulated data so you can test the UI. To pull real businesses, create a free Developer app at <a href="https://www.yelp.com/developers/v3/manage_app" target="_blank" rel="noreferrer" style={{color: 'inherit', textDecoration: 'underline'}}>Yelp Fusion</a> and add your API Key to Vercel.
            </p>
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <h3>Scanning local directories...</h3>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="results-grid">
          {results.map((prospect) => (
            <div key={prospect.place_id} className="prospect-card">
              <div className="prospect-name" title={prospect.name}>{prospect.name}</div>
              
              {prospect.rating ? (
                <div className="prospect-rating">
                  {prospect.rating} <Star size={14} className="star-icon" /> ({prospect.user_ratings_total} reviews)
                </div>
              ) : (
                <div className="prospect-rating">No reviews yet</div>
              )}

              <div className="prospect-details">
                <div className="detail-item">
                  <MapPin size={16} className="icon" />
                  <span>{prospect.formatted_address}</span>
                </div>
                
                {prospect.formatted_phone_number ? (
                  <div className="detail-item">
                    <Phone size={16} className="icon" />
                    <span>{prospect.formatted_phone_number}</span>
                  </div>
                ) : (
                   <div className="detail-item">
                    <Phone size={16} className="icon" />
                    <span style={{color: '#94a3b8', fontStyle: 'italic'}}>No phone listed</span>
                  </div>
                )}
                
                {prospect.website ? (
                  <div className="detail-item">
                    <Globe size={16} className="icon" />
                    <a href={prospect.website} target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  </div>
                ) : (
                  <div className="detail-item">
                    <Globe size={16} className="icon" />
                    <span style={{color: '#94a3b8', fontStyle: 'italic'}}>No website found (Great Pitch!)</span>
                  </div>
                )}
              </div>

              <button 
                className={`btn-import ${importedIds.has(prospect.place_id) ? 'imported' : ''}`}
                onClick={() => handleImport(prospect)}
                disabled={importedIds.has(prospect.place_id)}
              >
                {importedIds.has(prospect.place_id) ? (
                  <><CheckCircle size={18} /> Added to CRM</>
                ) : (
                  <><Plus size={18} /> Import to CRM</>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && results.length === 0 && !error && industry && (
        <div style={{textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)'}}>
          No results found. Try adjusting your search terms.
        </div>
      )}

    </div>
  );
};

export default ProspectorPage;
