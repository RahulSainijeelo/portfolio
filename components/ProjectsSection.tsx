'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from '@/styles/projects-section.module.css';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import CircularGallery, { CircularGalleryRef } from './CircularGallery';
import ControlWheel from './ControlWheel';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projectItems = [
    { image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80', text: 'React Dashboard' },
    { image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', text: 'Cloud API' },
    { image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', text: 'Fintech App' },
    { image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80', text: 'Mobile Wallet' },
    { image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', text: 'AI Platform' },
    { image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', text: 'E-commerce' },
    { image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80', text: 'Security Hub' },
    { image: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?w=800&q=80', text: 'Dev Workflow' },
];

const ProjectsSection = () => {
    const laserRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const galleryCompRef = useRef<CircularGalleryRef>(null);

    const handleRotate = (delta: number) => {
        if (galleryCompRef.current) {
            galleryCompRef.current.setScrollTarget(delta);
        }
    };
    useGSAP(() => {
        // const container = containerRef.current;
        // const laser = laserRef.current;
        const title = titleRef.current;
        const gallery = galleryRef.current;
        const subText = subRef.current;


        if (!title || !gallery) return;
        gsap.to(title, {
            scrollTrigger: {
                trigger: ".projectTitle",
                start: '100px 90px',
                end: "500px 40%",
                scrub: 0.4,
                invalidateOnRefresh: true,
                toggleActions: "restart pause reverse pause"
            },
            y: 670,
            rotation: 428,
            x: 500,
            duration: 7,
            scale: 0.3,
            opacity: 0.6,
            ease: "none"
        });
        gsap.to(subText, {
            scrollTrigger: {
                trigger: subText,
                start: '0 300px',
                end: "0 40%",
                scrub: 0.4,
                invalidateOnRefresh: true,
                toggleActions: "restart pause reverse pause"
            },
            duration: 0.3,
            // scale: 0.7,
            opacity: 0,
            ease: "none"
        });
    },);

    return (
        <div
            // ref={containerRef}
            className={styles.container}
        >
            <div className={styles.titleSection}>
                <div className={styles.titleContainer + " projectTitle"}>
                    <h1 ref={titleRef} className={styles.title}>PROJECTS</h1>
                    <p ref={subRef} className={styles.subtitle}>
                        Innovative solutions crafted with passion
                    </p>
                </div>
            </div>
            <div className={styles.gallerySection}>
                <div ref={galleryRef} className={styles.galleryWrapper}>
                    <div className={styles.galleryHeight}>
                        <CircularGallery
                            ref={galleryCompRef}
                            items={projectItems}
                            bend={1}
                            textColor="#BD93F9"
                            borderRadius={0.05}
                            font="bold 24px Figtree"
                            itemWidth={900}
                            itemHeight={900}
                        />
                    </div>
                    {/* <ControlWheel onRotate={handleRotate} size={400} /> */}
                </div>
            </div>
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
