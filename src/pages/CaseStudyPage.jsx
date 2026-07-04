import { useEffect } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getProjectBySlug } from '../data/portfolioProjects';
import { BusinessResults, CaseStudyHero, ChallengeSection, DesignProcess, FeatureGrid, FinalCTA, GallerySection, GoalsSection, PerformanceSection, ProjectNavigation, ProjectOverview, RelatedProjects, ResponsiveShowcase, ScrollProgress, SEOSection, SolutionSection, TechnologyStack, UIHighlights, WhyThisWorks } from '../components/case-study/CaseStudySections';
import './VesperCaseStudy.css';
import './CaseStudyPage.css';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const location = useLocation();
  const project = getProjectBySlug(slug);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [location.pathname]);
  if (!project) return <Navigate to="/portfolio" replace />;
  const canonical = `https://www.signallightstudio.com/portfolio/${project.slug}`;
  const schema = { '@context': 'https://schema.org', '@type': 'CreativeWork', name: `${project.title} Website`, description: project.metaDescription, image: `https://www.signallightstudio.com${project.heroImage}`, creator: { '@type': 'Organization', name: 'SignalLight Studio', url: 'https://www.signallightstudio.com' }, about: `${project.industry} website design`, contentLocation: project.location, url: canonical };
  return <main className={`vesper-case-study case-study case-study--${project.slug}`}>
    <Helmet><title>{project.title} Website Case Study | SignalLight Studio</title><meta name="description" content={project.metaDescription} /><link rel="canonical" href={canonical} /><meta property="og:type" content="article" /><meta property="og:title" content={`${project.title} Website Case Study`} /><meta property="og:description" content={project.metaDescription} /><meta property="og:url" content={canonical} /><meta property="og:image" content={`https://www.signallightstudio.com${project.heroImage}`} /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={`${project.title} Website Case Study`} /><meta name="twitter:description" content={project.metaDescription} /><meta name="twitter:image" content={`https://www.signallightstudio.com${project.heroImage}`} /><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
    <ScrollProgress /><aside className="cs-sticky-nav" aria-label="Case study sections"><a href="#overview">Overview</a><a href="#features">Features</a><a href="#results">Results</a></aside>
    <CaseStudyHero project={project} /><ProjectOverview project={project} /><ChallengeSection project={project} /><GoalsSection project={project} /><DesignProcess project={project} /><SolutionSection project={project} /><UIHighlights project={project} /><div id="features"><FeatureGrid project={project} /></div><TechnologyStack project={project} /><ResponsiveShowcase project={project} /><SEOSection project={project} /><div id="results"><PerformanceSection project={project} /></div><BusinessResults project={project} /><GallerySection project={project} /><WhyThisWorks project={project} /><FinalCTA /><RelatedProjects project={project} /><ProjectNavigation project={project} />
  </main>;
}
