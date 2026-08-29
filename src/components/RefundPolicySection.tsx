import React from 'react';
import { 
  ShieldCheck, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  BadgeCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BUSINESS_INFO } from '../data/funnelData';

interface RefundPolicySectionProps {
  onNavigateToThankYou?: () => void;
}

export const RefundPolicySection: React.FC<RefundPolicySectionProps> = ({ onNavigateToThankYou }) => {
  const guaranteePoints = [
    {
      title: 'Full 100% Money-Back Protection',
      description: 'Zero financial risk. If our optimization fails to generate buyer outreach within 20–25 days, every single rupee is refunded back to you.',
      icon: <BadgeCheck className="w-5 h-5 text-emerald-400" />,
      tag: '100% Protected'
    },
    {
      title: '20–25 Days Performance Period',
      description: 'Fiverr algorithms typically take 14–21 days to re-index keywords and push optimized gigs into relevant buyer search results.',
      icon: <Clock className="w-5 h-5 text-orange-400" />,
      tag: 'Algorithmic Window'
    },
    {
      title: 'Hassle-Free WhatsApp Claims',
      description: 'No complicated dispute forms or delays. Just message our support team on WhatsApp with your profile link for instant resolution.',
      icon: <WhatsAppIcon className="w-5 h-5 text-emerald-400" />,
      tag: 'Instant Support'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Complete Optimization & Delivery',
      desc: 'We research high-buyer-intent keywords, craft SEO titles, optimize search tags, rewrite descriptions, and restructure gig tiers.'
    },
    {
      step: '02',
      title: '20–25 Days Outreach Window',
      desc: 'Your gigs are re-indexed across search filters, increasing organic impressions, gig clicks, and incoming direct client inquiries.'
    },
    {
      step: '03',
      title: 'Verified Results or 100% Refund',
      desc: 'If you do not get client outreach or inquiries within 20–25 days of full implementation, we issue a prompt 100% full refund.'
    }
  ];

  return (
    <section id="refund-policy-section" className="py-16 md:py-24 relative overflow-hidden bg-black/30 border-y border-white/10">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-400/30 rounded-full text-[10px] sm:text-xs uppercase tracking-widest text-emerald-400 font-bold mb-4 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Risk-Free Guarantee</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Our 20–25 Days <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-yellow-400">100% Refund Policy</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-normal leading-relaxed">
            We stand completely behind the quality of our data-driven Fiverr optimization. If you do not start receiving client outreach within 20 to 25 days, we will refund 100% of your payment.
          </p>
        </div>

        {/* Main Guarantee Highlight Banner Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 border border-emerald-500/30 shadow-2xl relative overflow-hidden mb-12 bg-gradient-to-br from-emerald-950/40 via-purple-950/30 to-black/60 backdrop-blur-xl">
          {/* Top Stamp / Badge */}
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-1.5 rounded-bl-2xl text-[10px] sm:text-xs font-black tracking-wider uppercase text-black shadow-lg flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>100% MONEY-BACK PROMISE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Big Shield Visual & Headline */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 border border-emerald-400/40 flex items-center justify-center shadow-xl p-4">
                  <ShieldCheck className="w-12 h-12 text-emerald-400" />
                </div>
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] font-black text-black uppercase tracking-wider shadow">
                  Verified
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Confidence In Real Results
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  Zero Financial Risk For Your Business
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                We don't just give basic tips. We thoroughly re-engineer your keyword architecture, gig metadata, and sales copy to trigger authentic buyer conversations.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 justify-center lg:justify-start text-[11px] text-white/80 font-medium">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> No Hidden Clauses
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Direct WhatsApp Claim
                </span>
              </div>
            </div>

            {/* Right Detailed Guarantee Terms */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
                  <Sparkles className="w-4 h-4" />
                  <h4>How Our Refund Policy Works</h4>
                </div>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  After we deliver your complete Fiverr optimization and you implement the recommended changes, please allow <strong>20 to 25 days</strong> for Fiverr's search algorithms to crawl, index, and position your updated profile.
                </p>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  If during this <strong>20–25 day window</strong> you do not experience incoming buyer messages, project inquiries, or organic client outreach, simply reach out to us on WhatsApp. We will promptly issue a <strong>100% full refund of {BUSINESS_INFO.price}</strong>.
                </p>
              </div>

              {/* 3 Step Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {steps.map((item) => (
                  <div key={item.step} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-mono font-black text-emerald-400 block mb-1">
                        STEP {item.step}
                      </span>
                      <h5 className="text-xs font-bold text-white mb-1">{item.title}</h5>
                      <p className="text-[11px] text-white/60 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {guaranteePoints.map((point) => (
            <div
              key={point.title}
              className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {point.icon}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/5 border border-white/10 text-white/60">
                    {point.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {point.title}
                </h4>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-orange-500/10 via-purple-900/20 to-emerald-500/10 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Ready to Upgrade Your Fiverr Profile Risk-Free?
            </h4>
            <p className="text-xs sm:text-sm text-white/60">
              Get full keyword SEO, description rewrite, and buyer-intent positioning with 100% peace of mind.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            {onNavigateToThankYou && (
              <button
                id="refund-section-book-btn"
                onClick={onNavigateToThankYou}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Book Optimization ({BUSINESS_INFO.price})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              id="refund-section-whatsapp-link"
              onClick={onNavigateToThankYou}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>Ask on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
