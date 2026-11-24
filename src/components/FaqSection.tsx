import React, { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';

interface FaqItemData {
  id: string;
  q: string;
  a: string;
  highlight?: string;
}

// Reduced to 4 Core, High-Impact Frequently Asked Questions
const FOCUSED_FAQS: FaqItemData[] = [
  {
    id: 'faq-1',
    q: 'My Fiverr gig has 0 impressions or seems frozen — can you revive it?',
    a: 'Yes, 100%! The Fiverr search algorithm deprioritizes gigs with outdated generic tags, low keyword relevance, or mismatched category metadata. Our SEO specialists re-optimize your entire gig using low-competition buyer search terms and algorithmic tags so Fiverr pushes your gig into active search streams.',
    highlight: '100% Algorithmic Re-Indexing'
  },
  {
    id: 'faq-2',
    q: 'Will my existing gigs lose ranking if you optimize them?',
    a: 'Not at all. Leaving a zero-order gig untouched only prolongs the deadlock. Our team updates your title, description, and 5 buyer search tags safely according to Fiverr algorithm rules—triggering a clean re-indexing cycle without hurting your permanent URL permalink.',
    highlight: 'Zero De-Rank Risk on URL Permalinks'
  },
  {
    id: 'faq-3',
    q: 'Do you optimize my profile and gigs for me, or do I have to do it myself?',
    a: 'It is a 100% Done-For-You optimization service! Our SEO specialists handle your keyword research, profile bio rewrite, gig titles, 5 search tags, AIDA description, 3-tier pricing, and thumbnail strategy. You can either provide access or let us do everything live on your screen via AnyDesk / TeamViewer.',
    highlight: '100% Done-For-You · Direct or AnyDesk Setup'
  },
  {
    id: 'faq-4',
    q: 'How does the 20–25 Days 1st Client Money-Back Guarantee work?',
    a: 'Our 20–25 day guarantee is 100% unconditional. After our complete profile & gig optimization, if you do not see search impression growth or get your 1st Fiverr client inquiries within 20–25 days, simply message us on WhatsApp for an immediate 100% refund of your 8,000 PKR fee directly to your Pakistani bank account or mobile wallet.',
    highlight: '100% Unconditional Refund Policy'
  }
];

export function FaqSection() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['faq-1']));

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const phone = TECHPULSE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section id="faq" className="px-4 py-16 sm:px-6 sm:py-24 bg-white border-t border-[#dfe5ed]">
      <div className="mx-auto max-w-3xl">
        {/* Eyebrow & Main Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2b62ef]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#2b62ef]">
            <HelpCircle className="h-3.5 w-3.5" /> Quick Answers
          </div>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-[#0c172f] sm:text-4xl tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-base text-[#535f6f] leading-relaxed">
            Essential questions answered honestly to help you make an informed decision.
          </p>
        </div>

        {/* --- CONCISE FAQS ACCORDION (5 ITEMS ONLY) --- */}
        <div className="mt-10 space-y-3.5">
          {FOCUSED_FAQS.map((item, index) => {
            const isOpen = openIds.has(item.id);
            const num = (index + 1).toString().padStart(2, '0');

            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-[#2b62ef]/60 bg-[#f7fbfd] shadow-sm'
                    : 'border-[#dfe5ed] bg-white hover:border-[#2b62ef]/30 hover:bg-[#f7fbfd]/50'
                }`}
              >
                {/* Accordion Question Header */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 p-4 sm:p-5 text-left cursor-pointer transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className={`text-xs font-black px-2 py-0.5 rounded-md shrink-0 ${
                      isOpen ? 'bg-[#2b62ef] text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {num}
                    </span>

                    <span className="font-display text-sm sm:text-base font-bold text-[#0c172f] leading-snug">
                      {item.q}
                    </span>
                  </div>

                  {/* Animated Chevron Indicator */}
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#2b62ef] text-white' : 'bg-[#ecf3f8] text-[#535f6f]'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {/* Collapsible Answer Body */}
                {isOpen && (
                  <div className="border-t border-[#dfe5ed]/80 bg-white px-5 py-4 sm:px-6 sm:py-5 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm leading-relaxed text-[#334155]">
                      {item.a}
                    </p>

                    {item.highlight && (
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{item.highlight}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Direct Help Box */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#2b62ef]/25 bg-gradient-to-r from-blue-50/40 via-white to-emerald-50/40 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-sm sm:text-base font-extrabold text-[#0c172f]">
              Have another question about our Fiverr Optimization?
            </h3>
            <p className="text-xs text-[#535f6f] mt-0.5">
              Message us on WhatsApp for quick answers before booking.
            </p>
          </div>

          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent(
              'Hello! I have a question regarding Fiverr Profile & Gig Optimization (8,000 PKR) with the 20-25 days guarantee.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-sm transition-all shrink-0"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat on WhatsApp</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
