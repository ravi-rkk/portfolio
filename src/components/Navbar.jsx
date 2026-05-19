// Navbar.jsx — Netflix-style navbar with live portfolio search

import React, { useState, useEffect, useRef } from 'react';
import { skills, projects, experience, education } from '../data/portfolioData';

const navLinks = [
  { label: 'Home',     href: '#home',       id: 'nav-home' },
  { label: 'Skills',   href: '#skills',     id: 'nav-skills' },
  { label: 'Projects', href: '#projects',   id: 'nav-projects' },
  { label: 'About',    href: '#about',      id: 'nav-about' },
];

// ── Build a flat searchable index from portfolio data ─────────────────────────
const buildIndex = () => {
  const items = [];

  skills.forEach((s) => {
    items.push({
      id: `skill-${s.id}`,
      type: 'Skill',
      icon: s.icon,
      title: s.title,
      subtitle: s.category,
      detail: s.description,
      keywords: [s.title, s.category, ...s.tags].join(' ').toLowerCase(),
      scrollTo: '#skills',
      color: s.color,
    });
  });

  projects.forEach((p) => {
    items.push({
      id: `project-${p.id}`,
      type: 'Project',
      icon: p.thumbnail,
      title: p.title,
      subtitle: p.subtitle,
      detail: p.category,
      keywords: [p.title, p.subtitle, p.category, ...p.tags].join(' ').toLowerCase(),
      scrollTo: '#projects',
      color: p.accentColor,
    });
  });

  experience.forEach((e) => {
    items.push({
      id: `exp-${e.id}`,
      type: 'Experience',
      icon: e.icon,
      title: e.company,
      subtitle: e.role,
      detail: e.period,
      keywords: [e.company, e.role, e.period, ...(e.tags || [])].join(' ').toLowerCase(),
      scrollTo: '#experience',
      color: '#E50914',
    });
  });

  education.forEach((ed) => {
    items.push({
      id: `edu-${ed.id}`,
      type: 'Education',
      icon: '🎓',
      title: ed.school,
      subtitle: ed.degree,
      detail: ed.year,
      keywords: [ed.school, ed.degree, ed.year].join(' ').toLowerCase(),
      scrollTo: '#experience',
      color: '#3b82f6',
    });
  });

  return items;
};

const SEARCH_INDEX = buildIndex();

