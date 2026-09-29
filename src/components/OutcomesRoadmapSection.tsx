import React from 'react';
import {
  Sparkles,
  TrendingUp,
  MapPin,
  Users,
  Compass,
  DollarSign,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { OUTCOMES, INCOME_CARDS, ROADMAP_STEPS, PERSONAS } from '../data/techpulseData';

export function OutcomesRoadmapSection() {
  return (
    <div className="space-y-24 bg-[#f7fbfd]">
      {/* 1. Outcomes Section */}
      <section className="px-4 pt-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2b62ef]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2b62ef]">
              <Sparkles className="h-3.5 w-3.5" /> Core Deliverables & Impact
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-[#0c172f] sm:text-5xl">
              What Our Fiverr Optimization Delivers For You:
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#dfe5ed] bg-white p-5 shadow-card shadow-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-extrabold text-emerald-700">
                      {item.range}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold text-[#0c172f]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#535f6f]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Income Potential Section */}
      <section className="bg-gradient-to-b from-[#ecf3f8]/40 to-[#f7fbfd] px-4 py-16 sm:px-6 border-y border-[#dfe5ed]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <TrendingUp className="h-3.5 w-3.5" /> International Dollar Orders
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-[#0c172f] sm:text-5xl">
              What Clients Earn from Optimized Fiverr Gigs
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-[#535f6f]">
              Realistic order values quoted by our clients to international US, UK, and European buyers.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INCOME_CARDS.map((card, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-3xl border border-[#dfe5ed] bg-white p-6 shadow-card shadow-card-hover"
              >
                <div className="font-display text-xl font-extrabold text-[#2b62ef]">
                  {card.range}
                </div>
                <h3 className="mt-2 font-display text-lg font-bold text-[#0c172f]">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#535f6f]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 14-Day Roadmap */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2b62ef]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2b62ef]">
              <Compass className="h-3.5 w-3.5" /> 14-Day Roadmap
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-[#0c172f] sm:text-5xl">
              From Zero to <span className="text-gradient">Ranked on Page 1</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-[#535f6f]">
              A proven step-by-step milestone timeline from booking to Page 1 visibility.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ROADMAP_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-3xl border border-[#dfe5ed] bg-white p-6 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#ecf3f8] px-3 py-1 text-xs font-bold text-[#2b62ef]">
                      {step.day}
                    </span>
                    <span className="font-display text-2xl font-black text-gray-200">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-[#0c172f]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#535f6f]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Who It's For */}
      <section className="bg-[#ecf3f8]/50 px-4 py-16 sm:px-6 border-t border-[#dfe5ed]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2b62ef]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2b62ef]">
              <Users className="h-3.5 w-3.5" /> Who It's For
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-[#0c172f] sm:text-5xl">
              If any of these is you — <span className="text-gradient">you're in</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PERSONAS.map((p, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#dfe5ed] bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <span className="inline-block rounded-lg bg-[#2b62ef]/10 px-2.5 py-1 text-xs font-extrabold text-[#2b62ef]">
                  {p.tag}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-[#0c172f]">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#535f6f]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
