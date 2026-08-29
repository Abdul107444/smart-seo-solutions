import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/funnelData';
import { 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  TrendingUp, 
  Search, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Eye, 
  MousePointerClick,
  SlidersHorizontal,
  Image as ImageIcon,
  Layers,
  Upload
} from 'lucide-react';

interface HeroSectionProps {
  onNavigateToThankYou: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToThankYou }) => {
  const [activeMockupTab, setActiveMockupTab] = useState<'profile' | 'seo' | 'analytics'>('profile');
  const [customImage, setCustomImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
    }
  };

  return (
    <section id="hero-section" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[600px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs uppercase tracking-widest text-orange-400 font-bold backdrop-blur-md shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Professional Agency Service</span>
            <span className="text-white/30">•</span>
            <span className="text-white/90">Fiverr Optimization</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Get More Visibility & Orders on Fiverr
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 font-black">
              Through Professional Optimization
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-base sm:text-lg md:text-xl text-white/70 font-normal leading-relaxed">
            We optimize your Fiverr profile and gigs to improve search visibility, attract the right buyers, increase clicks, and turn your presence into a sales machine.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-10">
          {/* Primary CTA */}
          <button
            id="hero-primary-cta"
            onClick={onNavigateToThankYou}
            className="w-full sm:w-auto px-8 py-4 rounded-xl btn-gold-gradient text-sm sm:text-base font-extrabold uppercase tracking-wide flex items-center justify-center gap-3 shadow-xl glow-gold cursor-pointer"
          >
            <span>🚀 Get My Fiverr Optimized — Rs. 10,000</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary CTA */}
          <a
            id="hero-secondary-whatsapp-cta"
            href={BUSINESS_INFO.whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white hover:text-white text-sm font-bold flex items-center justify-center gap-2.5 backdrop-blur-md transition-all shadow-md"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>💬 Talk on WhatsApp</span>
          </a>
        </div>

        {/* Key value micro-bullets */}
        <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-6 text-xs sm:text-sm text-white/80 font-medium mb-10">
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span>Profile SEO Optimization</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span>Keyword Research</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span>High-Converting Titles</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span>Thumbnail Strategy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span>Competitor Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓</span>
            <span>Buyer-Focused Positioning</span>
          </div>
        </div>

        {/* Top-Rated Trust Card */}
        <div className="max-w-2xl mx-auto mb-12 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left backdrop-blur-md">
          <div className="flex -space-x-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full border-2 border-[#1a0b2e] bg-purple-500 flex items-center justify-center text-xs font-bold text-white shadow">
              HS
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#1a0b2e] bg-orange-500 flex items-center justify-center text-xs font-bold text-black shadow">
              AS
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#1a0b2e] bg-sky-500 flex items-center justify-center text-xs font-bold text-white shadow">
              SU
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#1a0b2e] bg-amber-400 flex items-center justify-center text-xs font-bold text-black shadow">
              +15
            </div>
          </div>
          <div className="text-sm">
            <div className="font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
              <span>Trusted By Top-Rated Fiverr Sellers</span>
              <span className="text-amber-400 text-xs">★★★★★</span>
            </div>
            <div className="text-white/50 text-xs italic mt-0.5">
              "Structured our profile and gig titles to rank for buyer-intent keywords."
            </div>
          </div>
        </div>

        {/* TOP HERO VISUAL / DASHBOARD MOCKUP AREA */}
        <div className="relative max-w-5xl mx-auto">
          {/* Subtle Outer Growth Frame & Badges */}
          <div className="absolute -top-4 -left-4 hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-900/90 border border-purple-500/40 shadow-xl backdrop-blur-md z-20 animate-bounce duration-1000">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white">Fiverr Growth Blueprint</span>
          </div>

          <div className="absolute -bottom-4 -right-4 hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/90 border border-emerald-500/40 shadow-xl backdrop-blur-md z-20">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-200">Algorithm Aligned SEO</span>
          </div>

          {/* Main Mockup Card Container */}
          <div className="glass-card rounded-3xl p-3 sm:p-5 md:p-6 shadow-2xl border border-purple-400/25 relative overflow-hidden">
            {/* Mockup Header Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-purple-500/20">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-semibold text-purple-300/80 ml-2 hidden sm:inline">
                  Smart SEO Solutions • Freelancer Growth Suite
                </span>
              </div>

              {/* Mockup View Switcher Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-purple-950/80 border border-purple-500/30 text-[11px] sm:text-xs overflow-x-auto max-w-full scrollbar-none">
                <button
                  onClick={() => setActiveMockupTab('profile')}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeMockupTab === 'profile'
                      ? 'bg-amber-500 text-purple-950 font-bold shadow'
                      : 'text-purple-300 hover:text-white'
                  }`}
                >
                  Profile Optimization
                </button>
                <button
                  onClick={() => setActiveMockupTab('seo')}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeMockupTab === 'seo'
                      ? 'bg-amber-500 text-purple-950 font-bold shadow'
                      : 'text-purple-300 hover:text-white'
                  }`}
                >
                  Gig SEO & Tags
                </button>
                <button
                  onClick={() => setActiveMockupTab('analytics')}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeMockupTab === 'analytics'
                      ? 'bg-amber-500 text-purple-950 font-bold shadow'
                      : 'text-purple-300 hover:text-white'
                  }`}
                >
                  Analytics & Growth
                </button>
              </div>

              {/* Owner Screenshot Upload Action */}
              <label className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-900/50 hover:bg-purple-800/70 border border-purple-400/30 text-[11px] font-medium text-purple-200 cursor-pointer transition-colors" title="Owner can upload custom screenshot">
                <Upload className="w-3 h-3 text-amber-400" />
                <span>{customImage ? 'Change Image' : 'Add Custom Mockup'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* If custom image is uploaded by owner */}
            {customImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-purple-950/60 max-h-[480px]">
                <img
                  src={customImage}
                  alt="Custom Fiverr Work Mockup"
                  className="w-full h-auto object-contain max-h-[480px] mx-auto"
                />
                <button
                  onClick={() => setCustomImage(null)}
                  className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-black/70 text-xs text-white hover:bg-black/90 font-medium cursor-pointer"
                >
                  Reset to Default View
                </button>
              </div>
            ) : (
              /* High Fidelity Default Freelancer Mockup Views */
              <div className="bg-[#120524]/90 rounded-2xl p-3 sm:p-5 md:p-6 border border-purple-500/20 overflow-hidden">
                {activeMockupTab === 'profile' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    {/* Top profile banner preview - 100% Mobile Responsive */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-3.5 sm:p-4 rounded-xl bg-purple-950/60 border border-purple-500/30">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full min-w-0">
                        {/* Avatar and mobile header */}
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <div className="relative flex-shrink-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-purple-700 to-amber-400 p-0.5 shadow-md">
                              <div className="w-full h-full rounded-full bg-[#1b0833] flex items-center justify-center text-amber-300 font-bold text-lg sm:text-xl md:text-2xl">
                                HS
                              </div>
                            </div>
                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#120524] rounded-full" />
                          </div>

                          <div className="min-w-0 flex-1 sm:hidden">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <h3 className="text-base font-bold text-white truncate">Hamza Saeed</h3>
                              <span className="text-[11px] text-purple-400 font-mono">@saqibshahid08</span>
                            </div>
                            <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold">
                              Level 2 Seller
                            </span>
                          </div>
                        </div>

                        {/* Bio & Details text */}
                        <div className="min-w-0 flex-1 w-full">
                          <div className="hidden sm:flex flex-wrap items-center gap-2">
                            <h3 className="text-lg sm:text-xl font-bold text-white">Hamza Saeed</h3>
                            <span className="text-xs text-purple-400 font-mono">@saqibshahid08</span>
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold">
                              Level 2 Seller
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-purple-200 mt-1 font-medium leading-snug break-words">
                            WordPress & Laravel Expert in PHP React and WooCommerce
                          </p>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-xs text-purple-300">
                            <span className="flex items-center gap-1 text-amber-400 font-semibold whitespace-nowrap">
                              <Star className="w-3.5 h-3.5 fill-amber-400" /> 5.0 (35 Reviews)
                            </span>
                            <span className="text-purple-500 hidden sm:inline">•</span>
                            <span className="whitespace-nowrap font-medium text-white/90">PKR 7,292.23 / hour</span>
                            <span className="text-purple-500 hidden sm:inline">•</span>
                            <span className="text-emerald-400 font-medium whitespace-nowrap">Online • 1 hr response</span>
                          </div>
                        </div>
                      </div>

                      {/* Badges / Positioning Pills */}
                      <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-purple-500/20 flex-shrink-0">
                        <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-purple-900/40 border border-purple-500/30 text-[11px] sm:text-xs text-purple-200">
                          <span className="text-amber-400 font-bold">Positioning:</span> Full-Stack Authority
                        </div>
                        <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-[11px] sm:text-xs text-emerald-300 font-bold">
                          ✓ Bio Optimized
                        </div>
                      </div>
                    </div>

                    {/* Optimization Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1.5">
                          <Search className="w-3.5 h-3.5" /> High-Intent Tags
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {['PHP Laravel', 'WordPress Expert', 'WooCommerce', 'React Dev', 'Figma to WP'].map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded-md bg-purple-900/70 text-[10px] text-purple-200 font-medium border border-purple-500/30">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1.5">
                          <SlidersHorizontal className="w-3.5 h-3.5" /> Package Structuring
                        </span>
                        <p className="text-xs text-purple-200 leading-snug">
                          Structured 3-Tier offers: Basic Fix, Standard Custom Feature, Premium Full Web Application.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> Objection-Free FAQs
                        </span>
                        <p className="text-xs text-purple-200 leading-snug">
                          8 keyword-rich FAQs answering hosting, revision scope, speed optimization, and responsive testing.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeMockupTab === 'seo' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="p-4 rounded-xl bg-purple-950/60 border border-purple-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                          Gig Title Optimization Engine
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          98/100 SEO Score
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-white bg-black/40 p-3 rounded-lg border border-purple-500/30 font-mono break-words leading-relaxed">
                        "I will develop custom WordPress website and Laravel web application with WooCommerce setup"
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-purple-300">
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Primary keyword at start of title
                        </span>
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Permanent URL slug targeted
                        </span>
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Search tags aligned (5/5)
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
                        <span className="text-xs font-bold text-purple-200 block mb-2">Keyword Density Analysis</span>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between text-purple-300">
                            <span>"WordPress development"</span>
                            <span className="text-amber-400 font-semibold">3.2% (Optimal)</span>
                          </div>
                          <div className="flex justify-between text-purple-300">
                            <span>"Laravel expert"</span>
                            <span className="text-amber-400 font-semibold">2.8% (Optimal)</span>
                          </div>
                          <div className="flex justify-between text-purple-300">
                            <span>"WooCommerce store"</span>
                            <span className="text-amber-400 font-semibold">2.4% (Optimal)</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20">
                        <span className="text-xs font-bold text-purple-200 block mb-2">Thumbnail CTR Blueprint</span>
                        <div className="space-y-1 text-xs text-purple-300">
                          <p>• High-contrast typography hierarchy (Max 4 words)</p>
                          <p>• Visual trust badge: Verified Level 2 badge layout</p>
                          <p>• Clean UI screenshot with high brightness ratio</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeMockupTab === 'analytics' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-center">
                        <span className="text-[11px] text-purple-300 block">Search Impressions</span>
                        <span className="text-xl sm:text-2xl font-black text-amber-400 mt-1 block">+185%</span>
                        <span className="text-[10px] text-emerald-400 font-medium">Post-Optimization</span>
                      </div>
                      <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-center">
                        <span className="text-[11px] text-purple-300 block">Gig Clicks (CTR)</span>
                        <span className="text-xl sm:text-2xl font-black text-white mt-1 block">Higher CTR</span>
                        <span className="text-[10px] text-emerald-400 font-medium">Thumbnail Tested</span>
                      </div>
                      <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-center">
                        <span className="text-[11px] text-purple-300 block">Buyer Inquiries</span>
                        <span className="text-xl sm:text-2xl font-black text-emerald-400 mt-1 block">Targeted</span>
                        <span className="text-[10px] text-purple-300 font-medium">Right Niche Leads</span>
                      </div>
                      <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-center">
                        <span className="text-[11px] text-purple-300 block">Conversion Ready</span>
                        <span className="text-xl sm:text-2xl font-black text-sky-400 mt-1 block">100%</span>
                        <span className="text-[10px] text-purple-300 font-medium">Complete Audit</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-center">
                      <p className="text-xs text-purple-300 italic">
                        "Transforming raw Fiverr profiles into authority digital storefronts with structured SEO, positioning, and buyer psychology."
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
