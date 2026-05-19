// AboutModal.jsx — Full Journey modal with real photo and timeline

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { profileData } from '../data/portfolioData';
import raviPhoto from '../assets/image/ravi.png';

const journey = [
  {
    year: '2018',
    icon: '🏛️',
    title: 'B.Tech — Computer Science',
    place: 'Dr APJ Abdul Kalam Technical University',
    desc: 'Started the engineering journey, diving deep into algorithms, data structures, networking, and the fundamentals of software development.',
    color: '#3b82f6',
    type: 'Education',
  },
  {
    year: '2022',
    icon: '🎓',
    title: 'B.Tech Graduated',
    place: 'Computer Science — Class of 2022',
    desc: 'Graduated with a strong foundation in computer science. Built my first full-stack projects during college, discovering a passion for building real products.',
    color: '#22c55e',
    type: 'Milestone',
  },
  {
    year: '2024',
    icon: '🏫',
    title: 'PG Diploma — Advanced Computing',
    place: 'Sunbeam College (C-DAC), Pune',
    desc: 'Joined C-DAC Pune for an intensive post-graduate program in Advanced Computing — mastering System Design, DBMS, Java, and enterprise software engineering.',
    color: '#f59e0b',
    type: 'Education',
  },
  {
    year: '2025',
    icon: '🚀',
    title: 'C-DAC Completed',
    place: 'Advanced Computing — Distinction',
    desc: 'Successfully completed the PG Diploma with hands-on projects in full-stack development, REST APIs, and database design. Ready to take on the industry.',
    color: '#a855f7',
    type: 'Milestone',
  },
  {
    year: '2025',
    icon: '🏢',
    title: 'Full Stack Developer',
    place: 'Creasophere Tech Pvt. Ltd., Pune',
    desc: 'Joined Creasophere Tech as a Full Stack Developer. Building scalable web applications with React.js, Django, and cloud-native technologies. Leading AI integration for smart analytics features.',
    color: '#E50914',
    type: 'Work',
  },
];

const AboutModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('journey');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const modalContent = (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.92)', animation: 'fadeInModal 0.2s ease' }}
      onClick={onClose}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: '860px',
          maxHeight: '92vh',
          background: '#141414',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 30px 100px rgba(0,0,0,0.8)',
          animation: 'slideUpModal 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Hero Banner with Photo ── */}
        <div className="relative flex-shrink-0" style={{ height: '220px' }}>
          {/* Background blur layer */}
          <img
            src={raviPhoto}
            alt="background"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 55%',
              filter: 'blur(18px) brightness(0.3) saturate(0.5)',
              transform: 'scale(1.1)',
            }}
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(20,20,20,0.1) 0%, rgba(20,20,20,0.95) 100%)',
          }} />

          {/* Close button */}
          <button
            onClick={onClose}
            id="about-modal-close"
            style={{
              position: 'absolute', top: '14px', right: '14px',
              width: '32px', height: '32px',
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', cursor: 'pointer', zIndex: 10,
            }}
            aria-label="Close"
          >×</button>

          {/* Profile content inside banner */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '28px',
            display: 'flex', alignItems: 'flex-end', gap: '20px',
          }}>
            {/* Real photo */}
            <img
              src={raviPhoto}
              alt="Ravilesh Kashyap"
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '12px',
                objectFit: 'cover',
                objectPosition: 'center 55%',
                border: '3px solid #E50914',
                boxShadow: '0 8px 30px rgba(229,9,20,0.4)',
                flexShrink: 0,
              }}
            />
            <div style={{ paddingBottom: '4px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'rgba(229,9,20,0.15)',
                border: '1px solid rgba(229,9,20,0.4)',
                borderRadius: '999px',
                padding: '3px 10px',
                fontSize: '10px', fontWeight: 800,
                color: '#E50914', letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#46d369', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                Available for Work
              </div>
              <h2 style={{ color: '#fff', fontWeight: 900, fontSize: '24px', margin: '0 0 4px', fontFamily: 'Inter, sans-serif' }}>
                Ravilesh Kashyap
              </h2>
              <p style={{ color: '#E50914', fontSize: '13px', fontWeight: 700, margin: '0 0 4px' }}>
                Full Stack Developer
              </p>
              <p style={{ color: '#808080', fontSize: '12px', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                📍 Pune, Maharashtra
              </p>
            </div>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div style={{
          display: 'flex', gap: '0',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
          padding: '0 28px',
        }}>
          {[
            { id: 'journey', label: '🗺️ My Journey' },
            { id: 'about', label: '👤 About Me' },
            { id: 'contact', label: '📬 Contact' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none', border: 'none',
                padding: '14px 16px',
                fontSize: '13px', fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? '#fff' : '#808080',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid #E50914' : '2px solid transparent',
                transition: 'all 0.2s ease',
                marginBottom: '-1px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Scrollable Content ── */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '24px 28px 28px' }}>

          {/* ═══ JOURNEY TAB ═══ */}
          {activeTab === 'journey' && (
            <div>
              <p style={{ color: '#808080', fontSize: '13px', marginBottom: '24px', lineHeight: 1.6 }}>
                From a curious CS student to a professional Full Stack Developer — here's the story of how I got here.
              </p>

              {/* Timeline */}
              <div style={{ position: 'relative', paddingLeft: '32px' }}>
                {/* Vertical line */}
                <div style={{
                  position: 'absolute', left: '11px', top: '8px',
                  width: '2px',
                  height: 'calc(100% - 24px)',
                  background: 'linear-gradient(to bottom, #E50914, #3b82f6, #22c55e, #E50914)',
                  opacity: 0.3,
                }} />

                {journey.map((item, i) => (
                  <div key={i} style={{ position: 'relative', marginBottom: i < journey.length - 1 ? '28px' : '0' }}>
                    {/* Dot */}
                    <div style={{
                      position: 'absolute', left: '-32px', top: '6px',
                      width: '22px', height: '22px',
                      borderRadius: '50%',
                      background: `${item.color}20`,
                      border: `2px solid ${item.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '10px',
                      boxShadow: `0 0 12px ${item.color}40`,
                    }}>
                      {item.icon}
                    </div>

                    {/* Card */}
                    <div style={{
                      background: '#1a1a1a',
                      border: `1px solid ${item.color}20`,
                      borderLeft: `3px solid ${item.color}`,
                      borderRadius: '10px',
                      padding: '14px 16px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <span style={{
                          background: `${item.color}15`,
                          border: `1px solid ${item.color}35`,
                          color: item.color,
                          padding: '2px 8px', borderRadius: '999px',
                          fontSize: '10px', fontWeight: 800, letterSpacing: '1px',
                        }}>
                          {item.year}
                        </span>
                        <span style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#aaa',
                          padding: '2px 8px', borderRadius: '999px',
                          fontSize: '10px', fontWeight: 600,
                        }}>
                          {item.type}
                        </span>
                      </div>
                      <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '15px', margin: '0 0 3px' }}>
                        {item.title}
                      </h3>
                      <p style={{ color: item.color, fontSize: '11px', fontWeight: 600, margin: '0 0 8px', opacity: 0.9 }}>
                        {item.place}
                      </p>
                      <p style={{ color: '#999', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* "Right now" badge */}
              <div style={{
                marginTop: '24px',
                background: 'linear-gradient(135deg, rgba(229,9,20,0.08), rgba(229,9,20,0.02))',
                border: '1px solid rgba(229,9,20,0.2)',
                borderRadius: '12px',
                padding: '16px 18px',
                display: 'flex', alignItems: 'center', gap: '14px',
              }}>
                <span style={{ fontSize: '28px' }}>⚡</span>
                <div>
                  <div style={{ color: '#E50914', fontWeight: 800, fontSize: '13px', marginBottom: '4px' }}>
                    Right Now
                  </div>
                  <div style={{ color: '#ccc', fontSize: '13px', lineHeight: 1.5 }}>
                    Building production-grade web apps at <strong style={{ color: '#fff' }}>Creasophere Tech</strong>, exploring AI integrations, and always learning something new every day.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══ ABOUT TAB ═══ */}
          {activeTab === 'about' && (
            <div>
              {/* Bio */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ color: '#E50914', fontSize: '11px', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>
                  — Who Am I
                </div>
                <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.8, marginBottom: '12px' }}>
                  I'm <strong style={{ color: '#fff' }}>Ravilesh Kashyap</strong>, a passionate Full Stack Developer based in Pune, Maharashtra. I love turning complex ideas into clean, fast, and user-friendly digital products.
                </p>
                <p style={{ color: '#999', fontSize: '13px', lineHeight: 1.8, marginBottom: '12px' }}>
                  With a strong foundation in both <strong style={{ color: '#ddd' }}>frontend and backend</strong> technologies, I specialize in React.js, Django, Java, and Node.js. I'm equally comfortable designing database schemas, building REST APIs, and crafting pixel-perfect UIs.
                </p>
                <p style={{ color: '#999', fontSize: '13px', lineHeight: 1.8 }}>
                  Outside of work, I'm constantly exploring new technologies — currently diving deep into <strong style={{ color: '#ddd' }}>AI/ML integrations</strong> and cloud-native architectures. I believe great software is built by curious, driven, and collaborative people.
                </p>
              </div>

              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '24px' }}>
                {[
                  { icon: '🚀', label: 'Projects Shipped', value: '10+', color: '#E50914' },
                  { icon: '⚡', label: 'Technologies', value: '15+', color: '#f59e0b' },
                  { icon: '📅', label: 'Years Experience', value: '1+', color: '#22c55e' },
                  { icon: '🎯', label: 'Happy Clients', value: '5+', color: '#8b5cf6' },
                ].map((s) => (
                  <div key={s.label} style={{
                    background: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    display: 'flex', alignItems: 'center', gap: '12px',
                  }}>
                    <span style={{ fontSize: '22px' }}>{s.icon}</span>
                    <div>
                      <div style={{ color: s.color, fontWeight: 900, fontSize: '20px', lineHeight: 1 }}>{s.value}</div>
                      <div style={{ color: '#666', fontSize: '11px', marginTop: '2px' }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Core skills */}
              <div style={{ marginBottom: '8px' }}>
                <div style={{ color: '#E50914', fontSize: '11px', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
                  — Core Skills
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['React.js', 'Angular', 'Django', 'Java', 'Spring Boot', 'Node.js', 'PostgreSQL', 'MySQL', 'React Native', 'Docker', 'REST APIs', 'Python'].map((skill) => (
                    <span key={skill} style={{
                      padding: '6px 12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#ddd',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 500,
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═══ CONTACT TAB ═══ */}
          {activeTab === 'contact' && (
            <div>
              <div style={{ color: '#E50914', fontSize: '11px', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>
                — Get In Touch
              </div>
              <p style={{ color: '#999', fontSize: '13px', lineHeight: 1.7, marginBottom: '24px' }}>
                I'm open to full-time roles, freelance collaborations, and interesting projects. Feel free to reach out anytime!
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { icon: '📧', label: 'Email', value: profileData.email, href: `mailto:${profileData.email}`, color: '#E50914' },
                  { icon: '📞', label: 'Phone', value: `+91 ${profileData.phone}`, href: `tel:${profileData.phone}`, color: '#22c55e' },
                  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/ka-ra', href: profileData.linkedin, color: '#0a66c2' },
                  { icon: '🐙', label: 'GitHub', value: 'github.com/ravi-rkk', href: profileData.github, color: '#e5e5e5' },
                  { icon: '📍', label: 'Location', value: profileData.location, href: null, color: '#f59e0b' },
                ].map((item) => (
                  <div key={item.label} style={{
                    background: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    display: 'flex', alignItems: 'center', gap: '14px',
                  }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '8px',
                      background: `${item.color}12`,
                      border: `1px solid ${item.color}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '18px', flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#666', fontSize: '10px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          style={{ color: '#ddd', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = item.color}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#ddd'}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span style={{ color: '#ddd', fontSize: '13px', fontWeight: 500 }}>{item.value}</span>
                      )}
                    </div>
                    {item.href && (
                      <span style={{ color: '#444', fontSize: '16px' }}>→</span>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href={`mailto:${profileData.email}`}
                  id="about-modal-email"
                  style={{
                    flex: 1, minWidth: '140px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '12px 20px',
                    background: '#E50914',
                    color: '#fff', fontWeight: 700, fontSize: '13px',
                    borderRadius: '8px', textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  📧 Email Me
                </a>
                <a
                  href="/Ravilesh_kashyap_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="about-modal-resume"
                  style={{
                    flex: 1, minWidth: '140px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '12px 20px',
                    background: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#e5e5e5', fontWeight: 700, fontSize: '13px',
                    borderRadius: '8px', textDecoration: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                >
                  📄 Download Resume
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInModal { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUpModal { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.4 } }
      `}</style>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default AboutModal;
