"use client"

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './SectionTransition.module.css';

gsap.registerPlugin(ScrollTrigger);

const SectionTransition = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const fixedWrapperRef = useRef<HTMLDivElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !fixedWrapperRef.current || !videoWrapperRef.current || !flashRef.current) return;

        // Transition starts as HeroSection ends
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 0.5, // Even smoother
                onEnter: () => {
                    gsap.to(fixedWrapperRef.current, { visibility: 'visible', opacity: 1, duration: 0.4 });
                    videoRef.current?.play().catch(() => { });
                },
                onLeave: () => {
                    gsap.to(fixedWrapperRef.current, {
                        opacity: 0, duration: 0.4, onComplete: () => {
                            gsap.set(fixedWrapperRef.current, { visibility: 'hidden' });
                        }
                    });
                    videoRef.current?.pause();
                },
                onEnterBack: () => {
                    gsap.set(fixedWrapperRef.current, { visibility: 'visible' });
                    gsap.to(fixedWrapperRef.current, { opacity: 1, duration: 0.4 });
                    videoRef.current?.play().catch(() => { });
                },
                onLeaveBack: () => {
                    gsap.to(fixedWrapperRef.current, {
                        opacity: 0, duration: 0.4, onComplete: () => {
                            gsap.set(fixedWrapperRef.current, { visibility: 'hidden' });
                        }
                    });
                    videoRef.current?.pause();
                },
            }
        });

        // 1. Zoom and scale effect (Zooming IN to the portal)
        tl.to(videoWrapperRef.current, {
            scale: 1,
            rotate: 2, // Slight rotation for dynamism
            duration: 1,
            ease: "none"
        });

        // 2. Flash effect in the middle
        tl.to(flashRef.current, {
            opacity: 1,
            duration: 0.1,
            ease: "power2.in"
        }, 0.5);

        tl.to(flashRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        }, 0.6);

        // 3. Brightness pulse
        tl.to(videoWrapperRef.current, {
            filter: "brightness(2) contrast(1.5) saturate(2)",
            duration: 0.2,
            ease: "power1.in"
        }, 0.5);

        tl.to(videoWrapperRef.current, {
            filter: "brightness(0.6) contrast(1.1) saturate(1.2)",
            duration: 0.4,
            ease: "power1.out"
        }, 0.7);

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={styles.container}>
            <div ref={fixedWrapperRef} className={styles.fixedWrapper}>
                <div ref={videoWrapperRef} className={styles.videoWrapper}>
                    <video
                        ref={videoRef}
                        src="https://pub-88542caeb82a4635aa980b4aeb205cb5.r2.dev/portfolio/221903_medium.mp4"
                        className={styles.video}
                        loop
                        muted
                        playsInline
                    />
                    <div className={styles.overlay} />
                    <div className={styles.glassFrame} />
                </div>
                <div ref={flashRef} className={styles.flash} />
            </div>
        </div>
    );
};

export default SectionTransition;
