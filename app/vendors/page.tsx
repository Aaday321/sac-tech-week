import Link from "next/link";
import styles from "./page.module.css";

const ROLE_LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const RESPONSIBILITIES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
] as const;

const PERKS = [
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
  "Qui officia deserunt mollit anim id est laborum sed ut perspiciatis.",
  "Omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
] as const;

const EXAMPLE_LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur. Curabitur blandit tempus porttitor.";

export default function VendorsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <h1 className={styles.heroTitle}>Vendor registration</h1>
          <hr className={styles.heroAccent} />
        </header>

        <section className={styles.section} aria-labelledby="vendor-role">
          <h2 id="vendor-role" className={styles.sectionHeading}>
            Role
          </h2>
          <p className={styles.body}>{ROLE_LOREM}</p>
        </section>

        <section className={styles.section} aria-labelledby="vendor-responsibilities">
          <h2 id="vendor-responsibilities" className={styles.sectionHeading}>
            Responsibilities
          </h2>
          <ul className={styles.list}>
            {RESPONSIBILITIES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="vendor-perks">
          <h2 id="vendor-perks" className={styles.sectionHeading}>
            Perks
          </h2>
          <ul className={styles.list}>
            {PERKS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="vendor-example">
          <h2 id="vendor-example" className={styles.sectionHeading}>
            Example
          </h2>
          <p className={styles.body}>{EXAMPLE_LOREM}</p>
        </section>

        <section className={styles.section} aria-label="Vendor inquiry">
          <div className={styles.ctaWrap}>
            <Link className={styles.ctaButton} href="#">
              VENDOR INQUIRY FORM
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
