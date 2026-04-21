"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Map, Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { ThemeToggle } from "../components/theme-toggle";
import styles from "./map.module.css";

const VENUES = [
  {
    id: "aggie-square",
    name: "Aggie Square",
    district: "East Sacramento",
    time: "09:00 – 18:00",
    description:
      "UC Davis innovation hub anchoring the east side corridor. Keynotes, research demos, and founder showcases.",
    capacity: "Cap. 1,200",
    status: "active" as const,
    coordinates: [-121.455, 38.5539] as [number, number],
    dot: { color: "default" as const },
    siteUrl: "#",
    schedule: [
      { time: "09:00", label: "Doors open · check-in" },
      { time: "10:00", label: "Opening keynote" },
      { time: "12:30", label: "Research demo block" },
      { time: "15:00", label: "Founder showcase" },
      { time: "17:30", label: "Networking close" },
    ],
  },
  {
    id: "urban-hive",
    name: "Urban Hive",
    district: "Midtown",
    time: "10:00 – 22:00",
    description:
      "Sacramento's original co-working commons. Workshops, networking sessions, and evening socials.",
    capacity: "Cap. 350",
    status: "active" as const,
    coordinates: [-121.482, 38.5735] as [number, number],
    dot: { color: "default" as const },
    siteUrl: "#",
    schedule: [
      { time: "10:00", label: "Workshop: AI product loops" },
      { time: "13:00", label: "Lunch networking" },
      { time: "15:30", label: "Workshop: Open-source ops" },
      { time: "19:00", label: "Evening social" },
    ],
  },
  {
    id: "mosac",
    name: "MOSAC",
    district: "Downtown",
    time: "11:00 – 20:00",
    description:
      "Museum of Science and Curiosity. Immersive tech installations and the AI & Society exhibit hall.",
    capacity: "Cap. 800",
    status: "scheduled" as const,
    coordinates: [-121.5035, 38.591] as [number, number],
    dot: { color: "yellow" as const },
    siteUrl: "#",
    schedule: [
      { time: "11:00", label: "Exhibit hall opens" },
      { time: "13:00", label: "AI & Society panel" },
      { time: "16:00", label: "Immersive demo hour" },
      { time: "19:00", label: "Closing reception" },
    ],
  },
  {
    id: "paragary",
    name: "Paragary's District",
    district: "R Street Corridor",
    time: "12:00 – 23:00",
    description:
      "Outdoor activation zone along R Street. Startup pitch stage, food trucks, and demo tents.",
    capacity: "Cap. 600",
    status: "confirmed" as const,
    coordinates: [-121.4855, 38.57] as [number, number],
    dot: { color: "blue" as const },
    siteUrl: "#",
    schedule: [
      { time: "12:00", label: "Food trucks open" },
      { time: "14:00", label: "Startup pitch block A" },
      { time: "17:00", label: "Demo tent showcase" },
      { time: "20:00", label: "Pitch finals + awards" },
    ],
  },
  {
    id: "convention-center",
    name: "Sacramento Convention Center",
    district: "Downtown",
    time: "08:00 – 21:00",
    description:
      "Main conference anchor. Plenaries, investor summit, and the flagship Tech Week expo floor.",
    capacity: "Cap. 5,000",
    status: "active" as const,
    coordinates: [-121.488, 38.5785] as [number, number],
    dot: { color: "default" as const },
    siteUrl: "#",
    schedule: [
      { time: "08:00", label: "Registration · badge pickup" },
      { time: "09:30", label: "Plenary: State of the Valley" },
      { time: "12:00", label: "Investor summit" },
      { time: "14:00", label: "Expo floor open" },
      { time: "18:30", label: "Official after-party" },
    ],
  },
] as const;

const STATUS_LABEL: Record<string, string> = {
  active: "Live",
  scheduled: "Scheduled",
  confirmed: "Confirmed",
};

const STATUS_CLASS: Record<string, string> = {
  active: styles["badge--active"],
  scheduled: styles["badge--scheduled"],
  confirmed: styles["badge--confirmed"],
};

const DOT_COLOR_CLASS: Record<string, string> = {
  default: "",
  yellow: styles["dot--yellow"],
  blue: styles["dot--blue"],
};

