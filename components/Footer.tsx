import styles from '@/styles/footer.module.css';

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
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
            <nav className={styles.linksList}>
              <a href="#projects" className={styles.link}>Projects</a>
              <a href="#skills" className={styles.link}>Skills</a>
            </nav>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>SOCIAL</h3>
            <div className={styles.linkDivider}></div>
            <nav className={styles.linksList}>
              <a href="https://www.linkedin.com/in/r-rahul-s-saini/" className={styles.link} target="_blank" rel="noopener noreferrer">Linkedin</a>
              <a href="https://x.com/Rahul1962" className={styles.link} target="_blank" rel="noopener noreferrer">X</a>
            </nav>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>WANT TO SEE MY WORK?</h3>
            <div className={styles.linkDivider}></div>
            <a href="mailto:rahulsainijeelo@gmail.com" className={styles.emailLink}>
              rahulsainijeelo@gmail.com
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.footerInfo}>
            <div className={styles.copyright}>
              <span>© COPYRIGHT 2026 RAHUL SAINI</span>
              <span>ALL RIGHT RESERVED</span>
            </div>

            <div className={styles.location}>
              <span>INDIA</span>
            </div>

            <div className={styles.tagline}>
              I COULD JUST SAY YOU UP ////////////////////////////////
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