import Image from "next/image";
import Link from "next/link";

import HomeSectionHeadingIcon from "@/components/home/HomeSectionHeadingIcon";
import styles from "@/components/home/home-nationwide-coverage.module.css";

const coverageHighlights = [
  { title: "64 Districts", detail: "Nationwide planning", icon: "map" },
  { title: "8 Divisions", detail: "Countrywide coverage", icon: "survey" },
  { title: "Room Survey", detail: "Requirements & BOQ", icon: "tools" },
  { title: "Install & Support", detail: "Commissioning & service", icon: "support" },
] as const;

const coverageRegions = [
  { name: "Northern Bangladesh", detail: "Rangpur · Rajshahi", position: "northWest" },
  { name: "Eastern Bangladesh", detail: "Sylhet · Chattogram", position: "northEast" },
  { name: "Central Bangladesh", detail: "Dhaka · Mymensingh", position: "centralEast" },
  { name: "Southern Bangladesh", detail: "Khulna · Barishal", position: "southWest" },
] as const;

type HighlightIcon = (typeof coverageHighlights)[number]["icon"];

function CoverageIcon({ icon }: { icon: HighlightIcon }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
      {icon === "map" ? (
        <>
          <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" />
          <path d="M9 3v15M15 6v15" />
        </>
      ) : icon === "survey" ? (
        <>
          <path d="M12 21s6-4.8 6-10a6 6 0 1 0-12 0c0 5.2 6 10 6 10Z" />
          <circle cx="12" cy="11" r="2" />
        </>
      ) : icon === "tools" ? (
        <>
          <path d="m14.7 6.3 3-3a4 4 0 0 1-5 5l-7.2 7.2a2.1 2.1 0 1 1-3-3l7.2-7.2a4 4 0 0 1 5-5l-3 3 3 3Z" />
          <path d="m14 14 7 7" />
        </>
      ) : (
        <>
          <path d="M4 13v-2a8 8 0 1 1 16 0v2" />
          <path d="M4 12H2.8A1.8 1.8 0 0 0 1 13.8v3.4A1.8 1.8 0 0 0 2.8 19H6v-7H4ZM20 12h1.2a1.8 1.8 0 0 1 1.8 1.8v3.4a1.8 1.8 0 0 1-1.8 1.8H18v-7h2Z" />
          <path d="M18 19c-.8 1.3-2.2 2-4.2 2H12" />
        </>
      )}
    </svg>
  );
}

export default function ConferenceNationwideCoverageSection() {
  return (
    <section
      id="conference-system-nationwide-coverage"
      className={styles.section + " mt-4"}
      aria-labelledby="conference-system-nationwide-coverage-title"
    >
      <div className={styles.copy}>
        <p className={styles.eyebrow + " home-section-badge"}>
          <HomeSectionHeadingIcon kind="location" size="badge" />
          <span>Nationwide Conference System Support</span>
        </p>

        <h2 id="conference-system-nationwide-coverage-title" className={styles.title}>
          Conference System Installation
          <span> Across Bangladesh</span>
        </h2>

        <p className={styles.intro + " home-section-subtitle"}>
          Sasha Corporation coordinates conference system consultation, room surveys, BOQ planning,
          supply, installation, commissioning and after-sales support across Bangladesh. Organizations
          can plan{" "}
          <Link href="/conference-system/wired-conference-system/" className="font-bold text-[#1458e5] underline decoration-[#1458e5]/30 underline-offset-4 hover:decoration-[#1458e5]">
            wired conference systems
          </Link>
          ,{" "}
          <Link href="/conference-system/wireless-conference-system/" className="font-bold text-[#1458e5] underline decoration-[#1458e5]/30 underline-offset-4 hover:decoration-[#1458e5]">
            wireless conference systems
          </Link>{" "}
          or{" "}
          <Link href="/conference-system/video-conference-system/" className="font-bold text-[#1458e5] underline decoration-[#1458e5]/30 underline-offset-4 hover:decoration-[#1458e5]">
            hybrid video conference solutions
          </Link>{" "}
          for locations across the country&apos;s 64 districts and 8 divisions, subject to room
          requirements, site access and the agreed project scope.
        </p>

        <div className={styles.highlights}>
          {coverageHighlights.map((item) => (
            <article key={item.title} className={styles.highlightCard}>
              <span className={styles.highlightIcon}>
                <CoverageIcon icon={item.icon} />
              </span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.detail}</small>
              </span>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.visual}>
        <div className={styles.mapGlow} aria-hidden="true" />

        <figure className={styles.mapFigure}>
          <div className={styles.mapFrame}>
            <Image
              src="/assets/home/nationwide/bangladesh-eight-divisions-map.svg"
              alt="Bangladesh map showing all eight administrative divisions"
              width={1550}
              height={2150}
              sizes="(max-width: 899px) 68vw, 330px"
              className={styles.mapImage}
            />
          </div>
        </figure>

        <div className={styles.regionCards} aria-label="Conference system service regions in Bangladesh">
          {coverageRegions.map((region) => (
            <article key={region.name} className={styles.regionCard + " " + styles[region.position]}>
              <span className={styles.pulse} aria-hidden="true">
                <i />
              </span>
              <span>
                <strong>{region.name}</strong>
                <small>{region.detail}</small>
              </span>
            </article>
          ))}
        </div>

        <div className={styles.brandBadge} aria-label="Sasha Corporation nationwide conference system support">
          <i aria-hidden="true" />
          <strong>Sasha</strong>
          <span>Conference Support</span>
        </div>
      </div>
    </section>
  );
}
