'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/scroller.module.css';

// The component will accept an array of image URLs as a prop
interface Props {
  imageSources: string[];
}

const ImageSequenceScroller: React.FC<Props> = ({ imageSources }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    // Set canvas dimensions (can be any size you prefer)
    canvas.width = 1158;
    canvas.height = 770;

    // Object to control the current frame of the animation
    const frame = { index: 0 };
    const frameCount = imageSources.length;
    
    // --- 1. Preload all images ---
    const preloadedImages: HTMLImageElement[] = [];
    let imagesLoaded = 0;

    const onImageLoad = () => {
      imagesLoaded++;
      if (imagesLoaded === frameCount) {
        // Once all images are loaded, set up the animation
        setupAnimation();
      }
    };

    imageSources.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = onImageLoad;
      preloadedImages.push(img);
    });

    // --- 2. Function to draw a specific frame ---
    const renderFrame = () => {
      if (context && preloadedImages[frame.index]) {
        const img = preloadedImages[frame.index];
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
      }
    };
    
    // --- 3. Set up the GSAP ScrollTrigger timeline ---
    const setupAnimation = () => {
      // Draw the first frame initially
      renderFrame();

      gsap.to(frame, {
        index: frameCount - 1,
        snap: 'index', // Snaps to the nearest whole number
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          // Starts when the top of the container hits the center of the screen
          start: 'top center', 
          // Ends when the container has been scrolled by 300% of the viewport height
          end: '+=300%',
          scrub: 0.5, // Smoothly links scroll to animation
          onUpdate: renderFrame, // Redraw the canvas on every update
        },
      });
    };
    
    // --- Cleanup ---
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [imageSources]); // Rerun effect if image sources change

  return (
    <div ref={containerRef} className={styles.scrollerContainer}>
      <canvas ref={canvasRef} className={styles.scrollerCanvas}></canvas>
    </div>
  );
};

export default ImageSequenceScroller;