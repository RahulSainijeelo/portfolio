import { animate } from 'animejs';
import { useEffect, useState } from 'react';


export const useAnimationPreloader = () => {
  const [animationsReady, setAnimationsReady] = useState(false);

  useEffect(() => {
    const preloadAnimations = async () => {
      setAnimationsReady(true);
    };

    preloadAnimations();
  }, []);

  return { animationsReady, animate };
};