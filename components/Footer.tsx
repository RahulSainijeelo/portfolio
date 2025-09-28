import styles from '@/styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Main CTA Section */}
        {/* <div className={styles.ctaSection}>
          <h2 className={styles.ctaText}>
            Let's build your next<br />
            project together.
          </h2>
        </div> */}

        {/* Navigation Links */}
        <div className={styles.linksSection}>
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>GO DEEPER</h3>
            <div className={styles.linkDivider}></div>
            <nav className={styles.linksList}>
              <a href="#about" className={styles.link}>About</a>
            </nav>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>SOCIAL</h3>
            <div className={styles.linkDivider}></div>
            <nav className={styles.linksList}>
              <a href="https://instagram.com" className={styles.link} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://twitter.com" className={styles.link} target="_blank" rel="noopener noreferrer">X</a>
            </nav>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>WANT TO SEE OUR WORK?</h3>
            <div className={styles.linkDivider}></div>
            <a href="mailto:rahulsaini.dev@gmail.com" className={styles.emailLink}>
              rahulsaini.dev@gmail.com
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.footerInfo}>
            <div className={styles.copyright}>
              <span>© COPYRIGHT 2025 RAHUL SAINI</span>
              <span>ALL RIGHT RESERVED</span>
            </div>
            
            <div className={styles.location}>
              <span>NEW DELHI</span>
              <span>INDIA</span>
            </div>

            <div className={styles.tagline}>
              WE COULD JUST SAY YOU UP ////////////////////////////////
            </div>
          </div>

          {/* Large Name Display */}
          <div className={styles.nameDisplay}>
            <h1 className={styles.largeName}>RAHUL SAINI</h1>
          </div>
        </div>
      </div>
    </footer>
  );
}