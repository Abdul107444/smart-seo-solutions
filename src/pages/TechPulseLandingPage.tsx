import React, { useState } from 'react';
import { TechPulseNavbar } from '../components/TechPulseNavbar';
import { TechPulseHero } from '../components/TechPulseHero';
import { TrustIndicatorsSection } from '../components/TrustIndicatorsSection';
import { SuccessProofSection } from '../components/SuccessProofSection';
import { CurriculumSection } from '../components/CurriculumSection';
import { ReviewsWallSection } from '../components/ReviewsWallSection';
import { LaunchOfferBox } from '../components/LaunchOfferBox';
import { FaqSection } from '../components/FaqSection';
import { TechPulseFooter } from '../components/TechPulseFooter';
import { SocialProofToast } from '../components/SocialProofToast';
import { TechPulseWhatsAppFloat } from '../components/TechPulseWhatsAppFloat';
import { LiveChatWidget } from '../components/LiveChatWidget';
import { ScreenshotLightbox } from '../components/ScreenshotLightbox';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'training' | 'enroll' | 'admin') => void;
}

export function TechPulseLandingPage({ onNavigate }: LandingPageProps) {
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    src: string | null;
    alt: string;
  }>({
    isOpen: false,
    src: null,
    alt: ''
  });
  const [isLiveChatOpen, setIsLiveChatOpen] = useState<boolean>(false);

  const handleOpenImage = (src: string, alt: string) => {
    setLightboxState({
      isOpen: true,
      src,
      alt
    });
  };

  const handleCloseImage = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const scrollToDeliverables = () => {
    const el = document.getElementById('services') || document.getElementById('modules');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnroll = () => {
    onNavigate('enroll');
  };

  return (
    <div className="min-h-screen bg-[#f7fbfd] text-[#0c172f] antialiased">
      {/* Sticky Header Navbar */}
      <TechPulseNavbar onNavigate={onNavigate} currentPage="landing" />

      {/* Main High-Impact Sections Only */}
      <main>
        {/* 1. Hero Section: Headline, Top Rated Seller Profile Showcase, Limited Time Slots counter */}
        <TechPulseHero
          onEnroll={handleEnroll}
          onSeeDeliverables={scrollToDeliverables}
          onSeeModules={scrollToDeliverables}
          onOpenImage={handleOpenImage}
        />

        {/* 2. Trust Indicators: Secure Payment, 20-25 Days Money-Back Guarantee & 24/7 Support */}
        <TrustIndicatorsSection
          onEnroll={handleEnroll}
          onOpenLiveChat={() => setIsLiveChatOpen(true)}
        />

        {/* 3. Real Verified Results: Authentic Fiverr Buyer Chat, $450 Orders & Search Surge */}
        <SuccessProofSection onOpenImage={handleOpenImage} />

        {/* 3. 10-Point Done-For-You Deliverables Scope */}
        <CurriculumSection onEnroll={handleEnroll} />

        {/* 4. Real Fiverr Seller Reviews & Proof Screenshots */}
        <ReviewsWallSection onEnroll={handleEnroll} onOpenImage={handleOpenImage} />

        {/* 5. Pricing Box (Rs. 8,000) with Urgency Slots Counter, Bank Details & 20-25 Days Guarantee */}
        <LaunchOfferBox onEnroll={handleEnroll} />

        {/* 6. Concise Fiverr Seller Knowledge Base FAQs */}
        <FaqSection />
      </main>

      {/* Footer */}
      <TechPulseFooter onNavigate={onNavigate} />

      {/* Interactive Social Proof Live Toast */}
      <SocialProofToast />

      {/* Floating 24/7 Live Chat Button & Mock Instant Support Interface */}
      <LiveChatWidget
        isOpen={isLiveChatOpen}
        onOpenChange={setIsLiveChatOpen}
        onEnroll={handleEnroll}
      />

      {/* Floating 24/7 WhatsApp Button */}
      <TechPulseWhatsAppFloat />

      {/* Lightbox image zoom viewer */}
      <ScreenshotLightbox
        isOpen={lightboxState.isOpen}
        src={lightboxState.src}
        alt={lightboxState.alt}
        onClose={handleCloseImage}
      />
    </div>
  );
}
