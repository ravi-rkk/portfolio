// App.jsx — Root: loading → profile select → dashboard (with profile type)

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

  const handleProfileSelect = (profileId) => {
    setProfileType(profileId);
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
    <div className="min-h-screen bg-[#141414] overflow-x-hidden flex flex-col">
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
