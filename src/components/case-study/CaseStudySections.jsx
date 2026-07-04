import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Code2, Gauge, Search, X, ZoomIn } from 'lucide-react';
import { portfolioProjects, getProjectBySlug } from '../../data/portfolioProjects';
import { BrowserFrame, SectionIntro } from './CaseStudyUI';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => { const update = () => setProgress(Math.min(100, (scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100 || 0)); update(); addEventListener('scroll', update, { passive: true }); return () => removeEventListener('scroll', update); }, []);
  return <div className="cs-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>;
}

export function CaseStudyHero({ project }) { return <section className="cs-hero"><div className="cs-orb cs-orb--one" /><div className="cs-shell"><nav className="cs-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/portfolio">Portfolio</Link><span>/</span><span aria-current="page">{project.title}</span></nav><div className="cs-hero__inner"><div className="cs-hero__copy"><div className="cs-kicker"><span /> Featured case study · {project.industry}</div><h1>{project.title}</h1><p>{project.overview}</p><a className="cs-link cs-link--light" href={project.liveDemo} target="_blank" rel="noreferrer">Visit live website <ArrowUpRight size={18} /></a></div><dl className="cs-project-facts"><div><dt>Client</dt><dd>{project.title}</dd></div><div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Services</dt><dd>{project.services.join(' · ')}</dd></div></dl></div><div className="cs-hero__visual"><BrowserFrame><img src={project.heroImage} alt={`${project.title} website homepage`} width="1200" height="760" fetchPriority="high" decoding="async" /></BrowserFrame></div></div></section>; }
export function ProjectOverview({ project }) { return <section className="cs-story" id="overview"><div className="cs-shell cs-story__grid"><span className="cs-chapter reveal">01 / Overview</span><div className="reveal"><h2>{project.overview}</h2><p>{project.solution}</p></div></div></section>; }
export function ChallengeSection({ project }) { return <SplitSection number="02" eyebrow="Client challenge" title={project.challenge} body="The opportunity was to turn a strong offline reputation into an online experience that earns confidence quickly and guides visitors naturally." />; }
export function SolutionSection({ project }) { return <SplitSection number="05" eyebrow="Research & strategy" title="Clarity before decoration." body={project.solution} dark />; }
export function GoalsSection({ project }) { return <section className="cs-list-section"><div className="cs-shell"><SectionIntro eyebrow="03 / Business goals" title="A focused definition of success." /><div className="cs-goal-grid">{project.goals.map((goal, i) => <article className="cs-goal reveal" key={goal}><span>0{i + 1}</span><h3>{goal}</h3><Check aria-hidden="true" /></article>)}</div></div></section>; }
export function DesignProcess({ project }) { return <section className="cs-process"><div className="cs-shell"><SectionIntro eyebrow="04 / Design process" title="From insight to interface." light /><div className="cs-process-grid">{['Discover','Define','Design','Refine'].map((step, i) => <div className="reveal" key={step}><small>0{i + 1}</small><h3>{step}</h3><p>{i === 0 ? `Understand ${project.industry.toLowerCase()} customers and context.` : i === 1 ? 'Shape the hierarchy, journeys, and conversion strategy.' : i === 2 ? 'Create a distinctive system with reusable patterns.' : 'Test every breakpoint, interaction, and detail.'}</p></div>)}</div></div></section>; }
export function FeatureGrid({ project }) { return <section className="cs-experience"><div className="cs-shell"><SectionIntro eyebrow="07 / Key features" title="Every interaction has a job to do." /><div className="cs-feature-grid">{project.features.map((feature, i) => <article className="cs-feature reveal" key={feature}><span>0{i + 1}</span><Check size={28} /><h3>{feature}</h3><p>Purpose-built to reduce friction, increase confidence, and support the project’s business goals.</p></article>)}</div></div></section>; }
export function UIHighlights({ project }) { return <section className="cs-highlight"><div className="cs-shell"><SectionIntro eyebrow="06 / UI highlights" title="A visual system with a point of view." /><BrowserFrame><img src={project.heroImage} alt={`${project.title} interface design`} width="1200" height="760" loading="lazy" /></BrowserFrame><div className="cs-palette" aria-label="Project color palette">{project.colorPalette.map((color) => <div className="cs-data-swatch" style={{ background: color }} key={color}><span>{color}</span></div>)}</div></div></section>; }
export function TechnologyStack({ project }) { return <IconListSection eyebrow="08 / Technology" title="A modern, maintainable foundation." items={project.technologies} icon={Code2} />; }
export function ResponsiveShowcase({ project }) { return <section className="cs-mobile-story"><div className="cs-shell cs-mobile-story__grid"><SectionIntro eyebrow="09 / Responsive showcase" title="Designed for where decisions happen." body="Fluid type, resilient grids, and touch-friendly controls keep the full experience intact from phone to wide-screen desktop." /><div className="cs-mobile-stack reveal"><div className="cs-phone cs-phone--back"><img src={project.mobileImage} alt={`${project.title} tablet layout`} width="390" height="780" loading="lazy" /></div><div className="cs-phone cs-phone--front"><div className="cs-phone__speaker" /><img src={project.mobileImage} alt={`${project.title} mobile layout`} width="390" height="780" loading="lazy" /></div></div></div></section>; }
export function SEOSection({ project }) { return <IconListSection eyebrow="10 / SEO strategy" title="Discoverability designed in." items={project.seoFeatures} icon={Search} dark />; }
export function PerformanceSection({ project }) { return <section className="cs-results"><div className="cs-shell"><SectionIntro eyebrow="11 / Performance" title="Premium on the surface. Lean underneath." light /><div className="cs-metrics">{Object.entries(project.performanceMetrics).map(([key,value]) => <div className="cs-metric reveal" key={key}><strong>{value}</strong><span>{key.replace(/([A-Z])/g,' $1')}</span><small>Production target</small></div>)}</div></div></section>; }
export function BusinessResults({ project }) { return <IconListSection eyebrow="12 / Expected business impact" title="Designed to move meaningful numbers." items={project.businessImpact} icon={Gauge} />; }

