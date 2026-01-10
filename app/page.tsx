'use client';
import { useState, useEffect, useCallback } from 'react';
import { useAnimationPreloader } from '@/hooks/useAnimationPreloader';
import GreetingScreen from '@/components/GreetingScreen';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
// import PortfolioSection from '@/components/PortfolioSection';
import Footer from '@/components/Footer';
import SkillsSection from '@/components/SkillSection';
// import ImageSequenceScroller from '@/components/ImageSequenceScroller';
import {ReactLenis} from "lenis/react"
import ProjectsSection from '@/components/ProjectsSection';
import Orb from '@/components/Orb';
import Galaxy from '@/components/Galaxy';
const OtherComponent = () => {
  return (
    <div style={{
      height: '200vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1a1a1a',
      color: 'white',
      fontSize: '3rem'
    }}>
     <Orb/>
     {/* <Galaxy/> */}
    </div>
  );
};

export default function Home() {
  const [showGreeting, setShowGreeting] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const { animationsReady } = useAnimationPreloader();

  const handleGreetingComplete = useCallback((): void => {
    if (animationsReady && !isTransitioning) {
      setIsTransitioning(true);
      
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setShowGreeting(false);
        setIsTransitioning(false);
      }, 500); // Adjust timing as needed
    }
  }, [animationsReady, isTransitioning]);

  // Force cleanup on component unmount
  useEffect(() => {
    return () => {
      setShowGreeting(false);
      setIsTransitioning(false);
    };
  }, []);

  // Debug logging
  useEffect(() => {
    console.log('State:', { showGreeting, animationsReady, isTransitioning });
  }, [showGreeting, animationsReady, isTransitioning]);

  return (
    <>
      {showGreeting ? (
        <GreetingScreen 
          onComplete={handleGreetingComplete}
          animationsReady={animationsReady}
        />
      ) : (
        <ReactLenis root>
          <main>
            <Header logoText="RAHUL SAINI" />
            <HeroSection />
            <ProjectsSection/>
            <OtherComponent/>    
            <Footer />
          </main>
        </ReactLenis>
      )}
    </>
  );
}