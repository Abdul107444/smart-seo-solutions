import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { BUSINESS_INFO } from './data/funnelData';
import { MessageSquare, ArrowUp } from 'lucide-react';

export default function App() {
  // Determine initial path from URL
  const getInitialPath = (): 'landing' | 'thankyou' => {
    const pathname = window.location.pathname;
    if (pathname.includes('thank-you') || pathname.includes('thankyou')) {
      return 'thankyou';
    }
    return 'landing';
  };

  const [currentPage, setCurrentPage] = useState<'landing' | 'thankyou'>(getInitialPath);

  // Sync state with browser URL
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      if (pathname.includes('thank-you') || pathname.includes('thankyou')) {
        setCurrentPage('thankyou');
      } else {
        setCurrentPage('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToThankYou = () => {
    window.history.pushState({}, '', '/thank-you');
    setCurrentPage('thankyou');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = () => {
    window.history.pushState({}, '', '/funnel/step1');
    setCurrentPage('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-funnel-gradient text-white flex flex-col selection:bg-amber-400 selection:text-purple-950 relative overflow-x-hidden font-sans">
      {/* Sticky Header */}
      <Navbar
        currentPage={currentPage}
        onNavigateToThankYou={navigateToThankYou}
        onNavigateHome={navigateHome}
      />

      {/* Main Routed Content */}
      <div className="flex-grow">
        {currentPage === 'landing' ? (
          <LandingPage onNavigateToThankYou={navigateToThankYou} />
        ) : (
          <ThankYouPage onBackToLanding={navigateHome} />
        )}
      </div>

      {/* Global Floating WhatsApp Quick Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          id="floating-whatsapp-btn"
          href={BUSINESS_INFO.whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-purple-950 font-black text-xs md:text-sm shadow-2xl hover:scale-105 transition-all glow-gold duration-200 border border-emerald-300/40"
          aria-label="Direct WhatsApp Consultation"
        >
          <MessageSquare className="w-4 h-4 fill-purple-950" />
          <span className="hidden sm:inline">WhatsApp Us: {BUSINESS_INFO.whatsAppNumber}</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>

      {/* Footer */}
      <Footer
        onNavigateToThankYou={navigateToThankYou}
        onNavigateHome={navigateHome}
      />
    </div>
  );
}
