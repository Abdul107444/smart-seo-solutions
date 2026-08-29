import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  Building2
} from 'lucide-react';

export interface PartnerCompany {
  id: string;
  name: string;
  subname: string;
  tagline: string;
  industry: string;
  growthTag: string;
  accentColor: string;
  badgeBg: string;
  svgLogo: React.ReactNode;
}

export const PARTNER_COMPANIES: PartnerCompany[] = [
  {
    id: 'ha-tech-media',
    name: 'HA TECH MEDIA',
    subname: 'Media & Technology Solutions',
    tagline: 'Tech Media & Production Agency',
    industry: 'Tech Media & Digital Studio',
    growthTag: '+210% Inquiries Growth',
    accentColor: 'from-blue-500 to-cyan-400',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    svgLogo: (
      <svg viewBox="0 0 200 80" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Slanted High-Tech Graphic Monogram */}
        <g>
          {/* Main Slanted Legs */}
          <path d="M20 62L42 18H54L32 62H20Z" fill="#1e293b" />
          <path d="M38 18L64 62H76L50 18H38Z" fill="#0284c7" />
          <path d="M26 44H62L66 38H30L26 44Z" fill="#38bdf8" />
          
          {/* Solar/Tech Grid top bar */}
          <rect x="52" y="18" width="30" height="4" rx="1" fill="#38bdf8" />
          <line x1="58" y1="18" x2="58" y2="22" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="66" y1="18" x2="66" y2="22" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="74" y1="18" x2="74" y2="22" stroke="#0f172a" strokeWidth="1.5" />

          {/* Network Nodes */}
          <circle cx="78" cy="36" r="4.5" fill="#38bdf8" />
          <circle cx="92" cy="30" r="3.5" fill="#0284c7" />
          <circle cx="92" cy="48" r="4" fill="#0284c7" />
          <line x1="68" y1="42" x2="78" y2="36" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="78" y1="36" x2="92" y2="30" stroke="#0284c7" strokeWidth="2" />
          <line x1="78" y1="36" x2="92" y2="48" stroke="#0284c7" strokeWidth="2" />
        </g>
        {/* Text */}
        <text x="106" y="38" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="16" letterSpacing="1">HA</text>
        <text x="106" y="52" fill="#38bdf8" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="11" letterSpacing="3">TECH MEDIA</text>
      </svg>
    )
  },
  {
    id: 'gaid-graphix',
    name: 'GAID GRAPHIX',
    subname: 'Creative Graphic Design Studio',
    tagline: 'Brand Identity & Visual Arts',
    industry: 'Design & Visual Identity',
    growthTag: 'Ranked Top 3 in Design Gigs',
    accentColor: 'from-cyan-400 to-rose-500',
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    svgLogo: (
      <svg viewBox="0 0 220 80" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Dynamic Curved 'G' emblem in Red/Cyan */}
        <g>
          {/* Red Ribbon section */}
          <path d="M36 20C24 20 16 30 16 42C16 54 26 62 38 62C46 62 52 58 56 52L46 46C44 49 41 51 37 51C30 51 25 46 25 41C25 35 29 30 36 30C41 30 45 33 47 37L58 31C53 24 45 20 36 20Z" fill="#ef4444" />
          {/* Cyan Overlay Swoosh */}
          <path d="M26 40L50 20L58 26L34 46H56V54H26V40Z" fill="#0284c7" opacity="0.9" />
          <circle cx="36" cy="41" r="5" fill="#f87171" />
        </g>
        {/* Typo */}
        <text x="68" y="40" fill="#00b4d8" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="24" letterSpacing="2">GAID</text>
        <text x="68" y="58" fill="#f43f5e" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="16" letterSpacing="4">GRAPHIX</text>
      </svg>
    )
  },
  {
    id: 'k-tech-clans',
    name: 'K-Tech Clans',
    subname: 'Software Solutions & Web Systems',
    tagline: 'Custom Software & Web Engineering',
    industry: 'Software & Cloud Solutions',
    growthTag: 'High-Ticket B2B Buyer Conversion',
    accentColor: 'from-sky-400 to-indigo-500',
    badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    svgLogo: (
      <svg viewBox="0 0 240 80" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Dynamic Blue Crescent Sphere */}
        <g>
          <circle cx="36" cy="40" r="22" fill="#0369a1" />
          <path d="M24 24C34 24 42 31 42 41C42 50 34 57 24 57C29 55 33 49 33 41C33 33 29 27 24 24Z" fill="#38bdf8" />
          <ellipse cx="26" cy="38" rx="8" ry="12" fill="#082f49" opacity="0.6" />
        </g>
        {/* Typo */}
        <text x="68" y="38" fill="#ffffff" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="18" letterSpacing="0.5">K-Tech Clans</text>
        <text x="68" y="54" fill="#38bdf8" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="12" letterSpacing="1">Software Solutions</text>
      </svg>
    )
  },
  {
    id: 'crm-automates',
    name: 'CRM AUTOMATES',
    subname: 'Automate Scale Succeed',
    tagline: 'CRM Pipelines & Workflow Automation',
    industry: 'Automation & SaaS Operations',
    growthTag: '5★ Authority Positioning',
    accentColor: 'from-purple-400 to-pink-500',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    svgLogo: (
      <svg viewBox="0 0 220 80" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Loop Logo with Upward Arrow */}
        <g>
          {/* Left Arc (Navy/Purple) */}
          <path d="M28 20C18 20 12 28 12 40C12 52 18 60 28 60C31 60 33 59 35 57V50C33 52 31 53 28 53C22 53 19 47 19 40C19 33 22 27 28 27C31 27 33 28 35 30V23C33 21 31 20 28 20Z" fill="#312e81" />
          {/* Right Arc (Magenta) */}
          <path d="M42 20C40 20 38 21 36 22V29C38 28 40 27 43 27C49 27 52 33 52 40C52 47 49 53 43 53C40 53 38 52 36 51V58C38 59 40 60 42 60C52 60 59 52 59 40C59 28 52 20 42 20Z" fill="#ec4899" />
          {/* Upward Arrow */}
          <path d="M35 15L42 27H38V55H33V27H29L35 15Z" fill="#ec4899" />
          <path d="M35 24L39 32H37V55H34V32H32L35 24Z" fill="#06b6d4" />
        </g>
        {/* Typo */}
        <text x="68" y="38" fill="#ffffff" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="17" letterSpacing="0.8">CRM</text>
        <text x="110" y="38" fill="#ec4899" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="17" letterSpacing="0.8">AUTOMATES</text>
        <text x="68" y="54" fill="#a855f7" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="10" letterSpacing="1.5">Automate • Scale • Succeed</text>
      </svg>
    )
  },
  {
    id: 'wb-design-agency',
    name: 'WB DESIGN AGENCY',
    subname: 'UI/UX & Web Brand Experience',
    tagline: 'Full-Service Digital Product Design',
    industry: 'UI/UX & Brand Design',
    growthTag: '+165% Gig CTR Improvement',
    accentColor: 'from-emerald-400 to-teal-500',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    svgLogo: (
      <svg viewBox="0 0 220 80" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* WB Serif + Overlapping Eco Circles */}
        <g>
          <text x="10" y="44" fill="#38bdf8" fontFamily="Georgia, serif" fontWeight="bold" fontSize="30" letterSpacing="-1">W</text>
          <text x="38" y="44" fill="#FFFFFF" fontFamily="Georgia, serif" fontWeight="bold" fontSize="30" letterSpacing="-1">B</text>
          {/* Overlapping Green Circles */}
          <circle cx="68" cy="34" r="11" fill="#84cc16" opacity="0.85" />
          <circle cx="84" cy="38" r="8" fill="#4ade80" opacity="0.85" />
          <circle cx="72" cy="48" r="9" fill="#22c55e" opacity="0.75" />
        </g>
        {/* Typo */}
        <text x="10" y="62" fill="#86efac" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="12" letterSpacing="2.5">DESIGN AGENCY</text>
      </svg>
    )
  }
];

