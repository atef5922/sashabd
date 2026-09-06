import Image from "next/image";
import Link from "next/link";
import { getInteractiveFlatPanelBullets, type InteractiveFlatPanelItem } from "./catalog";
import styles from "./home-product-card.module.css";

// Matches HomeAllProductsGrid's Browse Products card, not the featured carousel.
export default function IfpHomeProductCard({ panel }: { panel: InteractiveFlatPanelItem }) {
  const href = `/interactive-flat-panel/${panel.slug}/`;
  const title = panel.title.replace(/\s*&\s*/g, " and ");
  const features = getInteractiveFlatPanelBullets(panel).slice(0, 3);

  return (
    <article className={styles.card} data-ifp-product={panel.slug}>
      <Link href={href} prefetch={false} className={styles.image} aria-label={`View details: ${title}`}>
        <Image src={panel.image} alt={title} fill sizes="(max-width: 599px) 90vw, (max-width: 999px) 44vw, 30vw" />
        <span className={styles.categoryBadge}>Interactive Flat Panel</span>
        <span className={styles.modelBadge}>{panel.brand} · {panel.sizeInch}&quot;</span>
      </Link>
      <div className={styles.body}>
        <h3 className={styles.title}><Link href={href} prefetch={false} title={title}>{title}</Link></h3>
        <ul className={styles.features} aria-label={`Key features of ${title}`}>
          {features.map((feature) => (
            <li key={feature}>
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
                <path d="m5.2 8 1.7 1.7 3.9-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span title={feature}>{feature}</span>
            </li>
          ))}
        </ul>
        <div className={styles.footer}>
          <p className={styles.price}>{panel.priceLabel}</p>
          <p className={styles.priceNote}>Project-based configuration</p>
          <div className={styles.actions}>
            <Link href={href} prefetch={false} className={styles.details}>
              <span>View Details</span>
              <span className={styles.mobileArrow} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m10 7 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </Link>
            <Link href="/contact/" prefetch={false} className={styles.quote}>Get a Quote<span className="sr-only"> for {title}</span></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
