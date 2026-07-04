import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollReveal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, _observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: stop observing once revealed
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Wait a brief moment to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal');
      
      // Instantly reveal elements already visible in the viewport on load
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('active');
        }
      });

      revealElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, [pathname]);
};
