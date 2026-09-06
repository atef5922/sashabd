import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { normalizeDisplayedPriceText } from "@/lib/price";
import { socialImageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { turnstileCatalog } from "./catalog";
import { useCases, howItWorks, benefits, turnstileSelectionCriteria, whyChooseFeatures, deliveryProcess, faqs, faqJsonLd, turnstileTypes, turnstilePriceRows } from "./landing-data";
import TurnstileProducts from "./TurnstileProducts";
import Icon, { type TurnstileIconName } from "./TurnstileIcon";
import styles from "./turnstile-landing.module.css";

const PAGE_TITLE = "Turnstile Gate Price in Bangladesh 2026";
const HERO = "/images/turnstile-entrance-hero-v2.webp";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "Turnstile Gate Price in Bangladesh. Sasha Corporation supplies tripod turnstile, flap barrier, speed gate, RFID access control & face recognition systems.",
  alternates: { canonical: "/turnstile-gate/" },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "Turnstile Gate Price in Bangladesh. Sasha Corporation supplies tripod turnstile, flap barrier, speed gate, RFID access control & face recognition systems.",
    url: "/turnstile-gate/",
    type: "website",
    images: [
      {
        url: socialImageUrl("/images/Turnstile-gate-System.webp"),
        width: 1200,
        height: 630,
        alt: PAGE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "Turnstile Gate Price in Bangladesh. Sasha Corporation supplies tripod turnstile, flap barrier, speed gate, RFID access control & face recognition systems.",
    images: [socialImageUrl("/images/Turnstile-gate-System.webp")],
  },
};

function Heading({ eyebrow, title, text }: { eyebrow?: string; title: string; text: string }) {
  return <div className={styles.heading}>{eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}<h2>{title}</h2><p>{text}</p></div>;
}

function Section({ id, children, soft = false, tone }: { id: string; children: ReactNode; soft?: boolean; tone?: "soft" | "blue" }) {
  return <section id={id} className={`${styles.section} ${soft ? styles.soft : ""} ${tone ? styles[tone] : ""}`}><div className={styles.container}>{children}</div></section>;
}

const navigation = [
  ["turnstile-products", "Products"], ["gate-types", "Gate Types"], ["gate-applications", "Applications"],
  ["access-control", "Access Control"], ["gate-prices", "Price Guide"], ["gate-installation", "Installation"], ["gate-faq", "FAQs"],
] as const;
const applicationIcons: TurnstileIconName[] = ["building", "factory", "shield", "school", "health", "users"];
const supportIcons: TurnstileIconName[] = ["plan", "card", "settings", "school", "shield", "support"];
const typeImages = [0, 1, 9, 2, 3, 11];
const accessMethods: { title: string; icon: TurnstileIconName; text: string }[] = [
  { title: "RFID / Card", icon: "card", text: "Familiar tap-to-enter access for staff and registered users." },
  { title: "Fingerprint", icon: "fingerprint", text: "Identity verification through a compatible biometric reader." },
  { title: "Face Recognition", icon: "face", text: "Touchless entry with a supported face recognition terminal." },
  { title: "QR / Visitor Access", icon: "qr", text: "Visitor or ticketing workflows with a compatible reader and platform." },
];

export default function TurnstileGateSystemPage() {
  const whatsapp = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;

  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="turnstile-title">
      <div className={styles.heroVisual}><Image src={HERO} alt="Illustrative modern entrance with stainless steel turnstiles and glass swing barriers" fill priority sizes="100vw" /></div>
      <div className={`${styles.container} ${styles.heroInner}`}><div className={styles.heroCopy}>
        <p className={styles.eyebrow}>SMART ACCESS. CONTROLLED ENTRY.</p>
        <h1 id="turnstile-title">Turnstile Gate Price<br />in Bangladesh <span>2026</span></h1>
        <p className={styles.heroDescription}>A smarter welcome. A more secure entrance. Explore turnstile gates and access control solutions for offices, factories and public spaces.</p>
        <div className={styles.actions}><Link href="/contact/" className={styles.button}>Get a Project Quote <Icon name="arrow" /></Link><a href="#turnstile-products" className={styles.heroSecondary}>Browse Products</a></div>
        <div className={styles.heroTags}><span><Icon name="check" />Lane planning</span><span><Icon name="check" />Access integration</span><span><Icon name="check" />Installation & support</span></div>
      </div></div>
    </section>

    <div className={styles.trustStrip}><div className={styles.container}><div className={styles.trustIntro}><Icon name="gate" /><div><strong>Complete Entrance Solutions</strong><span>From gate selection to handover</span></div></div>{([{ icon: "plan", title: "Site Survey & BOQ", text: "Plan the right lane layout" }, { icon: "card", title: "Access Integration", text: "Readers, controllers & software" }, { icon: "support", title: "Installation & Support", text: "Setup, training & maintenance" }] as const).map(item => <div className={styles.trustItem} key={item.title}><Icon name={item.icon} /><div><strong>{item.title}</strong><span>{item.text}</span></div></div>)}</div></div>

    <nav className={styles.sectionNav} aria-label="On this turnstile page"><div className={styles.container}>{navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div></nav>

    <Section id="turnstile-products" tone="blue"><div className={styles.catalogPanel}><Heading title="Browse Turnstile Products" text="Explore tripod turnstiles, flap barriers, swing gates and complete entrance solutions in one product explorer." /><TurnstileProducts items={turnstileCatalog} /></div></Section>

    <Section id="gate-types" tone="blue"><div className={styles.sectionHeader}><Heading eyebrow="FIND THE RIGHT FIT" title="Different entrances. The right gate." text="Sasha Corporation helps businesses choose the right gate for their entrance space, user volume, access method and budget." /><a href="#turnstile-products" className={styles.textLink}>Explore all models <Icon name="arrow" /></a></div><div className={styles.typeGrid}>{turnstileTypes.map((type, index) => {
      const item = turnstileCatalog[typeImages[index]];
      return <article key={type.title} className={styles.typeCard}><Link href={`/turnstile-gate/${item.slug}/`} className={styles.typeImage} prefetch={false} aria-label={`Explore ${type.title}`}><Image src={item.image} alt={type.title} fill sizes="(max-width: 599px) 88vw, (max-width: 899px) 44vw, 30vw" /><span>0{index + 1}</span></Link><div><h3>{type.title}</h3><p>{type.desc}</p><div className={styles.bestFor}><span>BEST FOR</span>{type.bestFor}</div><Link className={styles.textLink} href={`/turnstile-gate/${item.slug}/`} prefetch={false}>View a matching model <Icon name="arrow" /></Link></div></article>;
    })}</div></Section>

    <Section id="gate-applications" tone="blue"><Heading eyebrow="BUILT AROUND YOUR SPACE" title="Entry control for everyday environments" text="Sasha Corporation is a trusted turnstile gate supplier in Bangladesh, with entrance solutions for offices, factories and institutions." /><div className={styles.applicationGrid}>{useCases.map((item, index) => <article key={item.title}><span className={styles.iconBadge}><Icon name={applicationIcons[index]} /></span><h3>{item.title}</h3><p>{item.desc}</p></article>)}</div></Section>

    <Section id="access-control" tone="blue"><div className={styles.integrationLayout}><div className={styles.integrationIntro}><p className={styles.eyebrow}>BEYOND THE GATE</p><h2>Your entrance.<br />Your access rules.</h2><p>Connect physical entry with the way your team verifies people, manages permissions and records attendance.</p><div className={styles.integrationNote}><Icon name="settings" /><span>Reader, controller and software compatibility determine the available features. Confirm the integration scope when choosing your model.</span></div><Link href="/contact/" className={styles.textLink}>Discuss your existing system <Icon name="arrow" /></Link></div><div className={styles.accessGrid}>{accessMethods.map(method => <article key={method.title}><span className={styles.iconBadge}><Icon name={method.icon} /></span><h3>{method.title}</h3><p>{method.text}</p></article>)}</div></div><div className={styles.flowPanel}><div><p className={styles.eyebrow}>HOW IT WORKS</p><h3>One connected entry workflow</h3></div><ol>{howItWorks.slice(0, 3).map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h4>{step.title}</h4><p>{step.desc}</p></div></li>)}</ol><p className={styles.flowFootnote}>Optional software workflows: attendance & HR reporting, visitor schedules and anti-passback rules, subject to the selected platform.</p></div></Section>

    <Section id="gate-planning" tone="blue"><div className={styles.planningLayout}><div className={styles.planningIntro}><p className={styles.eyebrow}>PLAN BEFORE YOU INSTALL</p><h2>A good entrance starts with a good plan.</h2><p>Match the gate to your traffic, space and operational needs before choosing the hardware.</p><div className={styles.planningCallout}><Icon name="plan" /><strong>Have a floor plan?</strong><p>Send the entrance width, expected users and preferred access method.</p><Link href="/contact/" className={styles.button}>Request BOQ Planning <Icon name="arrow" /></Link></div></div><div className={styles.criteriaGrid}>{turnstileSelectionCriteria.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.desc}</p></div></article>)}</div></div></Section>

    <Section id="gate-prices" tone="blue"><Heading eyebrow="PLAN YOUR BUDGET" title="Turnstile Gate Price Guide" text="Compare the existing catalog ranges below. Lane count, readers, software and installation scope shape the final project quotation." /><div className={styles.priceLayout}><div className={styles.tableWrap}><table><caption className="sr-only">Turnstile gate catalog prices in Bangladesh</caption><thead><tr><th scope="col">Gate / Model</th><th scope="col">Catalog Price (BDT)</th></tr></thead><tbody>{turnstilePriceRows.map(item => <tr key={item.slug}><td><Link href={`/turnstile-gate/${item.slug}/`} prefetch={false}>{item.type}</Link></td><td>{normalizeDisplayedPriceText(item.price)}</td></tr>)}</tbody></table></div><aside className={styles.quotePanel}><span className={styles.iconBadge}><Icon name="plan" /></span><p className={styles.eyebrow}>YOUR PROJECT, YOUR SCOPE</p><h3>What goes into a complete system?</h3><ul>{["Gate model and number of lanes", "RFID, biometric or QR readers", "Controllers and software integration", "Power, networking and cable routes", "Installation, testing and training"].map(text => <li key={text}><Icon name="check" />{text}</li>)}</ul><Link href="/contact/" className={styles.button}>Request a Detailed Quote <Icon name="arrow" /></Link><p>Share your requirements for a project-specific equipment list.</p></aside></div></Section>

    <Section id="gate-benefits" tone="blue"><Heading eyebrow="MAKE EVERY ENTRY COUNT" title="More control. Smoother movement." text="Combine the right hardware with clear access policies and a well-planned lane layout." /><div className={styles.benefitGrid}>{benefits.map(item => <article key={item.title}><Icon name="check" /><div><h3>{item.title}</h3><p>{item.desc}</p></div></article>)}</div></Section>

    <Section id="gate-installation" tone="blue"><Heading eyebrow="FROM FIRST MEASUREMENT TO FIRST ENTRY" title="Installation, without the guesswork" text="A clear delivery process keeps the gate, access devices and software working together." /><ol className={styles.processGrid}>{deliveryProcess.map(step => <li key={step.step}><span className={styles.stepNumber}>{step.step}</span><h3>{step.title}</h3><p>{step.desc}</p></li>)}</ol></Section>

    <section id="gate-support" className={styles.supportSection}><div className={styles.container}><Heading eyebrow="SASHA CORPORATION" title="A partner beyond installation" text="Sasha Corporation provides complete turnstile gate solutions in Bangladesh, including planning, integration, installation, training and after-sales support." /><div className={styles.supportGrid}>{whyChooseFeatures.map((item, index) => <article key={item.title}><Icon name={supportIcons[index]} /><div><h3>{item.title}</h3><p>{item.desc}</p></div></article>)}</div></div></section>

    <Section id="gate-faq" tone="blue"><Heading eyebrow="BEFORE YOU CHOOSE" title="Your questions, answered." text="Practical answers about gate selection, access methods, installation and support." /><div className={styles.faqGrid}>{faqs.map((item, index) => <details key={item.q}><summary><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.q}</h3><span className={styles.faqToggle} aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /></Section>

    <div className={`${styles.container} ${styles.ctaWrap}`}><section className={styles.finalCta}><div><p className={styles.eyebrow}>LET’S PLAN YOUR ENTRANCE</p><h2>Ready for a smarter way in?</h2><p>Share your entrance layout, lane count and access requirements. We’ll help you put the right system together.</p></div><div><div className={styles.actions}><Link href="/contact/" className={styles.button}>Send Project Details <Icon name="arrow" /></Link><a href={whatsapp} target="_blank" rel="noreferrer" className={styles.heroSecondary}>WhatsApp Our Team</a></div><a className={styles.callLink} href={`tel:${siteConfig.phone}`}>Prefer to talk? {siteConfig.phone}</a></div></section><div className={styles.related}><span>Explore related solutions</span><Link href="/pa-system/">PA Systems <Icon name="arrow" /></Link><Link href="/conference-system/">Conference Systems <Icon name="arrow" /></Link><Link href="/led-display/">LED Displays <Icon name="arrow" /></Link></div></div>
  </div>;
}
