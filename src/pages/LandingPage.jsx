// LandingPage.jsx — Netflix "Who's watching?" — Icon cards style

import React, { useState, useEffect } from 'react';

const PROFILES = [
  {
    id: 'fullstack',
    name: 'Full Stack Dev',
    icon: '💻',
    description: 'Web & Backend Engineer',
    activeColor: '#E50914',
    cardBg: 'linear-gradient(160deg, #1c2333 0%, #0f172a 100%)',
    glowColor: 'rgba(229,9,20,0.18)',
    badge: 'CURRENT ROLE',
  },
  {
    id: 'appdev',
    name: 'App Developer',
    icon: '📱',
    description: 'Mobile & Cross-Platform',
    activeColor: '#61dafb',
    cardBg: 'linear-gradient(160deg, #1a1f35 0%, #0d1123 100%)',
    glowColor: 'rgba(97,218,251,0.15)',
    badge: null,
  },
  {
    id: 'hireme',
    name: 'Hire Me',
    icon: '🚀',
    description: 'Open for opportunities',
    activeColor: '#22c55e',
    cardBg: 'linear-gradient(160deg, #0f1f17 0%, #071510 100%)',
    glowColor: 'rgba(34,197,94,0.15)',
    badge: 'AVAILABLE',
  },
];

const LandingPage = ({ onProfileSelect }) => {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (profile) => {
    if (selected) return;
    setSelected(profile.id);
    setFading(true);
    setTimeout(() => onProfileSelect(profile.id), 700);
  };

  return (
    <div
      id="landing-page"
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#0d0d0d',
        opacity: fading ? 0 : 1,
        transform: fading ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {/* ── Cinematic background ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Red radial glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(229,9,20,0.07) 0%, rgba(13,13,13,0) 70%)',
        }} />
        {/* Subtle grid */}
        <div style={{
          position: 'absolute', inset: 0,
          opacity: 0.03,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }} />
      </div>

      {/* ── Top logo ── */}
      <div
        style={{
          position: 'absolute', top: '28px', left: '32px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(-12px)',
          transition: 'all 0.6s ease',
        }}
      >
        <span
          style={{
            color: '#E50914',
            fontWeight: 900,
            fontSize: '2.25rem',
            letterSpacing: '-3px',
            fontFamily: 'Inter, sans-serif',
            userSelect: 'none',
          }}
        >
          RAVI
        </span>
      </div>

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 24px' }}>

        {/* Title */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.1s',
            marginBottom: '12px',
          }}
        >
          <p style={{ color: '#E50914', fontSize: '11px', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '10px' }}>
            — Portfolio —
          </p>
          <h1
            style={{
              color: '#fff',
              fontWeight: 600,
              fontSize: 'clamp(26px, 4vw, 46px)',
              marginBottom: '6px',
              letterSpacing: '-0.5px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Who's watching?
          </h1>
          <p style={{ color: '#555', fontSize: '13px' }}>
            Select a profile to explore Ravilesh's portfolio
          </p>
        </div>

        {/* ── Profile Cards ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '28px',
            marginTop: '40px',
            marginBottom: '48px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.25s',
          }}
        >
          {PROFILES.map((profile, idx) => {
            const isHovered = hovered === profile.id;
            const isSelected = selected === profile.id;
            const isFaded = selected && !isSelected;
            const isCenter = idx === 1;

            return (
              <div
                key={profile.id}
                id={`profile-${profile.id}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '14px',
                  cursor: 'pointer',
                }}
                onClick={() => handleSelect(profile)}
                onMouseEnter={() => setHovered(profile.id)}
                onMouseLeave={() => setHovered(null)}
                role="button"
                tabIndex={0}
                aria-label={`Select profile: ${profile.name}`}
                onKeyDown={(e) => e.key === 'Enter' && handleSelect(profile)}
              >
                {/* Card */}
                <div
                  style={{
                    width: isCenter ? 152 : 142,
                    height: isCenter ? 152 : 142,
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                    border: isHovered || isSelected
                      ? `3px solid ${profile.activeColor}`
                      : '3px solid rgba(255,255,255,0.07)',
                    boxShadow: isHovered
                      ? `0 0 35px ${profile.activeColor}55, 0 14px 45px rgba(0,0,0,0.65)`
                      : isSelected
                      ? `0 0 55px ${profile.activeColor}70`
                      : '0 4px 22px rgba(0,0,0,0.45)',
                    transform: isSelected
                      ? 'scale(0.92)'
                      : isHovered
                      ? 'scale(1.1) translateY(-5px)'
                      : 'scale(1)',
                    opacity: isFaded ? 0.25 : 1,
                    transition: 'all 0.28s cubic-bezier(0.34,1.56,0.64,1)',
                    background: profile.cardBg,
                  }}
                >
                  {/* Inner glow on hover */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(circle at 50% 60%, ${profile.glowColor}, transparent 68%)`,
                    opacity: isHovered ? 1 : 0.4,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }} />

                  {/* Icon */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    <span
                      role="img"
                      aria-label={profile.name}
                      style={{
                        fontSize: isCenter ? '72px' : '66px',
                        lineHeight: 1,
                        display: 'block',
                        filter: isHovered
                          ? 'drop-shadow(0 6px 18px rgba(0,0,0,0.6)) drop-shadow(0 0 12px rgba(255,255,255,0.08))'
                          : 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
                        transform: isHovered ? 'scale(1.18) translateY(-4px)' : 'scale(1)',
                        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                        userSelect: 'none',
                      }}
                    >
                      {profile.icon}
                    </span>
                  </div>

                  {/* Badge */}
                  {profile.badge && (
                    <div style={{
                      position: 'absolute', top: '8px', left: '8px',
                      background: profile.activeColor,
                      color: '#fff',
                      fontSize: '8px', fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '3px',
                      letterSpacing: '1px',
                      zIndex: 2,
                    }}>
                      {profile.badge}
                    </div>
                  )}
                </div>

                {/* Label */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: isHovered || isSelected ? 700 : 500,
                      color: isHovered || isSelected ? '#fff' : '#aaa',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {profile.name}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      color: isHovered ? profile.activeColor : 'transparent',
                      transition: 'color 0.2s ease',
                      fontWeight: 500,
                    }}
                  >
                    {profile.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Manage Profiles */}
        <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.7s ease 0.4s' }}>
          <button
            id="manage-profiles-btn"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#666',
              padding: '8px 24px',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              letterSpacing: '3px',
              fontSize: '11px',
              textTransform: 'uppercase',
              borderRadius: '3px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
              e.currentTarget.style.color = '#ccc';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.color = '#666';
            }}
          >
            Manage Profiles
          </button>
        </div>
      </div>

      {/* ── Loading overlay on select ── */}
      {selected && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '80px', animation: 'profilePop 0.35s ease forwards' }}>
              {PROFILES.find((p) => p.id === selected)?.icon}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '8px', height: '8px',
                    borderRadius: '50%',
                    background: PROFILES.find((p) => p.id === selected)?.activeColor || '#E50914',
                    animation: 'bounceDot 0.8s ease-in-out infinite',
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
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes bounceDot {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
