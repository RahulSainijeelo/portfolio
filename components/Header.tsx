'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import styles from '@/styles/header.module.css';
import { animate, createTimeline } from 'animejs';

interface HeaderProps {
  logoText: string;
}

export default function Header({ logoText }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const fullNameRef = useRef<HTMLDivElement>(null);
  const initialsRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (headerRef.current) {
      animate(headerRef.current, {
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 200,
      });
    }
  }, []);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50;

    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);

      if (scrolled) {
        if (!fullNameRef.current || !initialsRef.current || !navigationRef.current || !headerRef.current) {
          return;
        }

        const scrollTimeline = createTimeline();

        scrollTimeline
          .add(fullNameRef.current, {
            opacity: [1, 0],
            scale: [1, 0.8],
            translateY: [0, -20],
            duration: 300,
            easing: 'easeInOutQuad',
          })
          .add(navigationRef.current, {
            opacity: [1, 0],
            translateX: [0, 50],
            duration: 300,
            easing: 'easeInOutQuad',
          }, '<')
          .add(initialsRef.current, {
            opacity: [0, 1],
            scale: [0.8, 1],
            translateY: [20, 0],
            duration: 400,
            easing: 'easeOutExpo',
          }, '<+=150')

      } else {
        if (!fullNameRef.current || !initialsRef.current || !navigationRef.current || !headerRef.current) {
          return;
        }

        const backTimeline = createTimeline();

        backTimeline
          .add(initialsRef.current, {
            opacity: [1, 0],
            scale: [1, 0.8],
            translateY: [0, -20],
            duration: 300,
            easing: 'easeInOutQuad',
          })
          .add(fullNameRef.current, {
            opacity: [0, 1],
            scale: [0.8, 1],
            translateY: [20, 0],
            duration: 400,
            easing: 'easeOutExpo',
          }, '<+=100')
          .add(navigationRef.current, {
            opacity: [0, 1],
            translateX: [-50, 0],
            duration: 400,
            easing: 'easeOutExpo',
          }, '<+=50')
          .add(headerRef.current, {
            backgroundColor: ['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0)'],
            duration: 400,
            easing: 'easeOutQuad',
          }, 0);
      }
    }
  }, [isScrolled]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  console.log('Header logoText:', logoText);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.headerContent}>
        <div ref={logoContainerRef} className={styles.logoContainer}>
          <div ref={fullNameRef} className={`${styles.logoView} ${styles.fullNameView}`}>
            <div className={styles.nameBox}>Rahul</div>
            <div className={styles.nameBox}>Saini</div>
          </div>
          <div ref={initialsRef} className={`${styles.logoView} ${styles.initialsView} ${styles.verticalView}`}>
            <div className={styles.initialsBox}>R</div>
            <div className={styles.initialsBox}>S</div>
          </div>
        </div>
        <nav ref={navigationRef} className={styles.navigation}>
          <a href="#projects" className={styles.nameBox}>Projects</a>
          <a href="#skills" className={styles.nameBox}>Skills</a>
          <a href="#contact" className={styles.nameBox}>Contact</a>
        </nav>
      </div>
    </header>
  );
}