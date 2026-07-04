import React from 'react';
import { XCircle, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import './BeforeAfter.css';

const BeforeAfter = () => {
  return (
    <section className="before-after section section-light">
      <div className="container">
        <div className="section-header text-center reveal">
          <div className="badge" style={{ marginBottom: '1rem' }}>Redesign Showcase</div>
          <h2>Is Your Website Winning Clients or Losing Them?</h2>
          <p className="subtitle">
            Most local business websites are "online brochures" that actually drive customers away. Here is the difference between a template site and a custom Signal Light Studio build.
          </p>
        </div>

        <div className="before-after-grid">
          {/* Old Website Card */}
          <div className="ba-card old-way reveal reveal-delay-1">
            <div className="ba-badge status-bad">
              <XCircle size={16} /> The Old Way (Before)
            </div>
            
            <div className="ba-content">
              <h3>Typical Local Business Site</h3>
              <p className="ba-desc">Dated, slow, and unoptimized. Visitors leave within 5 seconds to find a competitor.</p>
              
              <ul className="ba-list">
                <li>
                  <XCircle className="icon-bad" size={20} />
                  <div>
                    <strong>Slow Load Times:</strong> Takes 5-8 seconds to load on mobile connections, causing 50%+ of users to bounce.
                  </div>
                </li>
                <li>
                  <XCircle className="icon-bad" size={20} />
                  <div>
                    <strong>Broken Mobile Layout:</strong> Tiny text and buttons require pinching and zooming, frustrating mobile searchers.
                  </div>
                </li>
                <li>
                  <XCircle className="icon-bad" size={20} />
                  <div>
                    <strong>No Clear Call-to-Action:</strong> Phone numbers are hidden, and long, tedious forms discourage quote requests.
                  </div>
                </li>
                <li>
                  <XCircle className="icon-bad" size={20} />
                  <div>
                    <strong>Generic Template Look:</strong> Looks exactly like every other competitor in town, destroying brand trust.
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="ba-stats-bar stats-bad">
              <div>
                <span className="stat-val">8.2s</span>
                <span className="stat-lbl">Average Speed</span>
              </div>
              <div>
                <span className="stat-val">1.2%</span>
                <span className="stat-lbl">Conversion Rate</span>
              </div>
            </div>
          </div>

          {/* Results Connector / Highlight */}
          <div className="ba-middle-stats reveal reveal-delay-2">
            <div className="middle-badge">
              <Sparkles size={18} /> Business Outcomes
            </div>
            <div className="outcome-metrics">
              <div className="outcome-stat">
                <span className="metric-number">3x</span>
                <span className="metric-label">More Leads</span>
              </div>
              <div className="outcome-stat">
                <span className="metric-number">98%</span>
                <span className="metric-label">Mobile Score</span>
              </div>
              <div className="outcome-stat">
                <span className="metric-number">&lt; 1.5s</span>
                <span className="metric-label">Load Time</span>
              </div>
            </div>
          </div>

          {/* New Website Card */}
          <div className="ba-card new-way reveal reveal-delay-3">
            <div className="ba-badge status-good">
              <CheckCircle2 size={16} /> The Signal Light Standard (After)
            </div>
            
            <div className="ba-content">
              <h3>Signal Light Custom Redesign</h3>
              <p className="ba-desc">Fast, modern, and engineered to rank on Google and turn visitors into booked jobs.</p>
              
              <ul className="ba-list">
                <li>
                  <CheckCircle2 className="icon-good" size={20} />
                  <div>
                    <strong>Blazing-Fast Speed:</strong> Loads in under 1.5 seconds, satisfying both Google's search algorithms and users.
                  </div>
                </li>
                <li>
                  <CheckCircle2 className="icon-good" size={20} />
                  <div>
                    <strong>Mobile-First Optimization:</strong> Scaled perfectly for thumbs, with sticky calling buttons and instant forms.
                  </div>
                </li>
                <li>
                  <CheckCircle2 className="icon-good" size={20} />
                  <div>
                    <strong>Frictionless CTAs:</strong> Prominent buttons and integrated Calendly calendars make booking appointments easy.
                  </div>
                </li>
                <li>
                  <CheckCircle2 className="icon-good" size={20} />
                  <div>
                    <strong>Premium Brand Design:</strong> High-end layouts, custom graphics, and social proof built directly into the UI.
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="ba-stats-bar stats-good">
              <div>
                <span className="stat-val">1.1s</span>
                <span className="stat-lbl">Load Time</span>
              </div>
              <div>
                <span className="stat-val">4.8%</span>
                <span className="stat-lbl">Conversion Rate</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ba-cta text-center reveal reveal-delay-2" style={{ marginTop: '4rem' }}>
          <a href="#contact" className="btn btn-primary pulse-cta" style={{ display: 'inline-flex', alignItems: 'center' }}>
            Upgrade My Website Today <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
