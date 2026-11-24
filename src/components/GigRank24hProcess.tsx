import React from 'react';
import {
  Clock,
  CheckCircle2,
  Zap,
  ArrowRight,
  TrendingUp,
  Search,
  Lock,
  Layers,
  Sparkles,
  ShieldCheck,
  Award
} from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';

interface GigRank24hProcessProps {
  onEnroll: () => void;
}

const TIMELINE_STEPS = [
  {
    phase: 'Hour 00 – 04',
    title: 'Micro-Niche Intent & Negative Keyword Purge',
    badge: 'Step 01',
    desc: 'Learn inside the method how to filter 5 low-competition tags with heavy commercial intent. Instead of competing with 50,000 gigs on generic words, you target laser-focused queries where competition is only 200–600 gigs.',
    result: 'Zero Algorithmic Deadlock',
    icon: Search
  },
  {
    phase: 'Hour 04 – 10',
    title: 'Permanent URL Permalink & Keyword Locking',
    badge: 'Step 02',
    desc: 'The Fiverr algorithm grants permanent authority to your gig’s initial URL slug. Follow our exact formula to inject the primary ranking phrase into your permanent permalink and seed it across the first 3 lines of your description.',
    result: 'Permanent Slug Authority',
    icon: Lock
  },
  {
    phase: 'Hour 10 – 24',
    title: 'Fiverr Search Crawler Re-Indexing Cycle',
    badge: 'Step 03',
    desc: 'Fiverr’s search engine crawler processes your updated metadata within 24 hours. Because the new tags match real purchasing intent without keyword stuffing, the system flags your gig as high-relevance and pushes it up.',
    result: 'First Page Search Placement',
    icon: Clock
  },
  {
    phase: 'Day 02 – 07',
    title: 'Inbound Buyer Inquiries & 1st Order Closed',
    badge: 'Step 04',
    desc: 'Using our bold thumbnail layout formula and psychological 3-tier decoy pricing templates, incoming buyers don’t bounce. They click "Contact Seller" and close their first project with you.',
    result: '1st Dollar Order In Hand',
    icon: TrendingUp
  }
];

export function GigRank24hProcess({ onEnroll }: GigRank24hProcessProps) {
  return (
    <section id="method-process" className="bg-[#f7fbfd] px-4 py-16 sm:px-6 sm:py-24 border-t border-[#dfe5ed]">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2b62ef]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#2b62ef]">
            <Clock className="h-3.5 w-3.5" /> Done-For-You Optimization Roadmap
          </div>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0c172f] tracking-tight">
            How Our Full Fiverr Optimization Works
          </h2>
          <p className="mt-2 text-xs sm:text-base text-[#535f6f] leading-relaxed">
            Our SEO specialists rebuild every ranking signal on your Fiverr profile and gigs so you start ranking and win your 1st client within 20–25 days.
          </p>
        </div>

        {/* 4-Step Timeline Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border-2 border-[#dfe5ed] bg-white p-6 shadow-sm hover:border-[#2b62ef]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Phase & Step Badge */}
                  <div className="flex items-center justify-between border-b border-[#dfe5ed]/60 pb-3">
                    <span className="rounded-full bg-[#2b62ef]/10 px-2.5 py-0.5 text-[11px] font-black text-[#2b62ef]">
                      {step.phase}
                    </span>
                    <span className="text-[11px] font-bold text-[#535f6f]">
                      {step.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mt-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-tr from-[#2b62ef]/15 to-emerald-500/15 text-[#2b62ef] group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="mt-4 font-display text-base font-extrabold text-[#0c172f] leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#535f6f] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Result Pill */}
                <div className="mt-5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-center text-[11px] font-extrabold text-emerald-800 border border-emerald-200/60">
                  ✓ {step.result}
                </div>
              </div>
            );
          })}
        </div>

        {/* Before vs After Comparison Card */}
        <div className="mt-14 overflow-hidden rounded-3xl border-2 border-[#2b62ef]/30 bg-white p-6 sm:p-10 shadow-card">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2b62ef]">
              Real Algorithmic Impact
            </span>
            <h3 className="mt-1 font-display text-xl sm:text-2xl font-extrabold text-[#0c172f]">
              Before vs. After 24-Hour Method
            </h3>
            <p className="text-xs sm:text-sm text-[#535f6f] mt-1">
              Why un-optimized gigs stay dead while our clients win paying clients in record time.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Before Column */}
            <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/40 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-rose-800 font-extrabold text-sm mb-4">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-rose-200 text-rose-800 text-xs">✕</span>
                <span>Without 24h Optimization (Standard Gig)</span>
              </div>
              <ul className="space-y-3 text-xs text-[#475569]">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Generic high-competition tags (competing against 50,000+ Level 2 sellers).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Zero impressions for months because Fiverr crawlers ignore generic titles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Flat $5 pricing with no decoy strategy, making buyers doubt credibility.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Endless waiting with 0 orders and 0 client inquiries.</span>
                </li>
              </ul>
            </div>

            {/* After Column */}
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm mb-4">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-200 text-emerald-900 text-xs">✓</span>
                <span>With 24h Method (Smart SEO Solutions)</span>
              </div>
              <ul className="space-y-3 text-xs text-[#0c172f] font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>5 Low-competition buyer tags with heavy commercial search volume.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Fiverr crawler indexes the gig in search streams within 24 hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>3-Tier decoy pricing attracting $150–$400+ serious international clients.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Direct inbox inquiries and 1st paying client won very soon!</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={onEnroll}
              className="gradient-brand inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm sm:text-base font-extrabold text-white shadow-glow hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <span>Book Full Optimization — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
