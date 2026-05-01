"use client";

import { EditorialSection } from "./components/editorial-section";
import { NavBar } from "./components/nav-bar";
import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import { initLiquidChromeLockup } from "./lockup";
import { useTerminalLines } from "./useTerminalLines";

function scrollToMainContent() {
  const el = document.getElementById("main-content");
  if (!el) return;
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const { terminalLines, typingLine } = useTerminalLines();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const displayCanvas = displayCanvasRef.current;
    if (!wrapper || !displayCanvas) return;
    return initLiquidChromeLockup(wrapper, displayCanvas);
  }, []);

  return (
    <main className={styles.home}>
      <div className={styles.heroArea}>
        <div className={styles.terminalBackdrop} aria-hidden>
          {terminalLines.map((line, idx) => (
            <p key={`${line}-${idx}`} className={styles.terminalLine}>
              {line}
            </p>
          ))}
          <p className={styles.terminalLine}>
            {typingLine}
            <span className={styles.cursor}>_</span>
          </p>
        </div>
        <div ref={wrapperRef} className={styles.chromeWrap} aria-label="STW Sac Tech Week">
          <canvas ref={displayCanvasRef} className={styles.chromeCanvas} />
        </div>
        <button
          type="button"
          className={styles.scrollHint}
          onClick={scrollToMainContent}
          aria-label="Scroll to site content below"
        >
          <span className={styles.scrollHintLabel}>Scroll</span>
          <span className={styles.scrollHintChevron} aria-hidden>
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <path
                d="M1 1.5L10 9.5L19 1.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
      <div id="main-content">
        <NavBar />
        <EditorialSection />
      </div>
    </main>
  );
}
