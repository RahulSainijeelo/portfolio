'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/portfolio.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const portfolioItems = [
  {
    id: 1,
    title: "E-Commerce Mobile App",
    category: "React Native",
    image: "/portfolio/project1.jpg",
    description: "Full-stack mobile app with authentication, cart, and payment integration"
  },
  {
    id: 2,
    title: "Video Streaming Platform",
    category: "Next.js",
    image: "/portfolio/project2.jpg", 
    description: "Netflix-style platform with Cloudflare R2 storage and infinite scroll"
  },
  {
    id: 3,
    title: "Blockchain DApp",
    category: "Web3",
    image: "/portfolio/project3.jpg",
    description: "Solana-based expense splitting app with wallet integration"
  },
  {
    id: 4,
    title: "3D Portfolio Website",
    category: "Three.js",
    image: "/portfolio/project4.jpg",
    description: "Interactive 3D portfolio with Blender models and animations"
  },
  {
    id: 5,
    title: "Real-time Chat App",
    category: "Node.js",
    image: "/portfolio/project5.jpg",
    description: "WebSocket-based chat with file sharing and video calls"
  },
  {
    id: 6,
    title: "AI Image Generator",
    category: "Python",
    image: "/portfolio/project6.jpg",
    description: "Stable Diffusion integration with custom training models"
  }
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Initial setup - hide gallery initially
      gsap.set(galleryWrapperRef.current, { opacity: 0 });
      gsap.set(titleRef.current, { 
        scale: 3,
        opacity: 1
      });

      // Create the main timeline for the entire portfolio section
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            setScrollProgress(progress);
            
            // Phase 1: Scale down and move PORTFOLIO text (0% - 30%)
            if (progress <= 0.3) {
              const titleProgress = progress / 0.3;
              const scale = 3 - (titleProgress * 2); // 3 -> 1
              const yPos = titleProgress * 100; // Move down
              const opacity = Math.max(0.3, 1 - titleProgress * 0.7); // Fade but remain visible
              
              gsap.set(titleRef.current, {
                scale: scale,
                y: yPos,
                opacity: opacity
              });
              
              // Keep gallery hidden during title animation
              gsap.set(galleryWrapperRef.current, { opacity: 0 });
            } 
            // Phase 2: Show gallery and start horizontal scroll (30% - 100%)
            else {
              // Fix title position behind gallery
              gsap.set(titleRef.current, {
                scale: 1,
                y: 100,
                opacity: 0.3
              });
              
              // Show gallery
              gsap.set(galleryWrapperRef.current, { opacity: 1 });
              
              // Calculate gallery scroll progress (30% - 100% maps to 0% - 100% of gallery)
              const galleryProgress = (progress - 0.3) / 0.7;
              
              if (galleryRef.current) {
                const maxScroll = galleryRef.current.scrollWidth - galleryRef.current.clientWidth;
                galleryRef.current.scrollLeft = galleryProgress * maxScroll;
              }
            }
          }
        }
      });

      // Individual portfolio items stagger entrance animation
      gsap.fromTo(`.${styles.portfolioItem}`, {
        opacity: 0,
        y: 100,
        scale: 0.9,
        rotateY: 45
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: galleryWrapperRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Portfolio items hover animations
      const portfolioItems = gsap.utils.toArray(`.${styles.portfolioItem}`);
      portfolioItems.forEach((item: any) => {
        const tl = gsap.timeline({ paused: true });
        
        tl.to(item, {
          scale: 1.05,
          y: -10,
          duration: 0.3,
          ease: 'power2.out'
        });

        item.addEventListener('mouseenter', () => tl.play());
        item.addEventListener('mouseleave', () => tl.reverse());
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className={styles.portfolioSection}>
      <div className={styles.portfolioContainer}>
        
        {/* Background PORTFOLIO Title */}
        <h2 
          ref={titleRef}
          className={styles.portfolioTitle}
        >
          PORTFOLIO
        </h2>

        {/* Horizontal Scrolling Gallery */}
        <div 
          ref={galleryWrapperRef}
          className={styles.galleryWrapper}
        >
          <div ref={galleryRef} className={styles.gallery}>
            {portfolioItems.map((item, index) => (
              <div key={item.id} className={styles.portfolioItem}>
                <div className={styles.itemImageContainer}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemOverlay}>
                    <div className={styles.itemCategory}>{item.category}</div>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemDescription}>{item.description}</p>
                    <button className={styles.viewButton}>
                      View Project
                      <span className={styles.buttonArrow}>→</span>
                    </button>
                  </div>
                </div>
                <div className={styles.itemNumber}>
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Progress Indicator */}
      <div className={styles.progressIndicator}>
        <div className={styles.progressLabel}>PORTFOLIO</div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className={styles.progressPercentage}>
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>
    </section>
  );
}
