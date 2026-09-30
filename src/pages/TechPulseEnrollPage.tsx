import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Upload,
  User,
  Wallet,
  Lock,
  MessageCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';
import { saveLeadToFirestore } from '../lib/leadsService';

interface EnrollPageProps {
  onBack: () => void;
}

const STEP_TITLES: Record<number, string> = {
  1: 'Your Details',
  2: 'Send Payment',
  3: 'Upload Proof'
};

export function TechPulseEnrollPage({ onBack }: EnrollPageProps) {
  const [step, setStep] = useState<number>(1);
  const [leadInfo, setLeadInfo] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });
  const [leadId, setLeadId] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Step 3 proof states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [senderAccountName, setSenderAccountName] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // FAQ toggle
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Step 1: Submit Details
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const name = leadInfo.name.trim();
    const email = leadInfo.email.trim();
    const whatsapp = leadInfo.whatsapp.trim();

    if (!name) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!whatsapp || whatsapp.length < 8) {
      setErrorMessage('Please enter a valid WhatsApp number.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await saveLeadToFirestore({
        fullName: name,
        email: email,
        whatsapp: whatsapp,
        profileUrl: 'Smart SEO Solutions — Fiverr Profile & Gig Optimization',
        status: 'new',
        notes: `Selected Fiverr Profile & Gig Optimization - Rs. ${TECHPULSE_CONFIG.pricePKR}`,
        price: `Rs. ${TECHPULSE_CONFIG.pricePKR}`
      });

      if (res.id) {
        setLeadId(res.id);
      }
      setSubmitting(false);
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setSubmitting(false);
      // Proceed even if network fails locally
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle Proof File Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload an image file (PNG, JPG, JPEG).');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setErrorMessage(null);
  };

  // Step 3: Complete Submission
  const handleCompleteEnrollment = async () => {
    if (!selectedFile && !senderAccountName) {
      setErrorMessage('Please attach your payment screenshot or enter your sending account name.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      let base64 = '';
      if (selectedFile) {
        const reader = new FileReader();
        base64 = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(selectedFile);
        });
      }

      await saveLeadToFirestore({
        fullName: leadInfo.name,
        email: leadInfo.email,
        whatsapp: leadInfo.whatsapp,
        profileUrl: 'Smart SEO Solutions Fiverr Optimization Completed',
        status: 'pending_payment',
        receiptUrl: base64 || undefined,
        notes: `Payment submitted for Smart SEO Solutions Fiverr Optimization (Rs. ${TECHPULSE_CONFIG.pricePKR}). Sender account: ${senderAccountName || leadInfo.name}`,
        price: `Rs. ${TECHPULSE_CONFIG.pricePKR}`
      });

      setSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // WhatsApp verification message generator
  const getWhatsAppVerificationUrl = () => {
    const phone = TECHPULSE_CONFIG.whatsappEnrollNumber.replace(/[^0-9]/g, '');
    const accountName = senderAccountName.trim() || leadInfo.name || 'Client';
    const text = `Assalam-o-Alaikum! Mene Rs. 8,000 Fiverr Profile & Gig Optimization ki payment bhej di hai, screenshot attach hai.
Payment verification kar ke mere Fiverr account optimization ki onboarding start karein.
Client Name: ${accountName}
Email: ${leadInfo.email}`;
    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#f7fbfd] text-[#0c172f] pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-[#dfe5ed] bg-[#f7fbfd]/90 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-xl items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#dfe5ed] bg-white px-3 py-1.5 text-xs font-semibold text-[#0c172f] shadow-sm hover:bg-[#ecf3f8]"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#2b62ef]" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <img
              src="/techpulse-assets/logo.png"
              alt="Smart SEO Solutions"
              className="h-7 w-7 rounded-lg border border-[#dfe5ed]"
            />
            <span className="font-display text-sm font-bold">Smart SEO Solutions</span>
          </div>

          <div className="text-xs font-extrabold text-[#2b62ef]">
            PKR {TECHPULSE_CONFIG.pricePKR.toLocaleString()}
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="mx-auto max-w-xl px-4 pt-6 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-[#2b62ef]/30 bg-white p-5 sm:p-7 shadow-glow">
          {/* Header Bar */}
          <div className="mb-6 flex items-center justify-between border-b border-[#dfe5ed] pb-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2b62ef]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#fab72a]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#00bad2]" />
            </div>
            <div className="font-bold text-[#535f6f]">
              Book Optimization · Step {isSuccess ? '3' : step} of 3
            </div>
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#2b62ef]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </div>
          </div>

          {/* Stepper Progress */}
          {!isSuccess && (
            <div className="mb-6 flex items-center gap-2">
              {[1, 2, 3].map((s) => {
                const isCurrent = s === step;
                const isCompleted = s < step;
                return (
                  <div key={s} className="flex flex-1 items-center gap-2">
                    <div
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                        isCompleted
                          ? 'gradient-brand text-white'
                          : isCurrent
                          ? 'gradient-brand text-white shadow-glow'
                          : 'bg-[#ecf3f8] text-[#535f6f]'
                      }`}
                    >
                      {isCompleted ? <Check className="h-4 w-4" /> : s}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate text-[10px] font-extrabold uppercase tracking-wider ${
                          isCurrent || isCompleted ? 'text-[#0c172f]' : 'text-[#535f6f]'
                        }`}
                      >
                        {STEP_TITLES[s]}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
              {errorMessage}
            </div>
          )}

          {/* STEP 1: Your Details */}
          {!isSuccess && step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2b62ef]/30 bg-[#2b62ef]/10 px-3 py-1 text-xs font-bold uppercase text-[#2b62ef]">
                <User className="h-3.5 w-3.5" /> Step 1 of 3
              </div>

              <div>
                <h1 className="font-display text-2xl font-extrabold text-[#0c172f]">
                  Order Fiverr Profile & Gig Optimization
                </h1>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-[#2b62ef]">
                  Complete DFY Package: Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()} (Regular: Rs. {TECHPULSE_CONFIG.originalPricePKR.toLocaleString()})
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#535f6f] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hamza Saeed"
                    value={leadInfo.name}
                    onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                    className="w-full rounded-xl border border-[#dfe5ed] bg-[#f7fbfd] px-4 py-2.5 text-sm text-[#0c172f] outline-none transition focus:border-[#2b62ef] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#535f6f] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. hamza@gmail.com"
                    value={leadInfo.email}
                    onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                    className="w-full rounded-xl border border-[#dfe5ed] bg-[#f7fbfd] px-4 py-2.5 text-sm text-[#0c172f] outline-none transition focus:border-[#2b62ef] focus:bg-white"
                  />
                  <p className="mt-1 text-[11px] text-[#535f6f]">
                    We send your optimized keywords & 24h Ranking PDF to this email.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#535f6f] mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0306 1234567"
                    value={leadInfo.whatsapp}
                    onChange={(e) => setLeadInfo({ ...leadInfo, whatsapp: e.target.value })}
                    className="w-full rounded-xl border border-[#dfe5ed] bg-[#f7fbfd] px-4 py-2.5 text-sm text-[#0c172f] outline-none transition focus:border-[#2b62ef] focus:bg-white"
                  />
                  <p className="mt-1 text-[11px] text-[#535f6f]">
                    For direct SEO team audit updates and onboarding support.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#535f6f] mb-1">
                    Fiverr Profile URL or Username (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. fiverr.com/yourusername"
                    value={(leadInfo as any).fiverrProfileUrl || ''}
                    onChange={(e) => setLeadInfo({ ...leadInfo, fiverrProfileUrl: e.target.value } as any)}
                    className="w-full rounded-xl border border-[#dfe5ed] bg-[#f7fbfd] px-4 py-2.5 text-sm text-[#0c172f] outline-none transition focus:border-[#2b62ef] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#535f6f] mb-1">
                    Your Service Niche / Skill
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. WordPress, Video Editing, Graphic Design, Shopify, SEO..."
                    value={(leadInfo as any).niche || ''}
                    onChange={(e) => setLeadInfo({ ...leadInfo, niche: e.target.value } as any)}
                    className="w-full rounded-xl border border-[#dfe5ed] bg-[#f7fbfd] px-4 py-2.5 text-sm text-[#0c172f] outline-none transition focus:border-[#2b62ef] focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="gradient-brand w-full flex items-center justify-center gap-2 rounded-full py-4 text-base font-extrabold text-white shadow-glow hover:scale-[1.01] transition-transform"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs text-[#535f6f] pt-1">
                <Lock className="h-3.5 w-3.5 text-[#2b62ef]" />
                <span>Your details are private and used only to send your access.</span>
              </div>
            </form>
          )}

          {/* STEP 2: Send Payment */}
          {!isSuccess && step === 2 && (
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2b62ef]/30 bg-[#2b62ef]/10 px-3 py-1 text-xs font-bold uppercase text-[#2b62ef]">
                <Wallet className="h-3.5 w-3.5" /> Step 2 of 3
              </div>

              <div>
                <h1 className="font-display text-2xl font-extrabold text-[#0c172f]">
                  Send Your Payment.
                </h1>
                <p className="mt-1 flex items-center gap-1 text-xs sm:text-sm text-[#535f6f]">
                  <Lock className="h-3.5 w-3.5 text-[#2b62ef]" />
                  <span>
                    Send exactly{' '}
                    <span className="font-bold text-[#0c172f]">
                      Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}
                    </span>{' '}
                    to the account below.
                  </span>
                </p>
              </div>

              {/* Supported Apps Chips */}
              <div className="flex flex-wrap gap-1.5">
                {['UBL App', 'Easypaisa', 'JazzCash', 'Meezan Bank', 'SadaPay', 'NayaPay', '1Link'].map(
                  (method) => (
                    <span
                      key={method}
                      className="rounded-full bg-[#ecf3f8] px-2.5 py-1 text-[11px] font-bold text-[#0c172f]"
                    >
                      {method}
                    </span>
                  )
                )}
              </div>

              {/* Bank Account Details Card with Copy Buttons */}
              <div className="rounded-2xl border border-[#dfe5ed] bg-[#f7fbfd] p-4 space-y-3.5">
                {/* Bank Name */}
                <div className="flex items-center justify-between gap-3 border-b border-[#dfe5ed] pb-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#535f6f]">
                      Bank Name
                    </div>
                    <div className="font-display text-sm sm:text-base font-bold text-[#0c172f]">
                      {TECHPULSE_CONFIG.bankDetails.bankName}
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800">
                    Active
                  </span>
                </div>

                {/* Account Title */}
                <div className="flex items-center justify-between gap-3 border-b border-[#dfe5ed] pb-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#535f6f]">
                      Account Title
                    </div>
                    <div className="font-display text-base sm:text-lg font-extrabold text-[#0c172f]">
                      {TECHPULSE_CONFIG.bankDetails.accountTitle}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy('title', TECHPULSE_CONFIG.bankDetails.accountTitle)
                    }
                    className="inline-flex items-center gap-1 rounded-full border border-[#dfe5ed] bg-white px-3 py-1.5 text-xs font-bold text-[#0c172f] hover:bg-[#ecf3f8]"
                  >
                    {copiedKey === 'title' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Account Number */}
                <div className="flex items-center justify-between gap-3 border-b border-[#dfe5ed] pb-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#535f6f]">
                      Account Number
                    </div>
                    <div className="font-mono text-base sm:text-lg font-black tracking-wide text-[#2b62ef]">
                      {TECHPULSE_CONFIG.bankDetails.accountNumber}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy('number', TECHPULSE_CONFIG.bankDetails.accountNumber)
                    }
                    className="inline-flex items-center gap-1 rounded-full gradient-brand px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:scale-105 transition-transform"
                  >
                    {copiedKey === 'number' ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy Number
                      </>
                    )}
                  </button>
                </div>

                {/* Amount to Send */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#535f6f]">
                      Exact Amount
                    </div>
                    <div className="font-display text-lg font-black text-emerald-700">
                      Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy('amount', TECHPULSE_CONFIG.pricePKR.toString())
                    }
                    className="inline-flex items-center gap-1 rounded-full border border-[#dfe5ed] bg-white px-3 py-1.5 text-xs font-bold text-[#0c172f] hover:bg-[#ecf3f8]"
                  >
                    {copiedKey === 'amount' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs leading-relaxed text-amber-900">
                <span className="font-bold">Instructions:</span> Apni banking app (UBL, Meezan, Easypaisa, JazzCash ya kisi bhi bank) se Rs. {TECHPULSE_CONFIG.pricePKR} transfer karein aur successful payment ka screenshot save kar lein.
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-full border border-[#dfe5ed] bg-white px-5 py-3.5 text-xs font-bold text-[#535f6f] hover:bg-[#ecf3f8]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep(3);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="gradient-brand flex-1 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm sm:text-base font-extrabold text-white shadow-glow hover:scale-[1.01] transition-transform"
                >
                  <span>I Have Sent The Payment</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Upload Proof */}
          {!isSuccess && step === 3 && (
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2b62ef]/30 bg-[#2b62ef]/10 px-3 py-1 text-xs font-bold uppercase text-[#2b62ef]">
                <Upload className="h-3.5 w-3.5" /> Step 3 of 3
              </div>

              <div>
                <h1 className="font-display text-2xl font-extrabold text-[#0c172f]">
                  Upload Proof of Payment.
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-[#535f6f]">
                  Attach payment receipt screenshot so our team can verify and start your Fiverr gig audit.
                </p>
              </div>

              {/* Sender Account Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#535f6f] mb-1">
                  Your Sending Bank Account Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ali Khan (as shown in your bank account)"
                  value={senderAccountName}
                  onChange={(e) => setSenderAccountName(e.target.value)}
                  className="w-full rounded-xl border border-[#dfe5ed] bg-[#f7fbfd] px-4 py-2.5 text-sm text-[#0c172f] outline-none transition focus:border-[#2b62ef] focus:bg-white"
                />
              </div>

              {/* File Upload Drop Area */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#535f6f] mb-1">
                  Payment Receipt Screenshot
                </label>
                <label className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#2b62ef]/40 bg-[#f7fbfd] p-6 text-center cursor-pointer transition hover:bg-[#2b62ef]/5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  {previewUrl ? (
                    <div className="w-full space-y-2">
                      <img
                        src={previewUrl}
                        alt="Payment preview"
                        className="mx-auto max-h-48 rounded-lg border border-[#dfe5ed] object-contain shadow-sm"
                      />
                      <span className="block text-xs font-bold text-[#2b62ef]">
                        Click to choose another screenshot
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-[#2b62ef]/15 text-[#2b62ef] mb-2 group-hover:scale-110 transition-transform">
                        <Upload className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-bold text-[#0c172f]">
                        Tap to upload payment screenshot
                      </span>
                      <span className="mt-1 text-[11px] text-[#535f6f]">
                        PNG, JPG, or screenshot from banking app
                      </span>
                    </>
                  )}
                </label>
              </div>

              {/* Direct WhatsApp Verification CTA */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-900">
                      Instant WhatsApp Verification
                    </div>
                    <p className="mt-0.5 text-xs text-emerald-800 leading-relaxed">
                      You can also send your screenshot directly on WhatsApp to get immediate verification:
                    </p>
                    <a
                      href={getWhatsAppVerificationUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1.5 text-xs font-extrabold text-white shadow-sm hover:scale-105 transition-transform"
                    >
                      <MessageCircle className="h-3.5 w-3.5 fill-current" />
                      <span>Send Screenshot on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-full border border-[#dfe5ed] bg-white px-5 py-3.5 text-xs font-bold text-[#535f6f] hover:bg-[#ecf3f8]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCompleteEnrollment}
                  disabled={submitting}
                  className="gradient-brand flex-1 flex items-center justify-center gap-2 rounded-full py-4 text-base font-extrabold text-white shadow-glow hover:scale-[1.01] transition-transform"
                >
                  {submitting ? (
                    <span>Verifying...</span>
                  ) : (
                    <>
                      <span>Submit Payment Proof</span>
                      <CheckCircle2 className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success Screen */}
          {isSuccess && (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full gradient-brand text-white shadow-glow">
                <Check className="h-9 w-9" />
              </div>

              <h1 className="font-display text-3xl font-extrabold text-[#0c172f]">
                You're In! 🎉
              </h1>

              <p className="text-sm font-semibold text-[#0c172f] max-w-md mx-auto">
                Shukriya <span className="text-[#2b62ef]">{leadInfo.name}</span>! Aapki payment proof submission receive ho chuki hai.
              </p>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 text-left text-xs sm:text-sm space-y-2">
                <div className="font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  What Happens Next:
                </div>
                <ul className="list-disc list-inside space-y-1 text-emerald-800 text-xs">
                  <li>Hum aapki payment verify kar rahe hain.</li>
                  <li>Aapke WhatsApp aur email <strong className="text-emerald-950 font-bold">{leadInfo.email}</strong> par onboarding message aur details confirmation bhaiji ja rahi hai.</li>
                  <li>Direct audit onboarding ke liye neche diye gaye WhatsApp button par apna payment screenshot bhej dein.</li>
                </ul>
              </div>

              <div className="pt-3 space-y-2">
                <a
                  href={getWhatsAppVerificationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 text-base font-bold text-white shadow-lg hover:scale-[1.02] transition-transform"
                >
                  <MessageCircle className="h-5 w-5 fill-current" />
                  <span>Connect On WhatsApp ({TECHPULSE_CONFIG.whatsappEnrollNumber})</span>
                </a>

                <button
                  type="button"
                  onClick={onBack}
                  className="inline-block text-xs font-semibold text-[#535f6f] hover:text-[#0c172f] pt-2"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FAQs on Enrollment Page */}
        <section className="mt-10">
          <h2 className="mb-4 text-center font-display text-lg font-bold text-[#0c172f]">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2.5">
            {[
              {
                q: 'How will the Fiverr optimization be executed?',
                a: 'Once your Rs. 8,000 payment is verified, we connect with you on WhatsApp. We can either execute directly on your Fiverr account or share the complete deliverables sheet and guide you on a live AnyDesk screen-share session.'
              },
              {
                q: 'How long does the optimization take?',
                a: 'Full competitor research, SEO titles, 5 intent search tags, 1,200-character description, 3-tier pricing, and high-CTR thumbnail strategy are delivered in 2–4 business days.'
              },
              {
                q: 'What is the 20–25 Days 100% Money-Back Guarantee?',
                a: 'If after 20–25 days of published optimization you do not see search impressions growth, clicks, or buyer messages, we immediately refund your full Rs. 8,000 fee via WhatsApp with zero hassle.'
              },
              {
                q: 'Is this process safe for my Fiverr account?',
                a: 'Yes, 100%! We strictly follow Fiverr Terms of Service with ethical white-hat SEO strategies. No fake reviews, no bots, and no black-hat tactics.'
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-xl border border-[#dfe5ed] bg-white text-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-bold text-[#0c172f]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#535f6f] transition-transform ${
                        isOpen ? 'rotate-180 text-[#2b62ef]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-[#dfe5ed] bg-[#f7fbfd] px-4 py-3 leading-relaxed text-[#535f6f]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
