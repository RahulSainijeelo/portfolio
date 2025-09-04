import { useRef, useEffect } from 'react';
import anime from 'animejs/lib/anime';
import { LoadingIndicatorProps } from '../types';
import styles from '../styles/greeting.module.css';

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ progress }) => {
  const progressRef = useRef<HTMLSpanElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        innerHTML: [progressRef.current.innerHTML, Math.round(progress).toString()],
        duration: 500,
        round: 1,
        easing: 'easeOutExpo'
      });
    }

    if (circleRef.current) {
      const circumference = 2 * Math.PI * 20; // radius = 20
      const strokeDashoffset = circumference - (progress / 100) * circumference;
      
      anime({
        targets: circleRef.current,
        strokeDashoffset: strokeDashoffset,
        duration: 500,
        easing: 'easeOutExpo'
      });
    }
  }, [progress]);

  return (
    <div className={styles.loadingIndicator}>
      <svg width="50" height="50" className={styles.loadingCircle}>
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="transparent"
          stroke="#333"
          strokeWidth="2"
        />
        <circle
          ref={circleRef}
          cx="25"
          cy="25"
          r="20"
          fill="transparent"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray: `${2 * Math.PI * 20}`,
            strokeDashoffset: `${2 * Math.PI * 20}`,
            transform: 'rotate(-90deg)',
            transformOrigin: '25px 25px'
          }}
        />
      </svg>
      <span ref={progressRef} className={styles.progressText}>0</span>%
    </div>
  );
};

export default LoadingIndicator;
