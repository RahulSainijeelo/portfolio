'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from '@/styles/hero.module.css';
import UseTime from './animation/UseTime';
import Cube from './Cube';
import PathDrawing from './animation/PathDrawing';
import MotionPath from './animation/MotionPath';
import MagnetciGrid from './animation/MagneticGrid';
import Hyperspeed from "@/components/Hyperspeed"
import DecryptedText from "@/components/DecryptedText"
import BlurText from "@/components/BlurText"
import SplitText from './SplitText';
import Orb from './Orb';
import Galaxy from "./Galaxy"
// Register plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Bgs = () => {
  return (
    <Hyperspeed
      effectOptions={{
        onSpeedUp: () => { },
        onSlowDown: () => { },
        distortion: 'turbulentDistortion',
        length: 400,
        roadWidth: 10,
        islandWidth: 2,
        lanesPerRoad: 4,
        fov: 90,
        fovSpeedUp: 150,
        speedUp: 2,
        carLightsFade: 0.4,
        totalSideLightSticks: 20,
        lightPairsPerRoadWay: 40,
        shoulderLinesWidthPercentage: 0.05,
        brokenLinesWidthPercentage: 0.1,
        brokenLinesLengthPercentage: 0.5,
        lightStickWidth: [0.12, 0.5],
        lightStickHeight: [1.3, 1.7],
        movingAwaySpeed: [60, 80],
        movingCloserSpeed: [-120, -160],
        carLightsLength: [400 * 0.03, 400 * 0.2],
        carLightsRadius: [0.05, 0.14],
        carWidthPercentage: [0.3, 0.5],
        carShiftX: [-0.8, 0.8],
        carFloorSeparation: [0, 5],
        colors: {
          roadColor: 0x080808,
          islandColor: 0x0a0a0a,
          background: 0x000000,
          shoulderLines: 0xFFFFFF,
          brokenLines: 0xFFFFFF,
          leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
          rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
          sticks: 0x03B3C3,
        }
      }}
    />
  )
}

interface FrameData {
  id: string;
  text: string;
  fancy?: any
  subtext?: string;
  bgPhase: 'minimal' | 'wireframes' | 'nodes' | 'grid' | 'experience';
  animatedCompo: any;
  componentSide: 'left' | 'right' | 'background';
}

const framesData: FrameData[] = [
  {
    id: 'frame-1',
    text: 'I am a Developer.',
    bgPhase: 'minimal',
    animatedCompo: <Bgs />,
    componentSide: 'background'
  },
  {
    id: 'frame-2',
    text: 'Coding since \'23 — from crafting engaging frontends…',
    fancy: <BlurText
      text={'Coding since \'23 — from crafting engaging frontends…'}
      delay={150}
      animateBy="words"
      direction="top"
    />
    ,
    bgPhase: 'minimal',
    animatedCompo: <PathDrawing />,
    componentSide: 'right'
  },
  {
    id: 'frame-3',
    text: '…to building sophisticated backends & services.',
    bgPhase: 'wireframes',
    fancy: <SplitText text='…to building sophisticated backends & services.'


      // splitType="chars"
      from={{ opacity: 0, y: 40 }}
      to={{ opacity: 1, y: 0 }}
    // threshold={0.1}
    // rootMargin="-100px"
    />,
    animatedCompo: <Orb />,
    componentSide: 'background'
  },
  {
    id: 'frame-4',
    text: 'Crafting seamless mobile apps with React Native.',
    bgPhase: 'wireframes',
    animatedCompo: <MotionPath />,
    componentSide: 'right'
  },
  {
    id: 'frame-5',
    text: 'Exploring Blockchain — Solana & Ethereum dApps, Solidity contracts, audits.',
    bgPhase: 'nodes',
    animatedCompo: <MagnetciGrid className='w-full h-full' />,
    componentSide: 'left'
  },
  {
    id: 'frame-6',
    text: 'DevOps. Problem solving. Turning errors into elegant solutions.',
    bgPhase: 'grid',
    animatedCompo: <Galaxy
      mouseRepulsion={true}
      mouseInteraction={true}
      density={1.5}
      glowIntensity={0.5}
      saturation={0.8}
      hueShift={240}
    />,
    componentSide: 'background'
  },
];

