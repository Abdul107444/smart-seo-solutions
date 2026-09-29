import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Search,
  X,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  ArrowRight,
  ChevronsUpDown,
  Zap,
  Tag
} from 'lucide-react';
import { FAQS, FaqItem, TECHPULSE_CONFIG } from '../data/techpulseData';

type CategoryFilter = 'all' | 'ranking' | 'editing' | 'safety' | 'new_seller' | 'conversion' | 'payment';

interface CategoryOption {
  id: CategoryFilter;
  label: string;
  icon: React.ReactNode;
}

const CATEGORIES: CategoryOption[] = [
  { id: 'all', label: 'All Concerns', icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: 'ranking', label: '0 Impressions & Ranking', icon: <TrendingUp className="h-3.5 w-3.5" /> },
  { id: 'editing', label: 'Editing & De-Rank Fears', icon: <AlertTriangle className="h-3.5 w-3.5 text-amber-500" /> },
  { id: 'safety', label: 'TOS Safety & AnyDesk', icon: <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> },
  { id: 'new_seller', label: 'New Sellers (0 Reviews)', icon: <Zap className="h-3.5 w-3.5 text-blue-500" /> },
  { id: 'conversion', label: 'Clicks & Conversions', icon: <Tag className="h-3.5 w-3.5 text-purple-500" /> },
  { id: 'payment', label: 'Payments & Guarantee', icon: <HelpCircle className="h-3.5 w-3.5 text-teal-500" /> }
];

