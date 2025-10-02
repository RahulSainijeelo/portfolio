import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import styles from '../styles/interactiveMenu.module.css';

interface InteractiveMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const InteractiveMenu: React.FC<InteractiveMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { title: 'About', subtitle: 'Discover my story', href: '#about' },
    { title: 'Portfolio', subtitle: 'View my work', href: '#portfolio' },
    { title: 'Contact', subtitle: 'Let\'s connect', href: '#contact' }
  ];

  useEffect(() => {
    if (isOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  }, [isOpen]);

  const openMenu = () => {
    if (!menuRef.current || !overlayRef.current || !itemsRef.current) return;

    // Show menu
    menuRef.current.style.pointerEvents = 'all';
    
    // Animate overlay
    animate(overlayRef.current, {
      opacity: 1,
      duration: 600,
      ease: 'outCubic'
    });

    // Animate menu container
    animate(menuRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 800,
      ease: 'outCubic'
    });

    // Animate menu items
    const items = itemsRef.current.querySelectorAll(`.${styles.menuItem}`);
    animate(items, {
      opacity: [0, 1],
      y: [50, 0],
      duration: 600,
      delay: (el, i) => i * 100 + 400,
      ease: 'outBack(1.7)'
    });

    // Animate decorative elements
    const decorations = menuRef.current.querySelectorAll(`.${styles.decoration}`);
    animate(decorations, {
      scale: [0, 1],
      rotate: [180, 0],
      duration: 1000,
      delay: (el, i) => i * 200 + 600,
      ease: 'outElastic(1, .8)'
    });
  };

  const closeMenu = () => {
    if (!menuRef.current || !overlayRef.current || !itemsRef.current) return;

    // Animate menu items out
    const items = itemsRef.current.querySelectorAll(`.${styles.menuItem}`);
    animate(items, {
      opacity: 0,
      y: -30,
      duration: 300,
      delay: (el, i) => i * 50,
      ease: 'inBack(1.7)'
    });

    // Animate overlay out
    animate(overlayRef.current, {
      opacity: 0,
      duration: 400,
      delay: 200,
      ease: 'inCubic'
    });

    // Animate menu container out
    animate(menuRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 600,
      delay: 300,
      ease: 'inCubic',
      onComplete: () => {
        if (menuRef.current) {
          menuRef.current.style.pointerEvents = 'none';
        }
      }
    });
  };

  const handleItemClick = (href: string) => {
    onClose();
    // Handle navigation
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={menuRef} className={styles.menuContainer}>
      {/* Overlay */}
      <div ref={overlayRef} className={styles.overlay} onClick={onClose}></div>
      
      {/* Menu Content */}
      <div className={styles.menuContent}>
        {/* Decorative Elements */}
        <div className={`${styles.decoration} ${styles.decoration1}`}></div>
        <div className={`${styles.decoration} ${styles.decoration2}`}></div>
        <div className={`${styles.decoration} ${styles.decoration3}`}></div>
        
        {/* Menu Items */}
        <div ref={itemsRef} className={styles.menuItems}>
          {menuItems.map((item, index) => (
            <div 
              key={item.title}
              className={styles.menuItem}
              onClick={() => handleItemClick(item.href)}
            >
              <div className={styles.itemNumber}>0{index + 1}</div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemSubtitle}>{item.subtitle}</p>
              </div>
              <div className={styles.itemArrow}>→</div>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose}>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  );
};

export default InteractiveMenu;
