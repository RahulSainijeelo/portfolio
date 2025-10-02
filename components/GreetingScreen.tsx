import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import LoadingIndicator from './LoadingIndicator';
import { GreetingScreenProps } from '../types';
import styles from '@/styles/greeting.module.css';
import Greet from './Greet';

const GreetingScreen: React.FC<GreetingScreenProps> = ({ onComplete }) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentText, setCurrentText] = useState<string>('Hi,');
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);
  const [assetsLoaded, setAssetsLoaded] = useState<boolean>(false);

  const greetingTexts: string[] = [
    'Hi,',
    // 'Welcome to my world',
    // 'Let\'s create something amazing'
  ];

  useEffect(() => {
    // Start both processes simultaneously
    startAnimationSequence();
    startAssetPreloading();
  }, []);

  // Check if both animation and assets are complete
  useEffect(() => {
    if (animationComplete && assetsLoaded) {
      hideGreetingScreen();
    }
  }, [animationComplete, assetsLoaded]);

  const startAnimationSequence = async (): Promise<void> => {
    if (!textRef.current) return;

    // Wait for initial display
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Run through all text sequences
    for (let i = 1; i < greetingTexts.length; i++) {
      await animateTextTransition(i);
    }

    // Animation sequence complete
    setAnimationComplete(true);
  };

  const animateTextTransition = (index: number): Promise<void> => {
    return new Promise((resolve) => {
      if (!textRef.current) {
        resolve();
        return;
      }

      // Fade out current text
      animate(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 800,
        ease: 'inOut(2)',
        onComplete: () => {
          // Update text content
          setCurrentText(greetingTexts[index]);
          
          // Fade in new text
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
              // Wait before next transition or completion
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
          resolve();
        };
        img.src = asset;
      });
    });
    // Wait for all assets and fonts to load
    await Promise.all([...loadPromises]);
    
    setAssetsLoaded(true);
  };

  const hideGreetingScreen = (): void => {
    // Add a small delay for dramatic effect
    setTimeout(() => {
      if (!containerRef.current) return;
      
      animate(containerRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 1000,
        ease: 'inOut(2)',
        onComplete: () => {
          onComplete();
        }
      });
    }, 500);
  };

  return (
    <>
    <Greet colorSpeed={0.03} isBackground={true}/>
    <div ref={containerRef} className={styles.greetingContainer}>
      {/* <div className={styles.overlay}></div> */}
      
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
