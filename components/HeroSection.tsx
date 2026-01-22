'use client';

import React, { useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from '@/styles/hero.module.css';
import BlurText from "@/components/BlurText"
import SplitText from './SplitText';
import useWindowSize from '@/hooks/useWindowSize';
import { BackgroundLines } from './ui/background-lines';
import ClickSpark from './ClickSpark';
import { HoleBackground } from './animate-ui/components/backgrounds/hole';


gsap.registerPlugin(ScrollTrigger, useGSAP);

const Bgs = () => {
  const { width, height } = useWindowSize();

  if (typeof window === 'undefined') return null;

  const currentWidth = width || window.innerWidth;
  const currentHeight = height || window.innerHeight;
  const isDesktop = currentWidth > 1024;

  return (
    <div className='flex absolute'>
      <HoleBackground />
    </div>
  );
};

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
    text: 'I am Rahul Saini.',
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
    animatedCompo: <div></div>,
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
    animatedCompo: <div></div>,
    componentSide: 'background'
  },
  {
    id: 'frame-4',
    text: 'Crafting seamless mobile apps with React Native.',
    bgPhase: 'wireframes',
    animatedCompo: <div></div>,
    componentSide: 'background'
  },
  {
    id: 'frame-5',
    text: 'Exploring Blockchain — Solana & Ethereum dApps, Solidity contracts, audits.',
    bgPhase: 'wireframes',
    animatedCompo: <div></div>,
    componentSide: 'background'
  },
  {
    id: 'frame-6',
    text: 'DevOps. Problem solving. Turning errors into elegant solutions.',
    bgPhase: 'grid',
    // fancy: ,
    animatedCompo: <BackgroundLines className="flex items-center justify-center w-full flex-col px-4" >""</BackgroundLines>,
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
            ) : index === 0 ? (
              <h1 className={styles.frameTitle}>{frame.text}</h1>
            ) : (
              <h2 className={styles.frameTitle}>{frame.text}</h2>
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
            ) : index === 0 ? (
              <h1 className={styles.frameTitle}>{frame.text}</h1>
            ) : (
              <h2 className={styles.frameTitle}>{frame.text}</h2>
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
          visibility: index === 0 ? 'visible' : 'hidden',
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
        scrub: 0.8,
        start: 'top top',
        end: `+=${scrollDistance}%`,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.round(progress * (totalFrames - 1));
          setActiveFrameIndex(prev => {
            if (prev !== index) return index;
            return prev;
          });
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
        scale: 1.05,
        y: -30,
        duration: 0.6,
        ease: 'power2.inOut'
      }, segmentStart);

      // Previous frame cleanup - synchronized at 0.5 to match state change
      tl.set(prevFrame, { display: 'none', visibility: 'hidden', pointerEvents: 'none', scale: 1, y: 0 }, segmentStart + 0.5);

      // Current frame setup - synchronized at 0.5 to match state change
      tl.set(currFrame, {
        display: 'flex',
        visibility: 'visible',
        pointerEvents: 'auto',
        scale: 0.98,
        y: 30,
        opacity: 0
      }, segmentStart + 0.5);

      // Current frame transition
      tl.to(currFrame, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, segmentStart + 0.5);

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
      id="home"
      className={styles.heroContainer}
    >
      <ClickSpark
        sparkColor='#fff'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}

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
      </ClickSpark>
    </div>
  );
};

export default HeroSection;