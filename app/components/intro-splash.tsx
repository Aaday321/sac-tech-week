"use client";

import { ThemeToggle } from "./theme-toggle";
import styles from "./intro-splash.module.css";

type IntroSplashProps = {
  exiting: boolean;
  onSkip: () => void;
};

export function IntroSplash({ exiting, onSkip }: IntroSplashProps) {
  return (
    <div
      className={`${styles.overlay} ${exiting ? styles.exiting : ""}`}
      aria-hidden={exiting}
    >
      <div className={styles.glow} aria-hidden />
      <div className={styles.grid} aria-hidden />
      <header className={styles.toolbar}>
        <ThemeToggle />
      </header>
      <div className={styles.hero}>
        <p className={styles.city}>Sacramento</p>
        <h1 className={styles.title}>
          <span className={styles.titleWord}>Tech</span>
          <span className={styles.titleWord}>Week</span>
        </h1>
        <p className={styles.year} aria-label="Twenty ninety-nine">
          2099<span className={styles.cursor}>_</span>
        </p>
      </div>
      <button type="button" className={styles.skip} onClick={onSkip}>
        Skip intro
      </button>
    </div>
  );
}
