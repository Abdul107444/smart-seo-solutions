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
      q: 'How long does the complete Fiverr optimization take?',
      a: `Once your ${TECHPULSE_CONFIG.pricePKR.toLocaleString()} PKR payment is verified and you share your Fiverr profile/niche on WhatsApp, our SEO specialists complete your full profile & gig overhaul within 2 to 4 business days.`
    },
    {
      q: 'Do I have to share my Fiverr password, or do you support AnyDesk?',
      a: 'It is completely up to you! You can share account access for a hassle-free direct setup, OR our specialist can optimize your entire Fiverr profile & gigs live in front of you via AnyDesk or TeamViewer screen-share so your login stays 100% private.'
    },
    {
      q: 'What is your 20–25 Days 1st Client 100% Money-Back Guarantee?',
      a: `After we complete your optimization, if you keep your profile active and do not see search impression growth or get your 1st client inquiries within 20 to 25 days, we issue a 100% full refund of your ${TECHPULSE_CONFIG.pricePKR.toLocaleString()} PKR fee on WhatsApp with zero hassle.`
    },
    {
      q: 'Will my existing gigs be de-ranked if you optimize them?',
      a: 'No! If your gig is already getting 0 impressions or orders, keeping it un-optimized guarantees 0 results. When we apply our white-hat algorithm tags and preserve your permanent URL structure, Fiverr re-indexes your gig cleanly and pushes it into targeted buyer search streams.'
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
            <span>Book Now — {TECHPULSE_CONFIG.pricePKR.toLocaleString()} PKR</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        {/* Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2b62ef]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2b62ef]">
            <Sparkles className="h-3.5 w-3.5" /> Done-For-You Optimization Scope
          </div>
          <h1 className="mt-4 font-display text-2xl font-extrabold leading-tight text-[#0c172f] sm:text-4xl">
            Get your 1st fiverr client within{' '}
            <span className="text-gradient">20-25 days with Guarantee</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-[#535f6f] leading-relaxed">
            Stop waiting for buyer requests or wondering why your gigs are frozen at 0 impressions. Our specialists optimize your full Fiverr profile &amp; gigs end-to-end so you start winning international orders.
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
            <span>Book Full Optimization — {TECHPULSE_CONFIG.pricePKR.toLocaleString()} PKR</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onSeeReviews}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#dfe5ed] bg-white px-7 py-4 text-sm font-bold text-[#0c172f] shadow-sm hover:bg-[#ecf3f8] transition-colors"
          >
            View Fiverr Seller Proofs &amp; Reviews
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-[#535f6f]">
          Done-For-You Optimization Fee · Regular Price: {TECHPULSE_CONFIG.originalPricePKR.toLocaleString()} PKR
        </p>

        {/* Service Specifications Card */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-[#dfe5ed] bg-white p-6 sm:p-8 shadow-card">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2b62ef]">
              Full Specifications
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold text-[#0c172f]">
              What Our Team Optimizes For You
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#535f6f]">
              Done-For-You execution via Direct Setup or Live AnyDesk Screen-Share.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-3 text-center">
              <div className="text-[10px] font-bold uppercase text-[#535f6f]">Service Fee</div>
              <div className="mt-1 font-display text-base font-extrabold text-[#2b62ef]">
                {TECHPULSE_CONFIG.pricePKR.toLocaleString()} PKR
              </div>
            </div>

            <div className="rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-3 text-center">
              <div className="text-[10px] font-bold uppercase text-[#535f6f]">Delivery Time</div>
              <div className="mt-1 font-display text-base font-extrabold text-[#0c172f]">
                2–4 Days
              </div>
            </div>

            <div className="rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-3 text-center">
              <div className="text-[10px] font-bold uppercase text-[#535f6f]">Setup Mode</div>
              <div className="mt-1 font-display text-base font-extrabold text-[#0c172f]">
                Direct / AnyDesk
              </div>
            </div>

            <div className="rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-3 text-center">
              <div className="text-[10px] font-bold uppercase text-[#535f6f]">1st Client Guarantee</div>
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
              20–25 Days 1st Client 100% Money-Back Guarantee
            </h3>
            <p className="mx-auto mt-1 max-w-md text-xs sm:text-sm text-emerald-900 leading-relaxed">
              If after our complete optimization you do not see search impression growth or receive your 1st client inquiries within 20–25 days, you receive an immediate 100% refund via WhatsApp.
            </p>
          </div>
        </div>

        {/* Optimization FAQs */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl font-bold text-[#0c172f]">
              Optimization Service FAQ
            </h2>
            <p className="text-xs text-[#535f6f]">
              Got questions before booking your optimization? We have you covered.
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
            <span>Book Full Optimization — {TECHPULSE_CONFIG.pricePKR.toLocaleString()} PKR</span>
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
