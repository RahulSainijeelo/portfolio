'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LaserFlow from "./LaserFlow";
import styles from '@/styles/projects-section.module.css';

// Register plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProjectsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLHeadingElement>(null)
    const laserRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        const laser = laserRef.current;
        const title = titleRef.current;
        const gallery = galleryRef.current;

        if (!container || !laser || !title || !gallery) return;

        // Laser flow entrance animation
        gsap.fromTo(laser,
            {
                scale: 0.5,
                opacity: 0,
                rotationZ: -5
            },
            {
                scale: 1,
                opacity: 1,
                rotationZ: 0,
                duration: 2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: container,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: 1
                }
            }
        );

        // PROJECTS title entrance animation
        gsap.fromTo(title,
            {
                y: 50,
                opacity: 0,
                scale: 1.1
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: title,
                    start: 'top 90%',
                    end: 'top 60%',
                    scrub: 1
                }
            }
        );

        // PROJECTS title parallax - moves downward slower than scroll
        gsap.to(title, {
            y: '160vh', // Move downward by 160vh (slower than the 160vh scroll distance)
            scale: 0.3, // Scale down to create depth effect
            opacity: 0.15, // Become very transparent
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: '120vh top', // Start when title section reaches top
                end: '280vh top', // End when gallery section reaches top  
                scrub: 0.6, // Slower than scroll speed (0.6 means 60% of scroll speed)
                invalidateOnRefresh: true
            }
        });

        // Gallery entrance animation
        gsap.fromTo(gallery,
            {
                y: 100,
                opacity: 0,
                scale: 0.95
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: gallery,
                    start: 'top 85%',
                    end: 'top 50%',
                    scrub: 1
                }
            }
        );

        // Background color transition throughout scroll
        gsap.to(container, {
            background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0d2e 30%, #16213e 70%, #0f3460 100%)',
            scrollTrigger: {
                trigger: container,
                start: 'top center',
                end: 'bottom center',
                scrub: 1
            }
        });

        // Enhanced particle parallax for depth
        gsap.utils.toArray(`.${styles.particle}`).forEach((particle: any, index) => {
            const speed = 0.3 + (index * 0.1); // Different speeds for layered effect
            gsap.to(particle, {
                y: `${-30 - (index * 15)}vh`, // Different distances for each layer
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: speed // Varying parallax speeds
                }
            });
        });

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className={styles.container}
        >
            {/* Background overlay */}
            <div className={styles.backgroundOverlay} />

            {/* LaserFlow Section - Extended height */}
            <div
                ref={laserRef}
                className={styles.laserContainer}
            >
                <LaserFlow
                    horizontalBeamOffset={0.15}
                    verticalBeamOffset={0.05}
                    color="#FF79C6"
                />
            </div>

            {/* PROJECTS Title - Will move downward with parallax */}
            <div className={styles.titleSection}>
                <div ref={titleRef} className={styles.titleContainer}>
                    <h1 ref={headRef} className={styles.title}>PROJECTS</h1>
                    <p className={styles.subtitle}>
                        Innovative solutions crafted with passion
                    </p>
                </div>
            </div>

            {/* Projects Gallery Section */}
            <div className={styles.gallerySection}>
                <div ref={galleryRef} className={styles.galleryContainer}>
                    {/* Placeholder for horizontal scroll gallery */}
                    <div className={styles.galleryPlaceholder}>
                        <div className={styles.galleryContent}>
                            <h2 className={styles.galleryTitle}>Horizontal Scroll Gallery</h2>
                            <p className={styles.galleryDescription}>
                                Your horizontal scroll projects gallery will be placed here
                            </p>
                            <div className={styles.placeholderProjects}>
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className={styles.projectCard}>
                                        <div className={styles.projectNumber}>0{i + 1}</div>
                                        <h3>Project {i + 1}</h3>
                                        <p>Project description goes here</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
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
