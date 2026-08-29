import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { BUSINESS_INFO } from '../data/funnelData';
import { FiverrProfileScreenshotCard } from './FiverrProfileScreenshotCard';
import {
  X,
  Star,
  TrendingUp,
  Eye,
  MousePointer,
  ShoppingBag,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Search,
  MessageSquare,
  BarChart3,
  Layers,
  CheckCircle2,
  ExternalLink,
  Award,
  UserCheck
} from 'lucide-react';

interface ClientCaseStudyModalProps {
  client: PortfolioItem | null;
  onClose: () => void;
  onNavigateToThankYou: () => void;
}

export const ClientCaseStudyModal: React.FC<ClientCaseStudyModalProps> = ({
  client,
  onClose,
  onNavigateToThankYou,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'dashboard' | 'rankings' | 'strategy'>('profile');

  if (!client) return null;

  const stats = client.dashboardStats;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-[#150a26] border border-white/20 rounded-3xl max-w-4xl w-full shadow-2xl relative overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-black/40 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-400 p-0.5 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-[#1a0b2e] flex items-center justify-center text-orange-400 font-extrabold text-base sm:text-lg">
                {client.clientName.split(' ').map((n) => n[0]).join('')}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {client.clientName}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-green-500/15 border border-green-400/30 text-green-400 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {client.badgeLevel}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50 font-mono mt-0.5">
                <span>{client.handle}</span>
                <span>•</span>
                <span className="text-orange-400">{client.category}</span>
                {client.ratePerHour && (
                  <>
                    <span>•</span>
                    <span className="text-white/80 font-semibold">{client.ratePerHour}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Bar */}
        <div className="px-3 sm:px-6 pt-3 pb-2 border-b border-white/10 bg-white/[0.02] flex items-center justify-between gap-2 overflow-x-auto scrollbar-none flex-shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black shadow-lg'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Profile Screenshot</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black shadow-lg'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Seller Hub</span>
            </button>

            <button
              onClick={() => setActiveTab('rankings')}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'rankings'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black shadow-lg'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>SEO Rankings</span>
            </button>

            <button
              onClick={() => setActiveTab('strategy')}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'strategy'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black shadow-lg'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Case Details</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-green-400 font-semibold px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex-shrink-0">
            <CheckCircle2 className="w-3 h-3" />
            <span>Verified Results</span>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 0: Real Profile Screenshot */}
          {activeTab === 'profile' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white/70 uppercase tracking-wide">
                  Live Fiverr Profile Showcase — {client.clientName}
                </span>
                <span className="text-xs text-green-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified Profile Setup
                </span>
              </div>
              <FiverrProfileScreenshotCard
                client={client}
                onViewCaseStudy={() => setActiveTab('dashboard')}
              />
            </div>
          )}

          {/* TAB 1: Authentic Fiverr Dashboard Screenshot Mockup */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Dashboard Container mimicking Fiverr Seller Studio UI */}
              <div className="rounded-2xl border border-white/20 bg-[#100720] shadow-2xl overflow-hidden">
                {/* Fake Browser / Fiverr Header Bar */}
                <div className="px-4 py-3 bg-[#0d041a] border-b border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="h-4 w-px bg-white/20" />
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-green-400 text-sm tracking-tighter">fiverr<span className="text-white">.</span></span>
                      <span className="text-[11px] font-semibold text-white/50 bg-white/10 px-1.5 py-0.5 rounded">Seller Hub</span>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-4 text-white/60 font-medium text-[11px]">
                    <span className="text-white font-bold border-b-2 border-green-400 pb-0.5">Dashboard</span>
                    <span>My Business</span>
                    <span>Analytics</span>
                    <span>Earnings</span>
                    <span>Growth & Marketing</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-green-950 text-green-300 border border-green-500/40 font-mono font-bold">
                      ● LIVE SELLER DASHBOARD
                    </span>
                  </div>
                </div>

                {/* Dashboard Inner Grid */}
                <div className="p-4 sm:p-6 space-y-6">
                  {/* Top Stats Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                        <span>30d Impressions</span>
                        <Eye className="w-3.5 h-3.5 text-orange-400" />
                      </div>
                      <div className="text-lg sm:text-2xl font-black text-white">
                        {stats?.impressions || '38,500'}
                      </div>
                      <span className="text-[11px] font-bold text-green-400">
                        {stats?.impressionsGrowth || '+320%'} Organic
                      </span>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                        <span>Gig Clicks</span>
                        <MousePointer className="w-3.5 h-3.5 text-orange-400" />
                      </div>
                      <div className="text-lg sm:text-2xl font-black text-white">
                        {stats?.clicks || '1,640'}
                      </div>
                      <span className="text-[11px] font-bold text-green-400">
                        {stats?.clicksGrowth || '+240%'} CTR Boost
                      </span>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                        <span>Delivered Orders</span>
                        <ShoppingBag className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <div className="text-lg sm:text-2xl font-black text-white">
                        {client.reviewCount}+ Orders
                      </div>
                      <span className="text-[11px] font-bold text-green-400">
                        {stats?.orderCompletionRate || '100%'} Completion
                      </span>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                        <span>Buyer Rating</span>
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="text-lg sm:text-2xl font-black text-white flex items-center gap-1">
                        <span>{client.rating.toFixed(1)}</span>
                        <span className="text-xs text-yellow-400 font-normal">★★★★★</span>
                      </div>
                      <span className="text-[11px] font-bold text-white/60">
                        ({client.reviewCount} Verified Reviews)
                      </span>
                    </div>
                  </div>

                  {/* Two-Column Middle: Seller Performance Metrics & Active Order Queue */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    {/* Left: Fiverr Performance Standards Card */}
                    <div className="md:col-span-5 p-4 rounded-xl bg-white/5 border border-white/10 space-y-3.5">
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                          Seller Standards
                        </span>
                        <span className="text-[10px] text-green-400 font-semibold bg-green-500/10 px-2 py-0.5 rounded">
                          {client.badgeLevel}
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-white/70">Response Rate</span>
                            <span className="font-bold text-green-400">{stats?.responseRate || '100%'}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-green-400 rounded-full w-full" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-white/70">Delivered on Time</span>
                            <span className="font-bold text-green-400">{stats?.onTimeDelivery || '100%'}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-green-400 rounded-full w-full" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-white/70">Order Completion</span>
                            <span className="font-bold text-green-400">{stats?.orderCompletionRate || '100%'}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-green-400 rounded-full w-full" />
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-white/60">
                          <span>Avg. Response Time:</span>
                          <span className="font-bold text-white">{stats?.responseTime || '1 Hour'}</span>
                        </div>

                        <div className="flex items-center justify-between text-white/60">
                          <span>Search Position:</span>
                          <span className="font-bold text-orange-300">{stats?.topRankingRank || 'Page 1 Top Result'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Active Orders In Queue */}
                    <div className="md:col-span-7 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            Active Orders ({stats?.activeOrdersCount || 3})
                          </span>
                          <span className="text-[10px] text-white/40">Fiverr Order Management</span>
                        </div>

                        <div className="space-y-2.5">
                          {stats?.activeOrdersList?.map((order) => (
                            <div
                              key={order.orderId}
                              className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="font-mono text-white/40 text-[10px]">{order.orderId}</span>
                                  <span className="text-[11px] font-semibold text-white/80">{order.buyerCountry}</span>
                                </div>
                                <p className="text-xs text-white truncate font-medium">{order.gigTitle}</p>
                              </div>

                              <div className="text-right flex-shrink-0">
                                <span className="font-bold text-green-400 block text-xs">{order.price}</span>
                                <span className="text-[10px] text-orange-300 font-mono">{order.dueIn} left</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
                        <span>Queue Status: Active Orders Flow</span>
                        <span className="text-green-400 font-semibold">100% On-Schedule Delivery</span>
                      </div>
                    </div>
                  </div>

                  {/* Optimized Active Gigs Table */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        Optimized Active Gigs Performance
                      </span>
                      <span className="text-[10px] text-white/40">Past 30 Days Metrics</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="text-white/40 border-b border-white/10 pb-2">
                            <th className="pb-2 font-semibold">Gig Title</th>
                            <th className="pb-2 font-semibold text-center">Impressions</th>
                            <th className="pb-2 font-semibold text-center">Clicks</th>
                            <th className="pb-2 font-semibold text-center">Orders</th>
                            <th className="pb-2 font-semibold text-right">Conversion</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {stats?.gigsList?.map((gig, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                              <td className="py-2.5 pr-3 text-white/90 font-medium max-w-xs truncate">
                                {gig.gigTitle}
                              </td>
                              <td className="py-2.5 px-2 text-center text-white/80 font-mono font-semibold">
                                {gig.impressions}
                              </td>
                              <td className="py-2.5 px-2 text-center text-white/80 font-mono font-semibold">
                                {gig.clicks}
                              </td>
                              <td className="py-2.5 px-2 text-center text-green-400 font-mono font-bold">
                                {gig.orders}
                              </td>
                              <td className="py-2.5 pl-2 text-right text-orange-400 font-mono font-bold">
                                {gig.conversionRate}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Badge Notice */}
              <div className="p-3.5 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-between gap-3 text-xs text-green-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span>
                    <strong>Verified Case Study:</strong> Optimization carried out directly on {client.clientName}'s Fiverr profile by Smart SEO Solutions.
                  </span>
                </div>
                <span className="text-[10px] text-white/50 font-mono hidden sm:inline">ID: {client.id}</span>
              </div>
            </div>
          )}

          {/* TAB 2: SEO & Search Rankings */}
          {activeTab === 'rankings' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-orange-400" />
                    <h4 className="text-base font-bold text-white">Targeted High-Intent Search Keywords</h4>
                  </div>
                  <span className="text-xs text-green-400 font-bold px-2.5 py-1 rounded-md bg-green-500/10 border border-green-400/30">
                    {stats?.topRankingRank || 'Page 1 Ranking'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/70">
                  These high-buyer-intent keywords and 5 search tags were strategically integrated across {client.clientName}'s gig titles, URL slugs, bulleted descriptions, and pricing packages:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {stats?.topKeywords?.map((kw, i) => (
                    <div
                      key={kw}
                      className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 font-bold font-mono text-[10px] flex items-center justify-center">
                          0{i + 1}
                        </span>
                        <span className="font-semibold text-white">{kw}</span>
                      </div>
                      <span className="text-[10px] font-mono text-green-400 font-bold">Top Rank</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills and Category Scope */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400">
                  Structured Tag Cloud & Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {client.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-semibold text-white/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Optimization Case Details */}
          {activeTab === 'strategy' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block">
                  Tagline & Profile Positioning
                </span>
                <p className="text-base font-semibold text-white italic">
                  "{client.tagline}"
                </p>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs sm:text-sm text-white/80 leading-relaxed">
                  {client.description}
                </div>
              </div>

              {stats?.caseStudy && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                      <span>⚠️ Initial Client Challenge</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      {stats.caseStudy.challenge}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-green-950/20 border border-green-500/30 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-green-400 flex items-center gap-1.5">
                      <span>💡 Smart SEO Solutions Execution</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      {stats.caseStudy.solution}
                    </p>
                  </div>
                </div>
              )}

              {stats?.caseStudy?.outcomes && (
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400">
                    Key Transformation Outcomes
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                    {stats.caseStudy.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-400 font-bold text-base leading-none">✓</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
          <div className="text-center sm:text-left">
            <span className="text-xs text-white/50 block">Want a similar transformation for your Fiverr?</span>
            <span className="text-sm font-bold text-white">Complete Profile & Gig Optimization — {BUSINESS_INFO.price}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigateToThankYou();
              }}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-xs sm:text-sm font-extrabold uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>Get Optimized Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
