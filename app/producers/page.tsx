import Link from "next/link";
import styles from "./page.module.css";

const GENERAL_INFORMATION = [
  "The 2026 edition of Sac Tech Week will take place Sunday, October 18 – Saturday, October 24, 2026.",
  "This application is for technology companies, research labs, civic organizations, and creative collectives specializing in AI, automation, Civic Innovation, GovTech, MedTech, HealthTech, and Robotics to be included in the SacTech Week program and guide.",
  "To be included in the Sac Tech Week program, events, pitch competitions, and lectures must take place Sunday, October 18 – Saturday, October 24, 2026.",
  "All Sac Tech Week events must be accessible to the general public. Events may be free of charge, or accessible through reservations or tickets. Sac Tech Week does not facilitate individual event registration.",
  "Sac Tech Week participants execute their own exhibition / project / events.",
  "All images submitted may be used for promotional purposes.",
] as const;

const PARTICIPANTS_RECEIVE = [
  "Listing and page on sactechweek.com linking to participant's website",
  "Listing in the official STW '26 Guide",
  "Inclusion in social media posts",
  "Inclusion in Official STW press releases and potential press articles in local press and beyond",
  "Listing in STW e-newsletters to targeted technology and innovation audience",
  "Engagement with an expanded audience actively discovering and scaling technology in the Greater Sacramento region.",
] as const;

const FEES = [
  "Participant Fees are $350 Participation.",
  "The Non-Profit Rate for 501(c)3 organizations is $175 Participation.",
  "Fees support the administration and marketing of SacTech Week.",
  "If you need financial assistance to apply, please email hello@sactechweek.org",
] as const;

export default function ProducersPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <h1 className={styles.heroTitle}>Apply to Sac Tech Week 2026</h1>
          <hr className={styles.heroAccent} />
        </header>

        <section className={styles.section} aria-labelledby="general-information">
          <h2 id="general-information" className={styles.sectionHeading}>
            General Information
          </h2>
          <ul className={styles.list}>
            {GENERAL_INFORMATION.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="participants-receive">
          <h2 id="participants-receive" className={styles.sectionHeading}>
            SacTech Week Participants Receive:
          </h2>
          <ul className={styles.list}>
            {PARTICIPANTS_RECEIVE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="fees">
          <h2 id="fees" className={styles.sectionHeading}>
            Fees
          </h2>
          <ul className={styles.list}>
            {FEES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-label="Producer inquiry">
          <div className={styles.ctaWrap}>
            <Link
              className={styles.ctaButton}
              href="https://forms.gle/1ZNzWC138Qcjy7hQ7"
              target="_blank"
              rel="noopener noreferrer"
            >
              PRODUCER INQUIRY FORM
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
