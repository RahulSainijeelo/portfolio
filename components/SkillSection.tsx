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
      { name: "NEXT.JS", info: "LATEST SERVER COMPONENTS & APP ROUTER", icon: "nextdotjs" },
      { name: "TYPESCRIPT", info: "STRICT TYPE ARCHITECTURE", icon: "typescript" },
      { name: "GSAP", info: "HIGH-END PERFORMANCE ANIMATION", icon: "greensock" },
      { name: "SHADCN", info: "ACCESSIBLE UI COMPONENTS", icon: "shadcnui" },
      { name: "TAILWIND", info: "UTILITY-FIRST ATOMIC STYLING", icon: "tailwindcss" },
      { name: "CSS", info: "COMPLEX CUSTOM STYLING & LAYOUT", icon: "css3" }
    ]
  },
  {
    id: "BE_MOD_02",
    title: "BACKEND_CORE",
    description: "BUILDING SCALABLE DISTRIBUTED SYSTEMS AND ROBUST API ARCHITECTURES.",
    level: "RANK: ADVANCED",
    skills: [
      { name: "NODE.JS", info: "ASYNCHRONOUS RUNTIME ENVIRONMENTS", icon: "nodedotjs" },
      { name: "EXPRESS", info: "SYSTEM-LEVEL CONCURRENCY", icon: "express" },
      { name: "PRISMA", info: "TYPE-SAFE ORM LOGIC", icon: "prisma" },
      { name: "POSTGRES", info: "RELATIONAL DATA INTEGRITY", icon: "postgresql" },
      { name: "REDIS", info: "IN-MEMORY DATA STREAMING", icon: "redis" },
      { name: "TURBOREPO", info: "MONOREPO ORCHESTRATION & COMPONENT SHARING", icon: "turborepo" },
      { name: "WEBSOCKET", info: "REAL TIME COMMUNICATION", icon: "socketdotio" },
      { name: "WEBRTC", info: "PEER-TO-PEER COMMUNICATION", icon: "webrtc" },
      { name: "GRPC", info: "HIGH-PERFORMANCE MICROSERVICE COMMUNICATION", icon: "grpc" },
      { name: "PROMETHEUS & GRAFANA", info: "SYSTEM MONITORING & OBSERVABILITY", icon: "prometheus" }
    ]
  },
  {
    id: "MOB_MOD_03",
    title: "MOBILE_INFRA",
    description: "CRAFTING NATIVE-LIKE EXPERIENCES FOR CROSS-PLATFORM MOBILE ENVIRONMENTS.",
    level: "RANK: PROFICIENT",
    skills: [
      { name: "REACT NATIVE", info: "HYBRID COMPONENT BRIDGING", icon: "react" },
      { name: "EXPO SDK", info: "RAPID DEPLOYMENT WORKFLOWS", icon: "expo" },
    ]
  },
  {
    id: "W3_MOD_04",
    title: "WEB3_PROTO",
    description: "DEVELOPING DECENTRALIZED PROTOCOLS AND CRYPTOGRAPHIC SECURITY LAYERS.",
    level: "RANK: SPECIALIST",
    skills: [
      { name: "SOLANA", info: "HIGH-THROUGHPUT CHAIN LOGIC", icon: "solana" },
      { name: "RUST_LANG", info: "MEMORY-SAFE PROGRAMMING", icon: "rust" },
      { name: "SOLIDITY", info: "SMART CONTRACT EVM PROTOCOLS", icon: "solidity" },
      { name: "TOKENS & DAPPS", info: "TOKEN DEPLOYMENT, WALLET ADAPTERS AND OTHER INTEGRATIONS", icon: "ethereum" }
    ]
  },
   {
    id: "DO_MOD_05",
    title: "DEVOPS_ENG",
    description: "STREAMLINING DEVELOPMENT WORKFLOWS AND ORCHESTRATING CLOUD INFRASTRUCTURE.",
    level: "RANK: SPECIALIST",
    skills: [
      { name: "DOCKER", info: "CONTAINERIZATION & REPRODUCIBLE BUILDS", icon: "docker" },
      { name: "KUBERNETES", info: "CONTAINER ORCHESTRATION & AUTOSCALING", icon: "kubernetes" },
      { name: "AWS (ECS, E2, ECR)", info: "CLOUD INFRASTRUCTURE & MANAGED SERVICES", icon: "aws" },
      { name: "GCP & DIGITALOCEAN", info: "MULTI-CLOUD DEPLOYMENT STRATEGIES", icon: "googlecloud" },
      { name: "GIT (CI & CD)", info: "GITHUB WORKFLOWS", icon: "github" },
    ]
  }
]
export default function SkillsSection(){
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

          <h2 className={styles.hudTitle}>TECHNICAL_CORE</h2>
        </div>
        <div className={styles.hudHeaderRight}>
          <div>LOAD: {systemLoad}</div>
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
            {currentCategory.skills.map((skill: any, idx) => (
              <div
                key={idx}
                className={`${styles.skillEntry} ${activeSkill === idx ? styles.active : ''}`}
                onMouseEnter={() => setActiveSkill(idx)}
              >
                <div className={styles.iconContainer}>
                  <img 
                    src={`https://cdn.simpleicons.org/${skill.icon}/FFFFFF`} 
                    alt={skill.name} 
                    className={styles.skillIcon}
                  />
                  <div className={styles.iconGlow} />
                </div>
                <div className={styles.skillInfo}>
                  <span className={styles.skillTitleName}>{skill.name}</span>
  
                </div>
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
