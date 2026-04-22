"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "../components/theme-toggle";
import styles from "./events.module.css";

type Track = "AgTech" | "GovTech" | "HealthTech" | "Manufacturing" | "AI";
type Audience = "Builder" | "Industry" | "Government";

interface Event {
  id: string;
  title: string;
  time: string;
  location: string;
  track: Track;
  audience: Audience;
  description: string;
}

const EVENTS: Event[] = [
  {
    id: "agtech-field-demo",
    title: "Precision Agriculture: From Sensor to Shelf",
    time: "09:30 – 11:00",
    location: "Aggie Square",
    track: "AgTech",
    audience: "Builder",
    description:
      "Live field-sensor demos, computer-vision crop monitoring, and a founder panel on closing the loop between farm data and retail forecasting. Bring your laptop — there's a hands-on API sprint at the end.",
  },
  {
    id: "govtech-open-data",
    title: "Open Data Infrastructure: Building for Civic Scale",
    time: "10:00 – 11:30",
    location: "Sacramento Convention Center",
    track: "GovTech",
    audience: "Government",
    description:
      "State CTO office leads a working session on open-data pipelines, interoperability mandates, and the procurement reforms coming in 2026. Includes a live Q&A with CalOES and the Controller's Office.",
  },
  {
    id: "healthtech-ai-diagnostics",
    title: "AI in the Clinic: Regulatory Reality vs. Hype",
    time: "13:00 – 14:30",
    location: "MOSAC",
    track: "HealthTech",
    audience: "Industry",
    description:
      "FDA cleared vs. 510(k) exempt — where does your product actually land? Three health-tech founders and an FDA regulatory counsel walk through real approval timelines, failure modes, and what post-market surveillance actually looks like.",
  },
  {
    id: "manufacturing-robotics",
    title: "Lights-Out Facilities: Robotics & the Valley Workforce",
    time: "14:00 – 15:30",
    location: "Urban Hive",
    track: "Manufacturing",
    audience: "Industry",
    description:
      "Central Valley manufacturers share floor-level data on cobots, predictive maintenance ROI, and the retraining programs keeping skilled workers employed as automation scales. Case studies from three facilities inside 60 miles of Sacramento.",
  },
  {
    id: "ai-alignment-sprint",
    title: "Red-Team Sprint: Alignment Failures in Production",
    time: "16:00 – 18:00",
    location: "Paragary's District",
    track: "AI",
    audience: "Builder",
    description:
      "Two-hour adversarial sprint where teams probe live LLM deployments for real-world alignment failures. Structured debrief with safety researchers. Results feed directly into a public disclosure repo — ship something that matters.",
  },
  {
    id: "govtech-procurement",
    title: "Vendor Day: Selling to State & Local Government",
    time: "11:00 – 12:30",
    location: "Sacramento Convention Center",
    track: "GovTech",
    audience: "Builder",
    description:
      "A step-by-step session on navigating CALPIA certifications, GSA schedules, and the new simplified acquisition pathways for sub-$250k contracts. Procurement officers from three agencies will be in the room.",
  },
];

const TRACKS: Track[] = ["AgTech", "GovTech", "HealthTech", "Manufacturing", "AI"];
const AUDIENCES: Audience[] = ["Builder", "Industry", "Government"];

const TRACK_COLORS: Record<Track, string> = {
  AgTech: styles["track--agtech"],
  GovTech: styles["track--govtech"],
  HealthTech: styles["track--healthtech"],
  Manufacturing: styles["track--manufacturing"],
  AI: styles["track--ai"],
};

const AUDIENCE_COLORS: Record<Audience, string> = {
  Builder: styles["audience--builder"],
  Industry: styles["audience--industry"],
  Government: styles["audience--government"],
};