// ── Type badge colours ────────────────────────────────────────────────────────
const TYPE_COLORS = {
  Skill:      { bg: 'rgba(97,218,251,0.15)',  text: '#61dafb',  border: 'rgba(97,218,251,0.3)'  },
  Project:    { bg: 'rgba(229,9,20,0.15)',    text: '#E50914',  border: 'rgba(229,9,20,0.3)'    },
  Experience: { bg: 'rgba(34,197,94,0.15)',   text: '#22c55e',  border: 'rgba(34,197,94,0.3)'   },
  Education:  { bg: 'rgba(59,130,246,0.15)',  text: '#60a5fa',  border: 'rgba(59,130,246,0.3)'  },
};

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = ({ onProfileClick, onBackClick }) => {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeLink,  setActiveLink]  = useState('Home');

  // Search state
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [query,       setQuery]       = useState('');
  const [results,     setResults]     = useState([]);
  const [focused,     setFocused]     = useState(-1);   // keyboard navigation index

  const inputRef    = useRef(null);
  const dropdownRef = useRef(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 80);
    else { setQuery(''); setResults([]); setFocused(-1); }
  }, [searchOpen]);

  // Live search
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) { setResults([]); setFocused(-1); return; }
    const hits = SEARCH_INDEX.filter((item) => item.keywords.includes(q) || item.keywords.split(' ').some(w => w.startsWith(q)));
    setResults(hits.slice(0, 8));
    setFocused(-1);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        inputRef.current && !inputRef.current.contains(e.target)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocused((f) => Math.min(f + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setFocused((f) => Math.max(f - 1, 0)); }
    if (e.key === 'Enter')     { if (focused >= 0) handleResultClick(results[focused]); }
    if (e.key === 'Escape')    { setSearchOpen(false); }
  };

  const handleResultClick = (item) => {
    setSearchOpen(false);
    const el = document.querySelector(item.scrollTo);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNavClick = (label, href) => {
    setActiveLink(label);
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const highlight = (text, q) => {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: 'rgba(229,9,20,0.35)', color: '#fff', borderRadius: '2px', padding: '0 1px' }}>
          {text.slice(idx, idx + q.length)}
        </mark>
        {text.slice(idx + q.length)}
      </>
    );
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

        {/* Back + Logo */}
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
                activeLink === link.label ? 'text-white font-semibold' : 'text-[#e5e5e5] hover:text-white'
              }`}
            >
              {link.label}
              {activeLink === link.label && <div className="h-0.5 bg-[#E50914] mt-0.5 rounded-full" />}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* ── Search ── */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            {/* Collapsed: magnifier icon */}
            {!searchOpen ? (
              <button
                id="navbar-search"
                onClick={() => setSearchOpen(true)}
                className="flex text-white/70 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
                aria-label="Search portfolio"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            ) : (
              /* Expanded: input bar */
              <div style={{ position: 'relative' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(20,20,20,0.96)',
                  border: '1px solid rgba(229,9,20,0.5)',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  width: '280px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                }}>
                  <svg style={{ width: '15px', height: '15px', color: '#E50914', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={inputRef}
                    id="navbar-search-input"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search skills, projects, tech…"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#fff',
                      fontSize: '13px',
                      width: '100%',
                      fontFamily: 'Inter, sans-serif',
                    }}
                    autoComplete="off"
                  />
                  {query && (
                    <button onClick={() => setQuery('')} style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}>
                      <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  <button onClick={() => setSearchOpen(false)} style={{ color: '#555', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '11px', flexShrink: 0 }}>
                    ESC
                  </button>
                </div>

                {/* ── Results Dropdown ── */}
                {query.trim() && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    left: 0, right: 0,
                    background: 'rgba(18,18,18,0.98)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(16px)',
                    zIndex: 9999,
                    maxHeight: '420px',
                    overflowY: 'auto',
                  }}>
                    {results.length === 0 ? (
                      <div style={{ padding: '20px 16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔍</div>
                        <div style={{ color: '#555', fontSize: '13px' }}>No results for <span style={{ color: '#fff' }}>"{query}"</span></div>
                        <div style={{ color: '#444', fontSize: '11px', marginTop: '4px' }}>Try: React, Django, MochaGo, Firebase…</div>
                      </div>
                    ) : (
                      <>
                        <div style={{ padding: '8px 14px 4px', fontSize: '10px', color: '#555', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                          {results.length} result{results.length !== 1 ? 's' : ''} found
                        </div>
                        {results.map((item, i) => {
                          const tc = TYPE_COLORS[item.type] || {};
                          const isActive = focused === i;
                          return (
                            <div
                              key={item.id}
                              id={`search-result-${item.id}`}
                              onClick={() => handleResultClick(item)}
                              onMouseEnter={() => setFocused(i)}
                              style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '10px 14px',
                                cursor: 'pointer',
                                background: isActive ? 'rgba(229,9,20,0.08)' : 'transparent',
                                borderLeft: isActive ? '2px solid #E50914' : '2px solid transparent',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              {/* Icon */}
                              <div style={{
                                width: '36px', height: '36px', flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: `${item.color}15`,
                                borderRadius: '8px',
                                fontSize: '18px',
                                border: `1px solid ${item.color}25`,
                              }}>
                                {item.icon}
                              </div>

                              {/* Text */}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ color: '#fff', fontSize: '13px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {highlight(item.title, query)}
                                </div>
                                <div style={{ color: '#808080', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {highlight(item.subtitle, query)}
                                </div>
                              </div>

                              {/* Type badge */}
                              <span style={{
                                flexShrink: 0,
                                fontSize: '9px', fontWeight: 800,
                                padding: '2px 7px',
                                borderRadius: '3px',
                                background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`,
                                letterSpacing: '0.5px', textTransform: 'uppercase',
                              }}>
                                {item.type}
                              </span>

                              {/* Arrow */}
                              <svg style={{ width: '14px', height: '14px', color: '#444', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          );
                        })}
                        <div style={{ padding: '8px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '10px', color: '#444', display: 'flex', gap: '12px' }}>
                          <span>↑↓ navigate</span>
                          <span>↵ go to section</span>
                          <span>ESC close</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

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
            className="flex items-center gap-2 group cursor-pointer relative"
            aria-label="Switch profile"
            title="Switch Profile"
          >
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm group-hover:ring-2 group-hover:ring-white transition-all duration-200">
              R
            </div>
            <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200 group-hover:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <div className="absolute top-full right-0 mt-2 px-2.5 py-1.5 bg-[#1a1a1a] border border-white/10 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl" style={{ zIndex: 100 }}>
              🔀 Switch Profile
            </div>
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
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-black/95 border-t border-white/10 px-4 py-3 flex flex-col gap-1">
          {/* Mobile search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '8px 12px', marginBottom: '8px' }}>
            <svg style={{ width: '14px', height: '14px', color: '#666', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search portfolio…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '13px', width: '100%', fontFamily: 'Inter, sans-serif' }}
              autoComplete="off"
            />
          </div>
          {/* Mobile results */}
          {query.trim() && results.length > 0 && results.slice(0, 4).map((item) => (
            <div key={item.id} onClick={() => { handleResultClick(item); setMenuOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', cursor: 'pointer', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', marginBottom: '2px' }}>
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <div>
                <div style={{ color: '#fff', fontSize: '12px', fontWeight: 600 }}>{item.title}</div>
                <div style={{ color: '#666', fontSize: '10px' }}>{item.type} · {item.subtitle}</div>
              </div>
            </div>
          ))}
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`mobile-${link.id}`}
              onClick={() => handleNavClick(link.label, link.href)}
              className={`text-left px-3 py-2.5 rounded text-sm font-medium transition-colors duration-200 ${
                activeLink === link.label ? 'text-white bg-white/10' : 'text-[#e5e5e5] hover:text-white hover:bg-white/5'
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
