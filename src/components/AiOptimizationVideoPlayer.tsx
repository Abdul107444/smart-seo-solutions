import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Subtitles,
  Languages
} from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';

interface VideoPlayerProps {
  onEnroll: () => void;
}

interface Chapter {
  id: string;
  title: string;
  phase: string;
  startTime: number;
  duration: number;
  heading: string;
  tagline: string;
  urduSpeech: string;
  urduRomanSpeech: string;
  urduSubtitle: string;
  englishSubtitle: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'ch-01',
    title: 'The Problem',
    phase: 'Day 0: Dead Gig Problem',
    startTime: 0,
    duration: 20,
    heading: 'Why 90% of Fiverr Gigs Stay at 0 Impressions',
    tagline: 'Algorithm Traps & Ghosted Profiles',
    urduSpeech: 'اگر آپ کی فائیور گِگ ڈیڈ ہے اور زیرو امپریشنز آ رہے ہیں تو الگورتھم کرالنگ کا مسئلہ ہے۔ جنیرک کی ورڈز پر نئے سیلرز کبھی آرڈرز حاصل نہیں کر سکتے۔',
    urduRomanSpeech: 'Agar aap ki Fiverr gig dead hai aur zero clicks aa rahe hain, toh algorithm crawling issue hai. Generic keywords par kabhi orders nahi aate.',
    urduSubtitle: 'Pehle aapki gig dead rehti hai kyunke generic keywords par algorithm crawl nahi karta aur impressions zero rehte hain.',
    englishSubtitle: 'Your gig gets 0 impressions because generic tags prevent Fiverr search bots from indexing your profile.'
  },
  {
    id: 'ch-02',
    title: '10-Point Audit',
    phase: 'Day 1–3: Agency Setup',
    startTime: 20,
    duration: 25,
    heading: 'Day 1–3: 10-Point Full Profile & Gig Optimization',
    tagline: 'Live AnyDesk Screen-Share Setup',
    urduSpeech: 'ڈے ون سے ڈے تھری: اسمارٹ ایس ای او سلوشنز کی ٹیم اینی ڈیسک پر لائیو آپ کے سامنے بیٹھ کر پانچ لو کمپیٹیشن بائیر ٹیگز اور پرما لنک کی ورڈ سلگ لاک کرتی ہے۔',
    urduRomanSpeech: 'Day 1 se 3: Smart SEO Solutions team AnyDesk par live baith kar 5 low-competition buyer tags aur permalink keyword slug lock karti hai.',
    urduSubtitle: 'Smart SEO Solutions team AnyDesk par live baith kar 5 low-competition buyer tags aur permalink keyword slug lock karti hai.',
    englishSubtitle: 'Our team connects live via AnyDesk to inject 5 low-competition buyer tags, 1,200-char AIDA description & locked permalinks.'
  },
  {
    id: 'ch-03',
    title: 'Search Surge',
    phase: 'Day 4–10: Re-indexing',
    startTime: 45,
    duration: 25,
    heading: 'Day 4–10: Fiverr Algorithm Re-Indexes Your Gig',
    tagline: '+340% Organic Impressions Spike',
    urduSpeech: 'ڈے فور سے ڈے ٹین: فائیور کرالر نئے کی ورڈز کو ویریفائی کرتا ہے اور اینالیٹکس میں گرین ایروز کے ساتھ روزانہ تیس سے چالیس آرگینک بائیر کلکس آنا شروع ہو جاتے ہیں۔',
    urduRomanSpeech: 'Day 4 se 10: Fiverr crawler naye keywords verify karta hai aur analytics me green arrows ke sath daily 30-40 genuine buyer clicks aana shuru ho jate hain.',
    urduSubtitle: 'Fiverr crawler naye keywords verify karta hai aur analytics me green arrows ke sath daily 30-40 genuine buyer clicks aana shuru ho jate hain.',
    englishSubtitle: 'Fiverr automated crawlers verify the new metadata, triggering an organic impression spike with green analytics upward arrows.'
  },
  {
    id: 'ch-04',
    title: 'Decoy Pricing',
    phase: 'Day 11–20: Buyer Inquiries',
    startTime: 70,
    duration: 25,
    heading: 'Day 11–20: 3-Tier Decoy Pricing Attracts High-Paying Buyers',
    tagline: 'Inbound US & European Inquiries',
    urduSpeech: 'ڈے الیون سے ڈے ٹوئنٹی: ہائی سی ٹی آر تھمب نیل اور تھری ٹیر ڈیکوائے پرائسنگ کی وجہ سے انٹرنیشنل بائیرز ڈائریکٹ اِن باکس میں کسٹم آفرز مانگنا شروع کر دیتے ہیں۔',
    urduRomanSpeech: 'Day 11 se 20: High-CTR thumbnail aur 3-tier decoy pricing ki wajah se international buyers direct inbox me project requirements bhejna shuru kar dete hain.',
    urduSubtitle: 'High-CTR thumbnail aur 3-tier pricing ki wajah se international buyers direct inbox me project requirements bhejna shuru kar dete hain.',
    englishSubtitle: 'High-CTR thumbnail design and strategic decoy pricing convert incoming search traffic into serious buyer inbox inquiries.'
  },
  {
    id: 'ch-05',
    title: '1st Client Won',
    phase: 'Day 20–25: Milestone',
    startTime: 95,
    duration: 25,
    heading: 'Day 20–25: Closing Your 1st Client ($150–$350 USD)',
    tagline: '1st Order Completed & 5-Star Review',
    urduSpeech: 'ڈے ٹوئنٹی سے ٹوئنٹی فائیو: مبارک ہو! بیس سے پچیس دن میں آپ کا پہلا انٹرنیشنل کلائنٹ مکمل ہوتا ہے۔ گارنٹیڈ رزلٹ یا سو فیصد منی بیک گارنٹی!',
    urduRomanSpeech: 'Day 20 se 25: Mubarak ho! 20 se 25 din me aapka pehla paying international client close hota hai. Guaranteed result ya 100% money back!',
    urduSubtitle: 'Mubarak ho! 20 se 25 din me aapka pehla paying international client close hota hai. Guaranteed result ya 100% money back!',
    englishSubtitle: 'Milestone Achieved! Win your 1st international dollar client with 5-star feedback and our 20-25 days money-back guarantee.'
  }
];