export default function EventsPage() {
  const [activeTrack, setActiveTrack] = useState<Track | "All">("All");
  const [activeAudience, setActiveAudience] = useState<Audience | "All">("All");

  const filtered = EVENTS.filter(
    (e) =>
      (activeTrack === "All" || e.track === activeTrack) &&
      (activeAudience === "All" || e.audience === activeAudience),
  );

  return (
    <div className={styles.page}>
      {/* ── Top Bar ── */}
      <header className={styles.topBar}>
        <Link href="/" className={styles.backLink}>
          ← Home
        </Link>
        <div className={styles.topBarMeta}>
          <span className={styles.statusPill}>
            <span className={styles.statusDot} />
            Master Schedule
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* ── Main Feed ── */}
      <main className={styles.main}>
        <div className={styles.container}>
          {/* ── Hero Header ── */}
          <div className={styles.heroSection}>
            <span className={styles.eyebrow}>Sacramento · Tech Week 2026</span>
            <h1 className={styles.pageHeading}>Master Schedule</h1>
            <p className={styles.pageSubheading}>
              {EVENTS.length} events across 5 tracks · Filter by sector or audience
            </p>
          </div>

          {/* ── Filter Bar ── */}
          <div className={styles.filterBar}>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Track</span>
              <div className={styles.filterPills}>
                <button
                  className={`${styles.pill} ${activeTrack === "All" ? styles["pill--active"] : ""}`}
                  onClick={() => setActiveTrack("All")}
                >
                  All
                </button>
                {TRACKS.map((track) => (
                  <button
                    key={track}
                    className={`${styles.pill} ${
                      activeTrack === track
                        ? `${styles["pill--active"]} ${TRACK_COLORS[track]}`
                        : ""
                    }`}
                    onClick={() =>
                      setActiveTrack(activeTrack === track ? "All" : track)
                    }
                  >
                    {track}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Audience</span>
              <div className={styles.filterPills}>
                <button
                  className={`${styles.pill} ${activeAudience === "All" ? styles["pill--active"] : ""}`}
                  onClick={() => setActiveAudience("All")}
                >
                  All
                </button>
                {AUDIENCES.map((aud) => (
                  <button
                    key={aud}
                    className={`${styles.pill} ${
                      activeAudience === aud
                        ? `${styles["pill--active"]} ${AUDIENCE_COLORS[aud]}`
                        : ""
                    }`}
                    onClick={() =>
                      setActiveAudience(activeAudience === aud ? "All" : aud)
                    }
                  >
                    {aud}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Results Count ── */}
          <div className={styles.resultsRow}>
            <span className={styles.resultsCount}>
              {filtered.length === 0
                ? "No events match"
                : `${filtered.length} event${filtered.length !== 1 ? "s" : ""}`}
            </span>
            {(activeTrack !== "All" || activeAudience !== "All") && (
              <button
                className={styles.clearBtn}
                onClick={() => {
                  setActiveTrack("All");
                  setActiveAudience("All");
                }}
              >
                Clear filters
              </button>
            )}
          </div>

          {/* ── Event Feed ── */}
          <div className={styles.eventFeed}>
            {filtered.length === 0 ? (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>⌀</span>
                <p>No events match the current filters.</p>
              </div>
            ) : (
              filtered.map((event) => (
                <article key={event.id} className={styles.eventCard}>
                  {/* Card Header */}
                  <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>{event.title}</h2>
                    <span
                      className={`${styles.trackBadge} ${TRACK_COLORS[event.track]}`}
                    >
                      {event.track}
                    </span>
                  </div>

                  {/* Card Meta */}
                  <div className={styles.cardMeta}>
                    <span className={styles.metaTime}>{event.time}</span>
                    <span className={styles.metaSep}>·</span>
                    <span className={styles.metaLocation}>{event.location}</span>
                    <span className={styles.metaSep}>·</span>
                    <span className={`${styles.audiencePill} ${AUDIENCE_COLORS[event.audience]}`}>
                      {event.audience}
                    </span>
                  </div>

                  {/* Description */}
                  <p className={styles.cardDesc}>{event.description}</p>

                  {/* CTA */}
                  <div className={styles.cardFooter}>
                    <button className={styles.rsvpBtn}>
                      RSVP / Secure Spot →
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
