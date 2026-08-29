import React, { useState, useEffect } from 'react';
import { SmartSeoLogo } from './SmartSeoLogo';
import { BUSINESS_INFO } from '../data/funnelData';
import { MessageSquare, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

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
          ? 'bg-[#120624]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/40'
          : 'bg-black/20 border-b border-white/10 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="navbar-brand-logo-btn"
          onClick={onNavigateHome}
          className="text-left focus:outline-none group flex items-center cursor-pointer"
        >
          <SmartSeoLogo />
        </button>

        {/* Desktop Nav Links */}
        {currentPage === 'landing' && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
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
              className="hover:text-emerald-400 transition-colors py-1 cursor-pointer flex items-center gap-1"
            >
              <span>Refund Policy</span>
            </button>
            <button
              id="nav-link-faq"
              onClick={() => scrollToSection('faq-section')}
              className="hover:text-orange-400 transition-colors py-1 cursor-pointer"
            >
              FAQ
            </button>
          </nav>
        )}

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Price Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Fiverr Package: <strong className="text-orange-400">{BUSINESS_INFO.price}</strong></span>
          </div>

          {/* WhatsApp Direct */}
          <a
            id="navbar-whatsapp-btn"
            href={BUSINESS_INFO.whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-orange-400 border border-orange-400/30 px-3.5 py-1.5 rounded-full hover:bg-orange-400/10 text-xs font-bold transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>💬 WhatsApp Us</span>
          </a>

          {/* Main CTA */}
          {currentPage === 'landing' ? (
            <button
              id="navbar-primary-cta"
              onClick={onNavigateToThankYou}
              className="flex items-center gap-2 px-4 py-2 rounded-xl btn-gold-gradient text-xs md:text-sm font-bold shadow-md cursor-pointer"
            >
              <span>Get Optimized</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              id="navbar-back-to-landing-btn"
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 text-xs md:text-sm font-semibold transition-all cursor-pointer"
            >
              <span>View Landing Page</span>
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={BUSINESS_INFO.whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-orange-500/20 border border-orange-400/30 text-orange-400"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <button
            id="navbar-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/10 border border-white/20 text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#18092d]/95 backdrop-blur-xl border-b border-white/20 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          {currentPage === 'landing' && (
            <div className="flex flex-col space-y-2 text-sm text-white/80 pb-3 border-b border-white/10">
              <button
                onClick={() => scrollToSection('services-section')}
                className="text-left py-1.5 px-2 hover:bg-white/10 rounded-lg text-white"
              >
                🟣 Services
              </button>
              <button
                onClick={() => scrollToSection('work-section')}
                className="text-left py-1.5 px-2 hover:bg-white/10 rounded-lg text-white"
              >
                🔥 Previous Work
              </button>
              <button
                onClick={() => scrollToSection('why-us-section')}
                className="text-left py-1.5 px-2 hover:bg-white/10 rounded-lg text-white"
              >
                🎯 Why Choose Us
              </button>
              <button
                onClick={() => scrollToSection('pricing-section')}
                className="text-left py-1.5 px-2 hover:bg-white/10 rounded-lg text-white"
              >
                💼 Pricing (Rs. 10,000)
              </button>
              <button
                onClick={() => scrollToSection('refund-policy-section')}
                className="text-left py-1.5 px-2 hover:bg-white/10 rounded-lg text-emerald-300 font-medium"
              >
                🛡️ 100% Refund Policy (20–25 Days)
              </button>
              <button
                onClick={() => scrollToSection('faq-section')}
                className="text-left py-1.5 px-2 hover:bg-white/10 rounded-lg text-white"
              >
                ❓ FAQs
              </button>
            </div>
          )}

          <div className="pt-1 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentPage === 'landing') {
                  onNavigateToThankYou();
                } else {
                  onNavigateHome();
                }
              }}
              className="w-full py-2.5 rounded-xl btn-gold-gradient text-sm font-bold text-center flex items-center justify-center gap-2"
            >
              <span>{currentPage === 'landing' ? '🚀 Get Started — Rs. 10,000' : '🏠 Back to Home'}</span>
            </button>
            <a
              href={BUSINESS_INFO.whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-white/10 border border-orange-400/30 text-orange-300 text-sm font-semibold text-center flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
