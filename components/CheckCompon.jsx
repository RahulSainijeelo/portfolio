'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import styles from '@/styles/hero.module.css';

interface FrameData {
  id: string;
  image: string;
  text: string;
  subtext?: string;
  bgPhase: 'minimal' | 'wireframes' | 'nodes' | 'grid' | 'experience';
}

const framesData: FrameData[] = [
  {
    id: 'frame-1',
    image: '/images/developer-icon.svg',
    text: 'I am a Developer.',
    bgPhase: 'minimal'
  },
  {
    id: 'frame-2',
    image: '/images/frontend-icon.svg',
    text: 'Coding since \'23 — from crafting engaging frontends…',
    bgPhase: 'minimal'
  },
  {
    id: 'frame-3',
    image: '/images/backend-icon.svg',
    text: '…to building sophisticated backends & services.',
    bgPhase: 'wireframes'
  },
  {
    id: 'frame-4',
    image: '/images/mobile-icon.svg',
    text: 'Crafting seamless mobile apps with React Native.',
    bgPhase: 'wireframes'
  },
  {
    id: 'frame-5',
    image: '/images/blockchain-icon.svg',
    text: 'Exploring Blockchain — Solana & Ethereum dApps, Solidity contracts, audits.',
    bgPhase: 'nodes'
  },
  {
    id: 'frame-6',
    image: '/images/devops-icon.svg',
    text: 'DevOps. Problem solving. Turning errors into elegant solutions.',
    bgPhase: 'grid'
  },
  {
    id: 'frame-7',
    image: '/images/experience-icon.svg',
    text: 'This is not just development. It\'s building experiences.',
    subtext: 'Welcome to my journey',
    bgPhase: 'experience'
  }
];

// Map bgPhase to actual background colors
const backgroundPhases: Record<FrameData['bgPhase'], string> = {
  minimal: '#0a0a0a',
  wireframes: '#1a1a2e',
  nodes: '#16213e',
  grid: '#0f3460',
  experience: '#533483'
};

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Set initial states
    // Frame visibility: only the first is visible
    gsap.set(frameRefs.current.slice(1), { opacity: 0 });
    // Background color: set to the first frame's bgPhase
    gsap.set(containerRef.current, { 
      backgroundColor: backgroundPhases[framesData[0].bgPhase] 
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.5,
        start: 'top top',
        end: `+=700%`, // Adjust duration as needed
      },
    });

    frameRefs.current.forEach((frame, index) => {
      if (index === 0) return; // Skip the first frame as it's already visible

      const currentFrameData = framesData[index];
      const previousFrameData = framesData[index - 1];

      // Add a pause/label at the start of the transition
      tl.addLabel(`frame-${index}`);

      // 1. Animate background color if it changes
      if (currentFrameData.bgPhase !== previousFrameData.bgPhase) {
        tl.to(containerRef.current, {
          backgroundColor: backgroundPhases[currentFrameData.bgPhase],
          duration: 0.5,
        }, `frame-${index}`); // Start at the label
      }

      // 2. Fade in the new frame
      tl.to(frame, {
        opacity: 1,
        duration: 0.5,
      }, `frame-${index}`); // Start at the same time as the background change

      // 3. Fade out the previous frame
      tl.to(frameRefs.current[index - 1], {
        opacity: 0,
        duration: 0.5,
      }, `frame-${index}`); // Also start at the same time (cross-fade)
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.heroContainer}
    >
      {framesData.map((frame, index) => (
        <div
          key={frame.id}
          ref={(el: HTMLDivElement | null) => {
            frameRefs.current[index] = el;
          }}
          className={`${styles.frame} ${styles[`frame${index + 1}`]}`}
        >
          <div className={styles.frameContent}>
            {/* Left side: Image */}
            <div className={styles.frameImageContainer}>
              <div className={styles.frameImageWrapper}>
                <Image
                  src={frame.image}
                  alt={frame.text}
                  width={200}
                  height={200}
                  className={styles.frameImage}
                />
                <div className={styles.imageGlow}></div>
              </div>
            </div>

            {/* Right side: Text Content */}
            <div className={styles.frameTextContainer}>
              <h1 className={styles.frameTitle}>
                {frame.text}
              </h1>
              {frame.subtext && (
                <p className={styles.frameSubtext}>
                  {frame.subtext}
                </p>
              )}
              <div className={styles.frameNumber}>
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSection;
