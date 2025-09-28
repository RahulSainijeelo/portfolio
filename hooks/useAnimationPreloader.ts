import { useState, useEffect } from 'react';

export function useAnimationPreloader() {
  const [animationsReady, setAnimationsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationsReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { animationsReady };
}