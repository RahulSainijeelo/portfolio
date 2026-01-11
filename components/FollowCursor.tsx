"use client"

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import styles from './FollowCursor.module.css';

interface FollowCursorProps {
    text?: string;
    visible?: boolean;
}

const FollowCursor: React.FC<FollowCursorProps> = ({ text = "VIEW", visible = false }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const sx = useSpring(mouseX, springConfig);
    const sy = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className={styles.cursor}
            style={{
                x: sx,
                y: sy,
                opacity: visible ? 1 : 0,
                scale: visible ? 1 : 0,
            }}
        >
            <span className={styles.text}>{text}</span>
        </motion.div>
    );
};

export default FollowCursor;
