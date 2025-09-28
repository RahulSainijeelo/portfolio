'use client';
import { useEffect, useRef, useCallback } from 'react';
import { animate } from 'animejs';

interface ScrollObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollObserver = (options: ScrollObserverOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedElements = useRef<Set<Element>>(new Set());

  const defaultAnimation = useCallback((element: Element) => {
    animate(element, {
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

  const fadeInUp = useCallback((element: Element) => {
    animate(element, {
      opacity: [0, 1],
      translateY: [100, 0],
      duration: 1000,
      easing: 'easeOutExpo',
    });
  }, []);

  const fadeInLeft = useCallback((element: Element) => {
    animate(element, {
      opacity: [0, 1],
      translateX: [-100, 0],
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

  const fadeInRight = useCallback((element: Element) => {
    animate(element, {
      opacity: [0, 1],
      translateX: [100, 0],
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

  const scaleIn = useCallback((element: Element) => {
    animate(element, {
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

  const staggerChildren = useCallback((element: Element) => {
    const children = element.querySelectorAll('[data-stagger]');
    if (children.length > 0) {
      animate(children, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        easing: 'easeOutExpo',
        delay: (el, i) => i * 100,
      });
    } else {
      defaultAnimation(element);
    }
  }, [defaultAnimation]);

  const getAnimationFunction = useCallback((animationType: string) => {
    switch (animationType) {
      case 'fade-up':
        return fadeInUp;
      case 'fade-left':
        return fadeInLeft;
      case 'fade-right':
        return fadeInRight;
      case 'scale':
        return scaleIn;
      case 'stagger':
        return staggerChildren;
      default:
        return defaultAnimation;
    }
  }, [fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerChildren, defaultAnimation]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const animationType = element.getAttribute('data-animate') || 'default';
            const delay = parseInt(element.getAttribute('data-delay') || '0', 10);
            
            setTimeout(() => {
              const animationFunction = getAnimationFunction(animationType);
              animationFunction(element);
            }, delay);

            if (triggerOnce) {
              observerRef.current?.unobserve(element);
              observedElements.current.delete(element);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    // Auto-observe elements that are already in the DOM
    const existingElements = document.querySelectorAll('[data-animate]');
    existingElements.forEach((element) => {
      observeElement(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, getAnimationFunction]);

  const observeElement = useCallback((element: Element) => {
    if (observerRef.current && !observedElements.current.has(element)) {
      // Set initial styles
      const htmlElement = element as HTMLElement;
      htmlElement.style.opacity = '0';
      
      const animationType = element.getAttribute('data-animate') || 'default';
      
      // Set initial transform based on animation type
      switch (animationType) {
        case 'fade-up':
          htmlElement.style.transform = 'translateY(100px)';
          break;
        case 'fade-left':
          htmlElement.style.transform = 'translateX(-100px)';
          break;
        case 'fade-right':
          htmlElement.style.transform = 'translateX(100px)';
          break;
        case 'scale':
          htmlElement.style.transform = 'scale(0.8)';
          break;
        case 'stagger':
          const children = element.querySelectorAll('[data-stagger]');
          children.forEach((child) => {
            (child as HTMLElement).style.opacity = '0';
            (child as HTMLElement).style.transform = 'translateY(30px)';
          });
          break;
        default:
          htmlElement.style.transform = 'translateY(50px)';
      }

      observerRef.current.observe(element);
      observedElements.current.add(element);
    }
  }, []);

  const unobserveElement = useCallback((element: Element) => {
    if (observerRef.current && observedElements.current.has(element)) {
      observerRef.current.unobserve(element);
      observedElements.current.delete(element);
    }
  }, []);

  return { observeElement, unobserveElement };
};