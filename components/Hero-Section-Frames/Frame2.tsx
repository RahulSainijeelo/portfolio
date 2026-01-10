'use client';

import React from 'react';
import BlurText from "@/components/BlurText";
import PathDrawing from '../animation/PathDrawing';
import styles from './frames.module.css';

const Frame2: React.FC = () => {
  return (
    <div className={`${styles.frame} ${styles.frameReverse}`}>
      <div className={styles.frameContent}>
        {/* Animated Component Container */}
        <div className={styles.frameComponentContainer}>
          <PathDrawing />
        </div>

        {/* Text Container */}
        <div className={styles.frameTextContainer}>
          <div className={styles.frameTitle}>
            <BlurText
              text="Coding since '23 — from crafting engaging frontends…"
              delay={150}
              animateBy="words"
              direction="top"
              className={styles.blurTextCustom}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frame2;