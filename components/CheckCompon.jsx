'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const framesData = [
  {
    id: 'frame-1',
    image: '/images/developer-icon.svg', // Added image path
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
const backgroundPhases = {
  minimal: '#f0f4f8',
  wireframes: '#e3f2fd',
  nodes: '#d1c4e9',
  grid: '#c8e6c9',
  experience: '#bbdefb'
};

const HeroSection = () => {
  const containerRef = useRef(null);
  const frameRefs = useRef([]);

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
        end: `+=${framesData.length * 600}`, // Adjust duration as needed
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
      style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'sans-serif',
        color: '#1a202c',
        transition: 'background-color 0.5s ease', // For smooth GSAP animation
      }}
    >
      {framesData.map((frame, index) => (
        <div
          key={frame.id}
          ref={(el) => (frameRefs.current[index] = el)}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            boxSizing: 'border-box',
          }}
        >
          {/* Inner container for the content layout */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
            maxWidth: '1000px'
          }}>
            {/* Left side: Image */}
            <div style={{ flexShrink: 0 }}>
              <Image
                src={frame.image}
                alt={frame.text}
                width={150}
                height={150}
                style={{ objectFit: 'contain' }}
              />
            </div>

            {/* Right side: Text Content */}
            <div>
              <h1 style={{ fontSize: '2.5rem', margin: 0, lineHeight: 1.2 }}>
                {frame.text}
              </h1>
              {frame.subtext && (
                <p style={{ fontSize: '1.25rem', marginTop: '1rem', opacity: 0.8 }}>
                  {frame.subtext}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSection;