'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import styles from './not-found.module.css';

const NotFound = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            tl.from(numberRef.current, {
                opacity: 0,
                scale: 0.5,
                duration: 1.2,
                ease: 'elastic.out(1, 0.5)'
            })
                .from(titleRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8
                }, '-=0.6')
                .from(textRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.6
                }, '-=0.4')
                .from(btnRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.6
                }, '-=0.3');
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={styles.container}>
            <Link href="/" className={styles.navHome}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Back to Home</span>
            </Link>

            <div className={styles.mandalaPattern} />
            <div className={styles.gradient} />
            
            <div className={styles.content}>
                <div ref={numberRef} className={styles.number}>404</div>
                <h1 ref={titleRef} className={styles.title}>Page Not Found</h1>
                <p ref={textRef} className={styles.text}>
                    The path you seek does not exist in this realm.
                </p>
                <div className={styles.buttonWrapper}>
                    <Link ref={btnRef} href="/" className={styles.homeButton}>
                        <span>GO BACK HOME</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
