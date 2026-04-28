// ProjectModal.jsx — Full-screen Netflix-style project detail modal (uses Portal to escape parent transforms)

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const ProjectModal = ({ project, onClose }) => {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const modalBodyRef = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onCloseRef.current(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Scroll modal body to top whenever project changes
  useEffect(() => {
    if (project && modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
  }, [project]);

  if (!project) return null;

  // ── Coming Soon modal for upcoming projects ──────────────────────────────────
  if (project.upcoming) {
    const comingSoonContent = (
      <div
        id="project-modal-backdrop"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.88)',
          zIndex: 99999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
          animation: 'fadeInModal 0.2s ease',
        }}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '520px', width: '100%',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            borderRadius: '20px',
            border: `1px solid ${project.accentColor}30`,
            boxShadow: `0 0 60px ${project.accentColor}20, 0 30px 80px rgba(0,0,0,0.7)`,
            padding: '48px 40px',
            textAlign: 'center',
            position: 'relative',
            animation: 'slideUpModal 0.3s ease',
          }}
        >
          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              width: '32px', height: '32px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', cursor: 'pointer', lineHeight: '1',
            }}
            aria-label="Close"
          >×</button>

          {/* Pulsing badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: `${project.accentColor}18`,
              border: `1px solid ${project.accentColor}50`,
              color: project.accentColor,
              padding: '6px 16px', borderRadius: '999px',
              fontSize: '11px', fontWeight: 800, letterSpacing: '2px',
              textTransform: 'uppercase',
              animation: 'pulseBadge 2s ease-in-out infinite',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: project.accentColor,
                animation: 'pulseDot 2s ease-in-out infinite',
                display: 'inline-block',
              }} />
              Coming Soon
            </span>
          </div>

          {/* Emoji */}
          <div style={{ fontSize: '72px', marginBottom: '16px', lineHeight: '1' }}>
            {project.thumbnail}
          </div>

          {/* Title */}
          <h2 style={{
            color: '#fff', fontSize: '28px', fontWeight: 900,
            marginBottom: '8px', fontFamily: 'Inter, sans-serif',
          }}>
            {project.title}
          </h2>
          <p style={{ color: '#808080', fontSize: '14px', marginBottom: '8px' }}>
            {project.subtitle}
          </p>
          <p style={{
            color: project.accentColor, fontSize: '12px',
            fontWeight: 700, letterSpacing: '1px', marginBottom: '24px',
          }}>
            {project.category}
          </p>

          {/* Description */}
          <p style={{
            color: '#b3b3b3', fontSize: '14px', lineHeight: '1.7',
            marginBottom: '28px', maxWidth: '400px', margin: '0 auto 28px',
          }}>
            {project.description}
          </p>

          {/* Tech pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{
                padding: '5px 12px',
                background: `${project.accentColor}15`,
                border: `1px solid ${project.accentColor}35`,
                color: `${project.accentColor}cc`,
                borderRadius: '999px', fontSize: '12px', fontWeight: 600,
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${project.accentColor}40, transparent)`,
            marginBottom: '24px',
          }} />

          {/* Footer note */}
          <p style={{ color: '#555', fontSize: '12px' }}>
            🚧 This project is currently under development. Check back soon!
          </p>
        </div>

        <style>{`
          @keyframes fadeInModal { from { opacity: 0 } to { opacity: 1 } }
          @keyframes slideUpModal { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
          @keyframes pulseBadge { 0%, 100% { opacity: 1 } 50% { opacity: 0.6 } }
          @keyframes pulseDot { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.4) } }
        `}</style>
      </div>
    );
    return ReactDOM.createPortal(comingSoonContent, document.body);
  }

  const modalContent = (
    <div
      id="project-modal-backdrop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.85)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeInModal 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        ref={modalBodyRef}
        className="bg-[#181818] rounded-xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
        style={{ maxWidth: '672px', animation: 'slideUpModal 0.3s ease' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner image */}
        <div className="relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-52 md:h-72 object-cover rounded-t-xl"
          />
          {/* Gradient overlay on image */}
          <div className="absolute inset-0 rounded-t-xl bg-gradient-to-t from-[#181818] via-transparent to-transparent" />

          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            id="modal-close-btn"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '36px',
              height: '36px',
              background: 'rgba(20,20,20,0.9)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              cursor: 'pointer',
              zIndex: 10,
              lineHeight: '1',
            }}
            aria-label="Close modal"
          >
            ×
          </button>

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex gap-2">
            {project.isTop10 && (
              <span className="bg-[#E50914] text-white text-xs font-black px-2.5 py-1 rounded-sm uppercase tracking-wider">
                TOP 10
              </span>
            )}
            {project.isNew && (
              <span className="bg-[#46d369] text-black text-xs font-black px-2.5 py-1 rounded-sm uppercase tracking-wider">
                NEW
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 md:px-8 pb-8 -mt-2">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#46d369] text-sm font-semibold">{project.status}</span>
            <span className="text-[#808080] text-sm">•</span>
            <span className="text-[#808080] text-sm">{project.year}</span>
            <span className="text-[#808080] text-sm">•</span>
            <span className="text-[#808080] text-sm">{project.category}</span>
          </div>

          <h2 className="text-white text-2xl md:text-3xl font-black mb-2 leading-tight">{project.title}</h2>
          <p className="text-[#b3b3b3] text-sm font-medium mb-4">{project.subtitle}</p>
          <p className="text-[#ccc] text-sm leading-relaxed mb-6">{project.description}</p>

          {/* Metrics */}
          {project.metrics && (
            <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white/5 rounded-lg border border-white/5">
              {Object.entries(project.metrics).map(([key, val]) => (
                <div key={key}>
                  <div className="text-white font-black text-lg" style={{ color: project.accentColor }}>{val}</div>
                  <div className="text-[#808080] text-xs capitalize">{key}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack */}
          <div className="mb-6">
            <div className="text-[#808080] text-xs uppercase tracking-widest mb-3 font-semibold">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-[#2a2a2a] text-[#e5e5e5] text-xs rounded-full border border-white/10 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              id={`modal-github-${project.id}`}
              className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded font-bold text-sm hover:bg-white/90 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub Repo
            </a>
            {project.liveDisabled ? (
              <span
                id={`modal-live-${project.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(109,109,110,0.25)',
                  color: '#555',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  fontSize: '14px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'not-allowed',
                  userSelect: 'none',
                }}
                title="Live demo not available — not hosted yet"
              >
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                Not Hosted
              </span>
            ) : (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                id={`modal-live-${project.id}`}
                className="flex items-center gap-2 bg-[#6d6d6e]/70 text-white px-5 py-2.5 rounded font-bold text-sm hover:bg-[#6d6d6e]/90 transition-colors duration-200 border border-white/10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInModal { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUpModal { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );

  // Render into document.body via portal — escapes all parent transforms & overflow
  return ReactDOM.createPortal(modalContent, document.body);
};

export default ProjectModal;
