import React from 'react';
import {
  DollarSign,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  Star,
  ExternalLink,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { ImageClickable } from './ScreenshotLightbox';

interface SuccessProofSectionProps {
  onOpenImage: (src: string, alt: string) => void;
}

export function SuccessProofSection({ onOpenImage }: SuccessProofSectionProps) {
  return (
    <section id="proofs" className="px-4 py-12 sm:px-6 sm:py-16 bg-[#f7fbfd]">
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow & Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#1dbf73]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#109655]">
            <Sparkles className="h-3.5 w-3.5" /> Real Verified Results
          </div>
          <h2 className="mt-3 font-display text-2xl font-extrabold text-[#0c172f] sm:text-4xl">
            Real Fiverr Chats, Page 1 Rankings & Dollar Orders
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-[#535f6f]">
            Authentic screenshots and direct inbox proofs from Pakistani sellers who got their gigs optimized by Smart SEO Solutions.
          </p>
        </div>

        {/* 2 Big Visual Proof Cards with Authentic Fiverr Design */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Card 1: Authentic Fiverr Chat & High-Ticket Order Proof */}
          <div className="overflow-hidden rounded-3xl border border-[#dfe5ed] bg-white p-5 sm:p-7 shadow-card shadow-card-hover flex flex-col justify-between">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 border-b border-[#dfe5ed] pb-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-[#1dbf73] text-[11px] font-black text-white">
                    fi
                  </span>
                  <span className="text-xs font-extrabold text-[#0c172f]">
                    Fiverr Buyer Inbox Chat & Order
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-extrabold text-emerald-700">
                  <DollarSign className="h-3 w-3" /> $450.00 Order
                </span>
              </div>

              {/* Realistic Fiverr Chat Simulation Box */}
              <div className="mt-4 rounded-2xl border border-gray-200 bg-[#f7fbfd] p-3.5 sm:p-4 text-xs">
                {/* Buyer Message */}
                <div className="flex items-start gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                    JD
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-white p-3 shadow-xs border border-gray-200 text-[#0c172f]">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#535f6f] mb-1">
                      <span>John D.</span>
                      <span className="text-[10px]">🇺🇸 United States</span>
                      <span className="text-emerald-600 font-semibold">• Online</span>
                    </div>
                    <p className="leading-relaxed">
                      "Hey! I found your gig right on <strong>Page 1</strong> while searching for your service. Loved your presentation and portfolio. Can you handle this custom project for <strong>$450</strong>?"
                    </p>
                  </div>
                </div>

                {/* Seller Reply */}
                <div className="mt-3 flex items-start justify-end gap-2.5">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-none bg-[#1dbf73] p-3 text-white shadow-xs">
                    <p className="leading-relaxed">
                      "Hello John! Yes absolutely, sending custom offer with 4-day delivery right away."
                    </p>
                  </div>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0c172f] text-[10px] font-bold text-white">
                    PK
                  </div>
                </div>

                {/* Fiverr Official Custom Offer Box */}
                <div className="mt-3 rounded-xl border-2 border-emerald-500/40 bg-white p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-800">
                      🎉 Custom Offer Accepted by Buyer
                    </span>
                    <span className="font-extrabold text-[#0c172f] text-sm sm:text-base">
                      $450.00 USD
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-[#535f6f]">
                    <span>Status: <strong className="text-emerald-700">Order In Progress</strong></span>
                    <span>Delivery: <strong>4 Days</strong></span>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <h3 className="mt-4 font-display text-base sm:text-lg font-bold text-[#0c172f] leading-snug">
                Client generated <span className="text-emerald-600 font-extrabold">$1,450+ in international Fiverr orders</span> within 30 days of profile optimization.
              </h3>
              <p className="mt-1 text-xs text-[#535f6f]">
                No cheap $5 race-to-the-bottom work. High-intent US & European buyers order high-ticket packages directly from search.
              </p>
            </div>

            {/* Clickable High-Res Screenshot Proof */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-2">
              <div className="mb-1.5 flex items-center justify-between px-1 text-[11px] text-[#535f6f]">
                <span className="font-semibold text-[#0c172f]">Attached Client WhatsApp Verification</span>
                <span>Click image to zoom</span>
              </div>
              <ImageClickable
                src="/techpulse-assets/fiverr-earnings-proof.svg"
                alt="Fiverr client earnings screenshot showing $1,450 cleared USD orders and custom offer acceptance"
                onOpen={onOpenImage}
                className="rounded-xl shadow-sm"
              />
            </div>
          </div>

          {/* Card 2: Fiverr Algorithmic Ranking & Search Impressions Surge */}
          <div className="overflow-hidden rounded-3xl border border-[#dfe5ed] bg-white p-5 sm:p-7 shadow-card shadow-card-hover flex flex-col justify-between">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 border-b border-[#dfe5ed] pb-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-[#2b62ef] text-[11px] font-black text-white">
                    SEO
                  </span>
                  <span className="text-xs font-extrabold text-[#0c172f]">
                    Fiverr Search Algorithm Analytics
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-extrabold text-[#2b62ef]">
                  <TrendingUp className="h-3 w-3" /> Page 1 #3 Rank
                </span>
              </div>

              {/* Simulated Fiverr Analytics Metrics Box */}
              <div className="mt-4 rounded-2xl border border-gray-200 bg-[#f7fbfd] p-3.5 sm:p-4 text-xs">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-white p-2.5 border border-gray-200">
                    <div className="text-[10px] font-bold text-[#535f6f] uppercase">Total Impressions</div>
                    <div className="mt-1 font-display text-base sm:text-lg font-black text-[#2b62ef]">
                      48,200
                    </div>
                    <div className="text-[10px] font-bold text-emerald-600">+340% Organic</div>
                  </div>

                  <div className="rounded-xl bg-white p-2.5 border border-gray-200">
                    <div className="text-[10px] font-bold text-[#535f6f] uppercase">Total Clicks</div>
                    <div className="mt-1 font-display text-base sm:text-lg font-black text-[#0c172f]">
                      1,280
                    </div>
                    <div className="text-[10px] font-bold text-emerald-600">7.8% High CTR</div>
                  </div>

                  <div className="rounded-xl bg-white p-2.5 border border-gray-200">
                    <div className="text-[10px] font-bold text-[#535f6f] uppercase">Search Placement</div>
                    <div className="mt-1 font-display text-base sm:text-lg font-black text-[#109655]">
                      Page 1 #3
                    </div>
                    <div className="text-[10px] font-bold text-[#2b62ef]">Top 5 Row</div>
                  </div>
                </div>

                {/* Before vs After Callout */}
                <div className="mt-3 rounded-xl bg-white p-2.5 border border-gray-200 space-y-1">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="rounded bg-rose-100 px-1.5 py-0.2 text-[10px] font-bold text-rose-800">BEFORE</span>
                    <span className="text-[#535f6f]">0 impressions, frozen gig for 3 months without any messages</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[10px] font-bold text-emerald-800">AFTER</span>
                    <span className="font-semibold text-[#0c172f]">40+ daily high-intent buyer clicks & steady orders</span>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <h3 className="mt-4 font-display text-base sm:text-lg font-bold text-[#0c172f] leading-snug">
                <span className="text-[#2b62ef] font-extrabold">+340% Impressions Surge</span> and top search placement for low-competition buyer keywords.
              </h3>
              <p className="mt-1 text-xs text-[#535f6f]">
                5 secret search tags and keyword-loaded permalinks kickstart the 2026 Fiverr algorithm to push your gig to active buyers.
              </p>
            </div>

            {/* Clickable High-Res Screenshot Proof */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-2">
              <div className="mb-1.5 flex items-center justify-between px-1 text-[11px] text-[#535f6f]">
                <span className="font-semibold text-[#0c172f]">Attached Search Growth & Viral Analytics</span>
                <span>Click image to zoom</span>
              </div>
              <ImageClickable
                src="/techpulse-assets/fiverr-ranking-proof.svg"
                alt="Fiverr gig performance analytics showing 48,240 organic impressions and Page 1 #3 search ranking"
                onOpen={onOpenImage}
                className="rounded-xl shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
