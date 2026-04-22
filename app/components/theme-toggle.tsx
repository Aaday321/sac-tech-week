"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { INTENT_KEY, getSacramentoResolvedTheme } from "../theme-provider";
import styles from "./theme-toggle.module.css";

type Intent = "light" | "dark" | "auto";

const OPTIONS: { id: Intent; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "auto", label: "Auto" },
];

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [intent, setIntent] = useState<Intent>("auto");

  useEffect(() => {
    const stored = localStorage.getItem(INTENT_KEY) as Intent | null;
    setIntent(stored === "light" || stored === "dark" ? stored : "auto");
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={styles.wrap} aria-hidden>
        <span className={styles.skeleton} />
      </div>
    );
  }

  function handleClick(id: Intent) {
    setIntent(id);
    localStorage.setItem(INTENT_KEY, id);
    if (id === "auto") {
      setTheme(getSacramentoResolvedTheme());
    } else {
      setTheme(id);
    }
  }

  return (
    <div className={styles.wrap}>
      <span className={styles.label} id="theme-toggle-label">
        Color theme
      </span>
      <div
        className={styles.group}
        role="group"
        aria-labelledby="theme-toggle-label"
      >
        {OPTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`${styles.btn} ${intent === id ? styles.btnActive : ""}`}
            onClick={() => handleClick(id)}
            aria-pressed={intent === id}
            aria-label={`${label} theme`}
            title={`${label} theme`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
