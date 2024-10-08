"use client"; // Add this line for client-side rendering

const SCROLL_UP = 'up';
const SCROLL_DOWN = 'down';

import { useState, useEffect } from 'react';

const useScrollDirection = ({ initialDirection, thresholdPixels, off } = {}) => {
  const [scrollDir, setScrollDir] = useState(initialDirection);

  useEffect(() => {
    if (typeof window !== 'undefined') { // Check if window is defined (browser context)
      const threshold = thresholdPixels;
      let lastScrollY = window.pageYOffset;
      let ticking = false;

      const updateScrollDir = () => {
        const scrollY = window.pageYOffset;

        if (Math.abs(scrollY - lastScrollY) < threshold) {
          ticking = false;
          return;
        }

        setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
        lastScrollY = scrollY > 0 ? scrollY : 0;
        ticking = false;
      };

      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(updateScrollDir);
          ticking = true;
        }
      };

      !off ? window.addEventListener('scroll', onScroll) : setScrollDir(initialDirection);

      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [initialDirection, thresholdPixels, off]);

  return scrollDir;
};

export default useScrollDirection;