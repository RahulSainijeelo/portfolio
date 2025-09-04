import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import ScrollShapes from './ScrollShapes';
import InteractiveMenu from './InteractiveMenu';
import styles from '../styles/header.module.css';

interface HeaderProps {
  logoText: string;
}

const Header: React.FC<HeaderProps> = ({ logoText }) => {
  const headerRef = useRef<HTMLHeadElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Header background opacity based on scroll
      if (headerRef.current) {
        const opacity = Math.min(window.scrollY / 100, 0.95);
        headerRef.current.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
      }

      // Logo scale effect on scroll
      if (logoRef.current) {
        const scale = Math.max(1 - window.scrollY / 1000, 0.8);
        logoRef.current.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header ref={headerRef} className={styles.header}>
        <div className={styles.headerContent}>
          {/* Animated Geometric Shapes */}
          <ScrollShapes scrollY={scrollY} />
          
          {/* Center Logo */}
          <div ref={logoRef} className={styles.logoContainer}>
            <div className={styles.logo}>
              <span className={styles.logoText}>{logoText}</span>
              <div className={styles.logoUnderline}></div>
            </div>
          </div>
          
          {/* Interactive Menu Button */}
          <div className={styles.menuButtonContainer}>
            <button 
              className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`}
              onClick={handleMenuToggle}
              aria-label="Toggle Menu"
            >
              <div className={styles.menuIcon}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Interactive Menu Overlay */}
      <InteractiveMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
