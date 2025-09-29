'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import styles from '@/styles/hero.module.css';

const secondaryImages = [
  '/animation/0.png',
  '/animation/1.png',
  '/animation/2.png',
  '/animation/3.png',
  '/animation/4.png',
  '/animation/5.png',
  '/animation/6.png',
  '/animation/7.png',
  '/animation/8.png',
  '/animation/9.png',
  '/animation/10.png',
  '/animation/11.png',
  '/animation/11.png',
  '/animation/11.png',
];

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
  const secondaryCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const DURATION_PER_FRAME = 200;
    const totalDuration = framesData.length * DURATION_PER_FRAME;

    // Initial setup
    gsap.set(frameRefs.current.slice(1), { opacity: 0 });
    gsap.set(containerRef.current, { 
      backgroundColor: backgroundPhases[framesData[0].bgPhase] 
    });

    // Show first frame
    if (frameRefs.current[0]) {
      gsap.set(frameRefs.current[0], { opacity: 1 });
    }

    // Main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.8,
        start: 'top top',
        end: `+=${totalDuration}%`,
      },
    });

    // Secondary animation setup
    const secondaryCanvas = secondaryCanvasRef.current;
    const secondaryContext = secondaryCanvas?.getContext('2d');
    
    if (secondaryCanvas && secondaryContext) {
      secondaryCanvas.width = 300;
      secondaryCanvas.height = 200;

      const secondaryFrame = { index: 0 };
      const preloadedSecondaryImages: HTMLImageElement[] = [];

      // Preload secondary images
      secondaryImages.forEach((src, index) => {
        const img = document.createElement('img') as HTMLImageElement;
        img.src = src;
        img.onload = () => {
          if (index === 0) renderSecondaryFrame();
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
        };
        preloadedSecondaryImages.push(img);
      });

      const renderSecondaryFrame = () => {
        const img = preloadedSecondaryImages[Math.floor(secondaryFrame.index)];
        if (img && img.complete) {
          secondaryContext.clearRect(0, 0, secondaryCanvas.width, secondaryCanvas.height);
          secondaryContext.drawImage(img, 0, 0, secondaryCanvas.width, secondaryCanvas.height);
        }
      };

      // Continuous secondary image animation (spans entire scroll duration)
      tl.to(secondaryFrame, {
        index: secondaryImages.length - 1,
        duration: totalDuration,
        ease: 'none',
        onUpdate: renderSecondaryFrame,
      }, 0); // Start at beginning of timeline

      // Add frame animations (discrete changes every 200 units)
      framesData.forEach((frame, index) => {
        if (index === 0) return; // Skip first frame

        const currentFrame = frameRefs.current[index];
        const previousFrame = frameRefs.current[index - 1];
        const currentFrameData = framesData[index];
        const previousFrameData = framesData[index - 1];

        tl.addLabel(`frame-${index}`, index * DURATION_PER_FRAME);

        // Background color change
        if (currentFrameData.bgPhase !== previousFrameData.bgPhase) {
          tl.to(containerRef.current, {
            backgroundColor: backgroundPhases[currentFrameData.bgPhase],
            duration: 50,
          }, `frame-${index}`);
        }

        // Frame transition
        tl.to(currentFrame, {
          opacity: 1,
          duration: 50,
        }, `frame-${index}`)
        .to(previousFrame, {
          opacity: 0,
          duration: 50,
        }, `frame-${index}`);
      });

    } else {
      // If no secondary canvas, just add frame animations
      framesData.forEach((frame, index) => {
        if (index === 0) return;

        const currentFrame = frameRefs.current[index];
        const previousFrame = frameRefs.current[index - 1];
        const currentFrameData = framesData[index];
        const previousFrameData = framesData[index - 1];

        tl.addLabel(`frame-${index}`, index * DURATION_PER_FRAME);

        if (currentFrameData.bgPhase !== previousFrameData.bgPhase) {
          tl.to(containerRef.current, {
            backgroundColor: backgroundPhases[currentFrameData.bgPhase],
            duration: 50,
          }, `frame-${index}`);
        }

        tl.to(currentFrame, {
          opacity: 1,
          duration: 50,
        }, `frame-${index}`)
        .to(previousFrame, {
          opacity: 0,
          duration: 50,
        }, `frame-${index}`);
      });
    }
    
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
      
      <div className={styles.secondaryAnimationContainer}>
        <canvas ref={secondaryCanvasRef} className={styles.secondaryCanvas}></canvas>
      </div>
    </div>
  );
};

export default HeroSection;
