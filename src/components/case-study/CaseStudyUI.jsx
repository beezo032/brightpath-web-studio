import { useId, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export function SectionIntro({ eyebrow, title, body, light = false }) {
  return <header className={`cs-intro ${light ? 'cs-intro--light' : ''} reveal`}><span className="cs-eyebrow">{eyebrow}</span><h2>{title}</h2>{body && <p>{body}</p>}</header>;
}

export function BrowserFrame({ children, label = 'Website preview', className = '' }) {
  return <figure className={`cs-browser ${className}`} aria-label={label}><div className="cs-browser__bar" aria-hidden="true"><span /><span /><span /><div>vespertattoo.com</div></div>{children}</figure>;
}

export function BeforeAfter() {
  const [position, setPosition] = useState(62);
  const labelId = useId();
  return <div className="cs-compare reveal"><div className="cs-compare__stage"><div className="cs-before" aria-hidden="true"><span>VESPER TATTOO</span><div className="cs-before__line" /><p>Great work deserved more than a generic digital presence.</p><div className="cs-before__button">CONTACT</div></div><div className="cs-after" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} aria-hidden="true"><img src="/vesper_tattoo.webp" alt="" width="1200" height="760" loading="lazy" decoding="async" /></div><div className="cs-compare__divider" style={{ left: `${position}%` }} aria-hidden="true"><span>↔</span></div><span className="cs-compare__tag cs-compare__tag--before">Before</span><span className="cs-compare__tag cs-compare__tag--after">After</span></div><label id={labelId} htmlFor="vesper-comparison">Drag to compare the original concept and the new experience</label><input id="vesper-comparison" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-labelledby={labelId} /></div>;
}

export function Metric({ value, label, detail }) { return <div className="cs-metric reveal"><strong>{value}</strong><span>{label}</span><small>{detail}</small></div>; }
export function ProjectLink({ href, children, variant = 'dark' }) { return <a className={`cs-link cs-link--${variant}`} href={href}>{children}<ArrowUpRight size={18} aria-hidden="true" /></a>; }