const TOTAL_DURATION = 120; // 2 minutes video presentation

export function AiOptimizationVideoPlayer({ onEnroll }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [voiceLang, setVoiceLang] = useState<'ur' | 'en'>('ur'); // Default to Urdu voice
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasStartedOnce, setHasStartedOnce] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Determine active chapter
  const activeChapterIndex = CHAPTERS.findIndex(
    (ch) => currentTime >= ch.startTime && currentTime < ch.startTime + ch.duration
  );
  const currentChapter = CHAPTERS[activeChapterIndex >= 0 ? activeChapterIndex : CHAPTERS.length - 1];

  // Pre-load voices on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // Speech narration function: Native Urdu voice narration
  const speakChapterAudio = (chapter: Chapter) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || isMuted) {
      setIsSpeaking(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const voices = window.speechSynthesis.getVoices();

      // Look specifically for Urdu or Hindi voice (which pronounces Urdu with exact native phonetics)
      const urduOrHindiVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('ur') ||
          v.lang.toLowerCase().includes('pk') ||
          v.lang.toLowerCase().startsWith('hi')
      );

      let textToSpeak = '';
      if (voiceLang === 'ur') {
        // If native Urdu script voice available, use Urdu Nastaliq text; otherwise use clear Roman Urdu
        if (urduOrHindiVoice && (urduOrHindiVoice.lang.toLowerCase().startsWith('ur') || urduOrHindiVoice.lang.toLowerCase().startsWith('hi'))) {
          textToSpeak = chapter.urduSpeech;
        } else {
          textToSpeak = chapter.urduRomanSpeech;
        }
      } else {
        textToSpeak = chapter.englishSubtitle;
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.92; // Slightly deliberate for authority and clarity
      utterance.pitch = 1.0;

      if (voiceLang === 'ur') {
        if (urduOrHindiVoice) {
          utterance.voice = urduOrHindiVoice;
          utterance.lang = urduOrHindiVoice.lang;
        } else {
          utterance.lang = 'ur-PK';
        }
      } else {
        const engVoice = voices.find((v) => v.lang.includes('en-GB') || v.lang.includes('en-US'));
        if (engVoice) utterance.voice = engVoice;
        utterance.lang = 'en-US';
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  // Play / Pause timer
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return TOTAL_DURATION;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  // When chapter changes during active playback, trigger Urdu voice narration
  useEffect(() => {
    if (isPlaying && !isMuted) {
      speakChapterAudio(currentChapter);
    }
  }, [currentChapter.id, isPlaying, isMuted, voiceLang]);

  const handlePlayToggle = () => {
    if (!hasStartedOnce) {
      setHasStartedOnce(true);
    }
    if (currentTime >= TOTAL_DURATION) {
      setCurrentTime(0);
    }
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (nextState && !isMuted) {
      // Trigger voice right on play
      setTimeout(() => {
        speakChapterAudio(currentChapter);
      }, 200);
    }
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(Math.min(Math.max(newTime, 0), TOTAL_DURATION));
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (isPlaying && !isMuted) {
      setTimeout(() => {
        const targetChapter = CHAPTERS.find(
          (ch) => newTime >= ch.startTime && newTime < ch.startTime + ch.duration
        ) || CHAPTERS[0];
        speakChapterAudio(targetChapter);
      }, 250);
    }
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    if (!isMuted) {
      setTimeout(() => {
        speakChapterAudio(CHAPTERS[0]);
      }, 200);
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (nextMute) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    } else if (isPlaying) {
      speakChapterAudio(currentChapter);
    }
  };

  const toggleVoiceLanguage = () => {
    const nextLang = voiceLang === 'ur' ? 'en' : 'ur';
    setVoiceLang(nextLang);
    if (isPlaying && !isMuted) {
      setTimeout(() => {
        speakChapterAudio(currentChapter);
      }, 100);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / TOTAL_DURATION) * 100;

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border-2 border-[#2b62ef]/40 bg-[#070d19] shadow-2xl shadow-blue-500/25 transition-all select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none max-w-none' : ''
      }`}
    >
      {/* 16:9 Video Canvas Frame */}
      <div className="relative aspect-video w-full overflow-hidden flex flex-col justify-between">
        {/* Background Visual Layer */}
        {!hasStartedOnce && !isPlaying ? (
          /* High-res AI Cover Poster */
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/ai_video_cover_1790793620146.jpg"
              alt="AI Explainer Video: Smart SEO Solutions 20-25 Days Roadmap to 1st Fiverr Client"
              className="h-full w-full object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070d19] via-[#070d19]/40 to-black/30" />
          </div>
        ) : (
          /* Dynamic Animated Scene Background */
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0c162c] via-[#0a192f] to-[#04101e]">
            {/* Ambient Animated Glow Mesh */}
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#1dbf73]/15 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#2b62ef]/20 blur-3xl" />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />
          </div>
        )}

        {/* Top Header Overlay */}
        <div className="relative z-10 flex items-center justify-between p-3 sm:p-5 bg-gradient-to-b from-black/85 to-transparent">
          {/* Brand Tag */}
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-lg bg-[#1dbf73] text-white font-extrabold text-xs shadow-md">
              fi
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white tracking-tight">
                <span>Smart SEO Solutions</span>
                <span className="inline-block rounded-full bg-[#2b62ef]/30 px-2 py-0.5 text-[10px] font-extrabold text-cyan-300 border border-cyan-400/30">
                  AI Explainer Video
                </span>
              </div>
              <div className="text-[10px] text-gray-300 font-medium hidden sm:block">
                20–25 Days Roadmap: Dead Gig Se 1st International Client Tak
              </div>
            </div>
          </div>

          {/* Right Badges & Urdu Voice Indicator */}
          <div className="flex items-center gap-2">
            {/* Urdu Voice Indicator */}
            <button
              type="button"
              onClick={toggleVoiceLanguage}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1dbf73]/20 hover:bg-[#1dbf73]/30 px-2.5 py-1 text-[10px] sm:text-xs font-bold text-emerald-300 border border-[#1dbf73]/40 shadow-xs transition-all cursor-pointer"
              title="Click to toggle Urdu / English voice"
            >
              <span>{voiceLang === 'ur' ? '🇵🇰 Urdu Voice' : '🇬🇧 English Voice'}</span>
              {isSpeaking && (
                <span className="flex items-center gap-0.5 ml-1">
                  <span className="h-2 w-0.5 bg-emerald-400 animate-pulse" />
                  <span className="h-3.5 w-0.5 bg-emerald-300 animate-pulse delay-75" />
                  <span className="h-2.5 w-0.5 bg-emerald-400 animate-pulse delay-150" />
                </span>
              )}
            </button>

            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-emerald-400 border border-emerald-500/30 hidden xs:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              1080p HD
            </span>
          </div>
        </div>

        {/* Center Dynamic Video Stage */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-3 sm:p-8 text-center">
          {!hasStartedOnce && !isPlaying ? (
            /* Big Splash Play Screen */
            <div className="flex flex-col items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={handlePlayToggle}
                aria-label="Play AI Video"
                className="group relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#1dbf73] to-[#2b62ef] text-white shadow-2xl shadow-emerald-500/50 transition-all hover:scale-110 active:scale-95 cursor-pointer"
              >
                <div className="absolute inset-0 rounded-full bg-white opacity-25 animate-ping group-hover:opacity-40" />
                <Play className="h-8 w-8 sm:h-10 sm:w-10 fill-white ml-1" />
              </button>
              <div className="max-w-md">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-400/30">
                  <Languages className="h-3.5 w-3.5" /> 20–25 Days 1st Client — Urdu Voice Narration
                </span>
                <h3 className="mt-2 text-base sm:text-2xl font-black text-white leading-snug drop-shadow-md">
                  Watch How Full Optimization Wins Your 1st Paying Client
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-200">
                  اردو آواز میں مکمل گائیڈ: ڈیڈ گِگ سے پہلے کلائنٹ تک کا بیس سے پچیس دن کا لائیو فارمولا
                </p>
              </div>
            </div>
          ) : (
            /* Active Motion Scene Simulation */
            <div className="w-full max-w-2xl transition-all duration-500 animate-in fade-in zoom-in-95">
              {/* Phase Banner */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1dbf73]/20 px-3.5 py-1 text-xs font-extrabold text-[#22c55e] border border-[#1dbf73]/40 shadow-xs mb-2 sm:mb-3">
                <Clock className="h-3.5 w-3.5" />
                <span>{currentChapter.phase}</span>
              </div>

              {/* Dynamic Title */}
              <h2 className="text-lg sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {currentChapter.heading}
              </h2>
              <p className="text-xs sm:text-base font-semibold text-cyan-300 mt-1">
                {currentChapter.tagline}
              </p>

              {/* Interactive Scene Visuals */}
              <div className="mt-3 sm:mt-4 mx-auto max-w-lg overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-3 sm:p-4 shadow-xl">
                {activeChapterIndex === 0 && (
                  /* Scene 1: Dead Gig Problem */
                  <div className="flex items-center justify-between gap-3 text-left">
                    <div className="space-y-1 text-xs text-gray-300">
                      <div className="text-rose-400 font-bold flex items-center gap-1">
                        <span>⚠️ Stalled Gig Detected</span>
                      </div>
                      <div>• Generic Search Tags: 0 Search Value</div>
                      <div>• Missing Low-Competition Buyer Keywords</div>
                      <div>• Daily Impressions: &lt; 2 clicks/week</div>
                    </div>
                    <div className="rounded-lg bg-rose-950/60 border border-rose-500/40 p-2.5 text-center">
                      <div className="text-rose-400 font-mono text-xl font-black">0 ORDERS</div>
                      <div className="text-[10px] text-gray-400">Search Ghosted</div>
                    </div>
                  </div>
                )}

                {activeChapterIndex === 1 && (
                  /* Scene 2: 10-Point Audit AnyDesk */
                  <div className="grid grid-cols-2 gap-2 text-left text-xs">
                    <div className="rounded-lg bg-emerald-950/40 border border-emerald-500/30 p-2">
                      <span className="font-bold text-emerald-400">✓ 5 Buyer Tags</span>
                      <p className="text-[11px] text-gray-300 mt-0.5">Low-competition US tags</p>
                    </div>
                    <div className="rounded-lg bg-blue-950/40 border border-blue-500/30 p-2">
                      <span className="font-bold text-cyan-400">✓ Locked Permalinks</span>
                      <p className="text-[11px] text-gray-300 mt-0.5">Primary keyword in URL slug</p>
                    </div>
                    <div className="rounded-lg bg-purple-950/40 border border-purple-500/30 p-2">
                      <span className="font-bold text-purple-400">✓ 1200-Char Description</span>
                      <p className="text-[11px] text-gray-300 mt-0.5">AIDA buyer psychology copy</p>
                    </div>
                    <div className="rounded-lg bg-amber-950/40 border border-amber-500/30 p-2">
                      <span className="font-bold text-amber-400">✓ AnyDesk Session</span>
                      <p className="text-[11px] text-gray-300 mt-0.5">Live screen-share setup</p>
                    </div>
                  </div>
                )}

                {activeChapterIndex === 2 && (
                  /* Scene 3: Search Surge & Green Arrows */
                  <div className="flex items-center justify-between gap-4 text-left">
                    <div className="space-y-1">
                      <div className="text-emerald-400 font-bold text-sm">▲ Organic Algorithm Spike</div>
                      <div className="text-xs text-gray-300">Daily Impressions: <strong className="text-white">40+ clicks/day</strong></div>
                      <div className="text-xs text-gray-300">Crawler Status: <strong className="text-emerald-400">Re-indexed Live</strong></div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-black text-emerald-400">+340%</div>
                      <div className="text-[10px] text-gray-400">Impression Surge</div>
                    </div>
                  </div>
                )}

                {activeChapterIndex === 3 && (
                  /* Scene 4: Decoy Pricing & Inbound Chats */
                  <div className="flex items-center justify-between gap-3 text-left">
                    <div className="space-y-1 text-xs">
                      <div className="text-cyan-300 font-bold">🇺🇸 US Buyer Inquired:</div>
                      <div className="bg-white/10 rounded-lg p-2 text-white italic text-[11px]">
                        "Found your gig via search. Sending $250 project details!"
                      </div>
                    </div>
                    <div className="rounded-lg bg-blue-900/50 border border-blue-400/40 p-2 text-center shrink-0">
                      <div className="text-cyan-300 font-bold text-sm">$220-$350</div>
                      <div className="text-[10px] text-gray-300">Decoy Premium</div>
                    </div>
                  </div>
                )}

                {activeChapterIndex === 4 && (
                  /* Scene 5: 1st Client Won & Money-Back Guarantee */
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                    <div>
                      <div className="flex items-center gap-1 text-emerald-400 font-black text-sm">
                        <CheckCircle2 className="h-4 w-4" /> 1ST CLIENT ORDER COMPLETED!
                      </div>
                      <div className="text-xs text-gray-200 mt-0.5">
                        Amount: <strong className="text-white">$250.00 USD</strong> · 5.0 ★★★★★ Feedback
                      </div>
                      <div className="text-[11px] text-emerald-300 font-medium">
                        20–25 Days Guarantee: Full refund if no results
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={onEnroll}
                      className="gradient-brand inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold text-white shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <span>Book (Rs. 8k)</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Subtitles & Interactive Controls Bar */}
        <div className="relative z-10 bg-gradient-to-t from-black via-black/90 to-transparent p-3 sm:p-4">
          {/* Subtitles Overlay */}
          {showSubtitles && hasStartedOnce && (
            <div className="mx-auto max-w-2xl text-center mb-2 px-2">
              <div className="inline-block rounded-xl bg-black/85 backdrop-blur-md px-3 py-1.5 border border-white/10 shadow-lg">
                {/* Urdu Script & Roman Urdu Subtitle */}
                <p className="text-xs sm:text-sm font-semibold text-emerald-300 leading-snug">
                  {currentChapter.urduSubtitle}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-300 leading-snug mt-0.5">
                  {currentChapter.englishSubtitle}
                </p>
              </div>
            </div>
          )}

          {/* Scrubber Progress Bar */}
          <div className="relative mb-2">
            <div
              className="h-2 w-full cursor-pointer overflow-hidden rounded-full bg-white/20 transition-all hover:h-2.5"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = clickX / rect.width;
                handleSeek(ratio * TOTAL_DURATION);
              }}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1dbf73] via-cyan-400 to-[#2b62ef] transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Chapter Markers */}
            <div className="pointer-events-none absolute inset-0 flex justify-between px-1">
              {CHAPTERS.map((ch) => (
                <div
                  key={ch.id}
                  className="h-full w-0.5 bg-black/60"
                  style={{ left: `${(ch.startTime / TOTAL_DURATION) * 100}%` }}
                />
              ))}
            </div>
          </div>

          {/* Controls Bottom Row */}
          <div className="flex items-center justify-between gap-2 text-white">
            {/* Left: Play / Pause / Replay & Time */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handlePlayToggle}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 active:scale-95 transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={handleRestart}
                aria-label="Restart video"
                className="hidden xs:grid h-8 w-8 place-items-center rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                title="Restart"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>

              {/* Time display */}
              <div className="text-[11px] sm:text-xs font-mono font-medium text-gray-300">
                <span>{formatTime(currentTime)}</span>
                <span className="text-gray-500"> / </span>
                <span>{formatTime(TOTAL_DURATION)}</span>
              </div>
            </div>

            {/* Middle: Active Chapter Pills (Desktop) */}
            <div className="hidden md:flex items-center gap-1.5 overflow-x-auto">
              {CHAPTERS.map((ch, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => handleSeek(ch.startTime)}
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1dbf73] text-white shadow-xs'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {ch.title}
                  </button>
                );
              })}
            </div>

            {/* Right: Urdu Voice Toggle, Mute, CC, Fullscreen & Direct Book */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleVoiceLanguage}
                aria-label="Switch Urdu or English Audio"
                className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-emerald-300 transition-all cursor-pointer flex items-center gap-1"
                title="Switch Urdu / English voice narration"
              >
                <span>{voiceLang === 'ur' ? 'اردو' : 'EN'}</span>
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute Urdu voice' : 'Mute Urdu voice'}
                className="grid h-8 w-8 place-items-center rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                title={isMuted ? 'Unmute Urdu voice narration' : 'Mute Urdu voice narration'}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-rose-400" />
                ) : (
                  <Volume2 className="h-4 w-4 text-emerald-400" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowSubtitles(!showSubtitles)}
                aria-label="Toggle Subtitles"
                className={`grid h-8 w-8 place-items-center rounded-full transition-all cursor-pointer ${
                  showSubtitles ? 'text-cyan-400 bg-white/10' : 'text-gray-400 hover:text-white'
                }`}
                title="Subtitles CC"
              >
                <Subtitles className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="Toggle Fullscreen"
                className="grid h-8 w-8 place-items-center rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                title="Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>

              <button
                type="button"
                onClick={onEnroll}
                className="gradient-brand hidden sm:inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Book (Rs. 8k)</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Quick Bar Below Video on Mobile */}
      <div className="flex md:hidden items-center justify-between overflow-x-auto gap-1 border-t border-white/10 bg-black/60 px-3 py-2 text-[10px]">
        {CHAPTERS.map((ch, idx) => {
          const isActive = activeChapterIndex === idx;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => handleSeek(ch.startTime)}
              className={`shrink-0 rounded-full px-2 py-0.5 font-bold transition-all cursor-pointer ${
                isActive ? 'bg-[#1dbf73] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {ch.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
