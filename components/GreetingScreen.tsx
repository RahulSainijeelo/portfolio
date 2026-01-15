import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import LoadingIndicator from './LoadingIndicator';
import { GreetingScreenProps } from '../types';
import styles from '@/styles/greeting.module.css';

const USERNAME = "RahulSainijeelo";

// CONFIGURATION: Adjust these to change the speed of the greeting sequence
const GREETING_SPEED = {
  STAY_DURATION: 0.1,
  IN_DURATION: 0.1,
  OUT_DURATION: 0.1,
  PAUSE_BETWEEN: 15
};

export default function GreetingScreen({ onComplete }: GreetingScreenProps) {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentText, setCurrentText] = useState<string>('Hello');
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [assetsLoaded, setAssetsLoaded] = useState<boolean>(false);
  const [sequenceComplete, setSequenceComplete] = useState<boolean>(false);

  // Scroll Lock implementation
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const greetings = [
    "Hello",
    "Namaste",
    "Ciao",
    "Konnichiwa",
    "Nǐ hǎo",
  ];

  const [greetingIndex, setGreetingIndex] = useState(0);

  // Asset preloading logic (keeping existing asset list)
  useEffect(() => {
    const projectImages = [
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
      'https://images.unsplash.com/photo-1522252234503-e356532cafd5?w=800&q=80',
    ];

    let loaded = 0;
    const total = projectImages.length;
    const timeout = setTimeout(() => setAssetsLoaded(true), 5000);

    projectImages.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        setLoadingProgress((loaded / total) * 100);
        if (loaded === total) {
          clearTimeout(timeout);
          setAssetsLoaded(true);
        }
      };
      img.src = src;
    });

    return () => clearTimeout(timeout);
  }, []);

  // Kinetic Typography Animation logic
  useGSAP(() => {
    if (sequenceComplete) return;

    const chars = textRef.current?.querySelectorAll(`.${styles.char}`);
    if (!chars || chars.length === 0) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (greetingIndex < greetings.length - 1) {
          setTimeout(() => {
            setGreetingIndex(prev => prev + 1);
            setCurrentText(greetings[greetingIndex + 1]);
          }, GREETING_SPEED.PAUSE_BETWEEN);
        } else {
          setSequenceComplete(true);
        }
      }
    });

    tl.to(chars, {
      y: 0,
      stagger: 0.02,
      duration: GREETING_SPEED.IN_DURATION,
      ease: "power4.out"
    })
      .to(chars, {
        y: "-110%",
        stagger: 0.01,
        duration: GREETING_SPEED.OUT_DURATION,
        ease: "power4.in",
        delay: GREETING_SPEED.STAY_DURATION
      });

  }, [greetingIndex, sequenceComplete]);

  // Final exit transition
  useEffect(() => {
    if (sequenceComplete && assetsLoaded) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: onComplete
      });
    }
  }, [sequenceComplete, assetsLoaded, onComplete]);

  return (
    <div ref={containerRef} className={styles.greetingContainer}>
      <div className={styles.aura} />

      <div className={styles.content}>
        <h1 ref={textRef} className={styles.greetingText}>
          {currentText.split('').map((char, i) => (
            <span key={`${greetingIndex}-${i}`} className={styles.char}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </div>

      <div className={styles.indicatorContainer}>
        <div className={styles.loadingWrapper}>
          <div className={styles.progressVal}>{Math.round(loadingProgress)}%</div>
          <LoadingIndicator progress={loadingProgress} />
        </div>
      </div>
    </div>
  );
};
