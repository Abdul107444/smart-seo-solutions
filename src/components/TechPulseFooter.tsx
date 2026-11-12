import React from 'react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';
import type { AppRoute } from '../App';

interface FooterProps {
  onNavigate: (page: AppRoute) => void;
}

export function TechPulseFooter({ onNavigate }: FooterProps) {
  const scrollTo = (id: string) => {
    onNavigate('landing');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="border-t border-[#dfe5ed] bg-[#0c172f] px-4 py-12 text-white/80 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/techpulse-assets/logo.png"
            alt="Smart SEO Solutions"
            className="h-10 w-10 rounded-xl border border-white/10"
          />
          <div>
            <div className="font-display text-base font-bold text-white">
              Smart SEO Solutions
            </div>
            <div className="text-xs text-white/60">
              Pakistan's #1 Fiverr 24h Gig Ranking Method
            </div>
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
          <button
            type="button"
            onClick={() => onNavigate('method')}
            className="text-[#5eead4] hover:text-white transition-colors font-semibold"
          >
            ⚡ 24h Ranking Method
          </button>
          <button
            type="button"
            onClick={() => onNavigate('enroll')}
            className="hover:text-white transition-colors"
          >
            Get The Method
          </button>
          <button
            type="button"
            onClick={() => scrollTo('trust')}
            className="hover:text-white transition-colors"
          >
            Guarantee &amp; Safety
          </button>
          <button
            type="button"
            onClick={() => scrollTo('reviews')}
            className="hover:text-white transition-colors"
          >
            Seller Proofs
          </button>
          <button
            type="button"
            onClick={() => scrollTo('faq')}
            className="hover:text-white transition-colors"
          >
            FAQ
          </button>
          <button
            type="button"
            onClick={() => onNavigate('training')}
            className="hover:text-white transition-colors"
          >
            Method Scope
          </button>
          <a
            href={`https://wa.me/${TECHPULSE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            WhatsApp Support
          </a>
        </nav>

        {/* Copyright */}
        <div className="text-xs text-white/50">
          © 2026 Smart SEO Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
