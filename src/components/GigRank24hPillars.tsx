import React from 'react';
import {
  Link2,
  Tag,
  Image as ImageIcon,
  FileText,
  DollarSign,
  MonitorCheck,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';

interface GigRank24hPillarsProps {
  onEnroll: () => void;
}

const PILLARS = [
  {
    icon: Link2,
    number: '01',
    title: 'Permanent URL Permalink Formula',
    tagline: 'Algorithmic Anchor',
    description:
      'Fiverr generates your gig URL once upon creation. Even if you edit the title later, the URL permalink remains forever. Our method shows you how to construct your permanent URL with the highest-converting buyer query before final title polishing.',
    bulletPoints: [
      'Lock keyword into fiverr.com/username/[target-keyword-slug]',
      'Avoid URL de-ranking mistakes when updating gig titles',
      'Boost algorithmic relevancy score across search crawlers'
    ]
  },
  {
    icon: Tag,
    number: '02',
    title: '5 Buyer-Intent Search Tag Extraction',
    tagline: 'Zero Dead-Keywords',
    description:
      'Most sellers copy tags from competitors with 10k reviews and stay buried on page 20. Inside the method, you get the exact workflow to discover 5 low-competition tags where US/UK buyers search with buying intent.',
    bulletPoints: [
      'Step-by-step Fiverr Suggest autocomplete extraction trick',
      'Negative keyword checklist to eliminate tire-kickers',
      'Exact tag density guide for your 1,200-char description'
    ]
  },
  {
    icon: ImageIcon,
    number: '03',
    title: 'High-CTR Thumbnail Visual Blueprint',
    tagline: '3-Second Click Magnet',
    description:
      'Impressions mean nothing if buyers scroll past your gig. The guide gives you high-contrast thumbnail structure rules with readable badge typography on mobile apps and clear value framing that earns clicks.',
    bulletPoints: [
      'Contrast formula optimized for Fiverr Dark & Light modes',
      'Readable 1280x769 layout tested on mobile screens',
      'Clean visual hierarchy that highlights service outcome'
    ]
  },
  {
    icon: FileText,
    number: '04',
    title: 'Copy-Paste AIDA Description Templates',
    tagline: 'Attention · Interest · Desire · Action',
    description:
      'Buyers skim for 8 seconds. Use our fill-in-the-blank 1,200-character AIDA description templates with an instant hook, bulleted deliverables, package comparisons, and proactive FAQs that turn visitors into messages.',
    bulletPoints: [
      'Exact blueprint to seed primary keywords in lines 1–3',
      'Ready-to-edit copy frameworks for any Fiverr niche',
      'Proven Call-to-Action lines that trigger buyer DMs'
    ]
  },
  {
    icon: DollarSign,
    number: '05',
    title: 'Psychological 3-Tier Decoy Pricing',
    tagline: 'Conversion & High Ticket',
    description:
      'New sellers underprice at $5 and get ignored, or overprice at $200 with zero reviews. Our method includes a 3-tier decoy pricing chart ($30 / $120 / $250) designed to make buyers pick your package and place their order fast.',
    bulletPoints: [
      'Entry tier pricing guide to capture first 5-star reviews',
      'Standard tier structured for maximum profit conversion',
      'Clear scope templates to avoid revision headaches'
    ]
  },
  {
    icon: MonitorCheck,
    number: '06',
    title: 'Instant Digital Method & Self-Execution Guide',
    tagline: 'Zero Account Sharing · Total Control',
    description:
      'You never hand over your Fiverr login, password, or computer access to anyone. You receive the complete 24-hour ranking method via WhatsApp & Email and apply every step safely yourself in under 45 minutes.',
    bulletPoints: [
      '100% self-paced step-by-step guide you own forever',
      'Zero Fiverr TOS risks, no third-party logins or IP flags',
      'Full clarity on how Fiverr search indexing works'
    ]
  }
];

export function GigRank24hPillars({ onEnroll }: GigRank24hPillarsProps) {
  return (
    <section id="method-pillars" className="bg-white px-4 py-16 sm:px-6 sm:py-24 border-t border-[#dfe5ed]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#2b62ef]/30 bg-[#2b62ef]/10 px-3.5 py-1 text-xs font-bold text-[#2b62ef]">
            <Sparkles className="h-3.5 w-3.5 text-[#2b62ef]" />
            <span>What's Inside The Method</span>
          </div>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0c172f]">
            The 6 Core Pillars Revealed Inside The 24-Hour Method
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#535f6f] leading-relaxed">
            Every strategy inside this downloadable blueprint is engineered to trigger Fiverr’s algorithmic relevancy signals without spam, black-hat tricks, or handing over your account.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="group relative rounded-3xl border border-[#dfe5ed] bg-[#f7fbfd] p-6 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#2b62ef]/40 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number and Icon */}
                  <div className="flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#2b62ef]/10 text-[#2b62ef] group-hover:bg-[#2b62ef] group-hover:text-white transition-colors duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-display text-2xl font-black text-[#535f6f]/40 group-hover:text-[#2b62ef]/60 transition-colors">
                      {pillar.number}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-5">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#2b62ef]">
                      {pillar.tagline}
                    </span>
                    <h3 className="mt-1 font-display text-lg sm:text-xl font-bold text-[#0c172f]">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-[#535f6f] leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Bullets */}
                  <ul className="mt-4 space-y-2 border-t border-[#dfe5ed]/70 pt-4">
                    {pillar.bulletPoints.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#0c172f]">
                        <CheckCircle2 className="h-4 w-4 text-[#1dbf73] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 rounded-3xl border border-[#2b62ef]/30 bg-gradient-to-r from-[#2b62ef]/10 via-[#2b62ef]/5 to-transparent p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#2b62ef] text-white shadow-md">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="font-display text-base sm:text-lg font-bold text-[#0c172f]">
                Ready to Apply the 24-Hour Method Yourself?
              </div>
              <div className="text-xs sm:text-sm text-[#535f6f]">
                Instant delivery via WhatsApp &amp; Email · 20 to 25 Days Money-Back Guarantee · Easy 45-min setup
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onEnroll}
            className="gradient-brand inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-glow hover:scale-[1.03] active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Get Complete Method — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
