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
  ChevronDown,
  Download,
  FileText,
  ExternalLink,
  AlertCircle,
  Loader2,
  Sparkles
} from 'lucide-react';
import { TECHPULSE_CONFIG } from '../data/techpulseData';
import { saveLeadToFirestore, updateLeadPaymentInFirestore } from '../lib/leadsService';
import { verifyPaymentScreenshot, VerificationResult } from '../lib/paymentVerifier';
import {
  downloadOfficialMethodPdf,
  METHOD_PDF_URL,
  METHOD_PDF_FILENAME
} from '../lib/methodPdfDownload';

interface EnrollPageProps {
  onBack: () => void;
}

const STEP_TITLES: Record<number, string> = {
  1: 'Your Details',
  2: 'Send Payment',
  3: 'AI Verification'
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

  // Step 3 proof & AI verification states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedScreenshot, setCompressedScreenshot] = useState<string>('');
  const [senderAccountName, setSenderAccountName] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationProgress, setVerificationProgress] = useState<string>('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  // Submission & PDF download states
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [downloadCount, setDownloadCount] = useState<number>(0);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // FAQ toggle
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Compress uploaded image for Firestore 1MB safety
  const compressReceiptImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawResult = (event.target?.result as string) || '';
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.82));
          } else {
            resolve(rawResult);
          }
        };
        img.onerror = () => resolve(rawResult);
        img.src = rawResult;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  // Trigger PDF Download cleanly
  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    const ok = await downloadOfficialMethodPdf();
    setIsDownloadingPdf(false);
    if (ok) {
      setDownloadCount((prev) => prev + 1);
    }
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
        niche: '24-Hour Fiverr Gig Ranking Method (PDF)',
        profileUrl: 'Smart SEO Solutions — 24h Fiverr Gig Ranking Method',
        status: 'new',
        notes: `Started order for 24h Fiverr Gig Ranking Method - Rs. ${TECHPULSE_CONFIG.pricePKR}`,
        price: `Rs. ${TECHPULSE_CONFIG.pricePKR}`
      });

      if (res.id) {
        setLeadId(res.id);
      }
      setSubmitting(false);
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setSubmitting(false);
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle Proof File Change + Automatic AI Verification
  const processUploadedScreenshot = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setVerificationResult(null);
    setIsVerifying(true);
    setVerificationProgress('Starting AI receipt scan...');

    try {
      const [compressed, aiResult] = await Promise.all([
        compressReceiptImage(file),
        verifyPaymentScreenshot(file, (progress) => {
          setVerificationProgress(progress);
        })
      ]);

      setCompressedScreenshot(compressed);
      setVerificationResult(aiResult);

      if (aiResult.isValid && aiResult.detectedDetails?.transactionId) {
        setTransactionId(aiResult.detectedDetails.transactionId);
      }

      if (!aiResult.isValid) {
        setErrorMessage(aiResult.reason);
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message || 'AI verification encountered an error. Please upload a clear payment screenshot.'
      );
    } finally {
      setIsVerifying(false);
      setVerificationProgress('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedScreenshot(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedScreenshot(file);
    }
  };

  // Step 3: Complete Verified Submission & Unlock PDF
  const handleCompleteEnrollment = async () => {
    if (!selectedFile) {
      setErrorMessage('Please upload your payment receipt screenshot first.');
      return;
    }

    if (isVerifying) {
      setErrorMessage('Please wait a moment while AI verification finishes scanning your receipt.');
      return;
    }

    if (!verificationResult?.isValid) {
      setErrorMessage(
        verificationResult?.reason ||
          'Payment screenshot must pass AI verification before unlocking the PDF download.'
      );
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    const finalTid =
      transactionId.trim() || verificationResult.detectedDetails?.transactionId || '';
    const provider = verificationResult.detectedDetails?.provider || 'Meezan Bank';
    const noteText = `AI Verified (${verificationResult.confidence}% confidence) • ${provider} • Sender: ${
      senderAccountName.trim() || leadInfo.name
    }${finalTid ? ` • TID: ${finalTid}` : ''} • PDF Unlocked`;

    try {
      if (leadId) {
        await updateLeadPaymentInFirestore(leadId, {
          paymentMethod: provider,
          transactionId: finalTid,
          paymentScreenshot: compressedScreenshot || undefined,
          price: `Rs. ${TECHPULSE_CONFIG.pricePKR}`,
          isPaymentVerified: true,
          verificationNote: verificationResult.reason,
          status: 'completed',
          notes: noteText
        });
      } else {
        await saveLeadToFirestore({
          fullName: leadInfo.name.trim(),
          email: leadInfo.email.trim(),
          whatsapp: leadInfo.whatsapp.trim(),
          niche: '24-Hour Fiverr Gig Ranking Method (PDF)',
          profileUrl: 'Smart SEO Solutions 24h Method Payment Verified',
          paymentMethod: provider,
          transactionId: finalTid,
          paymentScreenshot: compressedScreenshot || undefined,
          isPaymentVerified: true,
          verificationNote: verificationResult.reason,
          status: 'completed',
          notes: noteText,
          price: `Rs. ${TECHPULSE_CONFIG.pricePKR}`
        });
      }
    } catch (err) {
      console.warn('Firestore update warning (unlocking PDF anyway):', err);
    } finally {
      setSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Automatically start downloading the official PDF
      handleDownloadPdf();
    }
  };

  // WhatsApp support message generator
  const getWhatsAppSupportUrl = () => {
    const phone = TECHPULSE_CONFIG.whatsappEnrollNumber.replace(/[^0-9]/g, '');
    const accountName = senderAccountName.trim() || leadInfo.name || 'Client';
    const text = `Hello! I have completed my Rs. ${TECHPULSE_CONFIG.pricePKR.toLocaleString()} payment and AI verification for the 24-Hour Fiverr Gig Ranking Method PDF.
Name: ${accountName}
Email: ${leadInfo.email}
${transactionId ? `Transaction ID: ${transactionId}\n` : ''}I have downloaded the PDF and wanted to connect for support.`;
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
            className="inline-flex items-center gap-1.5 rounded-full border border-[#dfe5ed] bg-white px-3 py-1.5 text-xs font-semibold text-[#0c172f] shadow-sm hover:bg-[#ecf3f8] cursor-pointer"
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
              {isSuccess ? 'Verified · Instant PDF Download' : `Order Method · Step ${step} of 3`}
            </div>
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#2b62ef]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              AI Active
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
            <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMessage}</span>
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
                  Get The 24-Hour Gig Ranking Method
                </h1>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-[#2b62ef]">
                  Complete Method Blueprint PDF: Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()} (Regular: Rs. {TECHPULSE_CONFIG.originalPricePKR.toLocaleString()})
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
                    Used for your purchase receipt &amp; instant PDF access unlock.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#535f6f] mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0310 1234567"
                    value={leadInfo.whatsapp}
                    onChange={(e) => setLeadInfo({ ...leadInfo, whatsapp: e.target.value })}
                    className="w-full rounded-xl border border-[#dfe5ed] bg-[#f7fbfd] px-4 py-2.5 text-sm text-[#0c172f] outline-none transition focus:border-[#2b62ef] focus:bg-white"
                  />
                  <p className="mt-1 text-[11px] text-[#535f6f]">
                    For instant method delivery &amp; 24/7 implementation support.
                  </p>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="gradient-brand w-full flex items-center justify-center gap-2 rounded-full py-4 text-base font-extrabold text-white shadow-glow hover:scale-[1.01] transition-transform cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs text-[#535f6f] pt-1">
                <Lock className="h-3.5 w-3.5 text-[#2b62ef]" />
                <span>Your details are private and used only to unlock your PDF access.</span>
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
                    to the Meezan Bank account below.
                  </span>
                </p>
              </div>

              {/* Supported Apps Chips */}
              <div className="flex flex-wrap gap-1.5">
                {['Meezan Bank', 'Easypaisa', 'JazzCash', 'SadaPay', 'NayaPay', 'UBL App', '1Link'].map(
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
                    className="inline-flex items-center gap-1 rounded-full border border-[#dfe5ed] bg-white px-3 py-1.5 text-xs font-bold text-[#0c172f] hover:bg-[#ecf3f8] cursor-pointer"
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

                {/* Account Number / IBAN */}
                <div className="flex items-center justify-between gap-3 border-b border-[#dfe5ed] pb-3">
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#535f6f]">
                      IBAN / Account Number
                    </div>
                    <div className="font-mono text-sm sm:text-base font-black tracking-wide text-[#2b62ef] break-all">
                      {TECHPULSE_CONFIG.bankDetails.accountNumber}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy('number', TECHPULSE_CONFIG.bankDetails.accountNumber)
                    }
                    className="inline-flex shrink-0 items-center gap-1 rounded-full gradient-brand px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:scale-105 transition-transform cursor-pointer"
                  >
                    {copiedKey === 'number' ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy IBAN
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
                    className="inline-flex items-center gap-1 rounded-full border border-[#dfe5ed] bg-white px-3 py-1.5 text-xs font-bold text-[#0c172f] hover:bg-[#ecf3f8] cursor-pointer"
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
                <span className="font-bold">Instructions:</span> Transfer Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()} via your banking app (Meezan Bank, Easypaisa, JazzCash, SadaPay, NayaPay, or any bank) and save a screenshot of the successful transaction. In the next step, our AI will verify your receipt and immediately unlock your PDF download!
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-full border border-[#dfe5ed] bg-white px-5 py-3.5 text-xs font-bold text-[#535f6f] hover:bg-[#ecf3f8] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setStep(3);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="gradient-brand flex-1 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm sm:text-base font-extrabold text-white shadow-glow hover:scale-[1.01] transition-transform cursor-pointer"
                >
                  <span>I Have Sent The Payment</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Upload Proof & Instant AI Verification */}
          {!isSuccess && step === 3 && (
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2b62ef]/30 bg-[#2b62ef]/10 px-3 py-1 text-xs font-bold uppercase text-[#2b62ef]">
                <ShieldCheck className="h-3.5 w-3.5" /> Step 3 of 3 · AI Verification
              </div>

              <div>
                <h1 className="font-display text-2xl font-extrabold text-[#0c172f]">
                  Upload Payment Screenshot.
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-[#535f6f]">
                  Upload your Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()} transfer receipt. Our AI verifies your receipt in seconds and immediately unlocks your{' '}
                  <strong className="text-[#0c172f]">Fiverr Gig Rank Method PDF</strong> for download.
                </p>
              </div>

              {/* Sender Account Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#535f6f] mb-1">
                  Sender Bank / Wallet Account Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ali Khan (as shown on your receipt)"
                  value={senderAccountName}
                  onChange={(e) => setSenderAccountName(e.target.value)}
                  className="w-full rounded-xl border border-[#dfe5ed] bg-[#f7fbfd] px-4 py-2.5 text-sm text-[#0c172f] outline-none transition focus:border-[#2b62ef] focus:bg-white"
                />
              </div>

              {/* File Upload Drop Area */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#535f6f] mb-1">
                  Payment Receipt Screenshot *
                </label>
                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition ${
                    verificationResult?.isValid
                      ? 'border-emerald-400 bg-emerald-50/40'
                      : verificationResult && !verificationResult.isValid
                      ? 'border-rose-300 bg-rose-50/40'
                      : 'border-[#2b62ef]/40 bg-[#f7fbfd] hover:bg-[#2b62ef]/5'
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  {previewUrl ? (
                    <div className="w-full space-y-2.5">
                      <img
                        src={previewUrl}
                        alt="Payment receipt preview"
                        className="mx-auto max-h-52 rounded-lg border border-[#dfe5ed] object-contain shadow-sm"
                      />
                      <span className="inline-block text-xs font-bold text-[#2b62ef] underline">
                        Click or drop to upload a different screenshot
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-[#2b62ef]/15 text-[#2b62ef] mb-2 group-hover:scale-110 transition-transform">
                        <Upload className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-bold text-[#0c172f]">
                        Tap or drag &amp; drop payment screenshot
                      </span>
                      <span className="mt-1 text-[11px] text-[#535f6f]">
                        PNG, JPG, or screenshot showing transfer to Zeenat yasmin (Meezan Bank)
                      </span>
                    </>
                  )}
                </label>
              </div>

              {/* Live AI Verification Status Box */}
              {isVerifying && (
                <div className="rounded-2xl border border-[#2b62ef]/30 bg-[#2b62ef]/5 p-4 flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-[#2b62ef] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold text-[#0c172f]">
                      AI Receipt Verification Running...
                    </div>
                    <p className="text-[11px] text-[#535f6f] mt-0.5 truncate">
                      {verificationProgress || 'Analyzing recipient, amount & transaction ID...'}
                    </p>
                  </div>
                </div>
              )}

              {/* AI Verification Result Card */}
              {!isVerifying && verificationResult && (
                <div
                  className={`rounded-2xl border p-4 space-y-2.5 ${
                    verificationResult.isValid
                      ? 'border-emerald-300 bg-emerald-50/80'
                      : 'border-rose-300 bg-rose-50/80'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {verificationResult.isValid ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={`text-xs font-extrabold ${
                            verificationResult.isValid ? 'text-emerald-900' : 'text-rose-900'
                          }`}
                        >
                          {verificationResult.title}
                        </span>
                        {verificationResult.isValid && (
                          <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                            AI Verified ({verificationResult.confidence}%)
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          verificationResult.isValid ? 'text-emerald-800' : 'text-rose-800'
                        }`}
                      >
                        {verificationResult.reason}
                      </p>
                    </div>
                  </div>

                  {verificationResult.isValid && (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200/80 text-[11px]">
                      <div className="rounded-lg bg-white/80 px-2.5 py-1.5 border border-emerald-200/70">
                        <span className="text-[#535f6f] block text-[10px]">Recipient</span>
                        <span className="font-bold text-emerald-950">
                          {verificationResult.detectedDetails?.recipientName || 'Zeenat yasmin'}
                        </span>
                      </div>
                      <div className="rounded-lg bg-white/80 px-2.5 py-1.5 border border-emerald-200/70">
                        <span className="text-[#535f6f] block text-[10px]">Provider</span>
                        <span className="font-bold text-emerald-950">
                          {verificationResult.detectedDetails?.provider || 'Meezan Bank'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Extracted / Optional Transaction ID */}
              {verificationResult?.isValid && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#535f6f] mb-1">
                    Transaction ID / TID (Auto-Detected)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. FT2512345678"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full rounded-xl border border-[#dfe5ed] bg-[#f7fbfd] px-4 py-2.5 text-sm font-mono text-[#0c172f] outline-none transition focus:border-[#2b62ef] focus:bg-white"
                  />
                </div>
              )}

              {/* Submit & Unlock PDF Button */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setStep(2);
                  }}
                  className="rounded-full border border-[#dfe5ed] bg-white px-5 py-3.5 text-xs font-bold text-[#535f6f] hover:bg-[#ecf3f8] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCompleteEnrollment}
                  disabled={submitting || isVerifying || !verificationResult?.isValid}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-full py-4 px-5 text-sm sm:text-base font-extrabold text-white transition-all ${
                    submitting || isVerifying || !verificationResult?.isValid
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'gradient-brand shadow-glow hover:scale-[1.01] cursor-pointer'
                  }`}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Unlocking PDF...</span>
                    </>
                  ) : isVerifying ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>AI Scanning...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5" />
                      <span>Unlock &amp; Download Method PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success & Instant PDF Download Screen */}
          {isSuccess && (
            <div className="text-center py-4 space-y-5">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                <Check className="h-9 w-9 stroke-[3]" />
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI Payment Verified · Instant Access Unlocked</span>
              </div>

              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0c172f]">
                  Your PDF Is Ready, {leadInfo.name}!
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-[#535f6f] max-w-md mx-auto leading-relaxed">
                  Your Rs. {TECHPULSE_CONFIG.pricePKR.toLocaleString()} payment has been verified by AI. Download your official{' '}
                  <strong className="text-[#0c172f]">Fiverr Gig Rank Method PDF</strong> below and start ranking on page 1!
                </p>
              </div>

              {/* Highlighted PDF Download Card */}
              <div className="rounded-2xl border-2 border-[#2b62ef]/30 bg-gradient-to-b from-[#f7fbfd] to-white p-5 sm:p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3.5 rounded-xl border border-[#dfe5ed] bg-white p-3.5 text-left">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-rose-50 border border-rose-200 text-rose-600">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-extrabold text-[#0c172f] truncate">
                      {METHOD_PDF_FILENAME}
                    </div>
                    <div className="text-[11px] font-medium text-[#535f6f]">
                      Official Step-by-Step 24-Hour Fiverr Gig Ranking Blueprint
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-extrabold text-emerald-800 shrink-0">
                    UNLOCKED
                  </span>
                </div>

                {/* Primary Download Button */}
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isDownloadingPdf}
                  className="gradient-brand w-full flex items-center justify-center gap-2.5 rounded-full py-4 px-6 text-base font-extrabold text-white shadow-glow hover:scale-[1.02] active:scale-[0.99] transition-transform cursor-pointer"
                >
                  {isDownloadingPdf ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Download className="h-5 w-5" />
                  )}
                  <span>
                    {isDownloadingPdf ? 'Downloading PDF...' : 'Download Gig Rank Method PDF'}
                  </span>
                </button>

                {/* Secondary Open/View in New Tab Button */}
                <a
                  href={METHOD_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#dfe5ed] bg-white py-3 px-5 text-xs sm:text-sm font-bold text-[#0c172f] hover:bg-[#ecf3f8] transition-colors"
                >
                  <ExternalLink className="h-4 w-4 text-[#2b62ef]" />
                  <span>Open / View PDF in Browser</span>
                </a>

                {downloadCount > 0 && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>
                      PDF download started! ({downloadCount}x — tap the blue button anytime to download again)
                    </span>
                  </div>
                )}
              </div>

              {/* Optional Support Actions */}
              <div className="pt-2 space-y-3 border-t border-[#dfe5ed]">
                <p className="text-xs text-[#535f6f]">
                  Need help picking a long-tail keyword or applying the method?
                </p>
                <a
                  href={getWhatsAppSupportUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-bold text-white shadow-md hover:scale-[1.01] transition-transform"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  <span>WhatsApp Support ({TECHPULSE_CONFIG.whatsappEnrollNumber})</span>
                </a>

                <button
                  type="button"
                  onClick={onBack}
                  className="inline-block text-xs font-semibold text-[#535f6f] hover:text-[#0c172f] pt-1 cursor-pointer"
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
                q: 'Am I buying a method or a done-for-you service?',
                a: `You are purchasing our complete, step-by-step 24-Hour Fiverr Gig Ranking Method PDF for Rs. ${TECHPULSE_CONFIG.pricePKR.toLocaleString()} so you can rank your own gigs yourself.`
              },
              {
                q: 'How fast will I receive the PDF after payment?',
                a: `Instantly! As soon as you upload your Rs. ${TECHPULSE_CONFIG.pricePKR.toLocaleString()} payment screenshot, our AI verification system checks your receipt in seconds and immediately unlocks the Fiverr Gig Rank Method PDF for one-click download.`
              },
              {
                q: 'What is the 20–25 Days 100% Money-Back Guarantee?',
                a: `If after 20–25 days of applying the steps inside our method you do not see search impressions growth, clicks, or buyer messages, we immediately refund your full Rs. ${TECHPULSE_CONFIG.pricePKR.toLocaleString()} fee via WhatsApp with zero hassle.`
              },
              {
                q: 'Do I need to share my Fiverr login or password?',
                a: 'No! We never ask for your Fiverr login, password, or remote computer access. You apply the entire white-hat method safely on your own account.'
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
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-bold text-[#0c172f] cursor-pointer"
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
