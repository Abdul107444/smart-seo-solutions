import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AuthProvider } from './lib/authContext';
import { BUSINESS_INFO } from './data/funnelData';
import { WhatsAppIcon } from './components/WhatsAppIcon';

export default function App() {
  // Determine initial path from URL, query parameter, or hash
  const getInitialPath = (): 'landing' | 'thankyou' | 'admin' => {
    const pathname = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    
    if (
      pathname.includes('admin') || 
      hash.includes('admin') || 
      search.includes('admin') ||
      search.includes('page=admin') ||
      search.includes('portal')
    ) {
      return 'admin';
    }
    if (
      pathname.includes('thank-you') || 
      pathname.includes('thankyou') || 
      hash.includes('thank-you') ||
      hash.includes('thankyou') ||
      search.includes('thank-you') ||
      search.includes('thankyou')
    ) {
      return 'thankyou';
    }
    return 'landing';
  };

  const [currentPage, setCurrentPage] = useState<'landing' | 'thankyou' | 'admin'>(getInitialPath);

  // Sync state with browser URL & secret keyboard shortcut (Ctrl + Shift + A)
  useEffect(() => {
    const checkRoute = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        pathname.includes('admin') || 
        hash.includes('admin') || 
        search.includes('admin') ||
        search.includes('page=admin') ||
        search.includes('portal')
      ) {
        setCurrentPage('admin');
      } else if (
        pathname.includes('thank-you') || 
        pathname.includes('thankyou') || 
        hash.includes('thank-you') ||
        hash.includes('thankyou') ||
        search.includes('thank-you') ||
        search.includes('thankyou')
      ) {
        setCurrentPage('thankyou');
      } else {
        setCurrentPage('landing');
      }
    };

    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);

    // Secret Admin Hotkey for Website Owner: Press Ctrl + Shift + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        window.history.pushState({}, '', '#admin');
        setCurrentPage('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigateToThankYou = () => {
    window.history.pushState({}, '', '/thank-you');
    setCurrentPage('thankyou');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setCurrentPage('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = () => {
    window.history.pushState({}, '', '/funnel/step1');
    setCurrentPage('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-funnel-gradient text-white flex flex-col selection:bg-amber-400 selection:text-purple-950 relative overflow-x-hidden font-sans">
        {/* Sticky Header */}
        <Navbar
          currentPage={currentPage}
          onNavigateToThankYou={navigateToThankYou}
          onNavigateHome={navigateHome}
          onNavigateToAdmin={navigateToAdmin}
        />

        {/* Main Routed Content */}
        <div className="flex-grow pt-16 sm:pt-20">
          {currentPage === 'landing' ? (
            <LandingPage onNavigateToThankYou={navigateToThankYou} />
          ) : currentPage === 'admin' ? (
            <AdminDashboardPage onNavigateHome={navigateHome} />
          ) : (
            <ThankYouPage onBackToLanding={navigateHome} />
          )}
        </div>

        {/* Global Floating WhatsApp Quick Action Button (Only show on customer pages) */}
        {currentPage !== 'admin' && (
          <div className="fixed bottom-6 right-6 z-40">
            <button
              id="floating-whatsapp-btn"
              onClick={navigateToThankYou}
              className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#0d2215] font-black text-xs md:text-sm shadow-2xl hover:scale-105 transition-all duration-200 border border-white/20 shadow-emerald-950/60 cursor-pointer"
              aria-label="Direct WhatsApp Consultation"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#0d2215]" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        )}

        {/* Footer */}
        <Footer
          onNavigateToThankYou={navigateToThankYou}
          onNavigateHome={navigateHome}
          onNavigateToAdmin={navigateToAdmin}
        />
      </div>
    </AuthProvider>
  );
}
