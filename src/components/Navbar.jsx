// Navbar.jsx — Netflix-style responsive navbar with scroll effect

import React, { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#home', id: 'nav-home' },
  { label: 'Skills', href: '#skills', id: 'nav-skills' },
  { label: 'Projects', href: '#projects', id: 'nav-projects' },
  { label: 'About', href: '#about', id: 'nav-about' },
];

const Navbar = ({ onProfileClick, onBackClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (label, href) => {
    setActiveLink(label);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#141414] shadow-2xl shadow-black/50'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Back button + Logo */}
        <div className="flex items-center gap-3">
          {onBackClick && (
            <button
              id="navbar-back"
              onClick={onBackClick}
              className="flex items-center gap-1.5 text-[#808080] hover:text-white transition-colors duration-200 text-xs font-medium tracking-wider uppercase group"
              aria-label="Back to profiles"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Profiles</span>
            </button>
          )}
          <div
            id="navbar-logo"
            className="text-[#E50914] font-black text-3xl md:text-4xl tracking-tighter cursor-pointer select-none hover:scale-110 transition-transform duration-200"
            style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-2px' }}
          >
            RAVI
          </div>
          <div className="hidden md:block w-px h-6 bg-[#808080]/50" />
          <span className="hidden md:block text-[#808080] text-xs tracking-widest uppercase font-medium">
            Portfolio
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={link.id}
              onClick={() => handleNavClick(link.label, link.href)}
              className={`px-4 py-2 text-sm font-medium rounded-sm transition-all duration-200 ${
                activeLink === link.label
                  ? 'text-white font-semibold'
                  : 'text-[#e5e5e5] hover:text-white'
              }`}
            >
              {link.label}
              {activeLink === link.label && (
                <div className="h-0.5 bg-[#E50914] mt-0.5 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Search Icon */}
          <button
            id="navbar-search"
            className="hidden md:flex text-white/70 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Bell */}
          <button
            id="navbar-bell"
            className="hidden md:flex text-white/70 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10 relative"
            aria-label="Notifications"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E50914] rounded-full" />
          </button>

          {/* Profile Avatar */}
          <button
            id="navbar-profile"
            onClick={onProfileClick}
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="Profile menu"
          >
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm group-hover:ring-2 group-hover:ring-white transition-all duration-200">
              R
            </div>
            <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200 group-hover:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Mobile Hamburger */}
          <button
            id="navbar-menu-toggle"
            className="md:hidden text-white p-2 rounded hover:bg-white/10 transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-white mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-white mb-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black/95 border-t border-white/10 px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`mobile-${link.id}`}
              onClick={() => handleNavClick(link.label, link.href)}
              className={`text-left px-3 py-2.5 rounded text-sm font-medium transition-colors duration-200 ${
                activeLink === link.label
                  ? 'text-white bg-white/10'
                  : 'text-[#e5e5e5] hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
