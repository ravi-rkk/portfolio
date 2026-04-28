// Footer.jsx — Netflix-style footer with Switch Profile button

import React from 'react';
import { profileData } from '../data/portfolioData';

const Footer = ({ onProfileClick }) => {
  const year = new Date().getFullYear();

  const footerLinks = [
    { label: 'FAQ', href: '#' },
    { label: 'GitHub', href: profileData.github },
    { label: 'LinkedIn', href: profileData.linkedin },
    { label: 'Resume', href: profileData.resumeUrl || '#' },
    { label: 'Contact', href: `mailto:${profileData.email}` },
  ];

  return (
    <footer id="about" className="bg-[#141414] border-t border-white/5 pt-12 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="text-[#E50914] font-black text-3xl tracking-tighter mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              RAVI
            </div>
            <p className="text-[#808080] text-sm leading-relaxed max-w-xs">
              Full Stack Developer specializing in React.js, Django, and AI-driven analytics. Building scalable, beautiful products.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href={profileData.github} target="_blank" rel="noopener noreferrer" id="footer-github"
                className="p-2 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-all duration-200" aria-label="GitHub">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" id="footer-linkedin"
                className="p-2 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-all duration-200" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href={`mailto:${profileData.email}`} id="footer-email-icon"
                className="p-2 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-all duration-200" aria-label="Email">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigate</h3>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <a key={link.label} href={link.href} id={`footer-link-${link.label.toLowerCase()}`}
                  className="text-[#808080] text-sm hover:text-white transition-colors duration-200 w-fit"
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${profileData.email}`} id="footer-email"
                className="flex items-center gap-2.5 text-[#808080] text-sm hover:text-white transition-colors duration-200 group">
                <div className="w-8 h-8 rounded bg-[#E50914]/10 flex items-center justify-center group-hover:bg-[#E50914]/20 transition-colors">
                  <svg className="w-3.5 h-3.5 text-[#E50914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>{profileData.email}</span>
              </a>
              <a href={`tel:${profileData.phone}`} id="footer-phone"
                className="flex items-center gap-2.5 text-[#808080] text-sm hover:text-white transition-colors duration-200 group">
                <div className="w-8 h-8 rounded bg-[#E50914]/10 flex items-center justify-center group-hover:bg-[#E50914]/20 transition-colors">
                  <svg className="w-3.5 h-3.5 text-[#E50914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>+91 {profileData.phone}</span>
              </a>
              <div id="footer-location" className="flex items-center gap-2.5 text-[#808080] text-sm">
                <div className="w-8 h-8 rounded bg-[#E50914]/10 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-[#E50914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span>{profileData.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider + Bottom */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#808080] text-xs text-center md:text-left">
            © {year} Ravilesh Kashyap. Built with React & Tailwind CSS.
          </p>

          {/* Switch Profile button */}
          {onProfileClick && (
            <button
              id="footer-switch-profile"
              onClick={onProfileClick}
              className="text-[#555] text-xs border border-[#2a2a2a] px-4 py-1.5 rounded-sm hover:border-[#E50914] hover:text-[#E50914] transition-all duration-200 tracking-wider uppercase"
            >
              ← Switch Profile
            </button>
          )}

          <p className="text-[#808080] text-xs">Inspired by Netflix UI Design</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
