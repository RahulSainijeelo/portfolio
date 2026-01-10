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
import { ReactLenis } from "lenis/react"
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
      <Orb />
      {/* <Galaxy/> */}
    </div>
  );
};

export default function Home() {
  const [showGreeting, setShowGreeting] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleGreetingComplete = useCallback((): void => {
    setIsTransitioning(true);
    // Smooth transition out
    setTimeout(() => {
      setShowGreeting(false);
      setIsTransitioning(false);
    }, 500);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Greeting Screen - Always on top while active */}
      {showGreeting && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          pointerEvents: isTransitioning ? 'none' : 'auto'
        }}>
          <GreetingScreen onComplete={handleGreetingComplete} />
        </div>
      )}

      {/* Main Content - Renders in background immediately */}
      <div style={{
        opacity: showGreeting ? 0 : 1,
        pointerEvents: showGreeting ? 'none' : 'auto',
        transition: 'opacity 0.8s ease-in-out'
      }}>
        <ReactLenis root>
          <Header logoText="RAHUL SAINI" />
          <HeroSection />
          <ProjectsSection />
          <OtherComponent />
          <Footer />
        </ReactLenis>
      </div>
    </main>
  );
}