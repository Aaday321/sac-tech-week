import Link from "next/link";
import { ThemeToggle } from "../components/theme-toggle";
import { RegistrationForm } from "../components/registration-form";
import styles from "./sponsors.module.css";

export default function SponsorsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <Link href="/" className={styles.backLink}>
          ← Home
        </Link>
        <ThemeToggle />
      </header>

      <main className={styles.main}>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <h1 className={styles.heroHeading}>
            Shape Sacramento&rsquo;s Innovation Economy.
          </h1>
          <hr className={styles.heroDivider} />
        </section>

        {/* ── Value Prop ── */}
        <section>
          <h2 className={styles.sectionHeading}>Why Sponsors Win</h2>
          <div className={styles.sectionBody}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
              inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur, adipisci velit.
            </p>
          </div>
        </section>

        {/* ── Partnership Tiers ── */}
        <section>
          <h2 className={styles.sectionHeading}>Partnership Tiers</h2>
          <div className={styles.tiersGrid}>
            <div className={styles.tierCard}>
              <span className={`${styles.tierBadge} ${styles["tierBadge--tower"]}`}>
                $50k+
              </span>
              <h3 className={styles.tierName}>Tower Bridge Partner</h3>
              <ul className={styles.tierList}>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore.
                </li>
                <li>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip commodo.
                </li>
                <li>
                  Duis aute irure dolor in reprehenderit in voluptate velit
                  esse cillum dolore eu fugiat nulla.
                </li>
                <li>
                  Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit.
                </li>
              </ul>
            </div>

            <div className={styles.tierCard}>
              <span className={`${styles.tierBadge} ${styles["tierBadge--capitol"]}`}>
                $25k
              </span>
              <h3 className={styles.tierName}>Capitol Corridor Partner</h3>
              <ul className={styles.tierList}>
                <li>
                  Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium.
                </li>
                <li>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit, sed quia.
                </li>
                <li>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                  amet, consectetur adipisci velit.
                </li>
                <li>
                  Quis autem vel eum iure reprehenderit qui in ea voluptate
                  velit esse quam nihil molestiae.
                </li>
              </ul>
            </div>

            <div className={styles.tierCard}>
              <span className={`${styles.tierBadge} ${styles["tierBadge--city"]}`}>
                $10k
              </span>
              <h3 className={styles.tierName}>City of Trees Partner</h3>
              <ul className={styles.tierList}>
                <li>
                  At vero eos et accusamus et iusto odio dignissimos ducimus
                  qui blanditiis praesentium voluptatum.
                </li>
                <li>
                  Nam libero tempore, cum soluta nobis est eligendi optio
                  cumque nihil impedit quo minus.
                </li>
                <li>
                  Temporibus autem quibusdam et aut officiis debitis rerum
                  necessitatibus saepe eveniet ut et.
                </li>
                <li>
                  Itaque earum rerum hic tenetur a sapiente delectus, ut aut
                  reiciendis voluptatibus maiores.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── CTA / Form ── */}
        <section className={styles.ctaSection}>
          <h2 className={styles.sectionHeading}>Become a Partner</h2>
          <p className={styles.ctaLead}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Fill out the form below and our
            partnerships team will be in touch within two business days.
          </p>
          <div className={styles.formCard}>
            <p className={styles.ctaHeading}>Partnership Inquiry</p>
            <RegistrationForm formType="sponsor" />
          </div>
        </section>
      </main>
    </div>
  );
}
