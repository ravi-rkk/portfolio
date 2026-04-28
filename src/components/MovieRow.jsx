// MovieRow.jsx — Reusable Netflix-style horizontal scrollable row

import React, { useRef, useState } from 'react';

const MovieRow = ({ title, items, renderItem, showArrows = true, badge = null }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHoveringRow, setIsHoveringRow] = useState(false);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(updateScrollButtons, 400);
    }
  };

  return (
    <section
      className="pb-8 relative group/row"
      onMouseEnter={() => setIsHoveringRow(true)}
      onMouseLeave={() => setIsHoveringRow(false)}
      aria-label={title}
    >
      {/* Row Header */}
      <div className="flex items-center gap-3 mb-3 px-6 md:px-12">
        <h2 className="text-white text-lg md:text-xl font-bold tracking-tight hover:text-[#E50914] transition-colors duration-200 flex items-center gap-2 cursor-pointer">
          {title}
          <svg
            className="w-4 h-4 text-[#54b9c5] transition-transform duration-200 group-hover/row:translate-x-1 opacity-0 group-hover/row:opacity-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </h2>

        {badge && (
          <span className="px-2 py-0.5 bg-[#E50914] text-white text-xs font-bold rounded-sm uppercase tracking-wide">
            {badge}
          </span>
        )}
      </div>

      {/* Scroll Wrapper */}
      <div className="relative">
        {/* Left Arrow */}
        {showArrows && canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-gradient-to-r from-black/80 to-transparent transition-all duration-200 ${
              isHoveringRow ? 'opacity-100' : 'opacity-0'
            } hover:from-black/95`}
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right Arrow */}
        {showArrows && canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-gradient-to-l from-black/80 to-transparent transition-all duration-200 ${
              isHoveringRow ? 'opacity-100' : 'opacity-0'
            } hover:from-black/95`}
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Scrollable Items */}
        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className="flex gap-3 px-6 md:px-12 pb-6 py-4"
          style={{
            overflowX: 'auto',
            overflowY: 'visible',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {items.map((item, index) => (
            <div key={item.id || index} className="flex-shrink-0" style={{ overflow: 'visible' }}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieRow;
