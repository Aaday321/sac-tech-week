import Link from "next/link";
import styles from "./nav-bar.module.css";

const NAV_LINKS = [{ href: "/producers", label: "Producers" }] as const;

export function NavBar() {
  return (
    <header className={styles.bar}>
      <Link href="/" className={styles.logo}>
        STW 2026
      </Link>
      <nav className={styles.links} aria-label="Primary">
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
