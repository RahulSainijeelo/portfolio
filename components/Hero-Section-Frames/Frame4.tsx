'use client';

import React from 'react';
import MotionPath from '../animation/MotionPath';
import styles from './frames.module.css';

const Frame4: React.FC = () => {
  return (
    <div className={`${styles.frame} ${styles.frameReverse}`}>
      <div className={styles.frameContent}>
        {/* Animated Component Container */}
        <div className={styles.frameComponentContainer}>
          <MotionPath />
        </div>

        {/* Text Container */}
        <div className={styles.frameTextContainer}>
          <h1 className={styles.frameTitle}>
            Crafting seamless mobile apps with React Native.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Frame4;