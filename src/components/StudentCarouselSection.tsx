import React, { useState } from 'react';
import { Star, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS_18 } from '../data/techpulseData';

export function StudentCarouselSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 3;
  const totalPages = Math.ceil(TESTIMONIALS_18.length / pageSize);

  const displayedStudents = TESTIMONIALS_18.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2);
  };

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 bg-white border-t border-[#dfe5ed]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2b62ef]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2b62ef]">
            <Award className="h-3.5 w-3.5" /> Testimonials
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-[#0c172f] sm:text-5xl">
            18 Fiverr Sellers. Real Orders. Real Dollars.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-[#535f6f]">
            Verified client orders and 5-star earnings from Pakistani freelancers across Karachi, Lahore, Islamabad, Multan, Faisalabad, and more.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {displayedStudents.map((item) => (
            <div
              key={item.n}
              className="flex flex-col justify-between rounded-3xl border border-[#dfe5ed] bg-[#f7fbfd] p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  {/* 5 Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {/* Money Badge */}
                  <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800">
                    💰 {item.money}
                  </div>
                </div>

                {/* Quote */}
                <p className="mt-4 text-sm leading-relaxed text-[#0c172f]">
                  "{item.q}"
                </p>
              </div>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 border-t border-[#dfe5ed] pt-4">
                <div className="gradient-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-xs font-extrabold text-white shadow-sm">
                  {getInitials(item.n)}
                </div>
                <div>
                  <div className="font-display text-sm font-bold text-[#0c172f]">
                    {item.n}
                  </div>
                  <div className="text-xs text-[#535f6f]">
                    {item.r} · {item.c}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Dots & Controls */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="grid h-8 w-8 place-items-center rounded-full border border-[#dfe5ed] text-[#535f6f] disabled:opacity-30 hover:bg-[#ecf3f8]"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentPage(idx)}
                aria-label={`Go to page ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentPage
                    ? 'w-8 gradient-brand'
                    : 'w-2.5 bg-[#dfe5ed] hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            className="grid h-8 w-8 place-items-center rounded-full border border-[#dfe5ed] text-[#535f6f] disabled:opacity-30 hover:bg-[#ecf3f8]"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
