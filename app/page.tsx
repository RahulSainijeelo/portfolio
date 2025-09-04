'use client'; // Add this if using app directory

import { useState } from 'react';
import GreetingScreen from '../components/GreetingScreen';
import Header from '@/components/Header';
import Greet from '@/components/Greet';
// import MainContent from '../components/MainContent';
export default function Home(){
  const [showGreeting, setShowGreeting] = useState<boolean>(true);

  const handleGreetingComplete = (): void => {
    setShowGreeting(false);
  };

  return (
    <>
      {showGreeting && (
        <GreetingScreen onComplete={handleGreetingComplete} />
      )}
      {!showGreeting && <main>
        {/* <Header logoText="Rahul Saini" /> */}
        Hello
        
        </main>}
    </>
  );
}
