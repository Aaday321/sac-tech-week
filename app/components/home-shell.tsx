"use client";

import type { ReactNode } from "react";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IntroSplash } from "./intro-splash";
import styles from "./home-shell.module.css";

const HOLD_MS = 2600;
const EXIT_MS = 680;

/** Persists across client navigations so returning to `/` does not replay the intro. */
const INTRO_SEEN_KEY = "sac-tech-week-intro-seen";

function readIntroSeen(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return window.localStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function writeIntroSeen() {
  try {
    window.localStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    // Private mode or quota — intro may replay; acceptable.
  }
}

type HomeShellProps = {
  children: ReactNode;
};

export function HomeShell({ children }: HomeShellProps) {
  const [phase, setPhase] = useState<"intro" | "exit" | "done">("intro");
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (exitTimer.current) clearTimeout(exitTimer.current);
    if (doneTimer.current) clearTimeout(doneTimer.current);
    exitTimer.current = null;
    doneTimer.current = null;
  }, []);

  const finishIntro = useCallback(() => {
    clearTimers();
    setPhase("exit");
    doneTimer.current = setTimeout(() => {
      writeIntroSeen();
      setPhase("done");
    }, EXIT_MS);
  }, [clearTimers]);

  useLayoutEffect(() => {
    if (readIntroSeen()) {
      setPhase("done");
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      writeIntroSeen();
      setPhase("done");
      return;
    }

    exitTimer.current = setTimeout(() => {
      finishIntro();
    }, HOLD_MS);

    return () => clearTimers();
  }, [clearTimers, finishIntro]);

  const onSkip = useCallback(() => {
    if (phase !== "intro") return;
    finishIntro();
  }, [phase, finishIntro]);

  return (
    <>
      {(phase === "intro" || phase === "exit") && (
        <IntroSplash exiting={phase === "exit"} onSkip={onSkip} />
      )}
      <div
        className={`${styles.landingLayer} ${phase === "exit" || phase === "done" ? styles.visible : ""}`}
      >
        {children}
      </div>
    </>
  );
}
