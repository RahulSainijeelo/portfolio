'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from '@/styles/projects-section.module.css';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import projectsData from '@/data/projects.json';
import ProjectModal from './ProjectModal';
import FollowCursor from './FollowCursor';

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
}

const ProjectsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

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

        if (!gallery || !trigger) return;

        const totalWidth = gallery.scrollWidth - window.innerWidth;

        gsap.to(gallery, {
            x: -totalWidth - 100, // Small buffer
            ease: "none",
            scrollTrigger: {
                trigger: trigger,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${gallery.scrollWidth}`,
                invalidateOnRefresh: true,
            }
        });
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
                    {projectsData.map((project: Project) => (
                        <div
                            key={project.id}
                            className={styles.projectCard}
                            onClick={() => openModal(project)}
                        >
                            <div className={styles.videoWrapper}>
                                {project.videoUrl && (
                                    <video
                                        src={project.videoUrl}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className={styles.cardVideo}
                                    />
                                )}
                                <div className={styles.videoOverlay} />
                            </div>

                            {/* Mobile View Content */}
                            <div className={styles.mobileContent}>
                                <h3 className={styles.mobileTitle}>{project.title}</h3>
                                <p className={styles.mobileDescription}>{project.description}</p>
                            </div>

                            {/* Desktop Reveal Content */}
                            <div className={styles.desktopReveal}>
                                <span className={styles.revealTitle}>{project.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <FollowCursor visible={isHovering} text="KEEP SCROLLING" />

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
