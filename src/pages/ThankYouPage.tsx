import React from 'react';
import { BookingForm } from '../components/BookingForm';

interface ThankYouPageProps {
  onBackToLanding: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ onBackToLanding }) => {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <BookingForm onBackToLanding={onBackToLanding} />
    </main>
  );
};
