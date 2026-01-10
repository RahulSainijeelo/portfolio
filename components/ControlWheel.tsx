'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import styles from '@/styles/control-wheel.module.css';

interface ControlWheelProps {
    onRotate: (delta: number) => void;
    size?: number;
}

const ControlWheel: React.FC<ControlWheelProps> = ({ onRotate, size = 300 }) => {
    const wheelRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const lastAngle = useRef<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Continuous rotation on hover
    useEffect(() => {
        let rafId: number;
        if (isHovered && !isDragging) {
            const animate = () => {
                const delta = 0.5; // slow rotation
                setRotation(prev => prev + delta);
                onRotate(delta * 0.05);
                rafId = requestAnimationFrame(animate);
            };
            rafId = requestAnimationFrame(animate);
        }
        return () => cancelAnimationFrame(rafId);
    }, [isHovered, isDragging, onRotate]);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        lastAngle.current = getAngle(clientX, clientY);
    };

    const getAngle = (clientX: number, clientY: number) => {
        if (!wheelRef.current) return 0;
        const rect = wheelRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging || lastAngle.current === null) return;

            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            const currentAngle = getAngle(clientX, clientY);

            let delta = currentAngle - lastAngle.current;

            // Handle wrap-around
            if (delta > 180) delta -= 360;
            if (delta < -180) delta += 360;

            setRotation(prev => prev + delta);
            onRotate(delta * 0.1); // Sensitivity
            lastAngle.current = currentAngle;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            lastAngle.current = null;
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleMouseMove);
            window.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging, onRotate]);

    return (
        <div
            className={styles.wheelWrapper}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                ref={wheelRef}
                className={styles.wheel}
                style={{
                    width: size,
                    height: size,
                    transform: `rotate(${rotation}deg)`,
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                <div className={styles.wheelInner}>
                    <div className={styles.instruction}>
                        {isDragging ? 'ROTATING...' : 'ROTATE'}
                    </div>
                    <div className={styles.dot} />
                    <div className={styles.ticks}>
                        {[...Array(24)].map((_, i) => (
                            <div
                                key={i}
                                className={styles.tick}
                                style={{ transform: `rotate(${i * 15}deg)` }}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ControlWheel;