export function FaqSection() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['faq-01', 'faq-02']));
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, boolean>>({});

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

  const expandAll = () => {
    const allFilteredIds = filteredFaqs.map((f) => f.id);
    setOpenIds(new Set(allFilteredIds));
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  const handleHelpful = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHelpfulFeedback((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filtered FAQs based on category and search query
  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const qLower = searchQuery.trim().toLowerCase();
      if (!qLower) return matchesCategory;

      const matchesSearch =
        faq.q.toLowerCase().includes(qLower) ||
        faq.a.toLowerCase().includes(qLower) ||
        faq.tags.some((t) => t.toLowerCase().includes(qLower)) ||
        faq.categoryLabel.toLowerCase().includes(qLower);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="faq" className="px-4 py-16 sm:px-6 sm:py-24 bg-white border-t border-[#dfe5ed]">
      <div className="mx-auto max-w-4xl">
        {/* Eyebrow & Main Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2b62ef]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#2b62ef]">
            <HelpCircle className="h-3.5 w-3.5" /> Fiverr Seller Knowledge Base
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-[#0c172f] sm:text-4xl md:text-5xl tracking-tight">
            Common Fiverr Seller Concerns —{' '}
            <span className="text-gradient">Answered Honestly</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-[#535f6f] leading-relaxed">
            From the 24–48h de-ranking fear to 0-impression dead gigs, white-hat TOS safety, and AnyDesk screen-sharing: get transparent answers before optimizing your gigs.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2b62ef] text-white shadow-sm'
                    : 'bg-[#f7fbfd] text-[#535f6f] border border-[#dfe5ed] hover:bg-[#ecf3f8] hover:text-[#0c172f]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & Expand/Collapse Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#f7fbfd] p-3 rounded-2xl border border-[#dfe5ed]">
          {/* Live Search */}
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#535f6f]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search seller concerns (e.g. derank, impressions, warning, AnyDesk)..."
              className="w-full rounded-xl border border-[#dfe5ed] bg-white py-2 pl-9 pr-8 text-xs sm:text-sm text-[#0c172f] placeholder-[#535f6f]/70 focus:border-[#2b62ef] focus:outline-none focus:ring-1 focus:ring-[#2b62ef]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#535f6f] hover:text-[#0c172f]"
                title="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Controls: Count & Expand / Collapse Buttons */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3 text-xs text-[#535f6f]">
            <span className="font-medium">
              Showing <strong className="text-[#0c172f]">{filteredFaqs.length}</strong> of {FAQS.length} questions
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={expandAll}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-semibold text-[#2b62ef] hover:bg-[#2b62ef]/10 transition-colors cursor-pointer"
              >
                <ChevronsUpDown className="h-3 w-3" />
                <span>Expand All</span>
              </button>
              <span className="text-[#dfe5ed]">|</span>
              <button
                type="button"
                onClick={collapseAll}
                className="rounded-lg px-2.5 py-1 font-semibold text-[#535f6f] hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Accordion List */}
        <div className="mt-6 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-[#dfe5ed] bg-[#f7fbfd]">
              <HelpCircle className="h-10 w-10 text-[#535f6f]/50 mx-auto mb-2" />
              <h3 className="font-display font-bold text-base text-[#0c172f]">
                No questions found matching "{searchQuery}"
              </h3>
              <p className="mt-1 text-xs text-[#535f6f]">
                Try searching for keywords like "impressions", "derank", "safety", "new seller", or clear the filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#2b62ef] px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#204ecf]"
              >
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            filteredFaqs.map((item) => {
              const isOpen = openIds.has(item.id);
              const isMarkedHelpful = helpfulFeedback[item.id];

              return (
                <div
                  key={item.id}
                  className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? 'border-[#2b62ef]/50 bg-white shadow-md shadow-blue-500/5 ring-1 ring-[#2b62ef]/20'
                      : 'border-[#dfe5ed] bg-[#f7fbfd] hover:border-[#2b62ef]/30 hover:bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left cursor-pointer focus:outline-none"
                  >
                    <div className="flex-1 pr-2">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center rounded-md bg-[#2b62ef]/10 px-2 py-0.5 text-[10px] font-bold text-[#2b62ef] uppercase tracking-wide">
                          {item.categoryLabel}
                        </span>
                        {item.popular && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                            <Sparkles className="h-2.5 w-2.5" /> Top Seller Concern
                          </span>
                        )}
                      </div>

                      {/* Question Text */}
                      <span className={`font-display text-base sm:text-lg font-bold transition-colors ${
                        isOpen ? 'text-[#2b62ef]' : 'text-[#0c172f]'
                      }`}>
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
                    <div
                      id={`faq-answer-${item.id}`}
                      className="border-t border-[#dfe5ed] bg-white px-5 py-4 sm:px-6 sm:py-5 animate-in fade-in duration-200"
                    >
                      <p className="text-sm sm:text-base leading-relaxed text-[#334155]">
                        {item.a}
                      </p>

                      {/* Footer within open answer: Related tags & Helpful reaction */}
                      <div className="mt-4 pt-3 border-t border-[#dfe5ed]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex flex-wrap items-center gap-1.5 text-[#535f6f]">
                          <span className="text-[11px] font-medium text-gray-400">Related topics:</span>
                          {item.tags.slice(0, 4).map((tag, tIdx) => (
                            <button
                              key={tIdx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSearchQuery(tag);
                              }}
                              className="rounded-md bg-[#f7fbfd] border border-[#dfe5ed] px-2 py-0.5 text-[10px] font-medium text-[#535f6f] hover:bg-[#2b62ef]/10 hover:text-[#2b62ef] transition-colors"
                            >
                              #{tag}
                            </button>
                          ))}
                        </div>

                        {/* Helpful Button */}
                        <button
                          type="button"
                          onClick={(e) => handleHelpful(item.id, e)}
                          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                            isMarkedHelpful
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'text-[#535f6f] hover:bg-gray-100'
                          }`}
                        >
                          <ThumbsUp className={`h-3 w-3 ${isMarkedHelpful ? 'fill-current' : ''}`} />
                          <span>{isMarkedHelpful ? 'Helpful!' : 'Was this helpful?'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Interactive "Still Have A Concern?" WhatsApp Direct Consultation Box */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-[#2b62ef]/30 bg-gradient-to-br from-[#f7fbfd] via-white to-[#ecf3f8] p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Seller Support Available
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#0c172f]">
              Have a specific question about your Fiverr gig?
            </h3>
            <p className="text-xs sm:text-sm text-[#535f6f] max-w-lg leading-relaxed">
              Don't leave your profile to guesswork. Talk directly to our Fiverr SEO Specialist on WhatsApp for a quick 5-minute review before making your decision.
            </p>
          </div>

          <a
            href={`https://wa.me/${TECHPULSE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              'Hi Smart SEO Solutions! I have a question about optimizing my Fiverr gig. Can you please guide me?'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-extrabold text-white shadow-md hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all w-full sm:w-auto shrink-0"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Ask on WhatsApp</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
