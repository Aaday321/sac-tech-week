import Link from "next/link";
import styles from "./nav-bar.module.css";

export function NavBar() {
  return (
    <header className={styles.bar}>
      <Link href="/" className={styles.logo}>
        STW 2026
      </Link>
    </header>
  );
}
