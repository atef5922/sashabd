import Image from "next/image";
import Link from "next/link";
import { rentalProjectPreviews, type RentalProjectFact } from "./rentalProjects";
import styles from "./rental-projects.module.css";

function ProjectIcon({ name }: { name: RentalProjectFact["icon"] | "arrow" }) {
  const paths = {
    location: <><path d="M12 21s6-5 6-11a6 6 0 1 0-12 0c0 6 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>,
    pitch: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h2v2H8zM14 8h2v2h-2zM8 14h2v2H8zM14 14h2v2h-2z" /></>,
    screen: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    processor: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4M10 10h4v4h-4z" /></>,
    rigging: <><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" /></>,
    support: <><circle cx="9" cy="7" r="3" /><circle cx="17" cy="8" r="2.5" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 14a5 5 0 0 1 5 5v1" /></>,
    time: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function RentalProjectsSection() {
  const hasSamples = rentalProjectPreviews.some((project) => project.isSample);

  return (
    <section id="rental-recent-projects" className={`${styles.section} relative left-1/2 right-1/2 -mx-[50vw] w-screen`} aria-labelledby="rental-projects-heading">
      <div className="mx-auto w-full max-w-7xl px-3 md:px-6">
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}><span aria-hidden="true" />{hasSamples ? "Project Preview" : "Our Work"}</p>
            <h2 id="rental-projects-heading">Recent Rental LED Projects</h2>
            <p className={styles.description}>
              {hasSamples
                ? "Sample setups only — AI-generated images and illustrative specifications, not completed client projects."
                : "Explore rental LED installations, event setups and technical solutions delivered by our team."}
            </p>
          </div>
          <Link href="/projects/" className={styles.allProjects}>View All Projects <ProjectIcon name="arrow" /></Link>
        </div>

        <div className={styles.grid}>
          {rentalProjectPreviews.map((project) => (
            <article key={project.id} className={styles.card} aria-labelledby={`rental-project-${project.id}`}>
              <div className={styles.image}>
                <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className={styles.photo} style={{ objectPosition: project.imagePosition }} />
                {project.isSample ? <span className={styles.sampleBadge}>Sample setup</span> : null}
                <span className={`${styles.eventBadge} ${project.eventType === "Concert Event" ? styles.concertBadge : ""}`}>{project.eventType}</span>
              </div>
              <div className={styles.content}>
                <h3 id={`rental-project-${project.id}`}>{project.title}</h3>
                <p>{project.description}</p>
                <ul className={styles.facts}>
                  {project.facts.map((fact) => (
                    <li key={fact.label}><ProjectIcon name={fact.icon} /><span><strong>{fact.label}:</strong> {fact.value}</span></li>
                  ))}
                </ul>
                <div className={styles.actions}>
                  <Link href={!project.isSample && project.caseStudyHref ? project.caseStudyHref : project.enquiryHref} aria-label={`${!project.isSample && project.caseStudyHref ? "View project" : "Discuss setup"}: ${project.title}`}>
                    {!project.isSample && project.caseStudyHref ? "View Project" : "Discuss Setup"}<ProjectIcon name="arrow" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
