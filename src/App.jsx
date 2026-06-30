import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts & Protection
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Eager Loading for Homepage (Critical Path for FCP/LCP)
import Home from './pages/Home';

// Lazy Loading for Public Subpages
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RazorCutsDemoPage = lazy(() => import('./pages/RazorCutsDemoPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

// Lazy Loading for Niche & Local SEO Pages
const DentalWebDesign = lazy(() => import('./pages/DentalWebDesign'));
const LandscaperWebDesign = lazy(() => import('./pages/LandscaperWebDesign'));
const ContractorWebDesign = lazy(() => import('./pages/ContractorWebDesign'));
const HvacWebDesign = lazy(() => import('./pages/HvacWebDesign'));
const BarbershopWebDesign = lazy(() => import('./pages/BarbershopWebDesign'));
const CharlestonScWebDesign = lazy(() => import('./pages/CharlestonScWebDesign'));
const SummervilleScWebDesign = lazy(() => import('./pages/SummervilleScWebDesign'));
const GooseCreekWebDesign = lazy(() => import('./pages/GooseCreekWebDesign'));

// Lazy Loading for CRM Dashboard Pages
const DashboardOverview = lazy(() => import('./dashboard/pages/DashboardOverview'));
const LeadsPage = lazy(() => import('./dashboard/pages/LeadsPage'));
const PipelinePage = lazy(() => import('./dashboard/pages/PipelinePage'));
const AnalyzerPage = lazy(() => import('./dashboard/pages/AnalyzerPage'));
const TemplatesPage = lazy(() => import('./dashboard/pages/TemplatesPage'));
const FollowupsPage = lazy(() => import('./dashboard/pages/FollowupsPage'));
const ProspectorPage = lazy(() => import('./dashboard/pages/ProspectorPage'));
const LeadDetailPage = lazy(() => import('./dashboard/pages/LeadDetailPage'));

// Named export lazy import utility
const SettingsPage = lazy(() => import('./dashboard/pages/PlaceholderPages').then(module => ({ default: module.SettingsPage })));

import ScrollToHash from './components/ScrollToHash';
import { useScrollReveal } from './hooks/useScrollReveal';

// Loading fallback component
const PageLoader = () => (
  <div className="loading-fallback" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-blue)', fontWeight: '600', fontSize: '1.1rem' }}>
    Loading...
  </div>
);

function App() {
  useScrollReveal();

  return (
    <AuthProvider>
      <div className="app">
        <ScrollToHash />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/portfolio/razor-cuts-demo" element={<RazorCutsDemoPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              
              {/* Niche Industry Pages */}
              <Route path="/dental-web-design" element={<DentalWebDesign />} />
              <Route path="/landscaper-web-design" element={<LandscaperWebDesign />} />
              <Route path="/contractor-web-design" element={<ContractorWebDesign />} />
              <Route path="/hvac-web-design" element={<HvacWebDesign />} />
              <Route path="/barbershop-web-design" element={<BarbershopWebDesign />} />

              {/* Local SEO Pages */}
              <Route path="/charleston-sc-web-design" element={<CharlestonScWebDesign />} />
              <Route path="/summerville-sc-web-design" element={<SummervilleScWebDesign />} />
              <Route path="/goose-creek-web-design" element={<GooseCreekWebDesign />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<DashboardOverview />} />
              <Route path="/dashboard/leads" element={<LeadsPage />} />
              <Route path="/dashboard/leads/:id" element={<LeadDetailPage />} />
              <Route path="/dashboard/prospector" element={<ProspectorPage />} />
              <Route path="/dashboard/pipeline" element={<PipelinePage />} />
              <Route path="/dashboard/analyzer" element={<AnalyzerPage />} />
              <Route path="/dashboard/followups" element={<FollowupsPage />} />
              <Route path="/dashboard/templates" element={<TemplatesPage />} />
              <Route path="/dashboard/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </AuthProvider>
  );
}

export default App;
