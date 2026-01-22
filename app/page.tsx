'use client';
import { useState, useCallback } from 'react';
import GreetingScreen from '@/components/GreetingScreen';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import SkillsSection from '@/components/SkillSection';
import { ReactLenis } from "lenis/react"
import ProjectsSection from '@/components/ProjectsSection';
import SectionTransition from '@/components/SectionTransition';
import GithubSection from '@/components/GithubSection';


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
    <main className="relative min-h-screen bg-[#0A0A0A]">
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
      <div style={{
        opacity: showGreeting ? 0 : 1,
        pointerEvents: showGreeting ? 'none' : 'auto',
        transition: 'opacity 0.8s ease-in-out'
      }}>
        <ReactLenis root options={{
          lerp: 0.1,
          duration: 1.2,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          syncTouch: true,
        }}>
          <Header logoText="RAHUL SAINI" />
          <HeroSection />
          <SectionTransition />
          <ProjectsSection />
          <SkillsSection />
          {/* <ClickSpark
            sparkColor='#fff'
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}

          >


            <OtherComponent />

          </ClickSpark> */}
          <GithubSection />
          <Footer />
        </ReactLenis>
      </div>
    </main>
  );
}