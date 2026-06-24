import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Activity, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import './AnalyzerPage.css';

const AnalyzerPage = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);

  const formatUrl = (inputUrl) => {
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      return `https://${inputUrl}`;
    }
    return inputUrl;
  };

  const getScoreColorClass = (score) => {
    if (score >= 90) return 'score-green';
    if (score >= 50) return 'score-orange';
    return 'score-red';
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return <CheckCircle className="finding-icon score-green" size={20} />;
    if (score >= 50) return <Info className="finding-icon score-orange" size={20} />;
    return <AlertTriangle className="finding-icon score-red" size={20} />;
  };

  const runAudit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setResults(null);

    const targetUrl = formatUrl(url.trim());

    try {
      // Using the official Google PageSpeed Insights REST API (v5)
      // Requesting all 4 major categories
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&strategy=desktop`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to analyze website. Ensure the URL is publicly accessible.');
      }

      const data = await response.json();
      
      if (data.lighthouseResult) {
        const categories = data.lighthouseResult.categories;
        
        // Extract relevant actionable audits
        const allAudits = Object.values(data.lighthouseResult.audits);
        const opportunities = allAudits
          .filter(audit => audit.score !== null && audit.score < 0.9 && audit.details && audit.details.type === 'opportunity')
          .sort((a, b) => a.score - b.score)
          .slice(0, 10); // Top 10 issues to fix

        setResults({
          url: targetUrl,
          scores: {
            performance: Math.round(categories.performance.score * 100),
            accessibility: Math.round(categories.accessibility.score * 100),
            bestPractices: Math.round(categories['best-practices'].score * 100),
            seo: Math.round(categories.seo.score * 100)
          },
          findings: opportunities
        });
      } else {
        throw new Error('Invalid response from audit engine.');
      }

    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during the audit. Please try another URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyzer-page dashboard-page">
      <Helmet><title>Website Analyzer | CRM</title></Helmet>
      
      <div className="analyzer-header">
        <h1>Website Analyzer</h1>
        <p>Run instant Google Lighthouse audits on prospective client websites to identify critical sales talking points.</p>
      </div>

      <div className="analyzer-search-card">
        <h2>Enter Client Website</h2>
        <form className="analyzer-form" onSubmit={runAudit}>
          <input 
            type="text" 
            className="analyzer-input" 
            placeholder="e.g. www.smithplumbing.com" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn btn-primary analyzer-btn" disabled={loading || !url.trim()}>
            {loading ? 'Auditing...' : <><Search size={18} /> Run Audit</>}
          </button>
        </form>
        {error && <div style={{color: '#ef4444', marginTop: '1rem', fontWeight: 500}}>{error}</div>}
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <h3>Running deep audit on {formatUrl(url)}...</h3>
          <p>Please wait. The Google PageSpeed engine takes about 10-20 seconds to compile real-world data.</p>
        </div>
      )}

      {results && !loading && (
        <>
          <div className="results-grid">
            <div className="score-card">
              <h3>Performance</h3>
              <div className={`score-circle ${getScoreColorClass(results.scores.performance)}`}>
                {results.scores.performance}
              </div>
            </div>
            <div className="score-card">
              <h3>Accessibility</h3>
              <div className={`score-circle ${getScoreColorClass(results.scores.accessibility)}`}>
                {results.scores.accessibility}
              </div>
            </div>
            <div className="score-card">
              <h3>Best Practices</h3>
              <div className={`score-circle ${getScoreColorClass(results.scores.bestPractices)}`}>
                {results.scores.bestPractices}
              </div>
            </div>
            <div className="score-card">
              <h3>SEO</h3>
              <div className={`score-circle ${getScoreColorClass(results.scores.seo)}`}>
                {results.scores.seo}
              </div>
            </div>
          </div>

          <div className="findings-section">
            <h3>Critical Findings & Opportunities</h3>
            <p style={{color: 'var(--color-text-muted)', marginBottom: '2rem'}}>Use these specific bottlenecks to pitch your agency's services.</p>
            
            {results.findings.length === 0 ? (
              <div className="finding-item">
                <p>This website is heavily optimized. No major opportunities found.</p>
              </div>
            ) : (
              results.findings.map(finding => (
                <div key={finding.id} className="finding-item">
                  <div className="finding-header">
                    {getScoreIcon(finding.score * 100)}
                    <div className="finding-title">{finding.title}</div>
                  </div>
                  {/* The API returns markdown links in the description sometimes, we strip them out simply for safety here */}
                  <div className="finding-desc">
                    {finding.description.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

    </div>
  );
};

export default AnalyzerPage;
