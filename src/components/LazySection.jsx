import React, { useState, useEffect, useRef } from 'react';

const LazySection = ({ children, height = '200px' }) => {
  const [isRendered, setIsRendered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsRendered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRendered(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' } // Pre-render 300px before scrolling into view
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} style={!isRendered ? { minHeight: height, opacity: 0 } : { transition: 'opacity 0.5s ease-in', opacity: 1 }}>
      {isRendered ? children : null}
    </div>
  );
};

export default LazySection;