export const TrustedPartnersShowcase: React.FC = () => {
  return (
    <div className="relative w-full mt-10">
      {/* Outer Card Container */}
      <div className="glass-card rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl border border-purple-400/25 relative overflow-hidden backdrop-blur-xl">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-5 border-b border-white/10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Industry Collaborations</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight pt-1">
              Companies & Agencies <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">We've Optimized</span>
            </h3>
            <p className="text-xs sm:text-sm text-white/60">
              Trusted by tech media companies, software clans, design studios, and automation agencies.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Satisfaction</p>
                <p className="text-xs font-bold text-white">100% 5★ Rated</p>
              </div>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Partnership</p>
                <p className="text-xs font-bold text-white">Global Brands</p>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Animated Marquee Slider (Smooth Infinite Scroll) */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Gradient Edge Masks for soft fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#120524] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#120524] to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
            {[...PARTNER_COMPANIES, ...PARTNER_COMPANIES, ...PARTNER_COMPANIES].map((company, index) => (
              <div
                key={`${company.id}-${index}`}
                className="w-56 sm:w-64 h-24 sm:h-28 px-5 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 hover:border-orange-400/40 transition-all duration-300 flex items-center justify-center cursor-pointer group shadow-lg flex-shrink-0 backdrop-blur-md"
              >
                <div className="w-full h-full flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                  {company.svgLogo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
