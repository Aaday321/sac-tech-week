import Link from "next/link";
import styles from "./page.module.css";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

const LOREM_SHORT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const BULLETS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
] as const;

export default function SponsorsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <h1 className={styles.heroTitle}>Shape Sacramento&apos;s Innovation Economy.</h1>
          <hr className={styles.heroAccent} />
        </header>

        <section className={styles.section} aria-labelledby="why-sponsors">
          <h2 id="why-sponsors" className={styles.sectionHeading}>
            Why Sponsors Win
          </h2>
          <p className={styles.body}>{LOREM}</p>
          <p className={styles.body}>{LOREM}</p>
          <p className={styles.body}>{LOREM}</p>
        </section>

        <section className={styles.section} aria-labelledby="partnership-tiers">
          <h2 id="partnership-tiers" className={styles.sectionHeading}>
            Partnership Tiers
          </h2>
          <div className={styles.tiersGrid}>
            <article className={styles.tierCard}>
              <span className={styles.tierTag}>$50K+</span>
              <h3 className={styles.cardTitle}>Tower Bridge Partner</h3>
              <ul className={styles.tierList}>
                {BULLETS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className={styles.tierCard}>
              <span className={styles.tierTag}>$25K</span>
              <h3 className={styles.cardTitle}>Capitol Corridor Partner</h3>
              <ul className={styles.tierList}>
                {BULLETS.map((item) => (
                  <li key={`capitol-${item}`}>{item}</li>
                ))}
              </ul>
            </article>
            <article className={styles.tierCard}>
              <span className={styles.tierTag}>$10K</span>
              <h3 className={styles.cardTitle}>City of Trees Partner</h3>
              <ul className={styles.tierList}>
                {BULLETS.map((item) => (
                  <li key={`trees-${item}`}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="become-partner">
          <h2 id="become-partner" className={styles.sectionHeading}>
            Become a Partner
          </h2>
          <p className={styles.body}>{LOREM_SHORT}</p>
          <div className={styles.ctaWrap}>
            <Link className={styles.ctaButton} href="#">
              SPONSOR INQUIRY FORM
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
