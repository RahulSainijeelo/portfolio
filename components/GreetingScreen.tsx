import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import LoadingIndicator from './LoadingIndicator';
import { GreetingScreenProps } from '../types';
import styles from '@/styles/greeting.module.css';

const GreetingScreen: React.FC<GreetingScreenProps> = ({ onComplete }) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentText, setCurrentText] = useState<string>('Hi,');
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);
  const [assetsLoaded, setAssetsLoaded] = useState<boolean>(false);

  const greetingTexts: string[] = [
    'Hi',
    'Nice to meet You',
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
              }, 800);
            }
          });
        }
      });
    });
  };

  const startAssetPreloading = async (): Promise<void> => {
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

    const assetsToLoad: string[] = [
      ...projectImages,
      // Add more critical assets here if needed
    ];

    let loaded = 0;
    const total = assetsToLoad.length;

    // Failsafe: if assets take more than 5s, mark as loaded anyway
    const timeoutPromise = new Promise(resolve => setTimeout(resolve, 5000));

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

    await Promise.race([
      Promise.all(loadPromises),
      timeoutPromise
    ]);

    setAssetsLoaded(true);
  };

  const hideGreetingScreen = (): void => {
    if (!containerRef.current) {
      onComplete();
      return;
    }

    animate(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 600,
      ease: 'inOut(2)',
      onComplete: () => {
        onComplete();
      }
    });
  };

  return (
    <div ref={containerRef} className={styles.greetingContainer}>
      <div className={styles.content}>
        <h1 ref={textRef} className={styles.greetingText}>
          {currentText}
        </h1>
      </div>

      <div className={styles.indicatorContainer}>
        <LoadingIndicator progress={loadingProgress} />
      </div>
    </div>
  );
};

export default GreetingScreen;
