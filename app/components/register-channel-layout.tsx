import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { RegistrationForm } from "./registration-form";
import styles from "../register-pages.module.css";

type RegisterChannelLayoutProps = {
  title: string;
  /** CSS color for the left-column accent bar */
  accent: string;
  children: ReactNode;
};

export function RegisterChannelLayout({
  title,
  accent,
  children,
}: RegisterChannelLayoutProps) {
  const copyStyle = {
    "--channel-accent": accent,
  } as CSSProperties;

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <Link href="/" className={styles.backLink}>
          ← Home
        </Link>
        <ThemeToggle />
      </header>
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <div className={styles.grid}>
          <section className={styles.copyColumn} style={copyStyle}>
            {children}
          </section>
          <aside className={styles.formColumn} aria-label="Registration form">
            <RegistrationForm />
          </aside>
        </div>
      </main>
    </div>
  );
}
