import React, { useRef } from 'react';
import { GigMethodHeroSection } from '../components/GigMethodHeroSection';
import { GigMethodPointsOverview } from '../components/GigMethodPointsOverview';
import { PreviousWorkSection } from '../components/PreviousWorkSection';
import { GigMethodFaqSection } from '../components/GigMethodFaqSection';
import { GigMethodBookingForm } from '../components/GigMethodBookingForm';
import { ShieldCheck, CheckCircle2, Zap, ArrowRight, FileText } from 'lucide-react';
import { GIG_RANK_METHOD_INFO } from '../data/funnelData';

interface GigRankingMethodPageProps {
  onNavigateToMain?: () => void;
}

export const GigRankingMethodPage: React.FC<GigRankingMethodPageProps> = ({ onNavigateToMain }) => {
  const orderSectionRef = useRef<HTMLDivElement>(null);

  const scrollToOrder = () => {
    const el = document.getElementById('order-method-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0517] text-white">
      {/* Quick top bar to navigate between Full Optimization and 24h Method */}
      <div className="bg-gradient-to-r from-orange-600/30 via-purple-900/40 to-amber-600/30 border-b border-orange-500/20 py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-orange-500 text-black font-black uppercase text-[10px]">
              Confidential PDF
            </span>
            <span className="text-white/80 font-medium">
              24-Hour Fiverr 1st Page Ranking Blueprint (PDF Guide) — Special Price: <strong>{GIG_RANK_METHOD_INFO.price}</strong>
            </span>
          </div>

          {onNavigateToMain && (
            <button
              onClick={onNavigateToMain}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer transition-colors underline decoration-amber-400/50"
            >
              <span>Switch to Full Done-For-You Profile & Gig Service (Rs. 8,000)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <GigMethodHeroSection onScrollToOrder={scrollToOrder} />

      {/* Confidential PDF Blueprint Teaser (Zero Leaked Method Details) */}
      <GigMethodPointsOverview onScrollToOrder={scrollToOrder} />

      {/* Previous Client Work & Portfolio Proof */}
      <div id="work-section" className="border-t border-b border-white/10 bg-black/40">
        <PreviousWorkSection onSelectLead={() => scrollToOrder()} />
      </div>

      {/* 24-Hour Indexing Guarantee & Algorithmic Mechanics Section */}
      <section className="py-16 md:py-20 relative bg-gradient-to-b from-transparent via-orange-950/20 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-400 mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Organic Algorithmic Compliance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Why Does This Method Rank Within 24 Hours?
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
            Fiverr’s search indexing crawler evaluates every newly published and modified gig on a continuous 24-hour cycle. When your gig matches specific high-priority relevance signals across key on-page locations:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left mb-10">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-orange-400 font-black text-lg block mb-1">01. Immediate Indexing</span>
              <p className="text-xs text-white/70">Fiverr crawlers immediately recognize intent and push the gig into active search results.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-orange-400 font-black text-lg block mb-1">02. Zero Filter Penalties</span>
              <p className="text-xs text-white/70">100% white-hat algorithmic alignment prevents spam flags and ghosting.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-orange-400 font-black text-lg block mb-1">03. High Buyer CTR</span>
              <p className="text-xs text-white/70">Visual heading optimization turns impressions into real buyer clicks and message inquiries.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-orange-400 font-black text-lg block mb-1">04. Works on Any Niche</span>
              <p className="text-xs text-white/70">Universal blueprint applies to graphic design, development, marketing, video editing, and more.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 max-w-xl mx-auto flex items-center justify-center gap-2 text-emerald-300 text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Read the PDF points, apply the formula, and watch your gig rank on page 1!</span>
          </div>
        </div>
      </section>

      {/* Dedicated Order & Verification Form (Meezan Bank + Instant PDF Download) */}
      <div ref={orderSectionRef}>
        <GigMethodBookingForm />
      </div>

      {/* FAQs Section (Tailored for 24h method: "faqs change krna is hisab sa") */}
      <GigMethodFaqSection />
    </div>
  );
};
