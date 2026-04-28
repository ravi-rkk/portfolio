// ProjectCard.jsx — Netflix-style project thumbnail with hover overlay + modal trigger

import React, { useState } from 'react';

const ProjectCard = ({ project, index, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const top10Projects = ['isTop10'];
  const rank = project.isTop10 ? index + 1 : null;

  return (
    <div
      id={`project-card-${project.id}`}
      className="relative flex-shrink-0 w-52 md:w-60 lg:w-64 rounded-md overflow-visible cursor-pointer"
      style={{
        zIndex: hovered ? 10 : 1,
        transition: 'transform 300ms ease, box-shadow 300ms ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick && onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick && onClick(project)}
      aria-label={`Open project: ${project.title}`}
    >
      {/* TOP 10 badge — floats above card */}
      {project.isTop10 && rank && (
        <div
          className="absolute -top-2 -left-2 z-20 bg-[#E50914] text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-wider shadow-lg"
        >
          TOP {rank}
        </div>
      )}

      {/* NEW badge */}
      {project.isNew && (
        <div className="absolute top-2 right-2 z-20 bg-[#46d369] text-black text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-wider shadow-lg">
          NEW
        </div>
      )}

      {/* Card wrapper — scaled on hover */}
      <div
        className="rounded-md overflow-hidden relative"
        style={{
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 300ms ease, box-shadow 300ms ease',
          boxShadow: hovered ? '0 0 30px rgba(229,9,20,0.25), 0 20px 60px rgba(0,0,0,0.7)' : 'none',
        }}
      >
        {/* Thumbnail */}
        {!imgError ? (
          <img
            src={project.thumb}
            alt={project.title}
            className="w-full aspect-video object-cover block"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback gradient + emoji */
          <div className={`w-full aspect-video flex items-center justify-center bg-gradient-to-br ${project.bgGradient}`}>
            <span className="text-6xl select-none">{project.thumbnail}</span>
          </div>
        )}

        {/* Default footer */}
        <div className="bg-[#181818] px-3 py-2">
          <h3 className="text-white text-sm font-bold truncate">{project.title}</h3>
          <p className="text-[#808080] text-xs mt-0.5 truncate">{project.subtitle}</p>
        </div>

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end rounded-md"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 250ms ease',
          }}
        >
          <div className="p-3">
            <h3 className="text-white text-sm font-bold mb-1">{project.title}</h3>
            <p className="text-[#b3b3b3] text-xs leading-snug mb-2 line-clamp-2">{project.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 text-xs rounded-sm font-medium"
                  style={{
                    background: `${project.accentColor}20`,
                    color: project.accentColor,
                    border: `1px solid ${project.accentColor}40`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-2">
              <button
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors"
                aria-label="View project"
                onClick={(e) => { e.stopPropagation(); onClick && onClick(project); }}
              >
                <svg className="w-3.5 h-3.5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <button
                className="w-7 h-7 rounded-full border border-white/50 flex items-center justify-center hover:border-white text-white transition-colors"
                aria-label="More info"
                onClick={(e) => { e.stopPropagation(); onClick && onClick(project); }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full border border-white/50 flex items-center justify-center hover:border-white text-white transition-colors ml-auto"
                aria-label={`GitHub: ${project.title}`}
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
