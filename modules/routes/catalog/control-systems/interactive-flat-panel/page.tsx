import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";
import { socialImageUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import IfpProductExplorer from "./IfpProductExplorer";
import IfpIcon, { type IfpIconName } from "./IfpIcon";
import { applications, features, faqs, priceRows, viewingDistanceRows, boqChecklist, opsCards, whyChooseCards, processSteps, planningCards } from "./content";
import styles from "./ifp.module.css";

export const metadata: Metadata = {
  title: "Interactive Flat Panel Price in Bangladesh",
  description:
 "Interactive flat panel (IFP) in Bangladesh for smart classrooms and meeting rooms-BOQ support, model selection, and nationwide installation.",
  alternates: { canonical: "/interactive-flat-panel/" },
  openGraph: {
    title: "Interactive Flat Panel in Bangladesh | Smart Classroom and Meeting Room",
    description:
 "Interactive flat panel price and selection guidance in Bangladesh-screen size planning, OPS PC options, installation and after-sales support.",
    url: "/interactive-flat-panel/",
    type: "website",
    images: [
      {
        url: socialImageUrl("/assets/control-systems/interactive-flat-panel/products/Interactive-flat-panal.webp"),
        width: 1200,
        height: 630,
        alt: "Interactive Flat Panel in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Flat Panel Price in Bangladesh",
    description:
 "Interactive flat panel (IFP) in Bangladesh-smart classroom and meeting room display with BOQ, installation and support.",
    images: [socialImageUrl("/assets/control-systems/interactive-flat-panel/products/Interactive-flat-panal.webp")],
  },
};


function SectionHeading({ eyebrow, title, description, link, light = false }: {
  eyebrow: string; title: string; description?: string; link?: { href: string; label: string }; light?: boolean;
}) {
  return (
    <div className={[styles.sectionHeading, light ? styles.lightHeading : ""].join(" ")}>
      <div><p className={styles.eyebrow}>{eyebrow}</p><h2>{title}</h2>{description ? <p className={styles.description}>{description}</p> : null}</div>
      {link ? <Link className={styles.textLink} href={link.href}>{link.label}<IfpIcon name="arrow" /></Link> : null}
    </div>
  );
}
function IconBadge({ name }: { name: IfpIconName }) {
  return <span className={styles.iconBadge}><IfpIcon name={name} /></span>;
}
function CheckList({ items }: { items: readonly string[] }) {
  return <ul className={styles.checkList}>{items.map((item) => <li key={item}><IfpIcon name="check" /><span>{item}</span></li>)}</ul>;
}
function Section({ id, tone, children }: { id?: string; tone?: "soft" | "blue" | "dark"; children: ReactNode }) {
  return <section id={id} className={[styles.section, tone ? styles[tone] : ""].join(" ")}><div className={styles.container}>{children}</div></section>;
}
export default function InteractiveFlatPanelPage() {
  const wa = "https://api.whatsapp.com/send/?phone=" + siteConfig.whatsapp.replace(/\D/g, "") + "&text=" + encodeURIComponent("Hello, I would like help choosing an Interactive Flat Panel for my classroom or meeting room.");
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
  return (
    <div className={styles.page} data-ifp-page>
      <Breadcrumbs items={[homeBreadcrumb(), { label: "Interactive Flat Panel", href: "/interactive-flat-panel/", current: true }]} className="sr-only" showBackLink={false} />
      <section className={styles.hero} aria-labelledby="ifp-hero-title">
        <div className={styles.heroVisual}>
          <Image src="/assets/control-systems/interactive-flat-panel/landing/ifp-collaboration-hero.webp" alt="Illustrative collaboration room with an interactive flat panel displaying a digital whiteboard" fill priority sizes="(max-width: 699px) 100vw, 65vw" />
          <span className={styles.visualCaption}>Illustrative room concept</span>
        </div>
        <div className={[styles.container, styles.heroInner].join(" ")}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>SMART CLASSROOM & MEETING SOLUTIONS</p>
            <h1 id="ifp-hero-title">Interactive Flat Panel<br /><span>Teach. Meet.<br /> Collaborate.</span></h1>
            <p className={styles.heroDescription}>Bring ideas to life on one interactive screen. Explore flat panels in Bangladesh with model selection, installation and handover support.</p>
            <div className={styles.heroFeatures}>
              <span><IfpIcon name="pen" />Touch & annotation</span>
              <span><IfpIcon name="cast" />Screen sharing</span>
              <span><IfpIcon name="cpu" />Optional OPS PC</span>
            </div>
            <div className={styles.actions}><a className={styles.primaryButton} href="#ifp-products">Explore Panels<IfpIcon name="arrow" /></a><Link className={styles.outlineButton} href="/contact/">Get a Project Quote</Link></div>
            <a className={styles.heroHelp} href={"tel:" + siteConfig.phone}><IfpIcon name="phone" />Need help choosing? {siteConfig.phone}</a>
          </div>
        </div>
      </section>
      <div className={styles.trustStrip} aria-label="Interactive flat panel service highlights"><div className={[styles.container, styles.trustGrid].join(" ")}>
        {([{ icon: "screen", title: '65″–110″ Options', text: "Choose for your space" }, { icon: "clipboard", title: "Project-Based BOQ", text: "Panel, accessories & scope" }, { icon: "settings", title: "Installation Support", text: "Setup & user handover" }, { icon: "pin", title: "Across Bangladesh", text: "Delivery & site planning" }] as const).map((item) => <div key={item.title}><IconBadge name={item.icon} /><div><strong>{item.title}</strong><span>{item.text}</span></div></div>)}
      </div></div>
      <Section id="ifp-products" tone="soft">
        <SectionHeading eyebrow="EXPLORE OUR INTERACTIVE PANELS" title="Find the Right Interactive Flat Panel" description="Compare brands and screen sizes for your classroom, meeting room or training space." link={{ href: "#size-selection", label: "Need help choosing a size?" }} />
        <IfpProductExplorer />
      </Section>
      <Section id="ifp-applications">
        <SectionHeading eyebrow="MADE FOR THE WAY YOU WORK" title="One Screen. Many Possibilities." description="Match the panel and supporting equipment to the people, content and activities in your room." />
        <div className={styles.grid3}>{applications.map((item, index) => <article className={styles.applicationCard} key={item.title}>
          <div className={styles.applicationTop}><IconBadge name={item.icon} /><span className={styles.applicationNumber}>0{index + 1}</span></div>
          <p className={styles.smallLabel}>Typical size: {item.size}</p><h3>{item.title}</h3><p>{item.desc}</p><CheckList items={item.points} />
          <Link href="/contact/" className={styles.textLink}>Plan Your Setup<IfpIcon name="arrow" /></Link>
        </article>)}</div>
      </Section>
      <Section id="size-selection" tone="blue">
        <SectionHeading eyebrow="SCREEN SIZE GUIDE" title="Choose a Screen That Fits Your Room" description="Use seating distance as a starting point, then check the smallest text, room lighting and back-row visibility." link={{ href: "/contact/", label: "Ask for a recommendation" }} />
        <div className={styles.sizeGrid}>
          {viewingDistanceRows.map((item) => (
            <article className={styles.sizeCard} key={item.distance}>
              <div className={styles.sizeSelection}>
                <span className={styles.sizeIcon}><IfpIcon name="screen" /></span>
                <div>
                <p className={styles.sizeLabel}>Suggested screen size</p>
                <h3>{item.size.replaceAll('"', "″")}</h3>
                </div>
              </div>
              <div className={styles.sizeDetails}>
                <div className={styles.sizeDistance}>
                  <p className={styles.sizeLabel}>Viewing distance</p><p className={styles.distanceValue}>{item.distance}</p>
                </div>
                <div className={styles.sizeRoom}><p>{item.room}</p></div>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.sizeAdvice}><IfpIcon name="help" /><p><strong>Before you decide:</strong> Indicative planning guide, not a fixed viewing-distance rule. Dense spreadsheets and teaching text may need a larger screen; confirm the final size with your actual content.</p></div>
      </Section>
      <Section id="ifp-price-guide">
        <SectionHeading eyebrow="PLAN YOUR INVESTMENT" title="Interactive Flat Panel Price in Bangladesh" description="A starting point for budgeting. Your final quotation depends on the brand, model, accessories and installation requirements." />
        <div className={styles.priceLayout}>
          <div className={styles.priceTableWrap}><table className={styles.priceTable}><caption className="sr-only">Indicative interactive flat panel budget ranges in Bangladesh</caption><thead><tr><th scope="col">Screen size</th><th scope="col">Indicative budget</th><th scope="col">Typical room</th></tr></thead><tbody>{priceRows.map((row) => <tr key={row.size}><th scope="row">{row.size.replace('"', "″")}</th><td>{row.price}</td><td>{row.use}</td></tr>)}</tbody></table></div>
          <aside className={styles.quoteCard}><IconBadge name="clipboard" /><h3>What Should Your BOQ Include?</h3><CheckList items={boqChecklist} /><Link href="/contact/" className={styles.primaryButton}>Request a Detailed BOQ<IfpIcon name="arrow" /></Link></aside>
        </div>
        <p className={styles.note}>Budget ranges are indicative, not live offers. Confirm current availability, exact configuration, VAT/tax, delivery, mounting, OPS PC and warranty inclusions in your written quotation. Ask for a model-specific quote for 96-inch options.</p>
      </Section>
      <Section id="ifp-features" tone="dark">
        <SectionHeading eyebrow="A MORE CONNECTED WORKSPACE" title="Built Around Teaching & Collaboration" description="Focus on the features you will use every day. Capabilities vary by model and configuration." light />
        <div className={styles.grid4}>{features.map((item) => <article className={styles.featureCard} key={item.title}><IconBadge name={item.icon} /><h3>{item.title}</h3><p>{item.desc}</p></article>)}</div>
      </Section>
      <Section id="ifp-ops-options" tone="soft">
        <SectionHeading eyebrow="OPTIONAL WINDOWS WORKFLOW" title="Complete Your Setup with an OPS PC" description="Keep Android for everyday whiteboarding, or add a compatible OPS PC for your Windows apps and multitasking needs." link={{ href: "/contact/", label: "Check OPS compatibility" }} />
        <div className={styles.grid3}>{opsCards.map((item) => <article className={styles.opsCard} key={item.badge}>
          <div className={styles.cardMeta}><span className={styles.brandBadge}>{item.badge}</span><span className={styles.metaLabel}>Optional OPS PC</span></div>
          <div className={styles.opsImage}><Image src={item.image} alt={item.title} fill sizes="(max-width: 599px) 90vw, (max-width: 999px) 44vw, 30vw" /></div>
          <div className={styles.opsBody}><h3>{item.title.replace("OPS PC - ", "")}</h3><p>{item.subtitle}</p><div className={styles.specGrid}>{item.specs.map((spec) => <span key={spec}><IfpIcon name="check" />{spec}</span>)}</div><Link href="/contact/" className={styles.outlineButton}>Discuss This Configuration<IfpIcon name="arrow" /></Link></div>
        </article>)}</div>
        <p className={styles.note}>OPS selection depends on workload and the panel’s supported interface, not screen size alone. Confirm processor generation, software licensing and compatibility in the final quotation.</p>
      </Section>
      <Section id="ifp-comparison">
        <SectionHeading eyebrow="CHOOSE THE RIGHT DISPLAY APPROACH" title="Interactive Flat Panel or Projector?" description="Both can work well. Choose around interaction, image size, room lighting and ownership costs." />
        <div className={styles.comparisonGrid}>
          <article className={styles.comparisonCard}><IconBadge name="pen" /><h3>When an Interactive Panel Makes Sense</h3><CheckList items={["You regularly write, annotate and save notes on screen.", "You want a fixed display without projector focus or keystone setup.", "Your room suits the available panel size and mounting requirements.", "You need compatible whiteboard, casting and optional Windows tools."]} /></article>
          <article className={styles.comparisonCard}><IconBadge name="screen" /><h3>When to Consider a Projector</h3><CheckList items={["A very large projected image is the main priority.", "You can plan suitable lighting, throw distance and a projection surface.", "Direct touch is not essential, or a separate interaction system is planned.", "Compare total costs: lamp-based and laser projectors have different maintenance needs."]} /></article>
        </div>
      </Section>
      <Section id="ifp-support" tone="blue">
        <SectionHeading eyebrow="WHY SASHA CORPORATION" title="Support from Selection to Everyday Use" description="Align the display, room and handover scope before your project begins." />
        <div className={styles.serviceGrid}>{whyChooseCards.map((item, index) => <article className={styles.serviceCard} key={item.title}><IconBadge name={(["screen", "clipboard", "settings", "school", "shield", "pin"] as const)[index]} /><div><h3>{item.title}</h3><p>{item.desc}</p></div></article>)}</div>
      </Section>
      <Section id="ifp-installation">
        <SectionHeading eyebrow="A CLEAR PATH TO YOUR NEW SETUP" title="How Your Interactive Panel Project Works" description="From your first requirement to a tested display and confident users." />
        <ol className={styles.processGrid}>{processSteps.map((item, index) => <li key={item.title}><div className={styles.stepIcon}><IconBadge name={item.icon} /><span>{index + 1}</span></div><h3>{item.title}</h3><p>{item.desc}</p></li>)}</ol>
      </Section>
      <Section id="ifp-planning" tone="soft">
        <SectionHeading eyebrow="BEFORE YOU REQUEST A QUOTE" title="Interactive Flat Panel Buying Checklist" description="Share these details so the proposed model and installation scope match your needs." link={{ href: "/contact/", label: "Start Your Project" }} />
        <div className={styles.grid3}>{planningCards.map((item) => <article className={styles.planningCard} key={item.title}><div className={styles.cardHeading}><IconBadge name={item.icon} /><h3>{item.title}</h3></div><CheckList items={item.items} /></article>)}</div>
        <div className={styles.relatedLinks}><span>Planning a complete room?</span><Link href="/conference-system/">Conference Systems<IfpIcon name="arrow" /></Link><Link href="/led-display/indoor-led/">Indoor LED Displays<IfpIcon name="arrow" /></Link><Link href="/pa-system/">PA Systems<IfpIcon name="arrow" /></Link></div>
      </Section>
      <Section id="ifp-faq">
        <SectionHeading eyebrow="YOUR QUESTIONS, ANSWERED" title="FAQs About Interactive Flat Panels" description="Practical answers about choosing, installing and using an interactive display in Bangladesh." />
        <div className={styles.faqGrid}>{faqs.map((item, index) => <details key={item.q} className={styles.faqItem}><summary><span className={styles.faqNumber}>{String(index + 1).padStart(2, "0")}</span><h3>{item.q}</h3><span className={styles.faqToggle} aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div>
      </Section>
      <section className={styles.finalCta} aria-labelledby="ifp-cta-title"><div className={[styles.container, styles.ctaInner].join(" ")}>
        <div><p className={styles.eyebrow}>READY FOR A SMARTER SPACE?</p><h2 id="ifp-cta-title">Bring Your Next <span>Big Idea</span> to the Screen</h2><p>Let’s find the right interactive panel for your classroom or meeting room.</p></div>
        <div><div className={styles.actions}><Link href="/contact/" className={styles.primaryButton}>Request a Project Quote<IfpIcon name="arrow" /></Link><a href={wa} target="_blank" rel="noopener noreferrer" className={styles.whatsappButton}><IfpIcon name="chat" />Chat on WhatsApp</a></div><div className={styles.ctaBenefits}><span><IfpIcon name="clipboard" />Model Guidance</span><span><IfpIcon name="settings" />Setup Support</span><span><IfpIcon name="headset" />User Handover</span></div></div>
      </div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
    </div>
  );
}
