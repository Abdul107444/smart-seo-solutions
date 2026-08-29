import React from 'react';
import { PortfolioItem } from '../types';
import { 
  Star, 
  Send, 
  Video, 
  MapPin, 
  MessageSquare, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award
} from 'lucide-react';

interface FiverrProfileScreenshotCardProps {
  client: PortfolioItem;
  onViewCaseStudy: (client: PortfolioItem) => void;
  compact?: boolean;
}

export const FiverrProfileScreenshotCard: React.FC<FiverrProfileScreenshotCardProps> = ({
  client,
  onViewCaseStudy,
  compact = false,
}) => {
  // Avatar colors for realistic rendering
  const avatarGradients: Record<string, string> = {
    'client-hamza': 'from-blue-600 to-indigo-800',
    'client-sikandar': 'from-slate-700 to-zinc-900',
    'client-abdul': 'from-emerald-700 to-teal-900',
    'client-areeba': 'from-purple-700 to-indigo-900',
    'client-zaid': 'from-blue-800 to-sky-950',
  };

  const gradient = avatarGradients[client.id] || 'from-orange-600 to-amber-800';

  return (
    <div className="bg-white text-[#222325] rounded-2xl shadow-xl border border-gray-200 overflow-hidden font-sans transition-all duration-300 hover:shadow-2xl flex flex-col justify-between">
      {/* Top Browser / Fiverr Header Bar */}
      <div className="bg-[#f7f7f7] border-b border-gray-200 px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block"></span>
          </div>
          <span className="ml-1 sm:ml-2 font-mono text-[10px] sm:text-[11px] text-gray-600 truncate max-w-[140px] sm:max-w-[240px]">
            fiverr.com/{client.handle.replace('@', '')}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 font-bold text-[9px] sm:text-[10px] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Verified Profile
          </span>
          <button
            onClick={() => onViewCaseStudy(client)}
            className="text-[10px] sm:text-[11px] font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Analytics</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Fiverr Profile White Body */}
      <div className="p-4 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Top Profile Summary row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 sm:gap-6 pb-5 sm:pb-6 border-b border-gray-100">
            {/* Left side: Avatar + Bio details */}
            <div className="flex flex-col sm:flex-row items-start gap-4 min-w-0 flex-1">
              {/* Profile Avatar */}
              <div className="relative flex-shrink-0">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr ${gradient} p-0.5 shadow-md flex items-center justify-center`}>
                  <div className="w-full h-full rounded-full bg-[#1e293b] flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
                    {client.clientName.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                {/* Online status indicator */}
                {client.isOnline ? (
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#1dbf73] border-2 border-white rounded-full" title="Online" />
                ) : (
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 border-2 border-white rounded-full" title="Offline" />
                )}
              </div>

              {/* Title & Stats */}
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[#222325] tracking-tight break-words">
                    {client.clientName}
                  </h3>
                  <span className="text-xs text-[#74767e] font-mono break-all">{client.handle}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                  {/* Rating */}
                  <div className="flex items-center gap-1 font-bold text-[#222325] whitespace-nowrap">
                    <Star className="w-4 h-4 fill-[#222325] text-[#222325]" />
                    <span>{client.rating.toFixed(1)}</span>
                    <span className="text-[#74767e] font-normal">({client.reviewCount})</span>
                  </div>

                  <span className="text-gray-300 hidden xs:inline">|</span>

                  {/* Level Badge */}
                  <span className="px-2 py-0.5 rounded bg-gray-100 text-[#404145] text-xs font-semibold whitespace-nowrap">
                    {client.levelBadgeText || client.badgeLevel}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-xs sm:text-sm font-semibold text-[#404145] pt-0.5 sm:pt-1 break-words">
                  {client.tagline}
                </p>

                {/* Location & Languages */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-[#74767e]">
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" /> {client.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" /> {client.languages.join(', ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right side: Fiverr Contact & Hourly Box (matches screenshot) */}
            <div className="w-full md:w-64 bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col gap-2.5 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
                    {client.clientName[0]}
                  </div>
                  <span className="text-xs font-bold text-[#222325]">{client.clientName}</span>
                </div>
              </div>

              {client.ratePerHour && (
                <div className="text-base font-extrabold text-[#222325]">
                  {client.ratePerHour}
                </div>
              )}

              <div className="flex items-center gap-1.5 text-[11px] text-[#74767e]">
                <span className={`w-2 h-2 rounded-full ${client.isOnline ? 'bg-[#1dbf73]' : 'bg-gray-400'}`}></span>
                <span>{client.statusTime || (client.isOnline ? 'Online' : 'Offline')}</span>
              </div>

              <button
                onClick={() => onViewCaseStudy(client)}
                className="w-full py-2 px-3 rounded-md bg-[#222325] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact me</span>
              </button>

              {client.hasConsultation && (
                <button
                  onClick={() => onViewCaseStudy(client)}
                  className="w-full py-1.5 px-3 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-[#222325] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-gray-600" />
                  <span>Book a consultation</span>
                </button>
              )}

              <div className="text-center text-[10px] text-[#74767e] pt-1">
                Average response time: 1 hour
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <div className="py-4 sm:py-5 border-b border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#74767e] mb-2">
              About me
            </h4>
            <p className="text-xs sm:text-sm text-[#404145] leading-relaxed line-clamp-3 break-words">
              {client.description}
            </p>
          </div>

          {/* Skills Section */}
          <div className="py-4 sm:py-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#74767e] mb-3">
              Skills
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {client.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 sm:px-3 py-1 rounded-full border border-gray-200 bg-white text-[11px] sm:text-xs font-medium text-[#404145] hover:border-gray-400 transition-colors shadow-2xs break-words"
                >
                  {skill}
                </span>
              ))}
              {client.extraSkillsCount && client.extraSkillsCount > 0 && (
                <span className="px-2 sm:px-2.5 py-1 rounded-full bg-gray-100 text-[11px] sm:text-xs font-bold text-gray-500">
                  +{client.extraSkillsCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Floating Message Bar Preview + Case Study CTA */}
        <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-gray-50/80 -mx-4 sm:-mx-6 lg:-mx-7 -mb-4 sm:-mb-6 lg:-mb-7 p-3.5 sm:p-5">
          {/* Floating Pill from screenshot */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-xs text-xs min-w-0">
            <div className="w-5 h-5 rounded-full bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
              {client.clientName[0]}
            </div>
            <span className="font-semibold text-[#222325] truncate">Message {client.clientName}</span>
            <span className="text-[10px] sm:text-[11px] text-gray-400 whitespace-nowrap">• {client.isOnline ? 'Online' : 'Away'}</span>
          </div>

          {/* Direct Action */}
          <button
            onClick={() => onViewCaseStudy(client)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow cursor-pointer flex-shrink-0"
          >
            <span>View Case & Dashboard</span>
            <TrendingUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
