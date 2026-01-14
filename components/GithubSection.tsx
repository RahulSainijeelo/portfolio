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
}

interface ContributionStats {
    total: number;
    currentStreak: number;
    longestStreak: number;
}

const USERNAME = "rahulsainijeelo";

export default function GithubSection() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [stats, setStats] = useState<UserStats | null>(null);
    const [contributions, setContributions] = useState<ContributionStats | null>(null);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [reposRes, userRes, contribRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${USERNAME}/repos?sort=stars&per_page=6`),
                    fetch(`https://api.github.com/users/${USERNAME}`),
                    fetch(`https://github-contributions-api.deno.dev/${USERNAME}.json`)
                ]);

                const reposData = await reposRes.json();
                const userData = await userRes.json();
                const contribData = await contribRes.json();

                if (Array.isArray(reposData)) {
                    setRepos(reposData);
                }

                setStats({
                    public_repos: userData.public_repos,
                    followers: userData.followers,
                    following: userData.following,
                    total_stars: Array.isArray(reposData) ? reposData.reduce((acc: number, repo: Repo) => acc + repo.stargazers_count, 0) : 0
                });

                if (contribData && (contribData.total || contribData.streak)) {
                    setContributions({
                        total: contribData.total?.lastYear || 0,
                        currentStreak: contribData.streak?.current || 0,
                        longestStreak: contribData.streak?.best || 0
                    });
                }
            } catch (error) {
                console.error("GitHub Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

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

    return (
        <section ref={sectionRef} id="github" className={styles.githubSection}>
            <div className={styles.bgGrid} />
            <div className={styles.scanline} />

            <div className={styles.container}>
                {/* HUD Header */}
                <div className={styles.header}>
                    <div className={styles.titleGroup}>
                        <span className={styles.label}>DATA_EXTRACTION // CODE_INTEL</span>
                        <h2 className={styles.title}>GITHUB_ACTIVITY</h2>
                    </div>
                    <div className={styles.led} />
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

                {/* Sync Feed */}
                <div className={styles.syncFeed}>
                    <div className={styles.syncLine}>
                        <span className={styles.syncType}>[STATUS]</span>
                        <span>UPLINK_ESTABLISHED_VIA_HTTPS_GATEWAY_V3</span>
                    </div>
                    <div className={styles.syncLine}>
                        <span className={styles.syncType}>[LATENCY]</span>
                        <span>{loading ? "CALCULATING..." : "24ms_STABLE"}</span>
                    </div>
                    <div className={styles.syncLine}>
                        <span className={styles.syncType}>[ENCRYPTION]</span>
                        <span>AES-256_ACTIVE</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
