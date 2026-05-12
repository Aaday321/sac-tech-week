import Link from "next/link";
import styles from "./editorial-section.module.css";

const FOOTER_SOCIAL = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M12 2.04C6.5 2.04 2 6.54 2 12.06c0 4.98 3.66 9.11 8.44 9.94v-7.05H7.9v-2.91h2.54V9.43c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.25 0-1.64.78-1.64 1.57v1.88h2.79l-.45 2.91h-2.34v7.05c4.78-.83 8.44-4.96 8.44-9.94 0-5.52-4.5-10.02-10-10.02z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07 0-1.13.92-2.06 2.06-2.06 1.14 0 2.06.93 2.06 2.06 0 1.14-.92 2.07-2.06 2.07zM7.12 20.45H3.56V9h3.56v11.45z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: "M23.5 6.2a3.02 3.02 0 0 0-2.12-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.2 36.5 36.5 0 0 0 0 12a36.5 36.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.1c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.1 36.5 36.5 0 0 0 .5-5.8 36.5 36.5 0 0 0-.5-5.8zM9.75 15.57V8.43L16.02 12l-6.27 3.57z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
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
            Sacramento Tech Week is a decentralized tech conference, celebrating innovation within and beyond the
            capital region.
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
