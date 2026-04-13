"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./theme-toggle.module.css";

const OPTIONS = [
  { id: "light" as const, label: "Light" },
  { id: "dark" as const, label: "Dark" },
  { id: "system" as const, label: "Auto" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={styles.wrap} aria-hidden>
        <span className={styles.skeleton} />
      </div>
    );
  }

  const active = theme ?? "system";

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
            className={`${styles.btn} ${active === id ? styles.btnActive : ""}`}
            onClick={() => setTheme(id)}
            aria-pressed={active === id}
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
