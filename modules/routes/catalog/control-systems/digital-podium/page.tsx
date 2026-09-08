import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { absoluteUrl, socialImageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import Icon, { type IfpIconName as IconName } from "../interactive-flat-panel/IfpIcon";
import { digitalPodiumCatalog } from "./catalog";
import { applications, connections, faqs, features, heroImage, modelLabels, planningCards, processSteps, selectionCards } from "./content";
import styles from "./podium.module.css";

const description = "Compare digital podiums in Bangladesh for classrooms, lecture halls and conference venues. Explore indicative prices, PC and touch options, BOQ and installation.";
export const metadata: Metadata = {
  title: "Digital Podium Price in Bangladesh | Smart Podium Solutions",
  description,
  alternates: { canonical: "/digital-podium/" },
  openGraph: {
    title: "Digital Podium in Bangladesh | Sasha Corporation", description,
    url: "/digital-podium/", type: "website",
    images: [{ url: socialImageUrl("/assets/control-systems/digital-podium/digital-podium-hero.webp"), width: 1983, height: 793, alt: "Digital podium presentation setup" }],
  },
  twitter: { card: "summary_large_image", title: "Digital Podium Price in Bangladesh", description, images: [socialImageUrl("/assets/control-systems/digital-podium/digital-podium-hero.webp")] },
};

function Badge({ name }: { name: IconName }) {
  return <span className={styles.iconBadge}><Icon name={name} /></span>;
}
function Checks({ items }: { items: readonly string[] }) {
  return <ul className={styles.checks}>{items.map(item => <li key={item}><Icon name="check" /><span>{item}</span></li>)}</ul>;
}
function Heading({ eyebrow, title, text, link }: { eyebrow: string; title: string; text?: string; link?: { href: string; label: string } }) {
  return <div className={styles.heading}><div><p className={styles.eyebrow}>{eyebrow}</p><h2>{title}</h2>{text && <p className={styles.description}>{text}</p>}</div>{link && <Link className={styles.textLink} href={link.href}>{link.label}<Icon name="arrow" /></Link>}</div>;
}
function Section({ id, tone, children }: { id: string; tone?: "soft" | "blue" | "dark"; children: ReactNode }) {
  return <section id={id} className={`${styles.section} ${tone ? styles[tone] : ""}`}><div className={styles.container}>{children}</div></section>;
}

export default function DigitalPodiumPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text=${encodeURIComponent("Hello, I would like a digital podium quotation for my classroom or presentation venue.")}`;
  const collection = {
    "@context": "https://schema.org", "@type": "CollectionPage",
    "@id": absoluteUrl("/digital-podium/"), url: absoluteUrl("/digital-podium/"),
    name: "Digital Podium Price in Bangladesh", description,
    mainEntity: { "@type": "ItemList", numberOfItems: digitalPodiumCatalog.length,
      itemListElement: digitalPodiumCatalog.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.title, url: absoluteUrl(`/digital-podium/${product.slug}/`) })),
    },
  };
  return <div className={styles.page} data-podium-page>
    <Breadcrumbs items={[homeBreadcrumb(), { label: "Digital Podium", href: "/digital-podium/", current: true }]} className="sr-only" showBackLink={false} />

    <section className={styles.hero} aria-labelledby="podium-hero-title">
      <div className={styles.heroVisual}><Image src={heroImage} alt="Illustrative digital podium with a presenter and audience display in a conference venue" fill priority sizes="100vw" /><span className={styles.visualCaption}>Illustrative presentation setup</span></div>
      <div className={`${styles.container} ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>SMART PRESENTATION SOLUTIONS</p>
          <h1 id="podium-hero-title">Digital Podium<br /><span>Present with Confidence.</span></h1>
          <p className={styles.heroDescription}>A smarter starting point for every lecture and presentation. Explore digital podiums in Bangladesh with PC, touch and AV options matched to your venue.</p>
          <div className={styles.heroFeatures}><span><Icon name="pen" />Touch options</span><span><Icon name="cpu" />PC integration</span><span><Icon name="cast" />Display & audio</span></div>
          <div className={styles.actions}><a href="#podium-products" className={styles.primaryButton}>Explore Digital Podiums<Icon name="arrow" /></a><Link href="/contact/" className={styles.navyButton}>Get a Project Quote</Link></div>
          <a className={styles.heroHelp} href={`tel:${siteConfig.phone}`}><Icon name="phone" />Need configuration advice? {siteConfig.phone}</a>
        </div>
      </div>
    </section>

    <div className={styles.trustStrip} aria-label="Digital podium project support"><div className={`${styles.container} ${styles.trustGrid}`}>
      {([{ icon: "clipboard", title: "BOQ-Led Selection", text: "Clear configuration & scope" }, { icon: "screen", title: "Room AV Integration", text: "Display, microphone & PC" }, { icon: "settings", title: "Setup & Handover", text: "Testing and user guidance" }, { icon: "pin", title: "Across Bangladesh", text: "Delivery & site planning" }] as const).map(item => <div key={item.title}><Badge name={item.icon} /><div><strong>{item.title}</strong><span>{item.text}</span></div></div>)}
    </div></div>

    <Section id="podium-products" tone="soft">
      <Heading eyebrow="EXPLORE OUR DIGITAL PODIUMS" title="Find the Right Podium for Your Space" text="Compare six configurations for teaching, training and professional presentations." link={{ href: "#podium-price-guide", label: "View Price & Configuration Guide" }} />
      <div className={styles.productGrid}>{digitalPodiumCatalog.map((product, index) => {
        const href = `/digital-podium/${product.slug}/`;
        return <article className={styles.productCard} key={product.slug} data-podium-product={product.slug}>
          <Link href={href} prefetch={false} className={styles.productImage} aria-label={`View ${product.title}`}>
            <Image src={product.image} alt={product.title} fill sizes="(max-width: 599px) 94vw, (max-width: 999px) 46vw, (min-width: 2200px) 660px, 31vw" />
            <span className={styles.productBadge}>{modelLabels[index]}</span>
          </Link>
          <div className={styles.productBody}>
            <h3><Link href={href} prefetch={false}>{product.title}</Link></h3>
            <Checks items={product.cardHighlights.slice(0, 3)} />
            <div className={styles.productFooter}><p className={styles.productPrice}>{product.priceLabel}</p><p className={styles.priceNote}>Indicative budget · Confirm configuration & inclusions</p>
              <div className={styles.cardActions}><Link href={href} prefetch={false} className={styles.outlineButton}>View Details<span className="sr-only">: {product.title}</span></Link><Link href="/contact/" className={styles.navyButton}>Get a Quote<span className="sr-only"> for {product.title}</span></Link></div>
            </div>
          </div>
        </article>;
      })}</div>
      <p className={styles.note}>Images illustrate configuration styles. Final appearance, installed modules, availability and price are confirmed in your approved quotation.</p>
    </Section>

    <Section id="podium-applications">
      <Heading eyebrow="DESIGNED AROUND YOUR VENUE" title="One Presenter Station. Many Possibilities." text="Choose the podium around how your teachers, speakers and technical team actually work." />
      <div className={styles.grid3}>{applications.map((item, index) => <article key={item.title} className={styles.applicationCard}>
        <div className={styles.cardTop}><Badge name={item.icon} /><span className={styles.number}>0{index + 1}</span></div><h3>{item.title}</h3><p>{item.desc}</p><Checks items={item.points} />
      </article>)}</div>
    </Section>

    <Section id="podium-integration" tone="blue">
      <Heading eyebrow="CONNECT THE WHOLE ROOM" title="More Than a Podium. A Connected Workspace." text="A digital podium brings presentation control and room connections into one organized workstation. The right integration plan matters as much as the cabinet." />
      <div className={styles.integrationLayout}>
        <figure className={styles.integrationVisual}><Image src="/assets/control-systems/digital-podium/products/podium-hero.webp" alt="Illustrative touch podium connected to a meeting-room display" fill sizes="(max-width: 999px) 94vw, 44vw" /><figcaption>Podium + display + audio · Illustrative room concept</figcaption></figure>
        <div className={styles.connectionList}>{connections.map(item => <article key={item.title}><Badge name={item.icon} /><div><h3>{item.title}</h3><p>{item.desc}</p><Link className={styles.textLink} href={item.href}>{item.link}<Icon name="arrow" /></Link></div></article>)}</div>
      </div>
    </Section>

    <Section id="podium-price-guide">
      <Heading eyebrow="PLAN YOUR INVESTMENT" title="Digital Podium Price in Bangladesh" text="Use the existing catalog budgets as a starting point, then confirm the equipment and installation scope for your project." />
      <div className={styles.priceLayout}>
        <div className={styles.tableWrap}><table className={styles.priceTable}><caption className="sr-only">Indicative digital podium configuration budgets in Bangladesh</caption><thead><tr><th scope="col">Configuration</th><th scope="col">Indicative budget</th></tr></thead><tbody>{digitalPodiumCatalog.map((product, index) => <tr key={product.slug}><th scope="row"><Link href={`/digital-podium/${product.slug}/`}>{modelLabels[index]}<Icon name="arrow" /></Link></th><td>{product.priceLabel}</td></tr>)}</tbody></table></div>
        <aside className={styles.quotePanel}><Badge name="clipboard" /><h3>What Changes Your Final Price?</h3><Checks items={["Podium body, finish and custom fabrication", "Touch display, PC and software requirements", "Microphones, audio modules and AV accessories", "Cable distances, delivery and installation scope"]} /><Link className={styles.primaryButton} href="/contact/">Request a Detailed BOQ<Icon name="arrow" /></Link></aside>
      </div>
      <p className={styles.note}>Indicative budgets are not live offers. Confirm VAT/tax, delivery, installation, accessories, software licensing and warranty terms in the written quotation. Custom tender configurations are quoted against the approved BOQ.</p>
    </Section>

    <Section id="podium-features" tone="dark">
      <Heading eyebrow="BUILT AROUND YOUR PRESENTATION" title="Practical Features. A Cleaner Workflow." text="Select the capabilities you need. Features and included equipment vary by model and configuration." />
      <div className={styles.grid4}>{features.map(item => <article className={styles.featureCard} key={item.title}><Badge name={item.icon} /><h3>{item.title}</h3><p>{item.desc}</p></article>)}</div>
    </Section>

    <Section id="buying-guide" tone="soft">
      <Heading eyebrow="CHOOSE WITH CLARITY" title="How to Choose a Digital Podium" text="Start with the room and daily workflow—not just the screen size or cabinet finish." />
      <div id="specs-explained" className={styles.grid3}>{selectionCards.map(item => <article key={item.title} className={styles.planningCard}><div className={styles.cardHeading}><Badge name={item.icon} /><h3>{item.title}</h3></div><Checks items={item.points} /></article>)}</div>
      <div className={styles.advice}><Icon name="help" /><p><strong>Before you decide:</strong> Avoid comparing cabinet prices alone. Ask for the exact PC, touch, audio and connection specifications, then compare the complete installed scope.</p></div>
    </Section>

    <Section id="installation">
      <Heading eyebrow="FROM REQUIREMENT TO READY-TO-USE" title="How Your Digital Podium Project Works" text="A clear path from selecting your configuration to a tested system and confident presenters." />
      <ol className={styles.processGrid}>{processSteps.map((item, index) => <li key={item.title}><div className={styles.stepIcon}><Badge name={item.icon} /><span>{index + 1}</span></div><h3>{item.title}</h3><p>{item.desc}</p></li>)}</ol>
    </Section>

    <Section id="boq-tender" tone="blue">
      <Heading eyebrow="READY FOR AN ACCURATE QUOTATION" title="Digital Podium BOQ & Procurement Checklist" text="Share these details to align the proposed configuration, site work and handover requirements." link={{ href: "/contact/", label: "Discuss Your Requirements" }} />
      <div className={styles.grid3}>{planningCards.map(item => <article className={styles.planningCard} key={item.title}><div className={styles.cardHeading}><Badge name={item.icon} /><h3>{item.title}</h3></div><Checks items={item.points} /></article>)}</div>
      <nav className={styles.relatedLinks} aria-label="Related room solutions"><span>Complete your presentation space</span><Link href="/interactive-flat-panel/">Interactive Flat Panels<Icon name="arrow" /></Link><Link href="/conference-system/">Conference Systems<Icon name="arrow" /></Link><Link href="/led-display/indoor-led/">Indoor LED Displays<Icon name="arrow" /></Link><Link href="/pa-system/">PA Systems<Icon name="arrow" /></Link></nav>
    </Section>

    <Section id="podium-faq">
      <Heading eyebrow="YOUR QUESTIONS, ANSWERED" title="FAQs About Digital Podiums" text="Practical answers about configuration, pricing, compatibility and installation in Bangladesh." />
      <div className={styles.faqGrid}>{faqs.map((item, index) => <details className={styles.faqItem} key={item.q}><summary><span className={styles.faqNumber}>{String(index + 1).padStart(2, "0")}</span><h3>{item.q}</h3><span className={styles.faqToggle} aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div>
    </Section>

    <section className={styles.finalCta} aria-labelledby="podium-cta-title"><div className={`${styles.container} ${styles.ctaInner}`}>
      <div><p className={styles.eyebrow}>READY FOR YOUR NEXT PRESENTATION?</p><h2 id="podium-cta-title">Give Every Speaker a <span>Smarter Starting Point.</span></h2><p>Let’s plan the right digital podium for your classroom, conference room or stage.</p></div>
      <div><div className={styles.actions}><Link className={styles.primaryButton} href="/contact/">Request a Podium Quote<Icon name="arrow" /></Link><a className={styles.whatsappButton} href={wa} target="_blank" rel="noopener noreferrer"><Icon name="chat" />Chat on WhatsApp</a></div><div className={styles.ctaBenefits}><span><Icon name="clipboard" />Configuration Advice</span><span><Icon name="settings" />Setup Support</span><span><Icon name="headset" />User Handover</span></div></div>
    </div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection).replace(/</g, "\\u003c") }} />
  </div>;
}
