// ProfileCard.jsx — Netflix-style profile selection card

import React from 'react';

const ProfileCard = ({ name, emoji, color, isKids, onClick }) => {
  return (
    <div
      className="flex flex-col items-center gap-3 cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick && onClick()}
      aria-label={`Select profile: ${name}`}
    >
      {/* Avatar */}
      <div
        className="relative w-28 h-28 md:w-36 md:h-36 rounded-md overflow-hidden transition-all duration-300 group-hover:ring-4 group-hover:ring-white group-hover:scale-105"
        style={{ background: color || '#1a1a2e' }}
      >
        {/* Inner content */}
        <div className="w-full h-full flex items-center justify-center">
          {emoji ? (
            <span className="text-6xl md:text-7xl select-none">{emoji}</span>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center">
              <span className="text-5xl md:text-6xl font-black text-white select-none">
                {name ? name.charAt(0).toUpperCase() : 'R'}
              </span>
            </div>
          )}
        </div>

        {/* Kids overlay badge */}
        {isKids && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-400 py-1 text-center">
            <span className="text-xs font-bold text-black tracking-wide">KIDS</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
      </div>

      {/* Name */}
      <span className="text-[#808080] text-sm md:text-base font-medium group-hover:text-white transition-colors duration-200 tracking-wide">
        {name}
      </span>
    </div>
  );
};

export default ProfileCard;
