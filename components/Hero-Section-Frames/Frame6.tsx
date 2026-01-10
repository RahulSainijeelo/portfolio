'use client';

import React from 'react';
import Galaxy from "../Galaxy";
import styles from './frames.module.css';

const Frame6: React.FC = () => {
  return (
    <div className={`${styles.frame} ${styles.frameBackground}`}>
      {/* Background Component - Full Width */}
      <div className={styles.frameBackgroundContainer}>
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
        />
      </div>

      {/* Text Overlay */}
      <div className={styles.frameTextOverlay}>
        <h1 className={styles.frameTitle}>
          DevOps. Problem solving. Turning errors into elegant solutions.
        </h1>
      </div>
    </div>
  );
};

export default Frame6;