'use client';
import { createContext, useContext, ReactNode } from 'react';
import { useScrollObserver } from '@/hooks/useScrollObserver';

interface ScrollObserverContextType {
  observeElement: (element: Element) => void;
  unobserveElement: (element: Element) => void;
}

const ScrollObserverContext = createContext<ScrollObserverContextType | undefined>(undefined);

export const useScrollObserverContext = () => {
  const context = useContext(ScrollObserverContext);
  if (!context) {
    throw new Error('useScrollObserverContext must be used within ScrollObserverProvider');
  }
  return context;
};

interface ScrollObserverProviderProps {
  children: ReactNode;
}

export const ScrollObserverProvider = ({ children }: ScrollObserverProviderProps) => {
  const scrollObserver = useScrollObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true,
  });

  return (
    <ScrollObserverContext.Provider value={scrollObserver}>
      {children}
    </ScrollObserverContext.Provider>
  );
};