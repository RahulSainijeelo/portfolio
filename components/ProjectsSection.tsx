'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from '@/styles/projects-section.module.css';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import projectsData from '@/data/projects.json';
import ProjectModal from './ProjectModal';
import FollowCursor from './FollowCursor';
import ClickSpark from './ClickSpark';
import SplitText from './SplitText';
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
        features: string;
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
        // Play game-like sound on click
        const audio = new Audio("/sounds/open2.mp3");
        audio.volume = 0.7;
        audio.play().catch(() => { });

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
                    scrub: 1.2, // Slightly more lerp
                    start: "top top",
                    end: () => `+=${totalWidth}`, // Use totalWidth for precise ending
                    invalidateOnRefresh: true,
                }
            });

            tl.to(gallery, {
                x: -totalWidth,
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

        mm.add("(max-width: 768px)", () => {
            const cards = gsap.utils.toArray<HTMLElement>(`.${styles.projectCard}`);
            cards.forEach((card, i) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => setActiveIndex(i),
                    onEnterBack: () => setActiveIndex(i),
                });
            });
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="projects" className={styles.container}>
            <ClickSpark
                sparkColor='#fff'
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}

            >
                <div className={styles.introSection}>
                    <div className={styles.introContent}>
                        <h2 className={styles.mainTitle}>SELECTED PROJECTS</h2>
                        <p className={styles.mainSubTitle}>
                         What I’ve been up to lately.
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
                                            autoPlay={false}
                                            loop
                                            muted
                                            playsInline
                                            className={styles.cardVideo}
                                            ref={(el) => {
                                                if (el) {
                                                    const isFocused = isSectionInView && !isModalOpen && activeIndex === idx;
                                                    if (isFocused) {
                                                        el.play().catch(() => { });
                                                    } else {
                                                        el.pause();
                                                    }
                                                }
                                            }}
                                        />
                                    )}
                                    <div className={styles.videoOverlay} />


                                </div>

                                {/* Info Panel - Now inside the card */}
                                <div className={styles.persistentInfoPanel} style={{ opacity: activeIndex === idx ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                                    <div className={styles.panelContent}>
                                        <div className={styles.panelIndex}>
                                            <span className={styles.currentIndex}>{String(idx + 1).padStart(2, '0')}</span>
                                            <div className={styles.panelDivider} />
                                            <span className={styles.totalCount}>{String(projectsData.length).padStart(2, '0')}</span>
                                        </div>
                                        <div className={styles.panelMainInfo}>
                                            <h3 className={styles.panelTitle}>{project.title}</h3>
                                            <p className={styles.panelDesc}>{project.description}</p>
                                        </div>
                                        <div className={styles.panelIndicator}>
                                            <div className={styles.pulseDot} />
                                            <span>LIVE</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile View Content */}
                                <div className={styles.mobileContent}>
                                    <h3 className={styles.mobileTitle}>{project.title}</h3>
                                    <p className={styles.mobileDescription}>{project.description}</p>
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

            </ClickSpark>
        </section>
    );
};

export default ProjectsSection;
