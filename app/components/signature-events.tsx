import styles from "./signature-events.module.css";

const EVENTS: { index: string; title: string; description: string }[] = [
  {
    index: "01",
    title: "AI Film Lab",
    description:
      "AI Film Festival is a curated short film showcase featuring 12 AI filmmakers and 12 youth creators from the AI Film Lab Summer Program, exploring storytelling at the intersection of creativity and artificial intelligence. Films premiere at the Capitol Region Innovation Summit.",
  },
  {
    index: "02",
    title: "Start Up Market Place",
    description:
      "Startup Marketplace is the central showcase of the Capitol Region Innovation Summit, featuring product-ready startups from across the ecosystem. Hosted at Urban Hive, this 12,000 sq ft booth-style experience highlights the builders, tools, and ideas shaping the region's future.",
  },
  {
    index: "03",
    title: "B.Y.O.B",
    description:
      "B.Y.O.B. (Bring Your Own Beamer) is a projection mapping showcase featuring works from multiple artists, transforming space into a living canvas of light and motion. Free and open to the public, the experience runs twice daily over three days with live music, drawing up to 200 guests per showing.",
  },
  {
    index: "04",
    title: "STW Kickoff Breakfast",
    description:
      "STW Kickoff Breakfast: Sacramento State of Innovation opens Sac Tech Week with a gathering of leaders across government, academia, and industry. Hosted at a local museum, the program features keynote insights on the state of innovation in the region, anchored in a triple helix perspective.",
  },
  {
    index: "05",
    title: "Capitol Region Innovation Summit",
    description:
      "Capitol Region Innovation Summit serves as the grand finale of Sac Tech Week, convening innovators from across industries for a full-day exploration of what's next. Featuring workshops, panels, and live demonstrations, the 30,000+ sq ft experience includes 15+ activations, 20+ speakers, and a marketplace of emerging ventures, welcoming over 500 attendees.",
  },
];

export function SignatureEvents() {
  return (
    <section className={styles.wrap} aria-labelledby="signature-events-heading">
      <div className={styles.inner}>
        <h2 id="signature-events-heading" className={styles.title}>
          Signature events
        </h2>
        <ul className={styles.stripList}>
          {EVENTS.map(({ index, title, description }) => (
            <li key={index} className={styles.strip}>
              <div className={styles.stripHeader}>
                <span className={styles.stripId}>[ {index} / STW ]</span>
                <h3 className={styles.stripTitle}>{title}</h3>
              </div>
              <div className={styles.stripDescription}>
                <p className={styles.stripDescriptionText}>{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
