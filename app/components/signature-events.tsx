import styles from "./signature-events.module.css";

const EVENTS: { index: string; title: string; subtitle?: string }[] = [
  { index: "01", title: "AI Film Lab" },
  { index: "02", title: "Start Up Market Place" },
  { index: "03", title: "B.Y.O.B", subtitle: "Bring your own Beamer" },
  { index: "04", title: "STW Kickoff Breakfast", subtitle: "Sacramento State of Innovation" },
];

export function SignatureEvents() {
  return (
    <section className={styles.wrap} aria-labelledby="signature-events-heading">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          <span className={styles.statusDot} aria-hidden />
          <span className={styles.eyebrowText}>[ PROGRAM / SIGNATURE EVENTS ]</span>
        </p>
        <h2 id="signature-events-heading" className={styles.title}>
          Signature events
        </h2>
        <ul className={styles.grid}>
          {EVENTS.map(({ index, title, subtitle }) => (
            <li key={index} className={styles.card}>
              <p className={styles.cardId}>[ {index} / STW ]</p>
              <h3 className={styles.cardTitle}>{title}</h3>
              {subtitle ? <p className={styles.cardSubtitle}>{subtitle}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
