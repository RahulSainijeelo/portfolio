'use client';

import React from 'react';
import MagneticGrid from '../animation/MagneticGrid';
import styles from './frames.module.css';

const Frame5: React.FC = () => {
  return (
    <div className={styles.frame}>
      <div className={styles.frameContent}>
        {/* Animated Component Container */}
        <div className={styles.frameComponentContainer}>
          <MagneticGrid 
            width={600} 
            height={500} 
            className="w-full h-full" 
          />
        </div>

        {/* Text Container */}
        <div className={styles.frameTextContainer}>
          <h1 className={styles.frameTitle}>
            Exploring Blockchain — Solana & Ethereum dApps, Solidity contracts, audits.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Frame5;