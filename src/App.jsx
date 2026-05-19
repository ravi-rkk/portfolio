// App.jsx — Root: loading → profile select → dashboard (with profile type)
// Browser back button is supported via History API pushState / popstate

import React, { useState, useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

const SCREEN = { LOADING: 'loading', PROFILES: 'profiles', DASHBOARD: 'dashboard' };

const App = () => {
  const [screen, setScreen] = useState(SCREEN.LOADING);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [profileType, setProfileType] = useState('fullstack'); // 'fullstack' | 'appdev' | 'hireme'

  // Show loading spinner for 1.8s then profile selector
  useEffect(() => {
    const t = setTimeout(() => setScreen(SCREEN.PROFILES), 1800);
    return () => clearTimeout(t);
  }, []);

  // Listen for browser back/forward button
  useEffect(() => {
    const handlePopState = (e) => {
      // If the user presses Back and state says we were on dashboard → go to profiles
      if (e.state?.screen === 'profiles') {
        setDashboardVisible(false);
        setTimeout(() => setScreen(SCREEN.PROFILES), 300);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleProfileSelect = (profileId) => {
    setProfileType(profileId);

    // Push a new history entry so the back button can return to profiles
    window.history.pushState({ screen: 'profiles' }, '', window.location.href);

    setTimeout(() => {
      setScreen(SCREEN.DASHBOARD);
      setTimeout(() => setDashboardVisible(true), 100);
    }, 700);
  };

  const handleBackToProfiles = () => {
    setDashboardVisible(false);
    setTimeout(() => {
      setScreen(SCREEN.PROFILES);
    }, 500);
  };

  return (
    <div style={{ background: '#141414', minHeight: '100vh' }}>
      {screen === SCREEN.LOADING && <LoadingSpinner />}

      {screen === SCREEN.PROFILES && (
        <LandingPage onProfileSelect={handleProfileSelect} />
      )}

      {screen === SCREEN.DASHBOARD && (
        <div
          style={{
            opacity: dashboardVisible ? 1 : 0,
            transform: dashboardVisible ? 'scale(1)' : 'scale(0.98)',
            transition: 'opacity 700ms ease, transform 700ms ease',
          }}
        >
          <Dashboard profileType={profileType} onProfileClick={handleBackToProfiles} />
        </div>
      )}
    </div>
  );
};

export default App;
