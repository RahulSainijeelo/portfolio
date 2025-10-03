'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import LaserFlow from "./LaserFlow";
import styles from '@/styles/projects-section.module.css';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProjectsSection = () => {
    const laserRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null)
    useGSAP(() => {
        // const container = containerRef.current;
        // const laser = laserRef.current;
        const title = titleRef.current;
        const gallery = galleryRef.current;
        const subText = subRef.current;


        if (!title || !gallery) return;

        // PROJECTS title parallax - moves downward slower than scroll
        gsap.to(title, {
            scrollTrigger: {
                trigger: ".projectTitle",
                markers:true,
                start: '100px 90px', // Start when title section reaches top
                end:"500px 40%",
                scrub: 0.4, // Slower than scroll speed (0.6 means 60% of scroll speed)
                invalidateOnRefresh: true,
                toggleActions:"restart pause reverse pause"
            },
            y: 600, // Move downward by 160vh (slower than the 160vh scroll distance)
            // rotation:360,
            duration:7,
            scale: 0.7, // Scale down to create depth effect
            opacity: 0.6, // Become very transparent
            ease: "none"
        });
        gsap.to(subText, {
            scrollTrigger: {
                trigger: subText,
                markers:true,
                start: '0 300px', // Start when title section reaches top
                end:"0 40%",
                scrub: 0.4, // Slower than scroll speed (0.6 means 60% of scroll speed)
                invalidateOnRefresh: true,
                toggleActions:"restart pause reverse pause"
            },
            duration:0.3,
            // scale: 0.7, // Scale down to create depth effect
            opacity: 0, // Become very transparent
            ease: "none"
        });
    },);

    return (
        <div
            // ref={containerRef}
            className={styles.container}
        >
            {/* Background overlay */}
            <div className={styles.backgroundOverlay} />

            {/* LaserFlow Section - Extended height */}
            <div
                // ref={laserRef}
                className={styles.laserContainer}
            >
                <LaserFlow
                    horizontalBeamOffset={0.15}
                    horizontalSizing={10}
                    verticalSizing={5}
                    verticalBeamOffset={0.05}
                    wispDensity={3}
                    wispIntensity={20}
                    wispSpeed={40}
                    flowSpeed={1.1}
                    decay={0.5}
                    dpr={1}
                    // color="#FF79C6"
                    className="laserflow"
                    style={{height:"300vh"}}
                />
            </div>

            {/* PROJECTS Title - Will move downward with parallax */}
            <div className={styles.titleSection}>
                <div className={styles.titleContainer + " projectTitle"}>
                    <h1 ref={titleRef} className={styles.title}>PROJECTS</h1>
                    <p ref={subRef} className={styles.subtitle}>
                        Innovative solutions crafted with passion
                    </p>
                </div>
            </div>

            {/* Projects Gallery Section */}
            <div className={styles.gallerySection}>
                <div ref={galleryRef} className={styles.galleryContainer}>
                    {/* Placeholder for horizontal scroll gallery */}
                   
                </div>
            </div>

            {/* Floating particles with layered parallax */}
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className={`${styles.particle} ${styles[`particle-${i % 3}`]}`}
                    style={{
                        left: `${8 + i * 8}%`,
                        top: `${15 + (i % 6) * 12}%`,
                        animationDelay: `${i * 0.2}s`
                    }}
                />
            ))}
        </div>
    );
};

export default ProjectsSection;
