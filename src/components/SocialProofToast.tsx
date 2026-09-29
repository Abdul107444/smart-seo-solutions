import React, { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

const NAMES = [
  'Ahmed', 'Fatima', 'Usman', 'Ali', 'Ayesha', 'Hassan',
  'Zainab', 'Bilal', 'Sana', 'Omar', 'Hira', 'Zara',
  'Hamza', 'Maryam', 'Saad', 'Danish', 'Mustafa', 'Khadija'
];

const CITIES = [
  'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad'
];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function SocialProofToast() {
  const [current, setCurrent] = useState<{ name: string; city: string; mins: number } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;

    const showRandomProof = () => {
      setCurrent({
        name: getRandom(NAMES),
        city: getRandom(CITIES),
        mins: Math.floor(Math.random() * 8) + 2
      });
      setVisible(true);

      hideTimer = setTimeout(() => {
        setVisible(false);
      }, 4500);

      nextTimer = setTimeout(showRandomProof, 14000 + Math.random() * 10000);
    };

    const initialTimer = setTimeout(showRandomProof, 3500);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, []);

  if (!current) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-[calc(100vw-2rem)] transition-all duration-500 sm:max-w-xs ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-[#dfe5ed] bg-white/95 px-3.5 py-3 shadow-xl backdrop-blur-md">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#2b62ef]/15 text-[#2b62ef]">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1 text-xs leading-tight">
          <div className="truncate font-semibold text-[#0c172f]">
            {current.name} from {current.city}
          </div>
          <div className="mt-0.5 text-[#535f6f]">
            enrolled in <span className="font-bold text-[#2b62ef]">Fiverr Blueprint ({current.mins}m ago)</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss notification"
          className="shrink-0 rounded-full p-1 text-[#535f6f] transition-colors hover:bg-[#ecf3f8] hover:text-[#0c172f]"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
