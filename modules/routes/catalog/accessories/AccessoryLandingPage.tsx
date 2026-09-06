import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { absoluteUrl, socialImageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import Icon, { type IfpIconName } from "../control-systems/interactive-flat-panel/IfpIcon";
import { accessoryCategories, accessoryPages, accessoryPath, representativeImageSlugs, type AccessoryCategory } from "./landing-content";
import styles from "./accessory-landing.module.css";
import { accessoryHeroArt } from "./hero-art";

const categoryIcons: Record<AccessoryCategory, IfpIconName> = { "receiving-card": "cpu", controller: "screen", "power-supply": "shield", "led-accessories": "settings" };
// Match the original photo backdrop instead of leaving a differently colored inset.
const photoBackdrops: Record<string, string> = { "hd-r716": styles.receiverImage, "hd-r516": styles.paperImage, "huidu-hd-a3l": styles.lavenderImage };

export function accessoryMetadata(category: AccessoryCategory): Metadata {
  const page = accessoryPages[category];
  return {
    title: `${page.title} in Bangladesh | Sasha Corporation`, description: page.metaDescription,
    alternates: { canonical: accessoryPath(category) },
    openGraph: { title: `${page.title} in Bangladesh`, description: page.metaDescription, type: "website", url: accessoryPath(category), images: [{ url: socialImageUrl(page.image.src), width: page.image.width, height: page.image.height, alt: page.image.alt }] },
    twitter: { card: "summary_large_image", title: `${page.title} in Bangladesh`, description: page.metaDescription, images: [socialImageUrl(page.image.src)] },
  };
}
function Badge({ name }: { name: IfpIconName }) { return <span className={styles.iconBadge}><Icon name={name} /></span>; }
function Checks({ items, singleLine = false }: { items: readonly string[]; singleLine?: boolean }) { return <ul className={styles.checks}>{items.map(item => <li key={item}><Icon name="check" /><span title={singleLine ? item : undefined}>{item}</span></li>)}</ul>; }
function Heading({ eyebrow, title, text, link }: { eyebrow: string; title: string; text: string; link?: { href: string; label: string } }) {
  return <div className={styles.heading}><div><p className={styles.eyebrow}>{eyebrow}</p><h2>{title}</h2><p className={styles.description}>{text}</p></div>{link && <Link href={link.href} className={styles.textLink}>{link.label}<Icon name="arrow" /></Link>}</div>;
}
function Section({ id, tone, children }: { id: string; tone?: "soft" | "blue" | "dark"; children: ReactNode }) {
  return <section id={id} className={`${styles.section} ${tone ? styles[tone] : ""}`}><div className={styles.container}>{children}</div></section>;
}

export default function AccessoryLandingPage({ category }: { category: AccessoryCategory }) {
  const page = accessoryPages[category];
  const heroArt = accessoryHeroArt[category];
  const productId = `${category}-products`;
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text=${encodeURIComponent(`Hello, I would like help selecting ${page.label.toLowerCase()} products for my LED display. I can share the equipment details and required quantity.`)}`;
  const collection = {
    "@context": "https://schema.org", "@type": "CollectionPage", "@id": absoluteUrl(accessoryPath(category)), url: absoluteUrl(accessoryPath(category)), name: page.title, description: page.metaDescription,
    mainEntity: { "@type": "ItemList", numberOfItems: page.products.length, itemListElement: page.products.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.title, url: absoluteUrl(`${accessoryPath(category)}${product.slug}/`) })) },
  };
  return <div className={styles.page} data-accessory-landing={category}>
    <Breadcrumbs items={[homeBreadcrumb(), { href: "/led-display/", label: "LED Display" }, { href: "/led-display/accessories/", label: "Accessories" }, { href: accessoryPath(category), label: page.label, current: true }]} className="sr-only" showBackLink={false} />
    <section className={styles.hero} aria-labelledby={`${category}-title`}>
      <div className={styles.heroVisual}><Image src={heroArt.src} alt={heroArt.alt} fill priority sizes="100vw" /></div>
      <div className={`${styles.container} ${styles.heroInner}`}>
        <div className={styles.heroCopy}><p className={styles.eyebrow}>{page.eyebrow}</p><h1 id={`${category}-title`}>{page.title}</h1><p className={styles.heroAccent}>{page.accent}</p><p className={styles.heroDescription}>{page.description}</p>
          <div className={styles.heroTags}>{page.heroTags.map(tag => <span key={tag}><Icon name="check" />{tag}</span>)}</div>
          <div className={styles.actions}><a className={styles.primaryButton} href={`#${productId}`}>Explore {page.label === "Controller" ? "Controllers" : page.label === "Power Supply" ? "Power Supplies" : page.label === "Receiving Card" ? "Receiving Cards" : "Accessories"}<Icon name="arrow" /></a><Link href="/contact/" className={styles.navyButton}>Get a Project Quote</Link></div>
          <a className={styles.heroHelp} href={`tel:${siteConfig.phone}`}><Icon name="phone" />Need help matching a part? {siteConfig.phone}</a>
        </div>
      </div>
      <span className={styles.heroArtNote}>Illustrative setup</span>
    </section>

    <nav className={styles.categoryNav} aria-label="LED component categories"><div className={`${styles.container} ${styles.categoryGrid}`}>{accessoryCategories.map(key => <Link href={accessoryPath(key)} key={key} aria-current={key === category ? "page" : undefined}><Badge name={categoryIcons[key]} /><span>{accessoryPages[key].label}</span><Icon name="arrow" /></Link>)}</div></nav>

    <Section id={productId} tone="soft">
      <Heading eyebrow={`${page.products.length} CATALOG OPTIONS`} title={page.productTitle} text={page.productIntro} link={{ href: `#${category}-selection`, label: "View Selection Guide" }} />
      <div className={styles.productGrid}>{page.products.map(product => {
        const href = `${accessoryPath(category)}${product.slug}/`;
        const representative = representativeImageSlugs.has(product.slug);
        const imageStyle = photoBackdrops[product.slug] ?? (category === "led-accessories" ? styles.sceneImage : /VP820|VP-410/.test(product.image) ? styles.wideDeviceImage : styles.cutoutImage);
        return <article className={styles.productCard} key={product.slug} data-accessory-product={product.slug}>
          <Link className={`${styles.productImage} ${imageStyle}`} href={href} prefetch={false} aria-label={`View ${product.title}`}><Image src={product.image} alt={representative ? `Representative ${page.label.toLowerCase()} image; exact ${product.title} appearance to be confirmed` : product.title} fill sizes="(max-width: 599px) 94vw, (max-width: 999px) 46vw, (min-width: 2200px) 660px, 31vw" /><span className={styles.productBadge}>{product.badge}</span>{representative && <span className={styles.imageNote}>Representative image</span>}</Link>
          <div className={styles.productBody}><h3><Link href={href} prefetch={false} title={product.title}>{product.title}</Link></h3><Checks items={product.quickFeatures.slice(0, 3)} singleLine />
            <div className={styles.productFooter}><p className={styles.price}>{product.cardPrice || "Price on request"}</p><p className={styles.priceNote}>Confirm current price, exact model & inclusions</p><div className={styles.cardActions}><Link className={styles.outlineButton} href={href} prefetch={false}>View Details<span className="sr-only">: {product.title}</span></Link><Link className={styles.navyButton} href="/contact/">Get a Quote<span className="sr-only"> for {product.title}</span></Link></div></div>
          </div>
        </article>;
      })}</div>
      <p className={styles.note}>Catalog prices are indicative, not live offers. Confirm availability, exact specifications, quantity, VAT/tax, delivery and support in your written quotation.</p>
    </Section>

    <Section id={`${category}-selection`}>
      <Heading eyebrow="CHECK BEFORE YOU CHOOSE" title={page.guideTitle} text={page.guideIntro} />
      <div className={styles.grid3}>{page.guides.map((item, index) => <article className={styles.guideCard} key={item.title}><div className={styles.cardTop}><Badge name={item.icon} /><span className={styles.number}>0{index + 1}</span></div><h3>{item.title}</h3><Checks items={item.points} /></article>)}</div>
      <div className={styles.advice}><Icon name="help" /><p><strong>Important:</strong> {page.advice}</p></div>
    </Section>

    <Section id={`${category}-applications`} tone="dark">
      <Heading eyebrow="PLANNED AROUND YOUR PROJECT" title={page.contextTitle} text="Match the parts, installation conditions and support scope to your actual LED system." />
      <div className={styles.contextGrid}>{page.contexts.map(item => <article key={item.title}><Badge name={item.icon} /><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
    </Section>

    <Section id={`${category}-checklist`} tone="blue">
      <Heading eyebrow="MAKE YOUR QUOTATION MORE ACCURATE" title={`Before You Order ${page.label === "Controller" ? "a Controller" : page.label === "Power Supply" ? "a Power Supply" : page.label === "Receiving Card" ? "a Receiving Card" : "LED Accessories"}`} text="Share the details below so the proposed item and project scope can be checked against your equipment." link={{ href: "/contact/", label: "Request Selection Support" }} />
      <div className={styles.checklistLayout}><div className={styles.checklistCards}>{page.checklist.map(item => <article key={item.title}><div className={styles.cardHeading}><Badge name={item.icon} /><h3>{item.title}</h3></div><Checks items={item.points} /></article>)}</div>
        <aside className={styles.helpPanel}><Badge name="headset" /><h3>Not Sure Which Part Fits?</h3><p>Send the equipment labels, photos and requirements. We’ll help clarify the matching options and quotation scope.</p><a className={styles.whatsappButton} href={wa} target="_blank" rel="noopener noreferrer"><Icon name="chat" />Discuss on WhatsApp</a><span>No guesswork from appearance alone.</span></aside>
      </div>
    </Section>

    <Section id={`${category}-faq`}>
      <Heading eyebrow="YOUR QUESTIONS, ANSWERED" title={`FAQs About ${page.label === "Controller" ? "LED Controllers" : page.label === "Power Supply" ? "LED Power Supplies" : page.label === "Receiving Card" ? "Receiving Cards" : "LED Accessories"}`} text="Practical answers about selection, compatibility and project support." />
      <div className={styles.faqGrid}>{page.faqs.map((item, index) => <details className={styles.faqItem} key={item.q}><summary><span className={styles.faqNumber}>{String(index + 1).padStart(2, "0")}</span><h3>{item.q}</h3><span className={styles.faqToggle} aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div>
      <nav className={styles.relatedLinks} aria-label="Related LED display solutions"><span>Planning a complete screen?</span><Link href="/led-display/indoor-led/">Indoor LED Displays<Icon name="arrow" /></Link><Link href="/led-display/outdoor/">Outdoor LED Displays<Icon name="arrow" /></Link><Link href="/led-display/rental-display/">Rental LED Displays<Icon name="arrow" /></Link><Link href="/led-display/accessories/">All LED Components<Icon name="arrow" /></Link></nav>
    </Section>

    <section className={styles.finalCta} aria-labelledby={`${category}-cta-title`}><div className={`${styles.container} ${styles.ctaInner}`}><div><p className={styles.eyebrow}>LET’S MATCH YOUR REQUIREMENTS</p><h2 id={`${category}-cta-title`}>{page.cta}</h2><p>Share your equipment details for a clear, project-specific recommendation.</p></div><div><div className={styles.actions}><Link className={styles.primaryButton} href="/contact/">Request a Project Quote<Icon name="arrow" /></Link><a className={styles.ctaWhatsapp} href={wa} target="_blank" rel="noopener noreferrer"><Icon name="chat" />Chat on WhatsApp</a></div><div className={styles.ctaBenefits}><span><Icon name="cpu" />Compatibility Check</span><span><Icon name="clipboard" />BOQ Support</span><span><Icon name="headset" />Technical Guidance</span></div></div></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection).replace(/</g, "\\u003c") }} />
  </div>;
}
