// LandingPage.jsx — Netflix "Who's watching?" with Full Stack Dev, App Developer, Hire Me

import React, { useState } from 'react';

const PROFILES = [
  {
    id: 'fullstack',
    name: 'Full Stack Dev',
    emoji: '💻',
    description: 'Web & Backend Engineer',
    activeColor: '#E50914',
  },
  {
    id: 'appdev',
    name: 'App Developer',
    emoji: '📱',
    description: 'Mobile & Cross-Platform',
    activeColor: '#E50914',
  },
  {
    id: 'hireme',
    name: 'Hire Me',
    emoji: '🚀',
    description: 'Open for opportunities',
    activeColor: '#E50914',
  },
];

const LandingPage = ({ onProfileSelect }) => {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [fading, setFading] = useState(false);

  const handleSelect = (profile) => {
    if (selected) return;
    setSelected(profile.id);
    setFading(true);

    setTimeout(() => {
      onProfileSelect(profile.id);
    }, 700);
  };

  return (
    <div
      id="landing-page"
      className="min-h-screen flex-1 flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: '#141414',
        opacity: fading ? 0 : 1,
        transform: fading ? 'scale(1.05)' : 'scale(1)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#141414] to-[#181818]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(229,9,20,0.04) 0%, transparent 70%)' }} />
      </div>

      {/* Top logo */}
      <div className="absolute top-7 left-8">
        <span
          className="text-[#E50914] font-black text-4xl select-none tracking-tighter"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-3px' }}
        >
          RAVI
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Title */}
        <h1
          className="text-white font-semibold mb-12 tracking-tight"
          style={{ fontSize: 'clamp(26px, 4vw, 46px)' }}
        >
          Who's watching?
        </h1>

        {/* Profile cards grid */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-14">
          {PROFILES.map((profile) => (
            <div
              key={profile.id}
              id={`profile-${profile.id}`}
              className="flex flex-col items-center gap-3 cursor-pointer"
              onClick={() => handleSelect(profile)}
              onMouseEnter={() => setHovered(profile.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                transform:
                  selected === profile.id
                    ? 'scale(0.93)'
                    : hovered === profile.id
                    ? 'scale(1.08)'
                    : 'scale(1)',
                opacity: selected && selected !== profile.id ? 0.35 : 1,
                transition: 'transform 0.2s ease, opacity 0.3s ease',
              }}
              role="button"
              tabIndex={0}
              aria-label={`Select profile: ${profile.name}`}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(profile)}
            >
              {/* Avatar card */}
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 8,
                  background: hovered === profile.id ? '#222' : '#1a1a1a',
                  border: hovered === profile.id || selected === profile.id
                    ? `3px solid ${profile.activeColor}`
                    : '3px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 64,
                  boxShadow: hovered === profile.id
                    ? `0 0 28px rgba(229,9,20,0.35)`
                    : selected === profile.id
                    ? `0 0 40px rgba(229,9,20,0.5)`
                    : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <span role="img" aria-label={profile.name}>{profile.emoji}</span>
              </div>

              {/* Label */}
              <div className="flex flex-col items-center gap-0.5">
                <span
                  className="text-sm font-medium transition-colors duration-200"
                  style={{
                    color: hovered === profile.id || selected === profile.id ? '#fff' : '#aaa',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {profile.name}
                </span>
                <span
                  className="text-xs transition-colors duration-200"
                  style={{ color: hovered === profile.id ? '#888' : 'transparent', fontSize: 11 }}
                >
                  {profile.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Manage Profiles button */}
        <button
          id="manage-profiles-btn"
          className="text-sm uppercase tracking-[3px] transition-all duration-200"
          style={{
            background: 'transparent',
            border: '1px solid #808080',
            color: '#808080',
            padding: '8px 22px',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            letterSpacing: '2px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#fff';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#808080';
            e.currentTarget.style.color = '#808080';
          }}
        >
          Manage Profiles
        </button>
      </div>

      {/* Loading overlay on select */}
      {selected && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-4">
            <div
              className="text-6xl select-none"
              style={{ animation: 'profilePop 0.3s ease forwards' }}
            >
              {PROFILES.find((p) => p.id === selected)?.emoji}
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#E50914]"
                  style={{
                    animation: 'bounce 0.8s ease-in-out infinite',
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes profilePop {
          from { transform: scale(0.8); opacity: 0.5; }
          to { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
