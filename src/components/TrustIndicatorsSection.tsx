import React from 'react';
import {
  ShieldCheck,
  RotateCcw,
  Headphones,
  Lock,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';

interface TrustIndicatorsProps {
  onEnroll?: () => void;
}

export function TrustIndicatorsSection({ onEnroll }: TrustIndicatorsProps) {
  const phone = TECHPULSE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section id="trust" className="relative border-y border-[#dfe5ed] bg-white px-4 py-12 sm:px-6 sm:py-16">
      {/* Subtle ambient light */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(43,98,239,0.04),transparent_60%)]" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#1dbf73]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#109655]">
            <ShieldCheck className="h-3.5 w-3.5" /> Client Safety & Guarantee
          </div>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0c172f] tracking-tight">
            100% Risk-Free Guarantee & Verified Trust
          </h2>
          <p className="mt-2 text-xs sm:text-base text-[#535f6f] leading-relaxed">
            Your investment and Fiverr account are completely protected with bank-grade security, unconditional money-back terms, and round-the-clock Pakistani seller support.
          </p>
        </div>

        {/* 3 Core Trust Cards Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: 100% Secure Payment */}
          <div className="group relative overflow-hidden rounded-2xl border-2 border-[#dfe5ed] bg-[#f7fbfd] p-6 shadow-sm transition-all hover:border-[#2b62ef]/40 hover:bg-white hover:shadow-md flex flex-col justify-between">
            <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-[#2b62ef]/10 blur-xl group-hover:bg-[#2b62ef]/20 transition-all" />

            <div>
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#2b62ef]/15 text-[#2b62ef] shadow-xs">
                  <Lock className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700 border border-blue-200">
                  Bank-Grade Safe
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg sm:text-xl font-extrabold text-[#0c172f]">
                100% Secure Pakistani Payment
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#535f6f] leading-relaxed">
                Direct verified bank transfer via official Meezan Bank IBAN. Zero third-party risk, zero hidden charges. Manual WhatsApp confirmation slip provided within 15 minutes.
              </p>

              {/* Supported payment badges */}
              <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#dfe5ed]/60 text-[11px] font-bold text-[#0c172f]">
                <span className="rounded-md bg-white px-2 py-1 border border-gray-200 shadow-xs">Meezan Bank</span>
                <span className="rounded-md bg-emerald-50 text-emerald-800 px-2 py-1 border border-emerald-200">Easypaisa</span>
                <span className="rounded-md bg-rose-50 text-rose-800 px-2 py-1 border border-rose-200">JazzCash</span>
                <span className="rounded-md bg-blue-50 text-blue-800 px-2 py-1 border border-blue-200">Raast Instant</span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Official Pakistani Bank Verification</span>
            </div>
          </div>

          {/* Card 2: 20-25 Days Money-Back Guarantee */}
          <div className="group relative overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-50/40 via-[#f7fbfd] to-white p-6 shadow-sm transition-all hover:border-emerald-500 hover:shadow-lg flex flex-col justify-between">
            <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-[#1dbf73]/15 blur-xl group-hover:bg-[#1dbf73]/25 transition-all" />

            <div>
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#1dbf73]/15 text-[#109655] shadow-xs">
                  <RotateCcw className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-extrabold text-emerald-800 border border-emerald-300 animate-pulse">
                  100% Refund Policy
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg sm:text-xl font-extrabold text-[#0c172f]">
                20–25 Days Money-Back Guarantee
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#535f6f] leading-relaxed">
                If your Fiverr profile &amp; gigs do not show organic algorithmic impression growth or inbound buyer inquiries within 20–25 days of optimization, get an unconditional 100% refund.
              </p>

              {/* Guarantee highlights */}
              <div className="mt-4 space-y-1.5 pt-3 border-t border-emerald-200/60 text-xs text-[#0c172f]">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>No complicated questions or disputes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Same-day refund to your Pakistani bank account</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-1.5 text-xs font-extrabold text-[#109655]">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Zero-Risk Guarantee on Rs. 8,000 Fee</span>
            </div>
          </div>

          {/* Card 3: 24/7 Dedicated Pakistani Support */}
          <div className="group relative overflow-hidden rounded-2xl border-2 border-[#dfe5ed] bg-[#f7fbfd] p-6 shadow-sm transition-all hover:border-[#2b62ef]/40 hover:bg-white hover:shadow-md flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-purple-500/10 blur-xl group-hover:bg-purple-500/20 transition-all" />

            <div>
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-purple-500/15 text-purple-700 shadow-xs">
                  <Headphones className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-700 border border-purple-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live 24/7 Available
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg sm:text-xl font-extrabold text-[#0c172f]">
                24/7 WhatsApp &amp; AnyDesk Support
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#535f6f] leading-relaxed">
                Dedicated Pakistani SEO consultants ready to assist you on WhatsApp 24/7. Transparent live AnyDesk screen-sharing so you see every keyword and description change live on your own screen.
              </p>

              {/* Support channels */}
              <div className="mt-4 space-y-1.5 pt-3 border-t border-[#dfe5ed]/60 text-xs text-[#0c172f]">
                <div className="flex items-center gap-1.5">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span>Direct 1-on-1 WhatsApp chat guidance</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span>AnyDesk screen-share with zero password sharing</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between pt-1 border-t border-[#dfe5ed]/60">
              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent('Assalam-o-Alaikum! Mujhe Fiverr Optimization support chahiye.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#109655] hover:underline"
              >
                <span>Chat on WhatsApp ({TECHPULSE_CONFIG.whatsappNumber})</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Trust Ribbon */}
        <div className="mt-8 rounded-2xl bg-[#f7fbfd] border border-[#dfe5ed] p-3.5 sm:p-4 text-center flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-[#535f6f]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>100% White-Hat Fiverr TOS Safe</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-[#2b62ef] shrink-0" />
            <span>Zero Password Sharing Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-amber-600 shrink-0" />
            <span>Fast 24–48h Optimization Delivery</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">🇵🇰</span>
            <span>Made Specifically for Pakistani Freelancers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
