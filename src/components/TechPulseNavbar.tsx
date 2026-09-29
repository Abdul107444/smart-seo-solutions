import React, { useState } from 'react';
import { Menu, X, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';

interface NavbarProps {
  onNavigate: (page: 'landing' | 'training' | 'enroll' | 'admin') => void;
  currentPage: string;
}

export function TechPulseNavbar({ onNavigate, currentPage }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId?: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'landing') {
      onNavigate('landing');
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#dfe5ed] bg-[#f7fbfd]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleNavClick()}
          className="flex items-center gap-3 text-left transition-opacity hover:opacity-90"
        >
          <img
            src="/techpulse-assets/logo.png"
            alt="Smart SEO Solutions"
            className="h-10 w-10 rounded-xl shadow-sm border border-[#dfe5ed]"
          />
          <div>
            <div className="font-display text-base font-extrabold text-[#0c172f] sm:text-lg tracking-tight">
              Smart SEO Solutions
            </div>
            <div className="text-[11px] font-medium text-[#535f6f] hidden xs:block">
              Pakistan's #1 Fiverr Ranking System
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#535f6f]">
          <button
            type="button"
            onClick={() => handleNavClick('modules')}
            className="transition-colors hover:text-[#2b62ef]"
          >
            10 Services
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('reviews')}
            className="transition-colors hover:text-[#2b62ef]"
          >
            Seller Proofs
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('proofs')}
            className="transition-colors hover:text-[#2b62ef]"
          >
            Rankings & Earnings
          </button>
          <button
            type="button"
            onClick={() => onNavigate('training')}
            className={`transition-colors hover:text-[#2b62ef] ${
              currentPage === 'training' ? 'text-[#2b62ef]' : ''
            }`}
          >
            Service Scope
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('faq')}
            className="transition-colors hover:text-[#2b62ef]"
          >
            FAQ
          </button>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('enroll')}
            className="gradient-brand inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-glow transition-all hover:scale-[1.03] active:scale-95"
          >
            <span>Book Optimization — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#dfe5ed] bg-white text-[#0c172f] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-[#dfe5ed] bg-white px-4 py-4 md:hidden shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-3 font-semibold text-sm text-[#0c172f]">
            <button
              type="button"
              onClick={() => handleNavClick('modules')}
              className="rounded-lg px-3 py-2 text-left hover:bg-[#ecf3f8]"
            >
              10-Point Optimization Services
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('reviews')}
              className="rounded-lg px-3 py-2 text-left hover:bg-[#ecf3f8]"
            >
              Seller Reviews (19 Proofs)
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('proofs')}
              className="rounded-lg px-3 py-2 text-left hover:bg-[#ecf3f8]"
            >
              Rankings & Earnings Proofs
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('training');
              }}
              className="rounded-lg px-3 py-2 text-left hover:bg-[#ecf3f8]"
            >
              Full Service Scope & Details
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('faq')}
              className="rounded-lg px-3 py-2 text-left hover:bg-[#ecf3f8]"
            >
              Frequently Asked Questions
            </button>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('enroll');
                }}
                className="gradient-brand w-full flex items-center justify-center gap-2 rounded-xl py-3 font-bold text-white shadow-glow"
              >
                Book Optimization — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
