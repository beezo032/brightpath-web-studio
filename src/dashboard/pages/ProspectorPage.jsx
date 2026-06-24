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
  const [importedIds, setImportedIds] = useState(new Set());

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!industry || !location) return;

    setLoading(true);
    setError('');
    setResults([]);

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
        notes: `Imported via OpenStreetMap Lead Prospector.\nAddress: ${prospect.formatted_address}`,
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

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setImportedIds(new Set([...importedIds, prospect.place_id]));
      } else {
        throw new Error(data?.error || `Server returned ${res.status}`);
      }
    } catch (err) {
      console.error(err);
      alert(`Error importing lead: ${err.message}`);
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
