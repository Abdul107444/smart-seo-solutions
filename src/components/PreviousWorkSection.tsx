import React, { useState } from 'react';
import { PREVIOUS_CLIENT_WORK, BUSINESS_INFO } from '../data/funnelData';
import { PortfolioItem } from '../types';
import { ClientCaseStudyModal } from './ClientCaseStudyModal';
import { FiverrProfileScreenshotCard } from './FiverrProfileScreenshotCard';
import { 
  Star, 
  Sparkles, 
  ExternalLink, 
  Eye, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Award,
  Globe,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface PreviousWorkSectionProps {
  onNavigateToThankYou: () => void;
}

export const PreviousWorkSection: React.FC<PreviousWorkSectionProps> = ({ onNavigateToThankYou }) => {
  const [selectedClient, setSelectedClient] = useState<PortfolioItem | null>(null);
  const [activeTabClientId, setActiveTabClientId] = useState<string>(PREVIOUS_CLIENT_WORK[0].id);
  const [filter, setFilter] = useState<'screenshots' | 'grid' | 'before_after'>('screenshots');

  const activeClient = PREVIOUS_CLIENT_WORK.find(c => c.id === activeTabClientId) || PREVIOUS_CLIENT_WORK[0];

  const beforeAfterExamples = [
    {
      id: 'ba-1',
      title: 'Profile Bio & Authority Transformation',
      category: 'Profile Makeover',
      before: '“Hi I am a web developer. I make WordPress sites and PHP scripts. Contact me.”',
      after: '“Full-Stack WordPress & Laravel Engineer with 2+ years delivering 5-star custom web applications, WooCommerce pipelines & enterprise API integrations.”',
      impact: 'Immediate clarity on deliverables, rate positioning increased by 40%.',
    },
    {
      id: 'ba-2',
      title: 'Gig Title & Search Tag Alignment',
      category: 'Gig SEO & Tags',
      before: '“I will make your video look good and do editing fast” (Tags: #video #edit #cool)',
      after: '“I will edit cinematic YouTube videos, engaging TikTok reels, and podcast shorts” (Tags: #YouTubeEditor #CinematicVideo #ShortsEditing #ReelsEditor #PremierePro)',
      impact: 'Aligned with top 5 high-buyer search queries and niche ranking factors.',
    },
    {
      id: 'ba-3',
      title: 'Pricing Packages & Deliverables Structuring',
      category: 'Pricing Strategy',
      before: 'Single flat tier with vague delivery timeframe and infinite free revisions.',
      after: 'Psychological 3-Tier Ladder: Starter Fix (Rs. 3,500), Core Growth (Rs. 10,000), Enterprise Scale (Rs. 25,000) with clear revision rules.',
      impact: 'Higher average order value and frictionless buyer tier selection.',
    },
  ];

  return (
    <section id="work-section" className="py-16 md:py-24 relative bg-black/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3.5 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs uppercase tracking-widest text-orange-400 font-bold mb-4 backdrop-blur-md">
            <span>Verified Client Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Previous Clients' <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Fiverr Profile Dashboards</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-normal leading-relaxed">
            Direct screenshots and live performance profiles from freelancers whose Fiverr presence we structured, ranked, and optimized.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex justify-start sm:justify-center mb-8 overflow-x-auto pb-2 scrollbar-none max-w-full">
          <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold whitespace-nowrap">
            <button
              onClick={() => setFilter('screenshots')}
              className={`px-3 sm:px-4 py-2 rounded-lg transition-all cursor-pointer ${
                filter === 'screenshots'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Interactive Showcase (5)
            </button>
            <button
              onClick={() => setFilter('grid')}
              className={`px-3 sm:px-4 py-2 rounded-lg transition-all cursor-pointer ${
                filter === 'grid'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              All Clients Grid
            </button>
            <button
              onClick={() => setFilter('before_after')}
              className={`px-3 sm:px-4 py-2 rounded-lg transition-all cursor-pointer ${
                filter === 'before_after'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Before & After
            </button>
          </div>
        </div>

        {/* 1. Interactive Spotlight Mode */}
        {filter === 'screenshots' && (
          <div className="mb-12">
            {/* Client Tabs Bar */}
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
              {PREVIOUS_CLIENT_WORK.map((client) => {
                const isActive = client.id === activeClient.id;
                return (
                  <button
                    key={client.id}
                    onClick={() => setActiveTabClientId(client.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-black shadow-lg scale-105 border border-white'
                        : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isActive ? 'bg-orange-500 text-white' : 'bg-white/20 text-white'
                    }`}>
                      {client.clientName[0]}
                    </div>
                    <span>{client.clientName}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-black/10 text-black' : 'bg-white/10 text-orange-400'
                    }`}>
                      {client.badgeLevel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Spotlight Card */}
            <div className="max-w-4xl mx-auto">
              <FiverrProfileScreenshotCard
                client={activeClient}
                onViewCaseStudy={(c) => setSelectedClient(c)}
              />
            </div>
          </div>
        )}

        {/* 2. Grid Mode */}
        {filter === 'grid' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {PREVIOUS_CLIENT_WORK.map((client) => (
              <FiverrProfileScreenshotCard
                key={client.id}
                client={client}
                onViewCaseStudy={(c) => setSelectedClient(c)}
              />
            ))}
          </div>
        )}

        {/* 3. Before & After Transformation Cards */}
        {filter === 'before_after' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {beforeAfterExamples.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-xs font-bold text-orange-400 mb-3">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-white mb-4">{item.title}</h3>

                  <div className="space-y-3 mb-4">
                    <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/20 text-xs">
                      <span className="font-bold text-red-400 block mb-1">❌ BEFORE (Generic/Low-Intent):</span>
                      <p className="text-white/60 italic">{item.before}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-green-950/40 border border-green-500/30 text-xs">
                      <span className="font-bold text-green-400 block mb-1">✅ AFTER (Smart SEO Solutions):</span>
                      <p className="text-green-100 font-medium">{item.after}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <p className="text-xs text-white/60">
                    <strong className="text-orange-400">Result:</strong> {item.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal View for Client Case Study & Seller Dashboard */}
        <ClientCaseStudyModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onNavigateToThankYou={onNavigateToThankYou}
        />

        {/* CTA Strip */}
        <div className="text-center">
          <button
            onClick={onNavigateToThankYou}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-sm sm:text-base font-extrabold uppercase tracking-wide shadow-lg hover:shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Transform My Fiverr Profile — {BUSINESS_INFO.price}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
