import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Monitor,
  Lock,
  ChevronDown,
  Layers,
  Award,
  Zap,
  Target
} from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';

interface TrainingPageProps {
  onBack: () => void;
  onEnroll: () => void;
  onSeeReviews: () => void;
}

export function AiVideosTrainingPage({ onBack, onEnroll, onSeeReviews }: TrainingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const serviceFaqs = [
    {
      q: 'How long does the optimization take to complete?',
      a: 'A complete, manual audit and done-for-you optimization is typically delivered within 2 to 4 business days after you submit your profile details.'
    },
    {
      q: 'How do you apply the changes to my Fiverr account?',
      a: 'We offer two 100% secure methods: (1) Direct login credentials if you prefer completely hands-free execution, or (2) A live screen-share session via AnyDesk or TeamViewer where we apply all keywords, titles, tags, and packages in front of your eyes.'
    },
    {
      q: 'What is your 20–25 Days 100% Money-Back Guarantee?',
      a: 'Once our optimization is published on your profile, we allow Fiverr algorithms 20 to 25 days to re-index your keywords and boost search impressions. If you follow our instructions and do not receive organic search progress or buyer interaction, we issue a 100% full refund on WhatsApp with zero hassle.'
    },
    {
      q: 'Will my existing gigs be de-ranked if you edit them?',
      a: 'No! If your gig is already getting 0 impressions or orders, keeping it un-optimized guarantees 0 results. When optimized using our white-hat algorithm tags and preserving your permanent URL structure, Fiverr briefly re-indexes your gig and pushes it to targeted buyer search streams.'
    },
    {
      q: 'What payment methods do you accept in Pakistan?',
      a: 'We accept instant bank transfers (IBFT / Raast) via Meezan Bank, Easypaisa, JazzCash, SadaPay, NayaPay, or any Pakistani commercial bank.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7fbfd] text-[#0c172f] pb-24">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-[#dfe5ed] bg-[#f7fbfd]/90 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-[#dfe5ed] bg-white px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#0c172f] shadow-sm hover:bg-[#ecf3f8] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-[#2b62ef]" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <img
              src="/techpulse-assets/logo.png"
              alt="Smart SEO Solutions"
              className="h-8 w-8 rounded-lg border border-[#dfe5ed]"
            />
            <span className="font-display text-sm font-bold hidden xs:inline">
              Smart SEO Solutions
            </span>
          </div>

          <button
            type="button"
            onClick={onEnroll}
            className="gradient-brand inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:scale-105 transition-transform"
          >
            <span>Book — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        {/* Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2b62ef]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2b62ef]">
            <Sparkles className="h-3.5 w-3.5" /> Done-For-You Service Overview
          </div>
          <h1 className="mt-4 font-display text-2xl font-extrabold leading-tight text-[#0c172f] sm:text-4xl">
            Complete Fiverr Profile & Gig Optimization —{' '}
            <span className="text-gradient">Rank on Page 1 & Multiply Orders</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-[#535f6f] leading-relaxed">
            Stop waiting for buyer requests or wondering why your gigs are frozen at 0 impressions. We overhaul your Fiverr presence to attract international high-ticket buyers.
          </p>
        </div>

        {/* Video Player */}
        <div className="mt-8 overflow-hidden rounded-2xl border-2 border-[#2b62ef]/30 bg-black shadow-xl">
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={TECHPULSE_CONFIG.videoUrl}
              title="Fiverr Profile & Gig Optimization Overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onEnroll}
            className="gradient-brand w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-glow hover:scale-[1.02] transition-transform"
          >
            <span>Book Optimization — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onSeeReviews}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#dfe5ed] bg-white px-7 py-4 text-sm font-bold text-[#0c172f] shadow-sm hover:bg-[#ecf3f8] transition-colors"
          >
            View Fiverr Seller Proofs & Reviews
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-[#535f6f]">
          Promotional Package Fee · Regular Fee: Rs. {TECHPULSE_CONFIG.originalPricePKR.toLocaleString()}
        </p>

        {/* Service Specifications Card */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-[#dfe5ed] bg-white p-6 sm:p-8 shadow-card">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2b62ef]">
              Full Specifications
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold text-[#0c172f]">
              Service Delivery Specifications
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#535f6f]">
              Everything delivered directly to your Fiverr profile.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-3 text-center">
              <div className="text-[10px] font-bold uppercase text-[#535f6f]">Service Charges</div>
              <div className="mt-1 font-display text-base font-extrabold text-[#2b62ef]">
                PKR {TECHPULSE_CONFIG.pricePKR.toLocaleString()}
              </div>
            </div>

            <div className="rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-3 text-center">
              <div className="text-[10px] font-bold uppercase text-[#535f6f]">Turnaround Time</div>
              <div className="mt-1 font-display text-base font-extrabold text-[#0c172f]">
                2–4 Days
              </div>
            </div>

            <div className="rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-3 text-center">
              <div className="text-[10px] font-bold uppercase text-[#535f6f]">Delivery Mode</div>
              <div className="mt-1 font-display text-base font-extrabold text-[#0c172f]">
                AnyDesk / Direct
              </div>
            </div>

            <div className="rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-3 text-center">
              <div className="text-[10px] font-bold uppercase text-[#535f6f]">Refund Guarantee</div>
              <div className="mt-1 font-display text-base font-extrabold text-emerald-600">
                20–25 Days 100%
              </div>
            </div>

            <div className="rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-3 text-center">
              <Target className="mx-auto h-5 w-5 text-[#2b62ef]" />
              <div className="mt-1 text-[10px] font-bold uppercase text-[#535f6f]">Keywords</div>
              <div className="font-display text-sm font-bold text-[#0c172f]">5 Intent Tags</div>
            </div>

            <div className="rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-3 text-center">
              <Layers className="mx-auto h-5 w-5 text-[#2b62ef]" />
              <div className="mt-1 text-[10px] font-bold uppercase text-[#535f6f]">Description</div>
              <div className="font-display text-sm font-bold text-[#0c172f]">1200 Chars SEO</div>
            </div>

            <div className="rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-3 text-center">
              <Zap className="mx-auto h-5 w-5 text-[#2b62ef]" />
              <div className="mt-1 text-[10px] font-bold uppercase text-[#535f6f]">Pricing Tiers</div>
              <div className="font-display text-sm font-bold text-[#0c172f]">3-Tier Strategy</div>
            </div>

            <div className="rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-3 text-center">
              <Monitor className="mx-auto h-5 w-5 text-[#2b62ef]" />
              <div className="mt-1 text-[10px] font-bold uppercase text-[#535f6f]">Visual CTR</div>
              <div className="font-display text-sm font-bold text-[#0c172f]">Thumbnails SEO</div>
            </div>
          </div>

          {/* Deliverables Breakdown List */}
          <div className="mt-8 border-t border-[#dfe5ed] pt-6">
            <h3 className="font-display text-base font-bold text-[#0c172f] mb-4 text-center sm:text-left">
              What Is Included In The Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()} Package:
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { title: 'In-Depth Competitor & Keyword Research', desc: 'Identify 5 low-competition buyer search tags with real commercial purchasing volume.' },
                { title: 'SEO-Optimized Click-Worthy Title', desc: 'Craft a title that catches the algorithm and triggers high organic search CTR.' },
                { title: '1200-Character AIDA Description', desc: 'Persuasive copywriting with strategic problem hooks, deliverables, and strong CTAs.' },
                { title: '3-Tier Psychological Package Pricing', desc: 'Setup Basic, Standard, and Premium packages designed to convert at higher average order values.' },
                { title: 'Objection-Handling Buyer FAQs', desc: 'Craft custom FAQs with naturally embedded keywords that remove buyer hesitation.' },
                { title: 'High-CTR Thumbnail Visual Strategy', desc: 'Contrast recommendations, typography hierarchy, and portfolio presentation guidelines.' },
                { title: 'Full Profile Bio & Authority Positioning', desc: 'Position yourself as an international consultant rather than a low-ticket gig worker.' },
                { title: '20–25 Days 100% Money-Back Guarantee', desc: 'Full risk-free refund if you do not receive organic search impressions progress.' }
              ].map((del, dIdx) => (
                <div key={dIdx} className="rounded-xl border border-[#dfe5ed] bg-[#f7fbfd] p-3.5 flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#2b62ef] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-display text-xs sm:text-sm font-bold text-[#0c172f]">{del.title}</div>
                    <div className="text-[11px] text-[#535f6f] mt-0.5 leading-snug">{del.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* No Risk Guarantee */}
          <div className="mt-8 overflow-hidden rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/60 p-5 text-center">
            <ShieldCheck className="mx-auto h-8 w-8 text-emerald-600" />
            <h3 className="mt-2 font-display text-lg font-bold text-emerald-950">
              100% Risk-Free Money-Back Guarantee
            </h3>
            <p className="mx-auto mt-1 max-w-md text-xs sm:text-sm text-emerald-900 leading-relaxed">
              If after 20–25 days of published optimization you do not see search impression growth or buyer outreach, you receive an immediate 100% refund via WhatsApp.
            </p>
          </div>
        </div>

        {/* Service FAQs */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl font-bold text-[#0c172f]">
              Service FAQ
            </h2>
            <p className="text-xs text-[#535f6f]">
              Got questions before booking? We have you covered.
            </p>
          </div>

          <div className="space-y-3">
            {serviceFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-[#dfe5ed] bg-white transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-[#0c172f]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#535f6f] transition-transform ${
                        isOpen ? 'rotate-180 text-[#2b62ef]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-[#dfe5ed] bg-[#f7fbfd] px-5 py-3.5">
                      <p className="text-xs sm:text-sm leading-relaxed text-[#535f6f]">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Booking Button */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onEnroll}
            className="gradient-brand inline-flex items-center gap-2 rounded-full px-10 py-4 text-base font-bold text-white shadow-glow hover:scale-[1.02] transition-transform"
          >
            <span>Book Optimization — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#535f6f]">
            <Lock className="h-3.5 w-3.5 text-[#2b62ef]" />
            <span>Secure 1-click Bank / Easypaisa / JazzCash payment</span>
          </div>
        </div>
      </main>
    </div>
  );
}
