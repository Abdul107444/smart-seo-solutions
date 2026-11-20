import React, { useState } from 'react';
import { Menu, X, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';
import type { AppRoute } from '../App';

interface NavbarProps {
  onNavigate: (page: AppRoute) => void;
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
              24h Fiverr Ranking Method — Get 1st Order Fast
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-semibold text-[#535f6f]">
          <button
            type="button"
            onClick={() => onNavigate('method')}
            className={`transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-full ${
              currentPage === 'method'
                ? 'bg-[#2b62ef]/10 text-[#2b62ef] font-bold border border-[#2b62ef]/30'
                : 'hover:text-[#2b62ef]'
            }`}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[#1dbf73] animate-pulse" />
            <span>24h Ranking Method</span>
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('trust')}
            className="transition-colors hover:text-[#2b62ef]"
          >
            Guarantee &amp; Safety
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('reviews')}
            className="transition-colors hover:text-[#2b62ef]"
          >
            Seller Proofs &amp; Reviews
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('pricing')}
            className="transition-colors hover:text-[#2b62ef]"
          >
            Pricing (Rs. 500)
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
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onNavigate('enroll')}
            className="gradient-brand inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-glow transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
          >
            <span className="hidden sm:inline">Get The Method — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
            <span className="sm:hidden">Method — Rs. 500</span>
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('method');
              }}
              className={`rounded-lg px-3 py-2 text-left flex items-center justify-between ${
                currentPage === 'method'
                  ? 'bg-[#2b62ef]/10 text-[#2b62ef] font-bold border border-[#2b62ef]/30'
                  : 'bg-[#2b62ef]/5 text-[#2b62ef] hover:bg-[#2b62ef]/10'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1dbf73] animate-pulse" />
                24h Ranking Method
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#2b62ef] text-white px-2 py-0.5 rounded-full">
                HOT
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('trust')}
              className="rounded-lg px-3 py-2 text-left hover:bg-[#ecf3f8]"
            >
              Guarantee &amp; Safety
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('reviews')}
              className="rounded-lg px-3 py-2 text-left hover:bg-[#ecf3f8]"
            >
              Seller Reviews &amp; Proofs
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('pricing')}
              className="rounded-lg px-3 py-2 text-left hover:bg-[#ecf3f8]"
            >
              Pricing &amp; Bank Details (Rs. 500)
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
                Get 24h Ranking Method — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
