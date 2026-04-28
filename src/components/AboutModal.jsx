// AboutModal.jsx — Developer About/Bio modal (triggered by More Info or profile click)

import React, { useEffect } from 'react';
import { profileData } from '../data/portfolioData';

const AboutModal = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/85 z-[2000] flex items-center justify-center p-4 md:p-6"
      style={{ animation: 'fadeInModal 0.2s ease' }}
      onClick={onClose}
    >
      <div
        className="bg-[#181818] rounded-xl max-w-lg w-full relative shadow-2xl border border-white/5"
        style={{ animation: 'slideUpModal 0.3s ease' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          id="about-modal-close"
          className="absolute top-4 right-4 w-8 h-8 bg-[#2a2a2a] border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#333] transition-colors duration-200 text-lg"
          aria-label="Close"
        >
          ×
        </button>

        <div className="p-6 md:p-8">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center text-4xl font-black text-white shadow-lg shadow-blue-500/20 flex-shrink-0">
              R
            </div>
            <div>
              <h2 className="text-white text-xl font-black mb-1">{profileData.name}</h2>
              <div className="text-[#E50914] text-sm font-semibold mb-1">Full Stack Developer</div>
              <div className="text-[#808080] text-xs flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {profileData.location}
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-[#ccc] text-sm leading-relaxed mb-5">
            Full Stack Developer at <span className="text-white font-semibold">Creasophere Tech Pvt. Ltd.</span> with expertise in React.js, Django, Java, and AI-driven systems. Passionate about building scalable products that are both performant and delightful to use.
          </p>
          <p className="text-[#808080] text-sm leading-relaxed mb-6">
            PG Diploma from C-DAC Pune and B.Tech in Computer Science. 1+ year of professional experience with 10+ shipped projects across web, mobile, and AI domains.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Projects', value: '10+', color: '#E50914' },
              { label: 'Experience', value: '1+ yr', color: '#f59e0b' },
              { label: 'Technologies', value: '15+', color: '#22c55e' },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
                <div className="font-black text-lg" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[#808080] text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Contact links */}
          <div className="flex flex-wrap gap-2">
            <a
              href={`mailto:${profileData.email}`}
              id="about-modal-email"
              className="flex items-center gap-2 px-4 py-2 bg-[#E50914] text-white text-xs font-bold rounded hover:bg-[#c8070f] transition-colors duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Me
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              id="about-modal-linkedin"
              className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-[#e5e5e5] text-xs font-bold rounded border border-white/10 hover:border-white/20 transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              id="about-modal-github"
              className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-[#e5e5e5] text-xs font-bold rounded border border-white/10 hover:border-white/20 transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInModal { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUpModal { from { transform: translateY(30px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
};

export default AboutModal;
