"use client"

import React from 'react';
import styles from './LogoMarquee.module.css';

interface LogoMarqueeProps {
    items: { name: string; logo: string }[];
    speed?: number;
}

const LogoMarquee: React.FC<LogoMarqueeProps> = ({ items, speed = 20 }) => {
    // Triple the items to ensure smooth loop
    const displayItems = [...items, ...items, ...items];

    return (
        <div className={styles.marquee}>
            <div
                className={styles.track}
                style={{ animationDuration: `${speed}s` }}
            >
                {displayItems.map((item, idx) => (
                    <div key={idx} className={styles.item}>
                        <img src={item.logo} alt={item.name} className={styles.logo} />
                        <span className={styles.name}>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogoMarquee;
