import Link from "next/link";
import styles from "./editorial-section.module.css";

export function EditorialSection() {
  return (
    <section className={styles.section} aria-labelledby="experience-heading">
      <div className={styles.experienceLayout}>
        <div className={styles.experienceCopy}>
          <p className={styles.systemMetaRow}>
            <span className={styles.systemStatusDot} aria-hidden />
            <span className={styles.systemMetaText}>[ SYSTEM 01 / TECH WEEK INTERFACE ]</span>
          </p>

          <h1 id="experience-heading" className={styles.experienceTitle}>
            <span className={`${styles.experienceTitleLine} ${styles.experienceTitleLineMobile}`}>
              Experience Sacramento
            </span>
            <span className={`${styles.experienceTitleLine} ${styles.experienceTitleLineMobile}`}>
              Tech Week
            </span>
            <span className={`${styles.experienceTitleLine} ${styles.experienceTitleLineDesktop}`}>
              Experience
            </span>
            <span className={`${styles.experienceTitleLine} ${styles.experienceTitleLineDesktop}`}>
              Sacramento Tech
            </span>
            <span className={`${styles.experienceTitleLine} ${styles.experienceTitleLineDesktop}`}>
              Week
            </span>
          </h1>

          <p className={styles.experienceLede}>
            Sacramento Tech Week provides a central platform for the week&rsquo;s diverse events, exhibitions, and
            technical happenings across different organizations, establishing this as the premier window for
            innovation in the city.
          </p>

          <div className={styles.ctaRow}>
            <Link href="/events" className={styles.primaryBtn}>
              <span>Primary button</span>
              <span className={styles.primaryBtnArrow} aria-hidden>
                →
              </span>
            </Link>
            <Link href="/map" className={styles.secondaryBtn}>
              Secondary button
            </Link>
          </div>
        </div>

        <div className={styles.experienceArtifact} aria-label="Artifact view">
          <p className={styles.artifactFrameLabelTL}>[ ARTIFACT VIEW / 01 ]</p>
          <p className={styles.artifactFrameLabelBR}>[ STATE: STATIC ]</p>
          <div className={styles.artifactFrameInner}>
            <img alt="" className={styles.artifactHeroImg} decoding="async" />
          </div>
        </div>
      </div>

      <h2 className={styles.coreSystemsMobileTitle}>Core systems</h2>

      <div className={styles.coreSystems}>
        <span className={styles.objTag} aria-hidden>
          OBJ_001
        </span>
        <span className={styles.coreLabel}>CORE SYSTEMS</span>
      </div>

      <div className={styles.pillarsFrame} role="region" aria-label="Core systems">
        <div className={styles.pillars}>
          <article className={styles.pillar}>
            <p className={styles.pillarId}>[ 01 / VENDORS ]</p>
            <h2 className={styles.pillarKicker}>Showcase your work</h2>
            <p className={styles.pillarBody}>
              Bring your product, service, food, retail concept, or local brand to the people shaping
              Sacramento&rsquo;s next chapter in tech.
            </p>
            <div className={styles.pillarSpacer} aria-hidden />
            <Link href="/vendors" className={styles.pillarBtn}>
              Vendor sign up
            </Link>
          </article>

          <article className={styles.pillar}>
            <p className={styles.pillarId}>[ 02 / PRODUCERS ]</p>
            <h2 className={styles.pillarKicker}>Help build tech week</h2>
            <p className={styles.pillarBody}>
              Join the team creating the events, experiences, panels, workshops, and community moments that bring
              Sacramento Tech Week to life.
            </p>
            <div className={styles.pillarSpacer} aria-hidden />
            <Link href="/producers" className={styles.pillarBtn}>
              Producer sign up
            </Link>
          </article>

          <article className={styles.pillar}>
            <p className={styles.pillarId}>[ 03 / SPONSORS ]</p>
            <h2 className={styles.pillarKicker}>Back Sacramento&rsquo;s future</h2>
            <p className={styles.pillarBody}>
              Support a citywide platform for founders, builders, creatives, and communities moving Sacramento&rsquo;s
              innovation economy forward.
            </p>
            <div className={styles.pillarSpacer} aria-hidden />
            <Link href="/sponsors" className={styles.pillarBtn}>
              Sponsor sign up
            </Link>
          </article>
        </div>
      </div>

      <div className={styles.artifactFooter}>
        <p className={styles.artifactMeta}>[ ARTIFACT VIEW / 02 ]</p>
        <p className={styles.stateTag}>[ STATE: STATIC ]</p>
      </div>

      <footer className={styles.siteFooter}>
        <div className={styles.siteFooterBand}>
          <p className={styles.footerStatus}>
            ©2026 SAC_TECH_WEEK — SYSTEM READY / SIGNAL{" "}
            <br className={styles.footerStatusBreak} />
            STABLE
          </p>
        </div>
        <div className={styles.siteFooterBlackBar} aria-hidden />
      </footer>
    </section>
  );
}
