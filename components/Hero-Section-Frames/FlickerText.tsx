'use client';

import React from 'react';
import styles from '@/styles/flicker.module.css';

const FlickerText = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.flickeringText}>
                I AM A DEVELOPER
            </h1>
        </div>
    );
};

export default FlickerText;