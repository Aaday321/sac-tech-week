import Image from "next/image";
import styles from "./editorial-section.module.css";

export function EditorialSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Experience Sacramento Tech Week!</h2>
      <div className={styles.textGrid}>
        <div>
          <p>
            <strong>Announcing 2026 Participants!</strong>
          </p>
          <p>The Sacramento Tech Week 2026 Program, Map, and Regional Guide are now live!</p>
          <p>The 2026 edition of Sacramento Tech Week will take place October 18–24, 2026.</p>
          <p>
            Sacramento Tech Week celebrates the evolving intersection of technology, design, and culture within
            the Greater Sacramento region. Technology companies, research labs, civic organizations, and creative
            collectives host events during Sacramento Tech Week—ranging from pitch competitions to robotics
            demonstrations—that invite attendees to connect in new and meaningful ways.
          </p>
        </div>
        <div>
          <p>
            Sacramento Tech Week provides a central platform for the week&rsquo;s diverse events, exhibitions, and
            technical happenings across different organizations, establishing this as the premier window for
            innovation in the city.
          </p>
          <p>
            We provide a comprehensive participant list, map, program, and neighborhood guide with insider tips on
            where to eat, drink, and shop while discovering the future of the creative economy.
          </p>
          <p>
            Sacramento Tech Week seeks to foster new, and strengthen existing connections between founders,
            investors, engineers, and the community through curating an inclusive and strategic guide for the week.
          </p>
        </div>
      </div>
      <Image
        src="/sacramento-tech.webp"
        alt="Sacramento Tech"
        width={1600}
        height={900}
        className={styles.image}
      />
    </section>
  );
}
