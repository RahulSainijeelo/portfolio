"use client"

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './ProjectModal.module.css';

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

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.backdrop}
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={styles.modal}
                    >
                        <button className={styles.closeButton} onClick={onClose}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className={styles.content}>
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
                            </div>

                            <div className={styles.details}>
                                <div className={styles.header}>
                                    <h2 className={styles.title}>{project.title}</h2>
                                    <div className={styles.tags}>
                                        {project.tags.map(tag => (
                                            <span key={tag} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <p className={styles.description}>{project.longDescription || project.description}</p>

                                <div className={styles.footer}>
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                        View Project
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                    </a>
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
