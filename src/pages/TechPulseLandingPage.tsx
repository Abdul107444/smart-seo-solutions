import React, { useState } from 'react';
import { TechPulseNavbar } from '../components/TechPulseNavbar';
import { TechPulseHero } from '../components/TechPulseHero';
import { CommunityTicker } from '../components/CommunityTicker';
import { LaunchOfferBox } from '../components/LaunchOfferBox';
import { SuccessProofSection } from '../components/SuccessProofSection';
import { CurriculumSection } from '../components/CurriculumSection';
import { ReviewsWallSection } from '../components/ReviewsWallSection';
import { StudentCarouselSection } from '../components/StudentCarouselSection';
import { OutcomesRoadmapSection } from '../components/OutcomesRoadmapSection';
import { FaqSection } from '../components/FaqSection';
import { UrgentCtaBanners } from '../components/UrgentCtaBanners';
import { TechPulseFooter } from '../components/TechPulseFooter';
import { SocialProofToast } from '../components/SocialProofToast';
import { TechPulseWhatsAppFloat } from '../components/TechPulseWhatsAppFloat';
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

  const scrollToModules = () => {
    const el = document.getElementById('modules');
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

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section with Pakistan badge and embedded video */}
        <TechPulseHero onEnroll={handleEnroll} onSeeModules={scrollToModules} />

        {/* 2. Community 954 members proof and running ticker */}
        <CommunityTicker onEnroll={handleEnroll} onOpenImage={handleOpenImage} />

        {/* 3. Launch Offer pricing card */}
        <LaunchOfferBox onEnroll={handleEnroll} />

        {/* 4. Real Visual Proofs: $194 Facebook Bonus + 2.8M Viral Views */}
        <SuccessProofSection onOpenImage={handleOpenImage} />

        {/* 5. 10 Services Complete Done-For-You Scope */}
        <CurriculumSection onEnroll={handleEnroll} />

        {/* 6. Wall of 19 Student Screenshot Reviews */}
        <ReviewsWallSection onEnroll={handleEnroll} onOpenImage={handleOpenImage} />

        {/* 7. 18 Students Real Money Testimonials Carousel */}
        <StudentCarouselSection />

        {/* 8. Skills Outcomes, Income Potential, 14-Day Roadmap & Personas */}
        <OutcomesRoadmapSection />

        {/* 9. FAQs */}
        <FaqSection />

        {/* 10. Urgent Dark Navy Banner & Final Call to Action */}
        <UrgentCtaBanners onEnroll={handleEnroll} />
      </main>

      {/* Footer */}
      <TechPulseFooter onNavigate={onNavigate} />

      {/* Interactive Social Proof Live Toast */}
      <SocialProofToast />

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
