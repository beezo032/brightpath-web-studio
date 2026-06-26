import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts & Protection
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Public Pages
import Home from './pages/Home';
import PortfolioPage from './pages/PortfolioPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RazorCutsDemoPage from './pages/RazorCutsDemoPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import BlogPostPage from './pages/BlogPostPage';

// Niche & Local SEO Pages
import DentalWebDesign from './pages/DentalWebDesign';
import LandscaperWebDesign from './pages/LandscaperWebDesign';
import ContractorWebDesign from './pages/ContractorWebDesign';
import HvacWebDesign from './pages/HvacWebDesign';
import BarbershopWebDesign from './pages/BarbershopWebDesign';
import CharlestonScWebDesign from './pages/CharlestonScWebDesign';
import SummervilleScWebDesign from './pages/SummervilleScWebDesign';
import GooseCreekWebDesign from './pages/GooseCreekWebDesign';


// Dashboard Pages
import DashboardOverview from './dashboard/pages/DashboardOverview';
import LeadsPage from './dashboard/pages/LeadsPage';
import PipelinePage from './dashboard/pages/PipelinePage';
import AnalyzerPage from './dashboard/pages/AnalyzerPage';
import TemplatesPage from './dashboard/pages/TemplatesPage';
import FollowupsPage from './dashboard/pages/FollowupsPage';
import ProspectorPage from './dashboard/pages/ProspectorPage';
import LeadDetailPage from './dashboard/pages/LeadDetailPage';
import { SettingsPage } from './dashboard/pages/PlaceholderPages';

import ScrollToHash from './components/ScrollToHash';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();

  return (
    <AuthProvider>
      <div className="app">
        <ScrollToHash />
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
      </div>
    </AuthProvider>
  );
}

export default App;
