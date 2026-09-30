import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  Star,
  ShieldCheck,
  TrendingUp,
  X,
  ExternalLink,
  Award,
  Zap,
  DollarSign
} from 'lucide-react';
import { REVIEWS, TECHPULSE_CONFIG } from '../data/techpulseData';
import { ImageClickable } from './ScreenshotLightbox';

interface ReviewsWallProps {
  onEnroll: () => void;
  onOpenImage: (src: string, alt: string) => void;
}

const TAG_FILTERS = [
  { id: 'All', label: 'All Client Reviews (19)' },
  { id: 'Page 1 Rank', label: '🚀 Page 1 Rank' },
  { id: 'First Dollar Order', label: '💵 First Order Closed' },
  { id: 'Level 2 Seller', label: '⭐ Level 2 Sellers' },
  { id: 'Fiverr SEO', label: '🔍 Fiverr SEO & Tags' },
  { id: 'Traffic Surge', label: '📈 Impressions Surge' },
  { id: 'High Ticket', label: '💎 High-Ticket Clients' }
];

export function ReviewsWallSection({ onEnroll, onOpenImage }: ReviewsWallProps) {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const featuredReview = REVIEWS[0];
  const otherReviews = useMemo(() => REVIEWS.slice(1), []);

  const filteredReviews = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return otherReviews.filter((item) => {
      const matchesTag =
        selectedTag === 'All' ||
        item.tag.toLowerCase().includes(selectedTag.toLowerCase()) ||
        item.title.toLowerCase().includes(selectedTag.toLowerCase()) ||
        item.note.toLowerCase().includes(selectedTag.toLowerCase());

      if (!matchesTag) return false;
      if (!q) return true;

      return (
        item.title.toLowerCase().includes(q) ||
        item.note.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q)
      );
    });
  }, [otherReviews, selectedTag, searchQuery]);

  return (
    <section id="reviews" className="bg-[#ecf3f8]/50 px-4 py-16 sm:px-6 sm:py-24 border-t border-[#dfe5ed]">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#1dbf73]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#109655]">
            <MessageSquare className="h-3.5 w-3.5" /> Client Proofs & Reviews
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-[#0c172f] sm:text-4xl md:text-5xl tracking-tight">
            Verified Fiverr Client Reviews & Screenshots
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-[#535f6f] leading-relaxed">
            All screenshot proofs are 100% genuine results from Pakistani Fiverr sellers who booked our Done-For-You Profile & Gig Optimization service (Rs. 8,000 package).
          </p>

          {/* Social Proof Stats Counter Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#0c172f]">
            <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-[#dfe5ed] shadow-xs">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0 Client Satisfaction</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-[#dfe5ed] shadow-xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>954+ Fiverr Gigs & Profiles Optimized</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-[#dfe5ed] shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-[#2b62ef]" />
              <span>100% White-Hat Fiverr TOS Safe</span>
            </div>
          </div>
        </div>

        {/* Featured Big Review Spotlight (Hamza Saeed - Level 2 Seller) */}
        {featuredReview && (
          <article className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border-2 border-[#1dbf73]/40 bg-white shadow-glow transition hover:shadow-xl">
            <div className="bg-gradient-to-r from-emerald-500/10 via-white to-blue-500/10 px-5 py-3 border-b border-[#dfe5ed] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800">
                  Featured Client Case — Level 2 Seller Milestone
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="font-display text-lg sm:text-2xl font-extrabold text-[#0c172f]">
                    {featuredReview.title}
                  </h3>
                  <span className="rounded-full bg-[#1dbf73] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                    Verified Result
                  </span>
                </div>
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                  {featuredReview.tag}
                </span>
              </div>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#475569]">
                {featuredReview.note}
              </p>

              {/* Verified Screenshot Showcase Box */}
              <div className="mt-5 overflow-hidden rounded-2xl border-2 border-[#1dbf73]/30 bg-[#f7fbfd] p-2.5 shadow-sm">
                <div className="mb-2 flex items-center justify-between px-2 text-xs text-[#535f6f]">
                  <span className="flex items-center gap-1.5 font-bold text-[#0c172f]">
                    <span className="grid h-4 w-4 place-items-center rounded bg-[#1dbf73] text-[9px] font-black text-white">
                      fi
                    </span>
                    Fiverr Dashboard & WhatsApp Verification Screenshot
                  </span>
                  <span className="text-[11px] font-medium text-[#2b62ef] flex items-center gap-1">
                    🔍 Click image to enlarge proof
                  </span>
                </div>

                <ImageClickable
                  src={featuredReview.img}
                  alt={`Fiverr Seller Review: ${featuredReview.title}`}
                  onOpen={onOpenImage}
                  className="rounded-xl border border-gray-200"
                />

                <div className="mt-2 flex items-center justify-between px-2 text-[11px] text-[#535f6f]">
                  <span className="font-semibold text-emerald-800">
                    Result: 42,800 Organic Impressions + $350 & $600 Custom Orders
                  </span>
                  <span>Optimized by Smart SEO Solutions</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#535f6f]">
                <span className="flex items-center gap-1.5 font-semibold text-[#0c172f]">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Verified Fiverr Optimization Client
                </span>
                <span className="font-semibold text-emerald-700">
                  Total Order Cleared: $1,150+ USD
                </span>
              </div>
            </div>
          </article>
        )}

        {/* Filter Tags & Live Search Bar */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center">
            {TAG_FILTERS.map((tag) => {
              const isActive = selectedTag === tag.id;
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => setSelectedTag(tag.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2b62ef] text-white shadow-sm'
                      : 'bg-white text-[#535f6f] border border-[#dfe5ed] hover:border-[#2b62ef]/40 hover:bg-[#f7fbfd]'
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#dfe5ed] shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#535f6f]" />
              <input
                type="text"
                placeholder="Search client reviews, keywords, niches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[#dfe5ed] bg-[#f7fbfd] py-1.5 pl-9 pr-8 text-xs text-[#0c172f] outline-none focus:border-[#2b62ef] focus:bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs text-[#535f6f] w-full sm:w-auto text-right font-medium">
              Showing <strong className="text-[#0c172f]">{filteredReviews.length}</strong> of {otherReviews.length} client proofs
            </div>
          </div>
        </div>

        {/* All Reviews Masonry Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {filteredReviews.length === 0 ? (
            <div className="col-span-2 text-center py-12 px-4 rounded-2xl border border-dashed border-[#dfe5ed] bg-white">
              <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="font-bold text-sm text-[#0c172f]">No seller reviews found for "{searchQuery}"</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('All');
                }}
                className="mt-3 text-xs font-bold text-[#2b62ef] underline"
              >
                Reset search & filters
              </button>
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <article
                key={rev.id}
                className="overflow-hidden rounded-2xl border border-[#dfe5ed] bg-white p-4 sm:p-5 shadow-card shadow-card-hover flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-[#dfe5ed]/60 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Verified Client
                      </span>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#ecf3f8] px-2.5 py-0.5 text-[11px] font-bold text-[#2b62ef]">
                      {rev.tag}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-sm sm:text-base font-extrabold text-[#0c172f] line-clamp-1">
                    {rev.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#475569] line-clamp-3">
                    {rev.note}
                  </p>
                </div>

                {/* Screenshot Container with Verified Fiverr Label */}
                <div className="mt-4 overflow-hidden rounded-xl border border-[#dfe5ed] bg-[#f7fbfd] p-1.5">
                  <div className="mb-1.5 flex items-center justify-between px-1.5 text-[10px] text-[#535f6f]">
                    <span className="font-semibold text-[#0c172f] flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1dbf73]" />
                      Verified Fiverr Screenshot Proof
                    </span>
                    <span className="text-[10px] text-[#2b62ef] font-medium">Click to zoom 🔍</span>
                  </div>

                  <ImageClickable
                    src={rev.img}
                    alt={`Fiverr Seller Review Proof: ${rev.title}`}
                    onOpen={onOpenImage}
                    className="rounded-lg shadow-xs hover:scale-[1.01] transition-transform border border-gray-200"
                  />
                </div>
              </article>
            ))
          )}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-14 rounded-3xl border border-[#2b62ef]/30 bg-gradient-to-r from-[#2b62ef]/10 via-white to-blue-50/50 p-6 sm:p-10 text-center shadow-card">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2b62ef]/10 px-3 py-1 text-xs font-bold text-[#2b62ef] mb-3">
            <TrendingUp className="h-3.5 w-3.5" /> Ready for similar results?
          </div>
          <h3 className="font-display text-xl sm:text-3xl font-extrabold text-[#0c172f]">
            Get Your 1st Paying Client With Full Fiverr Optimization
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-[#535f6f] leading-relaxed px-2 sm:px-0">
            Stop waiting months with zero clicks. Let our professional Fiverr agency audit, re-write, and optimize your profile and gigs to win your 1st high-paying international client.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onEnroll}
              className="gradient-brand inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 sm:px-8 sm:py-3.5 text-sm sm:text-base font-extrabold text-white shadow-glow hover:scale-[1.02] active:scale-95 transition-all w-full sm:w-auto cursor-pointer"
            >
              <span>Book Optimization — Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-[#535f6f]">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" /> 20–25 Days 100% Money-Back Guarantee
            </span>
            <span>•</span>
            <span>100% White-Hat & TOS Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
