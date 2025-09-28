'use client';
import { useState } from 'react';
import { useAnimationPreloader } from '@/hooks/useAnimationPreloader';
import GreetingScreen from '@/components/GreetingScreen';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import Footer from '@/components/Footer';
import SkillsSection from '@/components/SkillSection';
const OtherComponent = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1a1a1a',
      color: 'white',
      fontSize: '3rem'
    }}>
      <p>This is the next section! 👋</p>
    </div>
  );
};


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
      {showGreeting ? (
        <GreetingScreen 
          onComplete={handleGreetingComplete}
          animationsReady={animationsReady}
        />
      ) : (
        <main>
          <Header logoText="RAHUL SAINI" />
          <HeroSection />
          {/* <HeroAnimation/> */}
          <OtherComponent/>
          {/* <PortfolioSection />
          <SkillsSection/> */}
          <Footer />
        </main>
      )}
    </>
  );
}