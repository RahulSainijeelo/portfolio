'use client';

import React, { useRef, useState, useMemo } from 'react';
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
import Antigravity from "./animation/Antigravity"
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
    animatedCompo: <UseTime />,
    componentSide: 'background'
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
    componentSide: 'background'
  },
  {
    id: 'frame-5',
    text: 'Exploring Blockchain — Solana & Ethereum dApps, Solidity contracts, audits.',
    bgPhase: 'nodes',
    animatedCompo: <Antigravity />,
    componentSide: 'background'
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

const HeroFrame = React.memo(({ frame, index, isActive, frameRef }: {
  frame: FrameData;
  index: number;
  isActive: boolean;
  frameRef: (el: HTMLDivElement | null) => void;
}) => {
  const isBackground = frame.componentSide === 'background';
  const isRight = frame.componentSide === 'right';

  return (
    <div
      ref={frameRef}
      className={`${styles.frame} ${styles[`frame${index + 1}`]} ${isRight ? styles.frameReverse : ''
        } ${isBackground ? styles.frameBackground : ''
        }`}
    >
      {isBackground ? (
        <>
          <div className={styles.frameBackgroundContainer}>
            {isActive && frame.animatedCompo}
          </div>
          <div className={styles.frameTextOverlay}>
            {frame.fancy ? (
              <div className={styles.frameTitle}>{frame.fancy}</div>
            ) : (
              <h1 className={styles.frameTitle}>{frame.text}</h1>
            )}
            {frame.subtext && <p className={styles.frameSubtext}>{frame.subtext}</p>}
          </div>
        </>
      ) : (
        <div className={styles.frameContent}>
          <div className={styles.frameComponentContainer}>
            {isActive && frame.animatedCompo}
          </div>
          <div className={styles.frameTextContainer}>
            {frame.fancy ? (
              <div className={styles.frameTitle}>{frame.fancy}</div>
            ) : (
              <h1 className={styles.frameTitle}>{frame.text}</h1>
            )}
            {frame.subtext && <p className={styles.frameSubtext}>{frame.subtext}</p>}
          </div>
        </div>
      )}
    </div>
  );
});

HeroFrame.displayName = 'HeroFrame';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);

  const backgroundPhases = useMemo(() => ({
    minimal: '#030303',
    wireframes: '#050505',
    nodes: '#070707',
    grid: '#090909',
    experience: '#0B0B0B'
  }), []);

  useGSAP(() => {
    const totalFrames = framesData.length;
    const scrollDistance = totalFrames * 100;

    frameRefs.current.forEach((frame, index) => {
      if (frame) {
        gsap.set(frame, {
          opacity: index === 0 ? 1 : 0,
          display: index === 0 ? 'flex' : 'none',
          pointerEvents: index === 0 ? 'auto' : 'none'
        });
      }
    });

    if (containerRef.current) {
      gsap.set(containerRef.current, {
        backgroundColor: backgroundPhases[framesData[0].bgPhase]
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.8, // More responsive feel
        start: 'top top',
        end: `+=${scrollDistance}%`,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.round(progress * (totalFrames - 1));
          if (index !== activeFrameIndex) {
            setActiveFrameIndex(index);
          }
        },
        snap: {
          snapTo: 1 / (totalFrames - 1),
          duration: { min: 0.2, max: 0.5 },
          delay: 0.1,
          ease: 'power2.inOut'
        }
      }
    });

    framesData.forEach((_, index) => {
      if (index === 0) return;

      const prevFrame = frameRefs.current[index - 1];
      const currFrame = frameRefs.current[index];
      const segmentStart = index - 1;

      // Previous frame transition: Fade out + Scale up (zoom out effect)
      tl.to(prevFrame, {
        opacity: 0,
        scale: 1.05, // Slightly less zoom for smoother feel
        y: -30,
        duration: 0.6,
        ease: 'power2.inOut'
      }, segmentStart);

      // Previous frame cleanup
      tl.set(prevFrame, { display: 'none', pointerEvents: 'none', scale: 1, y: 0 }, segmentStart + 0.6);

      // Current frame setup: Start slightly scaled down and below
      tl.set(currFrame, {
        display: 'flex',
        pointerEvents: 'auto',
        scale: 0.98,
        y: 30,
        opacity: 0
      }, segmentStart + 0.1);

      // Current frame transition - Ensuring text is fully visible and background is transparent
      tl.to(currFrame, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, segmentStart + 0.2);

      // Background color transition
      tl.to(containerRef.current, {
        backgroundColor: backgroundPhases[framesData[index].bgPhase],
        duration: 0.8
      }, segmentStart);
    });

  }, { scope: containerRef }); // Scope to container for better performance


  return (
    <div
      ref={containerRef}
      className={styles.heroContainer}
    >
      {framesData.map((frame, index) => (
        <HeroFrame
          key={frame.id}
          frame={frame}
          index={index}
          isActive={activeFrameIndex === index}
          frameRef={(el) => {
            frameRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  );
};

export default HeroSection;