export function GallerySection({ project }) {
  const [active, setActive] = useState(null);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);
  const closeLightbox = () => {
    setActive(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };
  useEffect(() => {
    if (!active) return undefined;
    closeRef.current?.focus();
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setActive(null);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
      if (event.key === 'Tab') {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    addEventListener('keydown', handleKey);
    return () => removeEventListener('keydown', handleKey);
  }, [active]);
  return <section className="cs-gallery"><div className="cs-shell"><SectionIntro eyebrow="13 / Gallery" title="The complete experience, up close." /><div className="cs-gallery-grid">{project.gallery.map((image, i) => <button type="button" onClick={(event) => { triggerRef.current = event.currentTarget; setActive(image); }} key={`${image}-${i}`} aria-label={`Enlarge ${project.title} screenshot ${i + 1}`}><img src={image} alt={`${project.title} website screenshot ${i + 1}`} width="1200" height="760" loading="lazy" decoding="async" /><ZoomIn /></button>)}</div></div>{active && <div className="cs-lightbox" role="dialog" aria-modal="true" aria-label="Image preview" onClick={(event) => event.target === event.currentTarget && closeLightbox()}><button ref={closeRef} type="button" onClick={closeLightbox} aria-label="Close image preview"><X /></button><img src={active} alt={`${project.title} enlarged website screenshot`} /></div>}</section>;
}
export function WhyThisWorks({ project }) { return <SplitSection number="14" eyebrow="Why this design works" title="Distinctive enough to be remembered. Clear enough to convert." body={`${project.title} balances brand character with familiar interaction patterns, creating an experience that feels elevated without asking visitors to learn how to use it.`} dark />; }
export function FinalCTA() { return <section className="cs-final"><div className="cs-shell cs-final__inner reveal"><span>Have a project in mind?</span><h2>Your work deserves a website people remember.</h2><p>Let’s turn what makes your business remarkable into a digital experience that earns attention—and action.</p><Link className="cs-link cs-link--light" to="/contact">Start a conversation <ArrowUpRight size={18} /></Link></div></section>; }
export function ProjectNavigation({ project }) { const previous = getProjectBySlug(project.previousProject); const next = getProjectBySlug(project.nextProject); return <section className="cs-project-nav"><div className="cs-shell"><Link to={`/portfolio/${previous.slug}`}><ArrowLeft /><small>Previous project</small><strong>{previous.title}</strong></Link><Link to={`/portfolio/${next.slug}`}><small>Next project</small><strong>{next.title}</strong><ArrowRight /></Link></div></section>; }
export function RelatedProjects({ project }) { return <section className="cs-related"><div className="cs-shell"><SectionIntro eyebrow="More selected work" title="Continue exploring." /><div className="cs-related-grid">{portfolioProjects.filter((item) => item.id !== project.id).map((item) => <Link to={`/portfolio/${item.slug}`} key={item.id}><img src={item.heroImage} alt="" width="600" height="380" loading="lazy" /><span>{item.industry}</span><h3>{item.title}</h3></Link>)}</div></div></section>; }

function SplitSection({ number, eyebrow, title, body, dark = false }) { return <section className={`cs-split ${dark ? 'cs-split--dark' : ''}`}><div className="cs-shell"><span className="cs-chapter reveal">{number} / {eyebrow}</span><div className="reveal"><h2>{title}</h2><p>{body}</p></div></div></section>; }
function IconListSection({ eyebrow, title, items, icon: Icon, dark = false }) { return <section className={`cs-icon-list ${dark ? 'cs-icon-list--dark' : ''}`}><div className="cs-shell"><SectionIntro eyebrow={eyebrow} title={title} light={dark} /><div>{items.map((item) => <article className="reveal" key={item}><Icon aria-hidden="true" /><h3>{item}</h3></article>)}</div></div></section>; }
