import React, { useState, useEffect } from 'react';
import { SmartSeoLogo } from './SmartSeoLogo';
import { BUSINESS_INFO } from '../data/funnelData';
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface NavbarProps {
  onNavigateToThankYou: () => void;
  onNavigateHome: () => void;
  currentPage: 'landing' | 'thankyou';
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateToThankYou,
  onNavigateHome,
  currentPage,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'landing') {
      onNavigateHome();
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#120624]/95 backdrop-blur-md border-b border-white/10 py-2.5 sm:py-3 shadow-lg shadow-black/50'
          : 'bg-black/30 border-b border-white/10 backdrop-blur-sm py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="navbar-brand-logo-btn"
          onClick={onNavigateHome}
          className="text-left focus:outline-none group flex items-center cursor-pointer flex-shrink-0"
        >
          <SmartSeoLogo />
        </button>

        {/* Desktop Nav Links (Visible on Large Screens & Desktops) */}
        {currentPage === 'landing' && (
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7 text-xs xl:text-sm font-medium text-white/75">
            <button
              id="nav-link-services"
              onClick={() => scrollToSection('services-section')}
              className="hover:text-orange-400 transition-colors py-1 cursor-pointer"
            >
              Services
            </button>
            <button
              id="nav-link-work"
              onClick={() => scrollToSection('work-section')}
              className="hover:text-orange-400 transition-colors py-1 cursor-pointer"
            >
              Previous Work
            </button>
            <button
              id="nav-link-why"
              onClick={() => scrollToSection('why-us-section')}
              className="hover:text-orange-400 transition-colors py-1 cursor-pointer"
            >
              Why Us
            </button>
            <button
              id="nav-link-pricing"
              onClick={() => scrollToSection('pricing-section')}
              className="hover:text-orange-400 transition-colors py-1 cursor-pointer"
            >
              Pricing
            </button>
            <button
              id="nav-link-refund"
              onClick={() => scrollToSection('refund-policy-section')}
              className="hover:text-emerald-400 transition-colors py-1 cursor-pointer flex items-center gap-1 font-semibold text-emerald-400/90"
            >
              <span>Refund Policy</span>
            </button>
          </nav>
        )}

        {/* Action Buttons (Responsive for Mobile, Tablet & Desktop) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Price Tag (Large Desktops) */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Package: <strong className="text-orange-400">{BUSINESS_INFO.price}</strong></span>
          </div>

          {/* Main CTA */}
          {currentPage === 'landing' ? (
            <button
              id="navbar-primary-cta"
              onClick={onNavigateToThankYou}
              className="flex items-center gap-1.5 h-9 px-3.5 sm:px-4.5 rounded-xl btn-gold-gradient text-xs sm:text-sm font-bold shadow-md cursor-pointer flex-shrink-0"
            >
              <span>Get Optimized</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              id="navbar-back-to-landing-btn"
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 h-9 px-3.5 sm:px-4 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 text-xs sm:text-sm font-semibold transition-all cursor-pointer flex-shrink-0"
            >
              <span>Home</span>
            </button>
          )}

          {/* Hamburger Menu Toggle (Visible on Mobile AND Tablets < lg screen) */}
          <button
            id="navbar-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white transition-colors cursor-pointer flex-shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#18092d]/98 backdrop-blur-2xl border-b border-white/20 px-4 sm:px-6 pt-4 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          {currentPage === 'landing' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/85 pb-3 border-b border-white/10">
              <button
                onClick={() => scrollToSection('services-section')}
                className="text-left py-2 px-3 hover:bg-white/10 rounded-xl text-white font-medium cursor-pointer"
              >
                <span>Services</span>
              </button>
              <button
                onClick={() => scrollToSection('work-section')}
                className="text-left py-2 px-3 hover:bg-white/10 rounded-xl text-white font-medium cursor-pointer"
              >
                <span>Previous Work</span>
              </button>
              <button
                onClick={() => scrollToSection('why-us-section')}
                className="text-left py-2 px-3 hover:bg-white/10 rounded-xl text-white font-medium cursor-pointer"
              >
                <span>Why Choose Us</span>
              </button>
              <button
                onClick={() => scrollToSection('pricing-section')}
                className="text-left py-2 px-3 hover:bg-white/10 rounded-xl text-white font-medium cursor-pointer"
              >
                <span>Pricing</span>
              </button>
              <button
                onClick={() => scrollToSection('refund-policy-section')}
                className="text-left py-2.5 px-3 hover:bg-emerald-500/15 rounded-xl text-emerald-300 font-semibold cursor-pointer border border-emerald-500/20 sm:col-span-2"
              >
                <span>100% Refund Policy (20–25 Days)</span>
              </button>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentPage === 'landing') {
                  onNavigateToThankYou();
                } else {
                  onNavigateHome();
                }
              }}
              className="w-full sm:flex-1 py-3 rounded-xl btn-gold-gradient text-sm font-bold text-center flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>{currentPage === 'landing' ? `Book Optimization — ${BUSINESS_INFO.price}` : 'Back to Home'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToThankYou();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-sm font-bold text-center flex items-center justify-center gap-2 hover:bg-[#25D366]/30 transition-colors cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Us: {BUSINESS_INFO.whatsAppNumber}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
