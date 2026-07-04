import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollReveal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const revealAll = () => {
      document.querySelectorAll('.reveal').forEach((element) => element.classList.add('active'));
    };

    if (!('IntersectionObserver' in window) || !('MutationObserver' in window)) {
      revealAll();
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeElement = (element) => {
      if (element.classList.contains('active')) return;
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add('active');
        return;
      }
      observer.observe(element);
    };

    const observeRevealElements = (root) => {
      if (root instanceof Element && root.matches('.reveal')) observeElement(root);
      root.querySelectorAll?.('.reveal').forEach(observeElement);
    };

    observeRevealElements(document);

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) observeRevealElements(node);
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname]);
};
