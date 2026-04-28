// HeroBillboard.jsx — Dynamic hero based on selected profile type

import React, { useState, useEffect } from 'react';
import { profileData, profileConfig } from '../data/portfolioData';

const HeroBillboard = ({ profileType = 'fullstack', onMoreInfo }) => {
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const config = profileConfig[profileType] || profileConfig.fullstack;

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, [profileType]);

  const handlePlay = () => {
    if (profileData.resumeUrl && profileData.resumeUrl !== '#') {
      window.open(profileData.resumeUrl, '_blank');
    } else {
      alert('Resume PDF coming soon! Update profileData.resumeUrl in portfolioData.js');
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-end pb-24 md:pb-32 overflow-hidden"
    >
      {/* Real background image */}
      <img
        src={
          profileType === 'appdev'
            ? 'https://picsum.photos/seed/apphero/1600/900'
            : profileType === 'hireme'
            ? 'https://picsum.photos/seed/hirehero/1600/900'
            : 'https://picsum.photos/seed/herodev/1600/900'
        }
        alt="hero background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: 'brightness(0.30)',
          opacity: imgLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
        onLoad={() => setImgLoaded(true)}
      />

      {/* Fallback */}
      <div className="absolute inset-0 bg-[#0a0a0a]" style={{ zIndex: imgLoaded ? -1 : 0 }} />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

      {/* Profile type indicator strip */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, #E50914, transparent)' }}
      />

      {/* Content */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Profile mode badge */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-2 h-2 rounded-full bg-[#46d369] animate-pulse" />
          <span
            className="text-xs font-bold uppercase tracking-[5px]"
            style={{ color: '#E50914' }}
          >
            {config.label}
          </span>
          <span className="text-2xl">{config.emoji}</span>
        </div>

        {/* Title */}
        <h1
          className="billboard-title font-black text-white leading-none tracking-tight mb-5"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(40px, 7vw, 82px)',
          }}
        >
          {config.titleLine1}
          <br />
          <span className="text-[#E50914]">{config.titleLine2}</span>
          <br />
          <span style={{ fontSize: 'clamp(28px, 4.5vw, 56px)' }}>{config.titleLine3}</span>
        </h1>

        {/* Description */}
        <p className="text-[#e5e5e5] max-w-xl leading-relaxed mb-5 font-light"
          style={{ fontSize: 'clamp(13px, 1.5vw, 17px)' }}>
          {config.tagline}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {config.techPills.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full border font-medium"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(6px)',
                color: 'rgba(255,255,255,0.8)',
                borderColor: 'rgba(255,255,255,0.15)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            id="hero-play-btn"
            onClick={handlePlay}
            className="flex items-center gap-2.5 px-6 py-3 bg-white text-black font-bold rounded hover:bg-white/90 active:scale-95 transition-all duration-200 shadow-lg"
            style={{ fontSize: 'clamp(13px, 1.3vw, 16px)' }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            View Resume
          </button>

          <button
            id="hero-more-info-btn"
            onClick={onMoreInfo}
            className="flex items-center gap-2.5 px-6 py-3 text-white font-bold rounded active:scale-95 transition-all duration-200 border"
            style={{
              fontSize: 'clamp(13px, 1.3vw, 16px)',
              background: 'rgba(109,109,110,0.65)',
              backdropFilter: 'blur(4px)',
              borderColor: 'rgba(255,255,255,0.2)',
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            More Info
          </button>

          {/* Social links */}
          <div className="flex items-center gap-2 md:ml-2">
            <a href={profileData.github} target="_blank" rel="noopener noreferrer" id="hero-github-link"
              className="p-2.5 rounded-full border text-white/70 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-200"
              style={{ borderColor: 'rgba(255,255,255,0.3)' }} aria-label="GitHub">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" id="hero-linkedin-link"
              className="p-2.5 rounded-full border text-white/70 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-200"
              style={{ borderColor: 'rgba(255,255,255,0.3)' }} aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-8 border-t pt-7" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          {(profileType === 'appdev'
            ? [['3+', 'Mobile Apps'], ['2K+', 'App Users'], ['1+', 'Years Mobile Dev'], ['4.7★', 'Avg Rating']]
            : profileType === 'hireme'
            ? [['1+', 'Years Exp.'], ['10+', 'Projects'], ['5+', 'Clients'], ['Open', 'To Work']]
            : [['1+', 'Years Exp.'], ['10+', 'Projects'], ['5+', 'Clients'], ['200K+', 'Users Served']]
          ).map(([num, label]) => (
            <div key={label}>
              <div className="text-2xl font-black" style={{ color: '#E50914' }}>{num}</div>
              <div className="text-xs mt-0.5" style={{ color: '#808080' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroBillboard;
