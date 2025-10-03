// src/components/ParallaxDiv.jsx

'use client'; // This directive is necessary for using client-side hooks like useEffect and useRef

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const ParallaxDiv = () => {
  const animatedDivRef = useRef(null);

  useEffect(() => {
    // This ensures the animation code runs only on the client side after the component has mounted
    const element = animatedDivRef.current;

    // Create the GSAP timeline with ScrollTrigger
    gsap.to(element, {
      y: 300, // Move the element 300px down on the Y-axis
      ease: 'none', // A linear ease ensures the speed is constant relative to the scroll
      scrollTrigger: {
        trigger: element, // The element that triggers the animation
        start: 'top bottom', // When the top of the trigger hits the bottom of the viewport
        end: 'bottom top', // When the bottom of the trigger hits the top of the viewport
        scrub: 1.5, // This is the magic! It links the animation progress to the scrollbar.
                     // A value of 'true' or a number creates the parallax effect.
                     // A higher number (like 1.5) makes the animation "lag" or feel smoother.
        // markers: true, // Uncomment this to see the start and end trigger points for debugging
      },
    });
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div ref={animatedDivRef} className="my-parallax-div">
      <h2>This div moves slowly.</h2>
      <p>Scroll down to see the effect.</p>
    </div>
  );
};

export default ParallaxDiv;