'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Mail, Linkedin, Twitter, FileText, ExternalLink, Download ,Github} from 'lucide-react';
import styles from '@/styles/contact-modal.module.css';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.to(modalRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out',
                display: 'flex'
            });
            gsap.fromTo(contentRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.1 }
            );
        } else {
            document.body.style.overflow = 'unset';
            gsap.to(modalRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    if (modalRef.current) modalRef.current.style.display = 'none';
                }
            });
        }
    }, [isOpen]);

    if (!isOpen && !modalRef.current) return null;

    const resumeUrl = "https://pub-88542caeb82a4635aa980b4aeb205cb5.r2.dev/portfolio/Rahul_Saini_Resume.pdf"; // This is a placeholder, actual R2 URL should be used

    return (
        <div 
            ref={modalRef} 
            className={styles.modalOverlay} 
            onClick={onClose}
            style={{ display: 'none', opacity: 0 }}
        >
            <div 
                ref={contentRef} 
                className={styles.modalContent} 
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeButton} onClick={onClose}>
                    <X size={20} />
                </button>

                <div className={styles.header}>
                    <h2 className={styles.greeting}>GEt IN ToUCH_</h2>
                    <p className={styles.subtext}>SIGNAL_ESTABLISHED: OPEN FOR NEW OPPORTUNITIES AND COLLABORATIONS.</p>
                </div>

                <div className={styles.linksGrid}>
                    <a 
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.contactLink} ${styles.resumeButton}`}
                    >
                        <div className={styles.iconWrapper + " bg-none!"}>
                            <Download size={20} />
                        </div>
                        <div className={styles.linkInfo}>
                            <span className={styles.linkValue}>DOWNLOAD_RESUME.PDF</span>
                        </div>
                    </a>

                    <a href="mailto:rahulsainijeelo@gmail.com" className={styles.contactLink}>
                        <div className={styles.iconWrapper}>
                            <Mail size={18} />
                        </div>
                        <div className={styles.linkInfo}>
                            <span className={styles.linkLabel}>EMAIL</span>
                            {/* <span className={styles.linkValue}>rahulsainijeelo</span> */}
                        </div>
                    </a>

                    <a href="https://www.linkedin.com/in/r-rahul-s-saini/" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                        <div className={styles.iconWrapper}>
                            <Linkedin size={18} />
                        </div>
                        <div className={styles.linkInfo}>
                            <span className={styles.linkLabel}>LINKEDIN</span>
                            {/* <span className={styles.linkValue}>rahulsainijeelo</span> */}
                        </div>
                    </a>

                    <a href="https://x.com/Rahul1962" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                        <div className={styles.iconWrapper}>
                            <Twitter size={18} />
                        </div>
                        <div className={styles.linkInfo}>
                            <span className={styles.linkLabel}>X_TWITTER</span>
                            {/* <span className={styles.linkValue}>@rahulsainijeelo</span> */}
                        </div>
                    </a>

                    <a href="https://github.com/RahulSainijeelo" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                        <div className={styles.iconWrapper}>
                            <Github size={18} />
                        </div>
                        <div className={styles.linkInfo}>
                            <span className={styles.linkLabel}>GITHuB</span>
                            {/* <span className={styles.linkValue}>RahulSainijeelo</span> */}
                        </div>
                    </a>
                </div>

                <div className={styles.statusLine}>
                    <span>LATENCY: 24ms</span>
                    <span>ENCRYPTION: AES-256</span>
                    <span>STATUS: ONLINE</span>
                </div>
            </div>
        </div>
    );
}
