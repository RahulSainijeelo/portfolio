import { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es';
import LoadingIndicator from './LoadingIndicator';
import { loadCustomFonts } from '../utils/fontLoader';
import { GreetingScreenProps } from '../types';
import styles from '../styles/greeting.module.css';

const GreetingScreen: React.FC<GreetingScreenProps> = ({ onComplete }) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [currentText, setCurrentText] = useState<string>('Hi,');
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [assetsLoaded, setAssetsLoaded] = useState<boolean>(false);

  const greetingTexts: string[] = [
    'Hi,',
    'Welcome to my world',
    'Let\'s create something amazing'
  ];

  useEffect(() => {
    // Start text animation sequence
    animateTextSequence();
    
    // Start preloading assets
    preloadAssets();
  }, []);

  const animateTextSequence = (): void => {
    let currentIndex = 0;
    
    const animateNext = (): void => {
      if (currentIndex < greetingTexts.length - 1) {
        // Fade out current text
        anime({
          targets: textRef.current,
          opacity: 0,
          translateY: -20,
          duration: 800,
          easing: 'easeInOutQuad',
          complete: () => {
            currentIndex++;
            setCurrentText(greetingTexts[currentIndex]);
            
            // Fade in new text
            anime({
              targets: textRef.current,
              opacity: 1,
              translateY: 0,
              duration: 800,
              easing: 'easeInOutQuad',
              delay: 200,
              complete: () => {
                setTimeout(animateNext, 1500); // Wait before next transition
              }
            });
          }
        });
      }
    };

    // Start the sequence after initial render
    setTimeout(animateNext, 2000);
  };

  const preloadAssets = async (): Promise<void> => {
    const assetsToLoad: string[] = [
      // Images
      '/images/hero-bg.jpg',
      '/images/profile.jpg',
      '/images/project1.jpg',
      // Add more assets...
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
          resolve(); // Resolve even on error to continue
        };
        img.src = asset;
      });
    });

    // Also load fonts
    try {
      await loadCustomFonts();
    } catch (error) {
      console.log('Font loading error:', error);
    }

    await Promise.all(loadPromises);
    setAssetsLoaded(true);
    
    // Wait a bit more for dramatic effect, then transition
    setTimeout(() => {
      anime({
        targets: `.${styles.greetingContainer}`,
        opacity: 0,
        scale: 1.1,
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: onComplete
      });
    }, 1000);
  };

  return (
    <div className={styles.greetingContainer}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.overlay}></div>
      
      <div className={styles.content}>
        <h1 ref={textRef} className={styles.greetingText}>
          {currentText}
        </h1>
      </div>
      
      <LoadingIndicator progress={loadingProgress} />
    </div>
  );
};

export default GreetingScreen;
