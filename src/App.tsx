import React, { useState, useEffect } from 'react';
import { TechPulseLandingPage } from './pages/TechPulseLandingPage';
import { AiVideosTrainingPage } from './pages/AiVideosTrainingPage';
import { TechPulseEnrollPage } from './pages/TechPulseEnrollPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AuthProvider } from './lib/authContext';

export type AppRoute = 'landing' | 'training' | 'enroll' | 'admin';

export default function App() {
  const getInitialPath = (): AppRoute => {
    const pathname = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();

    if (
      pathname.includes('admin') ||
      hash.includes('admin') ||
      search.includes('admin') ||
      search.includes('page=admin')
    ) {
      return 'admin';
    }
    if (
      pathname.includes('training') ||
      pathname.includes('aivideostraining') ||
      hash.includes('training') ||
      search.includes('training')
    ) {
      return 'training';
    }
    if (
      pathname.includes('enroll') ||
      hash.includes('enroll') ||
      search.includes('enroll')
    ) {
      return 'enroll';
    }
    return 'landing';
  };

  const [currentPage, setCurrentPage] = useState<AppRoute>(getInitialPath);

  useEffect(() => {
    const handleRouteChange = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (
        pathname.includes('admin') ||
        hash.includes('admin') ||
        search.includes('admin') ||
        search.includes('page=admin')
      ) {
        setCurrentPage('admin');
      } else if (
        pathname.includes('training') ||
        pathname.includes('aivideostraining') ||
        hash.includes('training') ||
        search.includes('training')
      ) {
        setCurrentPage('training');
      } else if (
        pathname.includes('enroll') ||
        hash.includes('enroll') ||
        search.includes('enroll')
      ) {
        setCurrentPage('enroll');
      } else {
        setCurrentPage('landing');
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    // Secret Admin Hotkey for Website Owner: Press Ctrl + Shift + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        window.history.pushState({}, '', '/admin');
        setCurrentPage('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigateTo = (page: AppRoute) => {
    let path = '/';
    if (page === 'training') path = '/aivideostraining';
    else if (page === 'enroll') path = '/enroll';
    else if (page === 'admin') path = '/admin';

    window.history.pushState({}, '', path);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#f7fbfd] text-[#0c172f] antialiased">
        {currentPage === 'landing' ? (
          <TechPulseLandingPage onNavigate={navigateTo} />
        ) : currentPage === 'training' ? (
          <AiVideosTrainingPage
            onBack={() => navigateTo('landing')}
            onEnroll={() => navigateTo('enroll')}
            onSeeReviews={() => {
              navigateTo('landing');
              setTimeout(() => {
                const el = document.getElementById('reviews');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }}
          />
        ) : currentPage === 'enroll' ? (
          <TechPulseEnrollPage onBack={() => navigateTo('landing')} />
        ) : (
          <AdminDashboardPage onNavigateHome={() => navigateTo('landing')} />
        )}
      </div>
    </AuthProvider>
  );
}
