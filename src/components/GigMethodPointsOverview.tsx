import React from 'react';
import { Lock, Sparkles, CheckCircle2, ArrowRight, FileText, Zap, ShieldCheck } from 'lucide-react';
import { GIG_RANK_METHOD_INFO } from '../data/funnelData';

interface GigMethodPointsOverviewProps {
  onScrollToOrder: () => void;
}

export const GigMethodPointsOverview: React.FC<GigMethodPointsOverviewProps> = ({ onScrollToOrder }) => {
  const highlights = [
    {
      number: '01',
      title: 'The 4-Spot Keyword Placement Matrix',
      description: 'Discover the exact high-priority locations where Fiverr search crawlers scan for relevance. Correct placement signals the algorithm to index and elevate your gig immediately.',
      badge: 'Confidential Formula',
      status: '🔒 Fully detailed in PDF',
    },
    {
      number: '02',
      title: 'High-Intent Buyer Keyword Extraction',
      description: 'Learn how to identify low-competition, high-budget buyer search queries that deliver instant ranking priority within 24 hours — without guesswork.',
      badge: 'Keyword Strategy',
      status: '🔒 Fully detailed in PDF',
    },
    {
      number: '03',
      title: 'Crawler Re-Indexing & Density Multiplier',
      description: 'The exact placement frequency across your gig structure that triggers indexing bots while remaining 100% white-hat and penalty-free.',
      badge: 'Algorithm Trigger',
      status: '🔒 Fully detailed in PDF',
    },
    {
      number: '04',
      title: 'Thumbnail Visual Alignment for Maximum CTR',
      description: 'How to align your gig visuals with Fiverr’s machine learning OCR bots to capture buyer attention and dominate top-row placement on page 1.',
      badge: 'Click-Through Secret',
      status: '🔒 Fully detailed in PDF',
    },
  ];

  return (
    <section id="points-overview-section" className="py-16 md:py-24 relative bg-black/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-500/15 border border-orange-500/30 rounded-full text-xs uppercase tracking-widest text-orange-400 font-bold mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Confidential PDF Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            What You Will Discover Inside This{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
              PDF Blueprint
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-normal leading-relaxed">
            A concise, actionable 2-page master guide designed for immediate execution. No fluff, no complicated theory — simply follow the exact checklist and rank your gig on page 1 within 24 hours.
          </p>
        </div>

        {/* 4 Highlights Grid (Confidential - No Leaked Secrets) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {highlights.map((item) => (
            <div
              key={item.number}
              className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-md flex flex-col justify-between hover:border-orange-500/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-orange-500/15 text-orange-300 border border-orange-500/30">
                    {item.badge}
                  </span>
                  <span className="text-2xl font-black text-white/20 font-mono group-hover:text-orange-400/40 transition-colors">
                    #{item.number}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5">
                  {item.title}
                </h3>

                <p className="text-sm text-white/70 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{item.status}</span>
                </span>
                <span className="text-white/40 font-mono">100% Guaranteed</span>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Callout Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-950/40 to-orange-500/15 border border-amber-500/30 backdrop-blur-md max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Actionable & Ready for Immediate Implementation</h4>
              <p className="text-xs text-white/60">Takes less than 15 minutes to apply. Instant PDF download upon verified checkout.</p>
            </div>
          </div>

          <button
            onClick={onScrollToOrder}
            className="px-6 py-3 rounded-xl btn-gold-gradient text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:scale-105 transition-transform flex-shrink-0 cursor-pointer"
          >
            <span>Unlock PDF for {GIG_RANK_METHOD_INFO.price}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
