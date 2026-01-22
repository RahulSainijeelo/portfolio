'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Github, Star, GitFork, ExternalLink, Code2, BookOpen } from 'lucide-react';
import styles from '@/styles/github-section.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Repo {
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    html_url: string;
    updated_at: string;
}

interface UserStats {
    public_repos: number;
    followers: number;
    following: number;
    total_stars: number;
    name: string;
    avatar_url: string;
    bio: string;
    login: string;
}

interface ContributionDay {
    color: string;
    contributionCount: number;
    contributionLevel: string;
    date: string;
}

interface ContributionStats {
    total: number;
    currentStreak: number;
    longestStreak: number;
    calendar: ContributionDay[][];
}

const USERNAME = "RahulSainijeelo";

export default function GithubSection() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [stats, setStats] = useState<UserStats | null>(null);
    const [contributions, setContributions] = useState<ContributionStats | null>(null);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        async function fetchRepos() {
            try {
                const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=stars&per_page=6`);
                const data = await res.json();
                if (Array.isArray(data)) setRepos(data);
            } catch (e) { console.error("Repo Fetch Error", e); }
        }

        async function fetchUser() {
            try {
                const res = await fetch(`https://api.github.com/users/${USERNAME}`);
                const data = await res.json();
                setStats({
                    public_repos: data.public_repos,
                    followers: data.followers,
                    following: data.following,
                    total_stars: 0,
                    name: data.name,
                    avatar_url: data.avatar_url,
                    bio: data.bio,
                    login: data.login
                });
            } catch (e) { console.error("User Fetch Error", e); }
        }

        async function fetchContribs() {
            try {
                const res = await fetch(`https://github-contributions-api.deno.dev/${USERNAME}.json`);
                const data = await res.json();
                
                // Calculate streaks from the contributions array if not provided
                let allDays: ContributionDay[] = [];
                if (data.contributions) {
                    allDays = data.contributions.flat();
                }

                let currentStreak = 0;
                let longestStreak = 0;
                let tempStreak = 0;

                // Simple streak calculation (descending order)
                const today = new Date().toISOString().split('T')[0];
                const sortedDays = [...allDays].sort((a, b) => b.date.localeCompare(a.date));
                
                let foundToday = false;
                for (const day of sortedDays) {
                    if (day.contributionCount > 0) {
                        tempStreak++;
                        if (!foundToday && (day.date === today || true)) { // Simple check
                            currentStreak = tempStreak;
                        }
                    } else {
                        if (day.date < today) {
                            if (tempStreak > longestStreak) longestStreak = tempStreak;
                            tempStreak = 0;
                            if (currentStreak === 0) break; // End current streak if we hit a 0
                        }
                    }
                }
                if (tempStreak > longestStreak) longestStreak = tempStreak;

                setContributions({
                    total: data.totalContributions || 0,
                    currentStreak: currentStreak,
                    longestStreak: longestStreak,
                    calendar: data.contributions || []
                });
            } catch (e) { console.error("Contrib Fetch Error", e); }
        }

        async function init() {
            setLoading(true);
            await Promise.allSettled([fetchRepos(), fetchUser(), fetchContribs()]);
            setLoading(false);
        }

        init();
    }, []);

    /*
    useGSAP(() => {
        if (loading || !sectionRef.current) return;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        timeline.from(`.${styles.header}`, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
            .from(`.${styles.statItem}`, {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.6")
            .from(`.${styles.repoCard}`, {
                y: 30,
                opacity: 0,
                stagger: 0.05,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.4");

    }, [loading]);
    */

    return (
        <section ref={sectionRef} id="github" className={styles.githubSection}>
            <div className={styles.bgGrid} />
            <div className={styles.scanline} />

            <div className={styles.container}>
                {/* HUD Header */}
                <div className={styles.header}>
                    <div className={styles.titleGroup}>
                        <h2 className={styles.title}>GITHUB_ACTIVITY</h2>
                    </div>
                </div>

                {/* Profile Card & Info */}
                {stats && (
                    <div className={styles.profileContainer}>
                        <div className={styles.profileCard}>
                            <div className={styles.avatarWrapper}>
                                <img src={stats.avatar_url} alt={stats.name} className={styles.avatar} />
                                <div className={styles.avatarRing} />
                            </div>
                            <div className={styles.profileInfo}>
                                <div className={styles.nameRow}>
                                    <h3 className={styles.userName}>{stats.name}</h3>
                                    <span className={styles.userLogin}>@{stats.login}</span>
                                </div>
                                <p className={styles.userBio}>{stats.bio}</p>
                                <div className={styles.profileActions}>
                                    <a 
                                        href={`https://github.com/${USERNAME}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className={styles.followButton}
                                    >
                                        FOLLOW_ON_GITHUB
                                        <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Stylish Streaks */}
                        <div className={styles.streakGrid}>
                            <div className={`${styles.streakCard} ${styles.currentStreak}`}>
                                <div className={styles.streakIcon}>🔥</div>
                                <div className={styles.streakData}>
                                    <span className={styles.streakValue}>{contributions?.currentStreak || 0}</span>
                                    <span className={styles.streakLabel}>CURRENT_STREAK</span>
                                </div>
                            </div>
                            <div className={`${styles.streakCard} ${styles.maxStreak}`}>
                                <div className={styles.streakIcon}>⚡</div>
                                <div className={styles.streakData}>
                                    <span className={styles.streakValue}>{contributions?.longestStreak || 0}</span>
                                    <span className={styles.streakLabel}>MAX_STREAK</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contribution Graph */}
                <div className={styles.graphContainer}>
                    <div className={styles.graphHeader}>
                        <span className={styles.graphTitle}>CONTRIBUTION_CALENDAR</span>
                        <div className={styles.graphLegend}>
                            <span>Less</span>
                            <div className={styles.legendScale}>
                                <div className={styles.level0} />
                                <div className={styles.level1} />
                                <div className={styles.level2} />
                                <div className={styles.level3} />
                                <div className={styles.level4} />
                            </div>
                            <span>More</span>
                        </div>
                    </div>
                    <div className={styles.calendarWrapper}>
                        <div className={styles.calendar}>
                            {contributions?.calendar.map((week, wIdx) => (
                                <div key={wIdx} className={styles.week}>
                                    {week.map((day, dIdx) => (
                                        <div 
                                            key={dIdx} 
                                            className={`${styles.day} ${styles[day.contributionLevel.toLowerCase()]}`}
                                            title={`${day.contributionCount} contributions on ${day.date}`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Advanced Stats Grid */}
                <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>CONTRIBUTIONS_L-YEAR</span>
                        <span className={styles.statValue}>
                            {contributions?.total || "---"}
                        </span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>CURRENT_STREAK</span>
                        <span className={styles.statValue}>
                            {contributions?.currentStreak || "0"} <span className={styles.label} style={{ fontSize: '0.6rem', marginBottom: 0 }}>DAYS</span>
                        </span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>BEST_STREAK</span>
                        <span className={styles.statValue}>
                            {contributions?.longestStreak || "0"} <span className={styles.label} style={{ fontSize: '0.6rem', marginBottom: 0 }}>DAYS</span>
                        </span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>PUBLIC_MODULES</span>
                        <span className={styles.statValue}>{stats?.public_repos || "---"}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>FOLLOWERS</span>
                        <span className={styles.statValue}>{stats?.followers || "---"}</span>
                    </div>
                </div>

                {/* Repos Grid */}
                {loading ? (
                    <div className={styles.loading}>
                        SYSTEM_UPDATING...
                    </div>
                ) : (
                    <div className={styles.reposGrid}>
                        {repos.map((repo) => (
                            <a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.repoCard}
                            >
                                <div className={styles.repoHeader}>
                                    <BookOpen className={styles.repoIcon} size={20} />
                                    <div className={styles.stars}>
                                        <Star size={14} fill="#00ffff" />
                                        <span>{repo.stargazers_count}</span>
                                    </div>
                                </div>

                                <div className={styles.repoBody}>
                                    <h3 className={styles.repoName}>{repo.name}</h3>
                                    <p className={styles.repoDesc}>
                                        {repo.description || "NO_DESCRIPTION_PROVIDED_BY_SOURCE."}
                                    </p>
                                </div>

                                <div className={styles.repoFooter}>
                                    <span>
                                        <Code2 size={14} />
                                        {repo.language || "N/A"}
                                    </span>
                                    <span>
                                        SYNC_COMPLETE <ExternalLink size={12} />
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
