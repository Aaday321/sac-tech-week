import Link from "next/link";
import styles from "./editorial-section.module.css";

const FOOTER_SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sac_tech_week/",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.64-.07 4.85-.07zm0-2.16c-3.26 0-3.67.01-4.95.07-4.36.2-6.78 2.62-6.98 6.98-.06 1.28-.07 1.69-.07 4.95 0 3.26.01 3.67.07 4.95.2 4.35 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07 3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.63-6.78-6.98-6.98-1.28-.06-1.69-.07-4.95-.07zm0 5.84a6.16 6.16 0 1 0 0 12.33 6.16 6.16 0 0 0 0-12.33zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
  },
] as const;

export function EditorialIntro() {
  return (
    <section className={styles.section} aria-labelledby="experience-heading">
      <div className={styles.experienceLayout}>
        <h2 id="experience-heading" className={styles.editorialIntroHeading}>
          EXPERIENCE SACRAMENTO TECH WEEK!
        </h2>

        <div className={styles.textGrid}>
          <p className={styles.experienceLede}>
            Sac Tech Week is a decentralized, citywide celebration of innovation that brings together founders,
            startups, technologists, creatives, investors, students, and community leaders across the capital region. STW
            activates Sacramento through workshops, panels, networking events, demos, art experiences, startup showcases,
            and community gatherings hosted throughout the city.
          </p>
        </div>

        <div className={styles.experienceCtaWrap}>
          <Link href="/producers" className={styles.applyParticipateBtn}>
            Apply to participate
          </Link>
        </div>
      </div>
    </section>
  );
}

export function EditorialFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.siteFooterBleed} aria-hidden />
      <div className={styles.siteFooterInner}>
        <a href="#" className={styles.footerStatusLink}>
          ©2026 SAC TECH WEEK — SYSTEM READY / SIGNAL STABLE
        </a>
        <nav className={styles.footerSocial} aria-label="Social">
          <ul className={styles.footerSocialList}>
            {FOOTER_SOCIAL.map(({ label, href, path }) => (
              <li key={label}>
                <a
                  href={href}
                  className={styles.footerSocialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <svg className={styles.footerSocialIcon} width={20} height={20} viewBox="0 0 24 24" aria-hidden>
                    <path fill="currentColor" d={path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
