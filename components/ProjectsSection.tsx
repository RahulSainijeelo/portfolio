'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from '@/styles/projects-section.module.css';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import projectsData from '@/data/projects.json';
import ProjectModal from './ProjectModal';
import FollowCursor from './FollowCursor';
import { motion, AnimatePresence } from 'motion/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    thumbnail: string;
    videoUrl?: string;
    tags: string[];
    link: string;
    stack?: { name: string; logo: string }[];
    sections?: {
        challenges: string;
        solutions: string;
        outcome: string;
    };
}

const ProjectsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [isSectionInView, setIsSectionInView] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const openModal = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useGSAP(() => {
        const gallery = galleryRef.current;
        const trigger = triggerRef.current;
        const container = containerRef.current;

        if (!gallery || !trigger || !container) return;

        // Scope visibility of the entire section
        ScrollTrigger.create({
            trigger: container,
            start: "top 80%",
            end: "bottom 20%",
            onToggle: (self) => setIsSectionInView(self.isActive),
        });

        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            const totalWidth = gallery.scrollWidth - window.innerWidth;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: trigger,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: () => `+=${gallery.scrollWidth}`,
                    invalidateOnRefresh: true,
                }
            });

            tl.to(gallery, {
                x: -totalWidth - 100, // Small buffer
                ease: "none",
            });

            // Track active index based on scroll position
            const cards = gsap.utils.toArray<HTMLElement>(`.${styles.projectCard}`);
            cards.forEach((card, i) => {
                ScrollTrigger.create({
                    trigger: card,
                    containerAnimation: tl,
                    start: "left center",
                    end: "right center",
                    onEnter: () => setActiveIndex(i),
                    onEnterBack: () => setActiveIndex(i),
                });
            });
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.introSection}>
                <div className={styles.introContent}>
                    <h1 className={styles.mainTitle}>SELECTED WORKS</h1>
                    <p className={styles.mainSubTitle}>
                        A CURATED COLLECTION OF DIGITAL EXPERIENCES AND INNOVATIVE SOLUTIONS CRAFTED TO PUSH THE BOUNDARIES OF MODERN WEB DEVELOPMENT.
                    </p>
                </div>
            </div>

            <div
                ref={triggerRef}
                className={styles.horizontalTrigger}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div ref={galleryRef} className={styles.horizontalGallery}>
                    {projectsData.map((project: Project, idx: number) => (
                        <div
                            key={project.id}
                            className={`${styles.projectCard} ${activeIndex === idx ? styles.activeCard : ''}`}
                            onClick={() => openModal(project)}
                        >
                            <div className={styles.videoWrapper}>
                                {project.videoUrl && (
                                    <video
                                        src={project.videoUrl}
                                        autoPlay={!isModalOpen}
                                        loop
                                        muted
                                        playsInline
                                        className={styles.cardVideo}
                                        ref={(el) => {
                                            if (el) {
                                                if (isModalOpen) el.pause();
                                                else el.play().catch(() => { });
                                            }
                                        }}
                                    />
                                )}
                                <div className={styles.videoOverlay} />


                            </div>
                            {isMounted && isSectionInView && !isModalOpen && (
                                <div className={styles.dynamicInfoPanel}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            className={styles.infoContent}
                                        >
                                            <h2 className={styles.activeTitle}>{projectsData[activeIndex]?.title}</h2>
                                            <p className={styles.activeDesc}>{projectsData[activeIndex]?.description}</p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            )}
                            {/* Mobile View Content */}
                            <div className={styles.mobileContent}>
                                <h3 className={styles.mobileTitle}>{project.title}</h3>
                                <p className={styles.mobileDescription}>{project.description}</p>
                            </div>

                            {/* Desktop Reveal Content (Simplified because of InfoPanel) */}
                            <div className={styles.desktopReveal}>
                                <span className={styles.revealTitle}>{project.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <FollowCursor visible={isHovering} text="SCROLL >" />

            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
            />

            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className={`${styles.particle} ${styles[`particle-${i % 3}`]}`}
                    style={{
                        left: `${20 + i * 15}%`,
                        top: `${40 + (i % 3) * 20}%`,
                    }}
                />
            ))}
        </div>
    );
};

export default ProjectsSection;
