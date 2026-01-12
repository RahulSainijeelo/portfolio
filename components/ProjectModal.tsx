"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './ProjectModal.module.css';
import LogoMarquee from './LogoMarquee';
import { useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    const audioInstanceRef = useRef<HTMLAudioElement | null>(null);
    const scrollContentRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const [isHoveringTitle, setIsHoveringTitle] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const lenis = useLenis();

    useEffect(() => {
        if (isOpen) {
            // Stop global Lenis scroll
            lenis?.stop();
            document.body.style.overflow = 'hidden';

            // Create audio instance - Using a reliable chime sound
            audioInstanceRef.current = new Audio("https://cdn.pixabay.com/audio/2021/08/04/audio_06d8a30b73.mp3");
            audioInstanceRef.current.volume = 0.4;

            const playSound = () => {
                if (audioInstanceRef.current) {
                    audioInstanceRef.current.currentTime = 0;
                    audioInstanceRef.current.play().catch(() => {
                        console.log("Autoplay blocked, waiting for interaction");
                    });
                }
            };

            const timer = setTimeout(playSound, 200);
            return () => {
                clearTimeout(timer);
                if (audioInstanceRef.current) {
                    audioInstanceRef.current.pause();
                    audioInstanceRef.current = null;
                }
            }
        } else {
            lenis?.start();
            document.body.style.overflow = 'unset';
            if (audioInstanceRef.current) {
                audioInstanceRef.current.pause();
                audioInstanceRef.current = null;
            }
        }
    }, [isOpen, lenis]);

    useGSAP(() => {
        if (!isOpen || !scrollContentRef.current || !heroRef.current || !detailsRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1025px)", () => {
            gsap.to(heroRef.current, {
                opacity: 0.1,
                scale: 0.9,
                scrollTrigger: {
                    trigger: scrollContentRef.current,
                    scroller: scrollContentRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });

            gsap.fromTo(detailsRef.current,
                { y: 150, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: scrollContentRef.current,
                        scroller: scrollContentRef.current,
                        start: "top 30%",
                        end: "top 5%",
                        scrub: 1.5,
                    }
                }
            );
        });

        return () => mm.revert();
    }, [isOpen]);

    const handleInteraction = () => {
        if (audioInstanceRef.current && audioInstanceRef.current.paused) {
            audioInstanceRef.current.play().catch(() => { });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay} onMouseMove={handleMouseMove} onClick={handleInteraction}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.backdrop}
                        onClick={onClose}
                    />

                    <AnimatePresence>
                        {isHoveringTitle && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className={styles.localCursor}
                                style={{
                                    left: mousePos.x,
                                    top: mousePos.y + 20,
                                }}
                            >
                                <span className={styles.cursorText}>SCROLL_DOWN</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            filter: 'blur(0px)',
                            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                        }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                        className={styles.modal}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleInteraction();
                        }}
                    >
                        <div className={styles.gameFrame}>
                            <div className={styles.cornerT} />
                            <div className={styles.cornerR} />
                            <div className={styles.cornerB} />
                            <div className={styles.cornerL} />

                            <button className={styles.closeButton} onClick={onClose}>
                                <span className={styles.closeText}>EXIT_MISSION</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            <div
                                ref={scrollContentRef}
                                className={styles.scrollContent}
                                data-lenis-prevent
                            >
                                <div
                                    ref={heroRef}
                                    className={styles.heroSection}
                                    onMouseEnter={() => setIsHoveringTitle(true)}
                                    onMouseLeave={() => setIsHoveringTitle(false)}
                                >
                                    <div className={styles.mediaContainer}>
                                        {project.videoUrl ? (
                                            <video
                                                src={project.videoUrl}
                                                className={styles.video}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                            />
                                        ) : (
                                            <img src={project.thumbnail} alt={project.title} className={styles.image} />
                                        )}
                                        <div className={styles.scanline} />
                                    </div>

                                    <div className={styles.heroInfo}>
                                        <motion.h1
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className={styles.title}
                                        >
                                            {project.title}
                                        </motion.h1>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className={styles.statusBadge}
                                        >
                                            <span className={styles.statusDot} />
                                            MISSION_ACTIVE
                                        </motion.div>
                                    </div>
                                </div>

                                <div ref={detailsRef}>
                                    {project.stack && (
                                        <div className={styles.marqueeWrapper}>
                                            <div className={styles.sectionHeader}>
                                                <span className={styles.headerLabel}>TECH_STACK</span>
                                                <div className={styles.headerLine} />
                                            </div>
                                            <LogoMarquee items={project.stack} />
                                        </div>
                                    )}

                                    <div className={styles.gridDetails}>
                                        <div className={styles.mainDesc}>
                                            <h3 className={styles.subHeader}>OVERVIEW</h3>
                                            <p className={styles.text}>{project.longDescription}</p>
                                        </div>

                                        {project.sections && (
                                            <>
                                                <div className={styles.detailBox}>
                                                    <h3 className={styles.subHeader}>CHALLENGES</h3>
                                                    <p className={styles.text}>{project.sections.challenges}</p>
                                                </div>
                                                <div className={styles.detailBox}>
                                                    <h3 className={styles.subHeader}>SOLUTIONS</h3>
                                                    <p className={styles.text}>{project.sections.solutions}</p>
                                                </div>
                                                <div className={styles.detailBox}>
                                                    <h3 className={styles.subHeader}>OUTCOME</h3>
                                                    <p className={styles.text}>{project.sections.outcome}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className={styles.actionFooter}>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.gameButton}>
                                            INITIALIZE_LINK
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
