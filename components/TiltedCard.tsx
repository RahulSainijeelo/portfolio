"use client"

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import styles from './TiltedCard.module.css';

interface TiltedCardProps {
    imageSrc: string;
    altText?: string;
    caption?: string;
    containerHeight?: string;
    containerWidth?: string;
    imageHeight?: string;
    imageWidth?: string;
    scaleOnHover?: number;
    rotateAmplitude?: number;
    showMobileTakeover?: boolean;
    onClick?: () => void;
}

const TiltedCard: React.FC<TiltedCardProps> = ({
    imageSrc,
    altText = "Tilted card image",
    caption,
    containerHeight = "300px",
    containerWidth = "100%",
    imageHeight = "300px",
    imageWidth = "100%",
    scaleOnHover = 1.05,
    rotateAmplitude = 15,
    onClick
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            ref={ref}
            className={styles.container}
            style={{ height: containerHeight, width: containerWidth }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <motion.div
                className={styles.inner}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: scaleOnHover }}
            >
                <div
                    className={styles.imageWrapper}
                    style={{ height: imageHeight, width: imageWidth }}
                >
                    <img src={imageSrc} alt={altText} className={styles.image} />
                </div>

                {caption && (
                    <div className={styles.caption} style={{ transform: "translateZ(30px)" }}>
                        {caption}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default TiltedCard;
