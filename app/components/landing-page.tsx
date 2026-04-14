import type { CSSProperties } from "react";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { SacramentoSkyline } from "./sacramento-skyline";
import { SponsorRow } from "./sponsor-row";
import styles from "./landing-page.module.css";

function IconVendor() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 10v10h16V10M2 6h20v4H2V6z" strokeLinejoin="round" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function IconProducer() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M4 11h16" />
    </svg>
  );
}

function IconSponsor() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M12 21s-7-4.35-7-10a5 5 0 0 1 10 0c0 5.65-7 10-7 10z" />
      <circle cx="12" cy="11" r="1.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

const FOOTER_IMAGE =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80";

export function LandingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.siteHeader}>
          <div className={styles.heroComposite}>
            <div className={styles.headerBand}>
              <div className={styles.headerRow}>
                <div className={styles.brand}>
                  <h1 id="hero-heading" className={styles.srOnly}>
                    Sacramento Tech Week 2099
                  </h1>
                  <p className={styles.heroSac} aria-hidden>
                    Sacramento
                  </p>
                  <p className={styles.heroTech} aria-hidden>
                    Tech Week
                  </p>
                  <p className={styles.heroYear} aria-hidden>
                    2099<span className={styles.heroCursor}>_</span>
                  </p>
                </div>
                <div className={styles.headerNav}>
                  <ThemeToggle />
                  <nav className={styles.navLinks} aria-label="Primary">
                    <a href="#vendors">./vendors</a>
                    <a href="#producers">./producers</a>
                    <a href="#sponsors-involve">./sponsors</a>
                  </nav>
                </div>
              </div>
            </div>
            <div className={styles.heroArt} aria-hidden>
              <SacramentoSkyline className={styles.heroImg} />
            </div>
          </div>
          <div className={styles.heroRule} role="presentation" />
        </header>

        <section className={styles.module} aria-labelledby="get-involved-title">
          <p className={styles.moduleComment}>// module: outreach</p>
          <h2 id="get-involved-title" className={styles.moduleTitle}>
            ./get_involved
          </h2>
          <p className={styles.moduleLead}>
            Three ingress channels. One ops queue — we read every packet.
          </p>
          <div className={styles.cards}>
            <article id="vendors" className={styles.card}>
              <div className={styles.cardMain}>
                <span className={styles.cardIndex}>01</span>
                <div
                  className={styles.accent}
                  style={
                    { "--accent": "var(--landing-card-pink)" } as CSSProperties
                  }
                />
                <div className={styles.cardBody}>
                  <div className={styles.iconBox} aria-hidden>
                    <IconVendor />
                  </div>
                  <div className={styles.cardText}>
                    <h3 className={styles.cardTitle}>Vendors</h3>
                    <p className={styles.route}>route: /vendors</p>
                    <p className={styles.cardDesc}>
                      Booths, live demos, and hands-on product on the floor.
                    </p>
                  </div>
                </div>
              </div>
              <a className={styles.exec} href="#register-vendors">
                exec register
              </a>
            </article>

            <article id="producers" className={styles.card}>
              <div className={styles.cardMain}>
                <span className={styles.cardIndex}>02</span>
                <div
                  className={styles.accent}
                  style={
                    { "--accent": "var(--landing-card-mint)" } as CSSProperties
                  }
                />
                <div className={styles.cardBody}>
                  <div className={styles.iconBox} aria-hidden>
                    <IconProducer />
                  </div>
                  <div className={styles.cardText}>
                    <h3 className={styles.cardTitle}>Event producers</h3>
                    <p className={styles.route}>route: /event-producers</p>
                    <p className={styles.cardDesc}>
                      Satellite meetups, hack nights, and workshops on the
                      calendar.
                    </p>
                  </div>
                </div>
              </div>
              <a className={styles.exec} href="#register-producers">
                exec register
              </a>
            </article>

            <article id="sponsors-involve" className={styles.card}>
              <div className={styles.cardMain}>
                <span className={styles.cardIndex}>03</span>
                <div
                  className={styles.accent}
                  style={
                    { "--accent": "var(--landing-card-gold)" } as CSSProperties
                  }
                />
                <div className={styles.cardBody}>
                  <div className={styles.iconBox} aria-hidden>
                    <IconSponsor />
                  </div>
                  <div className={styles.cardText}>
                    <h3 className={styles.cardTitle}>Sponsors</h3>
                    <p className={styles.route}>route: /sponsors</p>
                    <p className={styles.cardDesc}>
                      Fuel the week — visibility that actually reaches builders.
                    </p>
                  </div>
                </div>
              </div>
              <a className={styles.exec} href="#register-sponsors">
                exec register
              </a>
            </article>
          </div>
        </section>

        <section className={styles.sponsors} aria-labelledby="sponsors-heading">
          <h2 id="sponsors-heading" className={styles.sponsorsTitle}>
            Our Sponsors
          </h2>
          <p className={styles.sponsorsCopy}>
            We are thankful to each and every company that sponsored our plugin,
            which helped us to continue working on it.
          </p>
          <SponsorRow />
        </section>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerImg}>
          <Image
            src={FOOTER_IMAGE}
            alt=""
            fill
            sizes="100vw"
            className={styles.footerPhoto}
            priority={false}
          />
        </div>
      </footer>
    </div>
  );
}
