import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import styles from '../styles/scrollShapes.module.css';

interface ScrollShapesProps {
  scrollY: number;
}

const ScrollShapes: React.FC<ScrollShapesProps> = ({ scrollY }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobiusRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    updateMobiusAnimation();
    updateTrailEffect();
    updateParticleSystem();
  }, [scrollY]);

  const updateMobiusAnimation = () => {
    if (!mobiusRef.current) return;

    // Calculate complex transformations
    const progress = scrollY * 0.01;
    const rotateX = Math.sin(progress * 0.5) * 45; // Oscillating X rotation
    const rotateY = (scrollY * 0.2) % 360; // Continuous Y rotation
    const rotateZ = Math.cos(progress * 0.3) * 30; // Oscillating Z rotation
    
    // Infinite horizontal movement with reset
    const translateX = -(scrollY * 1.2) % (windowWidth + 400);
    const translateY = Math.sin(progress * 0.8) * 50; // Vertical wave motion
    
    // Dynamic scaling based on scroll speed
    const scale = 1 + Math.sin(progress * 0.4) * 0.3;
    
    // Morphing effect - changing the twist intensity
    const skewX = Math.sin(progress * 0.6) * 15;
    const skewY = Math.cos(progress * 0.4) * 10;

    mobiusRef.current.style.transform = `
      translateX(${translateX}px) 
      translateY(${translateY}px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      rotateZ(${rotateZ}deg) 
      scale(${scale})
      skew(${skewX}deg, ${skewY}deg)
    `;

    // Dynamic color based on scroll position
    const hue = (scrollY * 0.5) % 360;
    const saturation = 40 + Math.sin(progress * 0.7) * 30;
    const lightness = 60 + Math.cos(progress * 0.5) * 20;
    
    mobiusRef.current.style.filter = `
      hue-rotate(${hue}deg) 
      saturate(${saturation}%) 
      brightness(${lightness}%)
      drop-shadow(0 0 ${10 + Math.sin(progress) * 20}px hsla(${hue}, 70%, 60%, 0.8))
    `;
  };

  const updateTrailEffect = () => {
    if (!trailRef.current) return;

    const trails = trailRef.current.children;
    for (let i = 0; i < trails.length; i++) {
      const trail = trails[i] as HTMLElement;
      const delay = i * 0.1;
      const offset = (scrollY - delay * 100) * 0.8;
      const translateX = -(offset) % (windowWidth + 200);
      const opacity = Math.max(0, 1 - (i * 0.15));
      const scale = 1 - (i * 0.1);

      trail.style.transform = `translateX(${translateX}px) scale(${scale})`;
      trail.style.opacity = opacity.toString();
    }
  };

  const updateParticleSystem = () => {
    if (!particlesRef.current) return;

    const particles = particlesRef.current.children;
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i] as HTMLElement;
      const speed = 0.5 + (i % 3) * 0.3;
      const translateX = -(scrollY * speed) % (windowWidth + 100);
      const translateY = Math.sin((scrollY + i * 100) * 0.01) * 30;
      const rotate = (scrollY + i * 50) * 0.5;
      const scale = 0.5 + Math.sin((scrollY + i * 200) * 0.005) * 0.3;

      particle.style.transform = `
        translateX(${translateX}px) 
        translateY(${translateY}px) 
        rotate(${rotate}deg) 
        scale(${scale})
      `;
    }
  };

  // Generate trail elements
  const renderTrails = () => {
    return Array.from({ length: 6 }, (_, i) => (
      <div key={i} className={`${styles.mobiusShape} ${styles.trail}`} />
    ));
  };

  // Generate particle elements
  const renderParticles = () => {
    return Array.from({ length: 12 }, (_, i) => (
      <div key={i} className={styles.particle} />
    ));
  };

  return (
    <div ref={containerRef} className={styles.shapesContainer}>
      {/* Trail Effect */}
      <div ref={trailRef} className={styles.trailContainer}>
        {renderTrails()}
      </div>

      {/* Main Möbius Strip */}
      <div ref={mobiusRef} className={styles.mobiusShape}>
        <div className={styles.mobiusInner}>
          <div className={styles.mobiusSegment1}></div>
          <div className={styles.mobiusSegment2}></div>
          <div className={styles.mobiusSegment3}></div>
          <div className={styles.mobiusCenter}></div>
        </div>
      </div>

      {/* Particle System */}
      <div ref={particlesRef} className={styles.particleContainer}>
        {renderParticles()}
      </div>

      {/* Additional Geometric Elements */}
      <div className={styles.complementaryShapes}>
        <div className={styles.hexagon}></div>
        <div className={styles.circle}></div>
        <div className={styles.triangle}></div>
      </div>
    </div>
  );
};

export default ScrollShapes;
