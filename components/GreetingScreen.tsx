import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import LoadingIndicator from './LoadingIndicator';
import { loadCustomFonts } from '@/utils/fontLoader';
import { GreetingScreenProps } from '../types';
import styles from '@/styles/greeting.module.css';
import Greet, { RotatingCubesRef } from './Greet';

const GreetingScreen: React.FC<GreetingScreenProps> = ({ onComplete }) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const greetRef = useRef<RotatingCubesRef>(null);
  const [currentText, setCurrentText] = useState<string>('Hi,');
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);
  const [assetsLoaded, setAssetsLoaded] = useState<boolean>(false);
  const [portalStarted, setPortalStarted] = useState<boolean>(false);

  const greetingTexts: string[] = [
    'Hi,',
    'Welcome to my world',
    'Let\'s create something amazing'
  ];

  useEffect(() => {
    startAnimationSequence();
    startAssetPreloading();
  }, []);

  // Check if both animation and assets are complete
  useEffect(() => {
    if (animationComplete && assetsLoaded && !portalStarted) {
      setPortalStarted(true);
      startPortalTransition();
    }
  }, [animationComplete, assetsLoaded, portalStarted]);

  const startAnimationSequence = async (): Promise<void> => {
    if (!textRef.current) return;

    await new Promise(resolve => setTimeout(resolve, 1000));

    for (let i = 1; i < greetingTexts.length; i++) {
      await animateTextTransition(i);
    }

    setAnimationComplete(true);
  };

  const animateTextTransition = (index: number): Promise<void> => {
    return new Promise((resolve) => {
      if (!textRef.current) {
        resolve();
        return;
      }

      animate(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 800,
        ease: 'inOut(2)',
        onComplete: () => {
          setCurrentText(greetingTexts[index]);
          
          if (!textRef.current) {
            resolve();
            return;
          }
          
          animate(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 800,
            ease: 'inOut(2)',
            delay: 200,
            onComplete: () => {
              setTimeout(() => {
                resolve();
              }, 1500);
            }
          });
        }
      });
    });
  };

  const startAssetPreloading = async (): Promise<void> => {
    const assetsToLoad: string[] = [
      '/images/hero-bg.jpg',
      '/images/profile.jpg',
      '/images/project1.jpg',
    ];

    let loaded = 0;
    const total = assetsToLoad.length;

    const loadPromises = assetsToLoad.map((asset: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          setLoadingProgress((loaded / total) * 100);
          resolve();
        };
        img.onerror = () => {
          loaded++;
          setLoadingProgress((loaded / total) * 100);
          resolve();
        };
        img.src = asset;
      });
    });

    const fontPromise = loadCustomFonts().catch((error) => {
      console.log('Font loading error:', error);
    });

    await Promise.all([...loadPromises, fontPromise]);
    setAssetsLoaded(true);
  };

  const startPortalTransition = (): void => {
    // Start the portal effect
    if (greetRef.current) {
      greetRef.current.startPortalTransition();
    }

    // Fade out the greeting text during portal animation
    if (textRef.current) {
      animate(textRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1500,
        ease: 'inOut(2)',
      });
    }
  };

  const handlePortalComplete = (): void => {
    // Portal animation is complete, now hide the greeting screen
    if (!containerRef.current) return;
    
    animate(containerRef.current, {
      opacity: 0,
      duration: 500,
      ease: 'inOut(2)',
      onComplete: () => {
        onComplete();
      }
    });
  };

  return (
    <>
      <Greet 
        ref={greetRef}
        colorSpeed={0.03} 
        isBackground={true}
        onPortalComplete={handlePortalComplete}
      />
      <div ref={containerRef} className={styles.greetingContainer}>
        <div className={styles.content}>
          <h1 ref={textRef} className={styles.greetingText}>
            {currentText}
          </h1>
        </div>
        
        <LoadingIndicator progress={loadingProgress} />
      </div>
    </>
  );
};

export default GreetingScreen;
