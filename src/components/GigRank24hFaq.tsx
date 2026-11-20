import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Zap } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  highlight?: string;
}

const METHOD_FAQS: FaqItem[] = [
  {
    question: 'How does the method rank a gig within 24 hours without violating Fiverr policies?',
    answer:
      'This method uses 100% white-hat algorithmic alignment. Fiverr’s search bots re-index gigs every 12 to 24 hours when tags, permanent URL permalinks, and metadata are updated correctly. By following our blueprint to target low-competition, high-intent buyer keywords instead of saturated generic terms, your gig immediately qualifies for active search placement without any fake clicks or bots.',
    highlight: '100% White-Hat & Safe'
  },
  {
    question: 'How do I receive the method after paying Rs. 500?',
    answer:
      'This is a complete digital method & blueprint (not a done-for-you account access service). Immediately after your Rs. 500 payment is verified by AI, you can instantly download the full step-by-step 24-Hour Ranking Method PDF directly on screen.',
    highlight: 'Instant WhatsApp & Email Delivery'
  },
  {
    question: 'Does this method work for brand-new accounts with 0 reviews?',
    answer:
      'Yes! In fact, brand-new accounts benefit the most because Fiverr grants an initial algorithmic "new seller boost" to newly published and properly structured gigs. Our method shows you how to capitalize on this window to lock in your search position and get your first messages in 2 to 7 days.',
    highlight: 'Perfect for 0-Review Accounts'
  },
  {
    question: 'What is the 20 to 25 Days Money-Back Guarantee?',
    answer:
      'If you apply the steps taught in our method, keep your gig active and online, and do not see positive organic search impression growth or client inquiries within 20 to 25 days, you will receive a full 100% refund of your Rs. 500 fee—no arguments, no hidden conditions.',
    highlight: '100% Risk-Free Guarantee'
  },
  {
    question: 'Do I need to share my Fiverr password or give account access?',
    answer:
      'Never! We are selling you the proven step-by-step method so you can optimize your gigs yourself. We never ask for your Fiverr login, password, or remote computer access. You stay in 100% control of your account at all times.',
    highlight: 'Zero Account Access Required'
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
            <span>24-Hour Method Knowledge Base</span>
          </div>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0c172f]">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#535f6f]">
            Clear, transparent answers on our 24-hour Fiverr ranking methodology, safety, and money-back guarantee.
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
