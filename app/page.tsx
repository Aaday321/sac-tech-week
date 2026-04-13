import { ThemeToggle } from "./components/theme-toggle";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <ThemeToggle />
    </main>
  );
}
