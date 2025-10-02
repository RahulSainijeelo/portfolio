'use client';
import { useState } from 'react';
import GreetingScreen from '../components/GreetingScreen';
import Header from '@/components/Header';
import { useAnimationPreloader } from '@/hooks/useAnimationPreloader';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  const [showGreeting, setShowGreeting] = useState<boolean>(true);
  const { animationsReady } = useAnimationPreloader();

  const handleGreetingComplete = (): void => {
    if (animationsReady) {
      setShowGreeting(false);
    }
  };

  return (
    <>
      {showGreeting && (
        <GreetingScreen 
          onComplete={handleGreetingComplete}
          animationsReady={animationsReady}
        />
      )}
      {!showGreeting && (
        <>

        <main>
          <Header logoText="Rahul Saini" />

          <div id="main-content">
            <HeroSection/>
          </div>
          <Footer/>
        </main>
        </>
      )}
    </>
  );
}