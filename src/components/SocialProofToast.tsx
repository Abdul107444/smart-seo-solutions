import React, { useState, useEffect } from 'react';
import { CheckCircle2, X, Zap } from 'lucide-react';

const SURNAMES = [
  'Ahmed', 'Fatima', 'Usman', 'Ali', 'Ayesha', 'Hassan',
  'Zainab', 'Bilal', 'Sana', 'Omar', 'Hira', 'Zara',
  'Hamza', 'Maryam', 'Saad', 'Danish', 'Mustafa', 'Khadija',
  'Arham', 'Taha', 'Farhan', 'Noman'
];

const CITIES = [
  'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad'
];

const ACTIONS = [
  { text: 'booked', service: 'Get 1st Client Full Optimization', highlight: 'text-[#109655]' },
  { text: 'closed', service: 'First $250 Client Order on Fiverr', highlight: 'text-[#109655]' },
  { text: 'booked', service: '10-Point Fiverr Gig & Profile Audit', highlight: 'text-[#2b62ef]' },
  { text: 'received', service: '1st US Buyer Inquiry after Optimization', highlight: 'text-[#109655]' },
  { text: 'booked', service: 'Live AnyDesk Screen-Share Setup', highlight: 'text-[#2b62ef]' },
  { text: 'cleared', service: 'First $180 Order after Gig Overhaul', highlight: 'text-[#109655]' },
  { text: 'booked', service: 'Fiverr 5 Search Tags & SEO Title Pack', highlight: 'text-[#2b62ef]' },
];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function SocialProofToast() {
  const [current, setCurrent] = useState<{
    name: string;
    city: string;
    action: typeof ACTIONS[0];
    mins: number;
  } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;

    const showRandomProof = () => {
      setCurrent({
        name: getRandom(SURNAMES),
        city: getRandom(CITIES),
        action: getRandom(ACTIONS),
        mins: Math.floor(Math.random() * 9) + 2
      });
      setVisible(true);

      hideTimer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      nextTimer = setTimeout(showRandomProof, 12000 + Math.random() * 8000);
    };

    const initialTimer = setTimeout(showRandomProof, 2800);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, []);

  if (!current) return null;

  return (
    <div
      className={`fixed bottom-20 sm:bottom-4 left-3 sm:left-4 z-50 max-w-[calc(100vw-5rem)] sm:max-w-xs transition-all duration-500 ease-out ${
        visible
          ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
          : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-[#dfe5ed] bg-white/95 px-3 py-2.5 sm:px-3.5 sm:py-3 shadow-xl backdrop-blur-md">
        {/* Fiverr Green Icon Badge */}
        <div className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full bg-[#1dbf73]/15 text-[#109655]">
          <span className="font-extrabold text-xs sm:text-sm">fi</span>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 text-[11px] sm:text-xs leading-snug">
          <div className="flex items-center gap-1 font-semibold text-[#0c172f] truncate">
            <span>{current.name}</span>
            <span className="text-[#535f6f] font-normal">from {current.city}</span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
          </div>
          <div className="mt-0.5 text-[#535f6f] line-clamp-2">
            {current.action.text} <span className={`font-bold ${current.action.highlight}`}>{current.action.service}</span>
            <span className="ml-1 text-[10px] text-gray-400">({current.mins}m ago)</span>
          </div>
        </div>

        {/* Dismiss */}
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss notification"
          className="shrink-0 rounded-full p-1 text-[#535f6f] transition-colors hover:bg-[#ecf3f8] hover:text-[#0c172f] cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
