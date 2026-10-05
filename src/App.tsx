/**
 * MR. PAL — care staff and home help, Mumbai.
 */

import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { WhatsAppSheet } from './components/WhatsAppSheet';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { TeamMemberPage } from './pages/TeamMemberPage';
import { BookCallPage } from './pages/BookCallPage';
import { TermsPage } from './pages/TermsPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <ScrollToTop />
      {!isAdmin && <Navbar />}

      <main className={`flex-1 ${!isAdmin ? 'pb-[72px] md:pb-0' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/:slug" element={<TeamMemberPage />} />
          <Route path="/book-a-call" element={<BookCallPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {!isAdmin && <Footer />}
      {!isAdmin && <StickyMobileBar />}
      <WhatsAppSheet />
    </div>
  );
};

export default function App() {
  return (
    <SiteProvider>
      <Router>
        <AppLayout />
      </Router>
    </SiteProvider>
  );
}