export default function MapPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSacramentoDay, setIsSacramentoDay] = useState(true);
  const [hoveredVenue, setHoveredVenue] = useState<string | null>(null);
  const [expandedVenue, setExpandedVenue] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const hour = parseInt(
      new Date().toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "numeric",
        hour12: false,
      }),
    );
    setIsSacramentoDay(hour >= 6 && hour < 19);
  }, []);

  const mapStyle = !mounted
    ? "mapbox://styles/mapbox/dark-v11"
    : theme === "light"
      ? "mapbox://styles/mapbox/light-v11"
      : theme === "dark"
        ? "mapbox://styles/mapbox/dark-v11"
        : isSacramentoDay
          ? "mapbox://styles/mapbox/light-v11"
          : "mapbox://styles/mapbox/dark-v11";

  function handleMarkerClick(
    e: React.MouseEvent,
    venueId: string,
  ) {
    e.stopPropagation();
    setExpandedVenue(venueId);
    document
      .getElementById(`venue-${venueId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <div
      className={`${styles.page} ${
        mounted && theme === "system" && isSacramentoDay
          ? styles.forceLightUI
          : ""
      }`}
    >
      {/* ── Top Bar ── */}
      <header className={styles.topBar}>
        <Link href="/" className={styles.backLink}>
          ← Home
        </Link>

        <div className={styles.topBarMeta}>
          <span className={styles.statusPill}>
            <span className={styles.statusDot} />
            Command Center
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* ── Split Body ── */}
      <div className={styles.split}>
        {/* ── Feed (Left) ── */}
        <aside className={styles.feed}>
          <div className={styles.feedInner}>
            <span className={styles.feedSubheading}>Sacramento · Tech Week</span>
            <h1 className={styles.feedHeading}>Activation Zones</h1>

            {VENUES.map((venue) => {
              const isExpanded = expandedVenue === venue.id;
              return (
                <article
                  key={venue.id}
                  id={`venue-${venue.id}`}
                  className={`${styles.venueCard} ${
                    venue.status === "active" || hoveredVenue === venue.id
                      ? styles["venueCard--active"]
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredVenue(venue.id)}
                  onMouseLeave={() => setHoveredVenue(null)}
                  onClick={() =>
                    setExpandedVenue(isExpanded ? null : venue.id)
                  }
                >
                  <div className={styles.venueCardHeader}>
                    <h2 className={styles.venueCardName}>{venue.name}</h2>
                    <span
                      className={`${styles.venueCardBadge} ${STATUS_CLASS[venue.status]}`}
                    >
                      {STATUS_LABEL[venue.status]}
                    </span>
                  </div>

                  <div className={styles.venueCardMeta}>
                    <span className={styles.venueCardDistrict}>{venue.district}</span>
                    <span className={styles.venueCardSep}>·</span>
                    <span className={styles.venueCardTime}>{venue.time}</span>
                  </div>

                  <p className={styles.venueCardDesc}>{venue.description}</p>

                  <div className={styles.venueCardFooter}>
                    <span className={styles.venueCardCapacity}>{venue.capacity}</span>
                    <span className={styles.venueCardArrow}>
                      {isExpanded ? "↑" : "→"}
                    </span>
                  </div>

                  {/* Accordion panel */}
                  <div
                    className={`${styles.venueCardExpanded} ${
                      isExpanded ? styles["venueCardExpanded--open"] : ""
                    }`}
                  >
                    <div className={styles.venueCardExpandedInner}>
                      <ul className={styles.scheduleList}>
                        {venue.schedule.map((item) => (
                          <li key={item.time} className={styles.scheduleItem}>
                            <span className={styles.scheduleTime}>{item.time}</span>
                            {item.label}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={venue.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.venueCardCta}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit Producer Site ↗
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </aside>

        {/* ── Map Pane (Right) ── */}
        <section className={styles.mapPane}>
          {/* Live Mapbox map */}
          <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={{
              longitude: -121.488,
              latitude: 38.575,
              zoom: 12.5,
            }}
            mapStyle={mapStyle}
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          >
            {VENUES.map((venue) => (
              <Marker
                key={venue.id}
                longitude={venue.coordinates[0]}
                latitude={venue.coordinates[1]}
                anchor="center"
                style={{
                  zIndex:
                    hoveredVenue === venue.id || expandedVenue === venue.id
                      ? 10
                      : 1,
                }}
              >
                <div
                  className={`${styles.dot} ${styles["dot--inMarker"]} ${DOT_COLOR_CLASS[venue.dot.color]}`}
                  style={{
                    transform:
                      hoveredVenue === venue.id || expandedVenue === venue.id
                        ? "scale(1.5)"
                        : "scale(1)",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={() => setHoveredVenue(venue.id)}
                  onMouseLeave={() => setHoveredVenue(null)}
                  onClick={(e) => handleMarkerClick(e, venue.id)}
                >
                  <div className={styles.dotCore} />
                  <div className={styles.dotRing} />
                  <div className={styles.dotRing} />
                  <div className={styles.dotRing} />
                  <span className={styles.dotLabel}>{venue.name}</span>
                </div>
              </Marker>
            ))}
          </Map>

          {/* Decorative corner brackets */}
          <div className={`${styles.mapCorner} ${styles["mapCorner--tl"]}`} />
          <div className={`${styles.mapCorner} ${styles["mapCorner--tr"]}`} />
          <div className={`${styles.mapCorner} ${styles["mapCorner--bl"]}`} />
          <div className={`${styles.mapCorner} ${styles["mapCorner--br"]}`} />

          {/* Status overlay */}
          <div className={styles.mapStatusBar}>
            <span className={styles.mapStatusLabel}>Sacramento Metro · Downtown Grid</span>
            <span className={styles.mapStatusCoords}>38.5816° N, 121.4944° W</span>
          </div>

          {/* Bottom legend */}
          <div className={styles.mapLegend}>
            <div className={styles.mapLegendItem}>
              <span
                className={styles.mapLegendDot}
                style={{ background: "#00e5c8", boxShadow: "0 0 4px #00e5c8" }}
              />
              Live
            </div>
            <div className={styles.mapLegendItem}>
              <span
                className={styles.mapLegendDot}
                style={{ background: "#f2c94c", boxShadow: "0 0 4px #f2c94c" }}
              />
              Scheduled
            </div>
            <div className={styles.mapLegendItem}>
              <span
                className={styles.mapLegendDot}
                style={{ background: "#5cb3e8", boxShadow: "0 0 4px #5cb3e8" }}
              />
              Confirmed
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
