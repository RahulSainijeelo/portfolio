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
  fancy?: any;
  subtext?: string;
  bgPhase: 'minimal' | 'wireframes' | 'nodes' | 'grid' | 'experience';
  videoUrl: string;
  componentSide: 'left' | 'right' | 'background';
}

const framesData: FrameData[] = [
  {
    id: 'frame-1',
    text: 'I am a Developer.',
    bgPhase: 'minimal',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-modern-high-tech-background-27083-large.mp4',
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
    />,
    bgPhase: 'minimal',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-circuit-moving-light-27084-large.mp4',
    componentSide: 'background'
  },
  {
    id: 'frame-3',
    text: '…to building sophisticated backends & services.',
    bgPhase: 'wireframes',
    fancy: <SplitText text='…to building sophisticated backends & services.'
      from={{ opacity: 0, y: 40 }}
      to={{ opacity: 1, y: 0 }}
    />,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-binary-code-of-a-computer-screen-27085-large.mp4',
    componentSide: 'background'
  },
  {
    id: 'frame-4',
    text: 'Crafting seamless mobile apps with React Native.',
    bgPhase: 'wireframes',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-glowing-neon-circles-in-a-dark-abstract-background-27086-large.mp4',
    componentSide: 'background'
  },
  {
    id: 'frame-5',
    text: 'Exploring Blockchain — Solana & Ethereum dApps, Solidity contracts, audits.',
    bgPhase: 'nodes',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-networking-nodes-in-blue-background-27087-large.mp4',
    componentSide: 'background'
  },
  {
    id: 'frame-6',
    text: 'DevOps. Problem solving. Turning errors into elegant solutions.',
    bgPhase: 'grid',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-matrix-style-binary-code-digits-passing-27088-large.mp4',
    componentSide: 'background'
  },
];

const backgroundPhases: Record<FrameData['bgPhase'], string> = {
  minimal: '#030303',
  wireframes: '#050505',
  nodes: '#070707',
  grid: '#090909',
  experience: '#0B0B0B'
};

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = React.useState(0);

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
        scrub: 1,
        start: 'top top',
        end: `+=${scrollDistance}%`,
        onUpdate: (self) => {
          const index = Math.round(self.progress * (totalFrames - 1));
          if (index !== activeIndex) {
            setActiveIndex(index);
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

      tl.to(prevFrame, {
        opacity: 0,
        duration: 0.5,
      }, segmentStart);

      tl.set(prevFrame, { display: 'none', pointerEvents: 'none' }, segmentStart + 0.5);
      tl.set(currFrame, { display: 'flex', pointerEvents: 'auto' }, segmentStart + 0.1);

      tl.to(currFrame, {
        opacity: 1,
        duration: 0.5
      }, segmentStart + 0.1);

      tl.to(containerRef.current, {
        backgroundColor: backgroundPhases[framesData[index].bgPhase],
        duration: 0.8
      }, segmentStart);
    });

  }, [activeIndex]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex]);

  const renderFrameContent = (frame: FrameData, index: number) => {
    return (
      <>
        <div className={styles.frameBackgroundContainer}>
          <video
            ref={(el) => { videoRefs.current[index] = el; }}
            src={frame.videoUrl}
            muted
            loop
            playsInline
            className={styles.heroBgVideo}
          />
          <div className={styles.videoOverlay} />
        </div>

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