const backgroundPhases: Record<FrameData['bgPhase'], string> = {
  minimal: '#0A0A0E',
  wireframes: '#15141D',
  nodes: '#1C1B26',
  grid: '#22212D',
  experience: '#282635'
};

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const DURATION_PER_FRAME = 90;
    const totalDuration = framesData.length * DURATION_PER_FRAME;

    // Initial setup - Hide all frames except first
    frameRefs.current.forEach((frame, index) => {
      if (frame) {
        if (index === 0) {
          gsap.set(frame, { opacity: 1, display: 'flex' });
        } else {
          gsap.set(frame, { opacity: 0, display: 'none' });
        }
      }
    });

    // Set initial background color
    if (containerRef.current) {
      gsap.set(containerRef.current, {
        backgroundColor: backgroundPhases[framesData[0].bgPhase]
      });
    }

    // Main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.8,
        start: 'top top',
        end: `+=${totalDuration}%`,
        onUpdate: (self) => {
          // Calculate which frame should be active based on progress
          const progress = self.progress;
          const activeFrameIndex = Math.min(
            Math.floor(progress * framesData.length),
            framesData.length - 1
          );

          // Show only the active frame
          frameRefs.current.forEach((frame, index) => {
            if (frame) {
              if (index === activeFrameIndex) {
                gsap.set(frame, { display: 'flex' });
                gsap.to(frame, { opacity: 1, duration: 0.1 });
              } else {
                gsap.to(frame, {
                  opacity: 0,
                  duration: 0.1,
                  onComplete: () => {
                    gsap.set(frame, { display: 'none' });
                  }
                });
              }
            }
          });

          // Update background color
          if (containerRef.current) {
            const currentBgPhase = framesData[activeFrameIndex].bgPhase;
            gsap.to(containerRef.current, {
              backgroundColor: backgroundPhases[currentBgPhase],
              duration: 0.3
            });
          }
        }
      },
    });

    // Add frame animations for smooth transitions
    framesData.forEach((frame, index) => {
      if (index === 0) return; // Skip first frame

      tl.addLabel(`frame-${index}`, index * DURATION_PER_FRAME);

      // Add a placeholder animation to maintain timeline structure
      tl.to({}, { duration: 50 }, `frame-${index}`);
    });

  }, { scope: containerRef }); // Scope to container for better performance

  const renderFrameContent = (frame: FrameData, index: number) => {
    if (frame.componentSide === 'background') {
      // Background component layout
      return (
        <>
          {/* Background Component - Full Width */}
          <div className={styles.frameBackgroundContainer}>
            {frame.animatedCompo}
          </div>

          {/* Text Overlay */}
          <div className={styles.frameTextOverlay}>
            {frame.fancy ? (
              <div className={styles.frameTitle}>
                {frame.fancy}
              </div>
            ) : (
              <h1 className={styles.frameTitle}>
                {frame.text}
              </h1>
            )}
            {frame.subtext && (
              <p className={styles.frameSubtext}>
                {frame.subtext}
              </p>
            )}
          </div>
        </>
      );
    } else {
      // Side-by-side layout
      return (
        <div className={styles.frameContent}>
          {/* Animated Component Container */}
          <div className={styles.frameComponentContainer}>
            {frame.animatedCompo}
          </div>

          {/* Text Container */}
          <div className={styles.frameTextContainer}>
            {frame.fancy ?
              <div className={styles.frameTitle}>
                {frame.fancy}
              </div>

              : (
                <h1 className={styles.frameTitle}>
                  {frame.text}
                </h1>
              )}
            {frame.subtext && (
              <p className={styles.frameSubtext}>
                {frame.subtext}
              </p>
            )}
          </div>
        </div>
      );
    }
  };

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
          className={`${styles.frame} ${styles[`frame${index + 1}`]} ${frame.componentSide === 'right' ? styles.frameReverse : ''
            } ${frame.componentSide === 'background' ? styles.frameBackground : ''
            }`}
        >
          {renderFrameContent(frame, index)}
        </div>
      ))}
    </div>
  );
};

export default HeroSection;