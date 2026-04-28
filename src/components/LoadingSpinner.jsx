// LoadingSpinner.jsx — Netflix-style loading screen before profile selection

import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-[#141414] flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div
          className="w-16 h-16 rounded-full border-4 border-[#333] border-t-[#E50914] mb-5"
          style={{ animation: 'spin 0.8s linear infinite' }}
        />

        {/* Logo */}
        <div
          className="text-[#E50914] text-2xl font-black tracking-[6px] mb-2"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          RAVILESH
        </div>
        <div className="text-[#808080] text-sm tracking-wide">Loading portfolio...</div>

        {/* Dots */}
        <div className="flex gap-1.5 mt-5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#E50914]"
              style={{
                animation: 'bounce 1s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
