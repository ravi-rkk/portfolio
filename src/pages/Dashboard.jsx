// Dashboard.jsx — Netflix-style portfolio, content filtered by profileType

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import HeroBillboard from '../components/HeroBillboard';
import MovieRow from '../components/MovieRow';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import AboutModal from '../components/AboutModal';
import Footer from '../components/Footer';
import {
  skills, projects, experience, education, testimonials, profileConfig
} from '../data/portfolioData';

// ─── Skill Card ───────────────────────────────────────────────────────────────

const SkillCard = ({ skill }) => {
  const [hovered, setHovered] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && progressRef.current) {
            progressRef.current.style.width = `${skill.progress}%`;
          }
        });
      },
      { threshold: 0.3 }
    );
    if (progressRef.current) observer.observe(progressRef.current.parentElement);
    return () => observer.disconnect();
  }, [skill.progress]);

  return (
    <div
      id={`skill-card-${skill.id}`}
      className="relative flex-shrink-0 w-44 md:w-52 rounded-lg overflow-hidden cursor-default"
      style={{
        background: hovered ? '#1f1f1f' : '#181818',
        border: hovered ? `1px solid ${skill.color}44` : '1px solid #2a2a2a',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="h-28 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${skill.color}10, ${skill.color}25)` }}
      >
        <span
          className="text-5xl select-none"
          style={{ transition: 'transform 0.3s', transform: hovered ? 'scale(1.15)' : 'scale(1)' }}
        >
          {skill.icon}
        </span>
        <div
          className="absolute top-2 right-2 px-1.5 py-0.5 text-xs font-bold rounded-sm"
          style={{ background: `${skill.color}20`, color: skill.color, border: `1px solid ${skill.color}40` }}
        >
          {skill.category}
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-white text-sm font-bold mb-1 truncate">{skill.title}</h3>
        <p className="text-[#808080] text-xs leading-snug mb-3 line-clamp-2">{skill.description}</p>
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#808080] text-xs">Proficiency</span>
            <span className="text-xs font-bold" style={{ color: skill.color }}>{skill.progress}%</span>
          </div>
          <div className="w-full h-1 bg-[#333] rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full rounded-full"
              style={{ width: '0%', background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`, transition: 'width 1.5s ease-out' }}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {skill.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 text-xs rounded-sm"
              style={{ background: `${skill.color}15`, color: `${skill.color}cc`, border: `1px solid ${skill.color}25` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Education Card ───────────────────────────────────────────────────────────

const EducationCard = ({ edu }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      id={`edu-card-${edu.id}`}
      className="flex-shrink-0 w-52 md:w-60 rounded-lg overflow-hidden cursor-default"
      style={{ border: hovered ? '1px solid #E50914' : '1px solid #2a2a2a', transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'all 0.2s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={edu.image} alt={edu.school} className="w-full h-28 object-cover" />
      <div className="bg-[#181818] p-3">
        <h3 className="text-white text-sm font-bold mb-1 leading-snug">{edu.degree}</h3>
        <p className="text-[#808080] text-xs">{edu.school}</p>
        <p className="text-[#555] text-xs mt-1">🎓 {edu.year}</p>
      </div>
    </div>
  );
};

// ─── Testimonial Card ─────────────────────────────────────────────────────────

const TestimonialCard = ({ t }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      id={`testimonial-card-${t.id}`}
      className="flex-shrink-0 w-72 md:w-80 rounded-lg p-5 cursor-default"
      style={{ background: hovered ? '#1f1f1f' : '#181818', border: '1px solid #2a2a2a', transform: hovered ? 'scale(1.03)' : 'scale(1)', transition: 'all 0.2s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-[#E50914] text-4xl leading-none mb-3 font-serif">"</div>
      <p className="text-[#ccc] text-sm leading-relaxed mb-5 italic">{t.quote}</p>
      <div className="flex items-center gap-3">
        <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
        <div>
          <div className="text-white text-sm font-semibold">{t.name}</div>
          <div className="text-[#808080] text-xs">{t.role}</div>
        </div>
      </div>
    </div>
  );
};

// ─── Top 10 Experience Card ───────────────────────────────────────────────────

const Top10Card = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      id={`top10-card-${item.id}`}
      className="relative flex-shrink-0 flex items-center"
      style={{ width: '280px', height: '150px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="top10-number absolute left-0 bottom-0 z-0 select-none" style={{ left: '-8px', lineHeight: '1' }}>
        {item.rank}
      </div>
      <div
        className={`relative z-10 ml-16 flex-1 h-36 rounded-md overflow-hidden bg-gradient-to-br ${item.bgGradient} flex flex-col justify-end`}
        style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)', boxShadow: hovered ? '0 10px 40px rgba(0,0,0,0.6)' : 'none', transition: 'all 0.3s ease' }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-15 select-none">{item.icon}</div>
        <div className="relative z-10 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="px-1.5 py-0.5 text-xs font-bold rounded-sm uppercase"
              style={{ background: item.type === 'Education' ? '#3b82f620' : '#E5091420', color: item.type === 'Education' ? '#60a5fa' : '#E50914', border: `1px solid ${item.type === 'Education' ? '#3b82f640' : '#E5091440'}` }}>
              {item.type}
            </span>
            {item.highlight && <span className="text-yellow-400 text-xs font-bold">⭐ {item.highlight}</span>}
          </div>
          <h3 className="text-white text-sm font-bold leading-tight">{item.company}</h3>
          <p className="text-[#b3b3b3] text-xs">{item.role}</p>
          <p className="text-[#808080] text-xs">{item.period}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Contact Section ──────────────────────────────────────────────────────────

const ContactSection = () => (
  <section id="contact" className="py-16 md:py-24 px-6 md:px-12 text-center" style={{ background: '#0d0d0d' }}>
    <div className="max-w-2xl mx-auto">
      <div className="text-[#E50914] text-xs font-bold uppercase tracking-[5px] mb-4">— Get in Touch —</div>
      <h2 className="text-white font-black mb-4" style={{ fontSize: 'clamp(26px, 4vw, 46px)', fontFamily: 'Inter, sans-serif' }}>
        Let's Build Something <span className="text-[#E50914]">Great</span>
      </h2>
      <p className="text-[#808080] text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto">
        Open to full-time roles, freelance projects, and interesting collaborations.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a href="mailto:rravilesh@gmail.com" id="contact-email-btn"
          className="flex items-center gap-2.5 px-7 py-3.5 rounded font-bold text-sm text-white hover:opacity-90 transition-opacity duration-200 shadow-lg"
          style={{ background: '#E50914', boxShadow: '0 4px 20px rgba(229,9,20,0.25)' }}>
          📧 rravilesh@gmail.com
        </a>
        <a href="https://www.linkedin.com/in/ka-ra" target="_blank" rel="noopener noreferrer" id="contact-linkedin-btn"
          className="flex items-center gap-2.5 px-7 py-3.5 rounded font-bold text-sm text-[#e5e5e5] border hover:border-white/30 transition-colors duration-200"
          style={{ background: '#2a2a2a', borderColor: 'rgba(255,255,255,0.1)' }}>
          💼 LinkedIn
        </a>
        <a href="tel:7505309687" id="contact-phone-btn"
          className="flex items-center gap-2.5 px-7 py-3.5 rounded font-bold text-sm text-[#e5e5e5] border hover:border-white/30 transition-colors duration-200"
          style={{ background: '#2a2a2a', borderColor: 'rgba(255,255,255,0.1)' }}>
          📞 +91 7505309687
        </a>
      </div>
    </div>
  </section>
);

// ─── Category Banner ──────────────────────────────────────────────────────────

const CategoryBanner = ({ icon, label, desc, color = '#E50914' }) => (
  <div className="reveal-section px-6 md:px-12 py-6">
    <div
      className="relative rounded-lg overflow-hidden p-6 md:p-8"
      style={{ background: `linear-gradient(135deg, ${color}08, ${color}15, ${color}08)`, border: `1px solid ${color}20` }}
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-4">
        <div className="text-4xl">{icon}</div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color }}>Category</div>
          <h2 className="text-white text-xl md:text-2xl font-bold mb-2">{label}</h2>
          <p className="text-[#b3b3b3] text-sm max-w-lg">{desc}</p>
        </div>
      </div>
    </div>
  </div>
);

// ─── Dashboard ────────────────────────────────────────────────────────────────

const Dashboard = ({ profileType = 'fullstack', onProfileClick }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  const config = profileConfig[profileType] || profileConfig.fullstack;

  // Filter skills and projects by profile type
  const filteredSkills = profileType === 'hireme'
    ? skills // Show all for "hire me"
    : skills.filter((s) => s.profile === profileType);

  const filteredProjects = profileType === 'hireme'
    ? projects
    : projects.filter((p) => p.profile === profileType || p.profile === 'both');

  const top10Projects = filteredProjects.filter((p) => p.isTop10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            entry.target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal-section').forEach((el) => {
      el.style.opacity = '0';
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [profileType]);

  return (
    <div id="dashboard" className="min-h-screen bg-[#141414]">
      <Navbar onProfileClick={() => setShowAbout(true)} profileType={profileType} />

      {/* Dynamic hero */}
      <HeroBillboard profileType={profileType} onMoreInfo={() => setShowAbout(true)} />

      <div className="pt-4">

        {/* Skills Row */}
        <div id="skills" className="reveal-section pt-6">
          <MovieRow
            title={config.rowTitle}
            items={filteredSkills}
            renderItem={(skill) => <SkillCard skill={skill} />}
          />
        </div>

        {/* Category Banner 1 */}
        <CategoryBanner
          icon={config.categoryBanner1.icon}
          label={config.categoryBanner1.label}
          desc={config.categoryBanner1.desc}
          color={profileType === 'appdev' ? '#61dafb' : '#E50914'}
        />

        {/* Projects Row */}
        <div id="projects" className="reveal-section">
          <MovieRow
            title="Trending Projects"
            items={filteredProjects}
            renderItem={(project, index) => (
              <ProjectCard
                project={project}
                index={top10Projects.indexOf(project)}
                onClick={setSelectedProject}
              />
            )}
            badge="NEW"
          />
        </div>

        {/* Category Banner 2 */}
        <CategoryBanner
          icon={config.categoryBanner2.icon}
          label={config.categoryBanner2.label}
          desc={config.categoryBanner2.desc}
          color={profileType === 'appdev' ? '#f59e0b' : '#3b82f6'}
        />

        {/* Top 10 Experience */}
        <div id="experience" className="reveal-section">
          <MovieRow
            title="Top 10 in Pune Today"
            items={experience}
            renderItem={(item) => <Top10Card item={item} />}
            badge="TOP 10"
          />
        </div>

        {/* Education */}
        <div className="reveal-section">
          <MovieRow
            title="🎓 Education"
            items={education}
            renderItem={(edu) => <EducationCard edu={edu} />}
          />
        </div>

        {/* Testimonials */}
        {/* <div className="reveal-section">
          <MovieRow
            title="💬 What People Say"
            items={testimonials}
            renderItem={(t) => <TestimonialCard t={t} />}
          />
        </div> */}

        {/* About section */}
        <section className="reveal-section px-6 md:px-12 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-[#E50914] rounded-full" />
                <span className="text-[#E50914] text-xs font-semibold uppercase tracking-widest">About</span>
              </div>
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Passionate About Building <br />
                <span className="text-[#E50914]">Extraordinary Products</span>
              </h2>
              <p className="text-[#b3b3b3] text-sm md:text-base leading-relaxed mb-4">
                {profileType === 'appdev'
                  ? 'Mobile-first developer crafting cross-platform iOS and Android experiences using React Native.  Expert in Firebase, Redux, animations, and on-device AI integrations.'
                  : 'Full Stack Developer at Creasophere Tech Pvt. Ltd. specializing in React.js, Django, and emerging AI technologies. I turn complex ideas into elegant, user-centric solutions.'}
              </p>
              <p className="text-[#808080] text-sm leading-relaxed">
                PG Diploma from C-DAC Pune and B.Tech in Computer Science. Bridging academic rigor with real-world engineering to deliver impactful, production-grade software.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(profileType === 'appdev'
                ? [
                    { label: 'Mobile Apps', value: '3+', icon: '📱', color: '#61dafb' },
                    { label: 'App Users', value: '2K+', icon: '👥', color: '#f59e0b' },
                    { label: 'Avg Rating', value: '4.7★', icon: '⭐', color: '#22c55e' },
                    { label: 'Platforms', value: 'iOS+Android', icon: '🌐', color: '#8b5cf6' },
                  ]
                : [
                    { label: 'Projects Shipped', value: '10+', icon: '🚀', color: '#E50914' },
                    { label: 'Technologies', value: '15+', icon: '⚡', color: '#f59e0b' },
                    { label: 'Years Experience', value: '1+', icon: '📅', color: '#22c55e' },
                    { label: 'Happy Clients', value: '5+', icon: '🎯', color: '#8b5cf6' },
                  ]
              ).map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-lg border border-white/5 hover:border-white/10 group transition-all duration-200"
                  style={{ background: '#181818' }}
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200 inline-block">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-[#808080] text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <ContactSection />
      </div>

      <Footer onProfileClick={onProfileClick} />

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  );
};

export default Dashboard;
