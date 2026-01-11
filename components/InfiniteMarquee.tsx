"use client"

import React from 'react';
import styles from './InfiniteMarquee.module.css';

interface InfiniteMarqueeProps {
    items: string[];
    speed?: number;
    direction?: 'left' | 'right';
    className?: string;
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
    items,
    speed = 40,
    direction = 'left',
    className = ""
}) => {
    return (
        <div className={`${styles.marquee} ${className}`}>
            <div
                className={styles.track}
                style={{
                    animationDuration: `${speed}s`,
                    animationDirection: direction === 'left' ? 'normal' : 'reverse'
                }}
            >
                {[...items, ...items, ...items, ...items].map((item, index) => (
                    <div key={index} className={styles.item}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteMarquee;
