'use client';

import React from 'react';
import SplitText from '../SplitText';
import Orb from '../Orb';
import styles from './frames.module.css';

const Frame3: React.FC = () => {
  return (
    <div className={`${styles.frame} ${styles.frameBackground}`}>
      {/* Background Component - Full Width */}
      <div className={styles.frameBackgroundContainer}>
        <Orb hue={280} />
      </div>

      {/* Text Overlay */}
      <div className={styles.frameTextOverlay}>
        <div className={styles.frameTitle}>
          <SplitText 
            text="…to building sophisticated backends & services."
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            className={styles.splitTextCustom}
          />
        </div>
      </div>
    </div>
  );
};

export default Frame3;