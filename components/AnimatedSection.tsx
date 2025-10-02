'use client';
import { useEffect, useRef, ReactNode } from 'react';
import { useScrollObserverContext } from '@/contexts/ScrollObserverContext';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'default' | 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'stagger';
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'default',
  delay = 0,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { observeElement } = useScrollObserverContext();

  useEffect(() => {
    if (sectionRef.current) {
      observeElement(sectionRef.current);
    }
  }, [observeElement]);

  return (
    <div
      ref={sectionRef}
      className={className}
      data-animate={animation}
      data-delay={delay.toString()}
    >
      {children}
    </div>
  );
}