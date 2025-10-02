import { useEffect, useRef } from 'react';
import { scrollReveal } from '@/utils/animations';

export const useScrollAnimations = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scrollReveal(entry.target);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Auto-observe elements with data-animate attribute
    const animateElements = document.querySelectorAll('[data-animate="scroll"]');
    animateElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const observeElement = (element: Element) => {
    observerRef.current?.observe(element);
  };

  return { observeElement };
};