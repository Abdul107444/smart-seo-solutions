import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Zap } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  highlight?: string;
}

const METHOD_FAQS: FaqItem[] = [
  {
    question: 'How does your Done-For-You optimization get my 1st client in 20–25 days?',
    answer:
      'Our team uses 100% white-hat Fiverr SEO. We research low-competition, high-intent buyer keywords in your exact niche, rewrite your gig titles, backend search tags, AIDA descriptions, 3-tier pricing, and thumbnails so Fiverr’s search crawler indexes your gigs to active US/UK buyer search streams.',
    highlight: '100% White-Hat & Proven'
  },
  {
    question: 'How does the process work after paying Rs. 8,000?',
    answer:
      'Right after your Rs. 8,000 payment is verified by AI, you connect with our Fiverr SEO lead on WhatsApp (+92 310 6625091). We complete your full profile and gig optimization in 2–4 business days either directly or live via AnyDesk / TeamViewer.',
    highlight: 'Direct or Live AnyDesk Setup'
  },
  {
    question: 'Does full optimization work for brand-new accounts with 0 reviews?',
    answer:
      'Yes! Brand-new accounts benefit the most because Fiverr grants an algorithmic "new seller boost" to properly structured gigs. Our optimization positions your gigs cleanly to turn that boost into your 1st paying client within 20–25 days.',
    highlight: 'Built for New & Zero-Order Sellers'
  },
  {
    question: 'What is the 20 to 25 Days 1st Client Money-Back Guarantee?',
    answer:
      'If our team completes your full Fiverr Profile & Gig Optimization, you keep your account active online, and you still do not get your 1st Fiverr client or inquiries within 20 to 25 days, we refund 100% of your Rs. 8,000 fee immediately via WhatsApp.',
    highlight: '100% Risk-Free Guarantee'
  },
  {
    question: 'Do I have to share my Fiverr password?',
    answer:
      'Not if you prefer not to! We offer two secure modes: Direct Account Optimization or Live AnyDesk / TeamViewer Screen-Share where we do every single update live in front of you.',
    highlight: '100% Account Safety'
  }
];

export function GigRank24hFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="method-faq" className="bg-[#f7fbfd] px-4 py-16 sm:px-6 sm:py-24 border-t border-[#dfe5ed]">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#2b62ef]/30 bg-[#2b62ef]/10 px-3.5 py-1 text-xs font-bold text-[#2b62ef]">
            <HelpCircle className="h-3.5 w-3.5 text-[#2b62ef]" />
            <span>Optimization Service FAQs</span>
          </div>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0c172f]">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#535f6f]">
            Clear, transparent answers on our Done-For-You Fiverr Profile &amp; Gig Optimization, AnyDesk setup, and 20–25 days guarantee.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-10 space-y-3.5">
          {METHOD_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-[#dfe5ed] bg-white transition-all shadow-xs hover:border-[#2b62ef]/30"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left font-display text-sm sm:text-base font-bold text-[#0c172f] hover:text-[#2b62ef] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#2b62ef]/10 text-xs font-bold text-[#2b62ef] shrink-0">
                      {index + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#535f6f] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#2b62ef]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-[#dfe5ed] bg-[#f7fbfd]/50 px-5 py-4 text-xs sm:text-sm text-[#535f6f] leading-relaxed">
                    <p>{faq.answer}</p>
                    {faq.highlight && (
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#1dbf73]/10 px-3 py-1 text-xs font-semibold text-[#0e804b]">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#1dbf73]" />
                        <span>{faq.highlight}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
