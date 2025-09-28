'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/skills.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const skillCategories = [
  {
    title: "Frontend Development",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"]
  },
  {
    title: "Backend Development", 
    skills: ["Node.js", "Express.js", "Prisma", "PostgreSQL", "MongoDB"]
  },
  {
    title: "Mobile Development",
    skills: ["React Native", "Android Studio", "iOS Development", "Expo"]
  },
  {
    title: "Blockchain & Web3",
    skills: ["Solana", "Ethereum", "Solidity", "Web3.js", "Wallet Integration"]
  },
  {
    title: "DevOps & Cloud",
    skills: ["AWS", "Cloudflare", "Docker", "Linux", "CI/CD"]
  }
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(`.${styles.sectionTitle}`, {
        opacity: 0,
        y: 50,
        scale: 0.8
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.6)',
        scrollTrigger: {
          trigger: `.${styles.sectionTitle}`,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Skills categories stagger animation
      gsap.fromTo(`.${styles.skillCategory}`, {
        opacity: 0,
        y: 100,
        rotateY: 45,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: 'start'
        },
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: `.${styles.skillsGrid}`,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        }
      });

      // Individual skill tags animation
      gsap.fromTo(`.${styles.skillTag}`, {
        opacity: 0,
        scale: 0,
        rotation: 180
      }, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.5,
        stagger: {
          amount: 1,
          from: 'random'
        },
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: `.${styles.skillsGrid}`,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      });

      // Hover animations for skill categories
      const skillCategories = gsap.utils.toArray(`.${styles.skillCategory}`);
      skillCategories.forEach((category: any) => {
        const onEnter = () => {
          gsap.to(category, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
          });
        };
        
        const onLeave = () => {
          gsap.to(category, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        };

        category.addEventListener('mouseenter', onEnter);
        category.addEventListener('mouseleave', onLeave);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.skillsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
        <div className={styles.skillsGrid}>
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={styles.skillCategory}
              data-index={index}
            >
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <div className={styles.skillsList}>
                {category.skills.map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
