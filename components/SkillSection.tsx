'use client';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '@/styles/skills.module.css';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    id: "FE_MOD_01",
    title: "FRONTEND_ENG",
    description: "ARCHITECTING HIGH-PERFORMANCE WEB INTERFACES WITH ATOMIC DESIGN PRINCIPLES AND MOTION LOGIC.",
    level: "RANK: EXPERT",
    skills: [
      { name: "NEXT.JS 15", info: "LATEST SERVER COMPONENTS & APP ROUTER" },
      { name: "TYPESCRIPT", info: "STRICT TYPE ARCHITECTURE" },
      { name: "GSAP_MOTION", info: "HIGH-END PERFORMANCE ANIMATION" },
      { name: "THREE.JS", info: "WEBGL 3D RENDERING PIPELINES" },
      { name: "TAILWIND", info: "UTILITY-FIRST ATOMIC STYLING" }
    ]
  },
  {
    id: "BE_MOD_02",
    title: "BACKEND_CORE",
    description: "BUILDING SCALABLE DISTRIBUTED SYSTEMS AND ROBUST API ARCHITECTURES.",
    level: "RANK: ADVANCED",
    skills: [
      { name: "NODE.JS", info: "ASYNCHRONOUS RUNTIME ENVIRONMENTS" },
      { name: "GO_LANG", info: "SYSTEM-LEVEL CONCURRENCY" },
      { name: "PRISMA", info: "TYPE-SAFE ORM LOGIC" },
      { name: "POSTGRES", info: "RELATIONAL DATA INTEGRITY" },
      { name: "REDIS", info: "IN-MEMORY DATA STREAMING" }
    ]
  },
  {
    id: "MOB_MOD_03",
    title: "MOBILE_INFRA",
    description: "CRAFTING NATIVE-LIKE EXPERIENCES FOR CROSS-PLATFORM MOBILE ENVIRONMENTS.",
    level: "RANK: PROFICIENT",
    skills: [
      { name: "REACT NATIVE", info: "HYBRID COMPONENT BRIDGING" },
      { name: "EXPO SDK", info: "RAPID DEPLOYMENT WORKFLOWS" },
      { name: "IOS NATIVE", info: "SWIFT-BASED COMPONENT OPTIMIZATION" },
      { name: "NATIVE MOD", info: "CUSTOM JSI INTERFACE BRIDGING" }
    ]
  },
  {
    id: "W3_MOD_04",
    title: "WEB3_PROTO",
    description: "DEVELOPING DECENTRALIZED PROTOCOLS AND CRYPTOGRAPHIC SECURITY LAYERS.",
    level: "RANK: SPECIALIST",
    skills: [
      { name: "SOLANA", info: "HIGH-THROUGHPUT CHAIN LOGIC" },
      { name: "RUST_LANG", info: "MEMORY-SAFE PROGRAMMING" },
      { name: "SOLIDITY", info: "SMART CONTRACT EVM PROTOCOLS" },
      { name: "ANCHOR", info: "FRAMEWORK FOR RUST PROGRAMS" }
    ]
  }
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSkill, setActiveSkill] = useState(0);
  const [systemLoad, setSystemLoad] = useState("0%");
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCategory = skillCategories[activeCategory];
  const currentSkill = currentCategory.skills[activeSkill];

  // Simulated system load effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad(`${(Math.random() * (99 - 95) + 95).toFixed(1)}%`);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  /*
  useGSAP(() => {
    if (!sectionRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%", // More sensitive trigger
        toggleActions: "play none none reverse"
      }
    });

    timeline.from(`.${styles.hudHeader} > *`, {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    })
      .from(`.${styles.sidebar}`, { // Animate the entire sidebar wrapper too
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .from(`.${styles.sidebar} > *`, {
        x: -20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.6")
      .from(`.${styles.mainDisplay}`, {
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.8")
      .from(`.${styles.detailPanel}`, {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=1");

  }, { scope: sectionRef });

  useGSAP(() => {
    // Fade in skills on category change
    gsap.fromTo(`.${styles.skillEntry}`,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.05, duration: 0.4, ease: "power2.out" }
    );
  }, [activeCategory]);
  */

  return (
    <section ref={sectionRef} id="skills" className={styles.skillsSection}>
      <div className={styles.bgElements} />
      <div className={styles.scanline} />

      <div className={styles.hudHeader}>
        <div className={styles.hudHeaderLeft}>
          <span className={styles.hudStatus}>[ STATUS: SYSTEM_ONLINE ]</span>
          <h2 className={styles.hudTitle}>TECHNICAL_CORE</h2>
        </div>
        <div className={styles.hudHeaderRight}>
          <div>SYS_LOAD: {systemLoad}</div>
          <div>UPTIME: 124:55:08:21</div>
          <div>LOCATION: 127.0.0.1</div>
        </div>
      </div>

      <div ref={containerRef} className={styles.container}>
        {/* Sidebar: Module Navigation */}
        <div className={styles.sidebar}>
          {skillCategories.map((cat, idx) => (
            <button
              key={cat.id}
              className={`${styles.moduleButton} ${activeCategory === idx ? styles.active : ''}`}
              onClick={() => {
                setActiveCategory(idx);
                setActiveSkill(0);
              }}
            >
              <span className={styles.moduleID}>{cat.id}</span>
              <span className={styles.moduleName}>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Central Matrix: Skill Display */}
        <div className={styles.mainDisplay}>
          <div className={styles.skillsMatrix}>
            {currentCategory.skills.map((skill, idx) => (
              <div
                key={idx}
                className={`${styles.skillEntry} ${activeSkill === idx ? styles.active : ''}`}
                onMouseEnter={() => setActiveSkill(idx)}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Technical Specifications */}
        <div className={styles.detailPanel}>
          <div className={styles.specHeader}>
            <span className={styles.specTitle}>MODULE_DESCRIPTION</span>
            <p className={styles.specDesc}>{currentCategory.description}</p>
          </div>

          <div className={styles.specInfo}>
            <div className={styles.specBlock}>
              <span className={styles.specTitle}>ACCESS_LEVEL</span>
              <div className={styles.specValue}>{currentCategory.level}</div>
            </div>

            <div className={styles.specBlock} style={{ marginTop: '1.5rem' }}>
              <span className={styles.specTitle}>SKILL_SPECIFICATION</span>
              <div className={styles.specValue} style={{ color: '#bd93f9' }}>
                {currentSkill ? currentSkill.name : 'SELECT_SKILL'}
              </div>
              <p className={styles.specDesc} style={{ marginTop: '0.4rem' }}>
                {currentSkill ? currentSkill.info : 'STBY_'}
              </p>
            </div>
          </div>

          <div className={styles.subTools}>
            <span className={styles.specTitle}>CONNECTION_READY_</span>
            <div className={styles.toolItem}>
              <span>SECURE_LINK</span>
              <span>[ ACTIVE ]</span>
            </div>
            <div className={styles.toolItem}>
              <span>ENCRYPTION</span>
              <span>[ AES-256 ]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
