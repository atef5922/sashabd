import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { conferenceSystemCatalog } from "@/app/conference-system/catalog";
import EmailReveal from "@/components/common/EmailReveal";
import { BRAND_NAME } from "@/lib/brand";
import { buildWhatsAppHref } from "@/lib/contact";
import { rentalCatalog } from "@/lib/productsCatalog";
import { socialImageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: { absolute: "Contact Sasha Corporation | Project Quotation Bangladesh" },
  description:
    "Contact Sasha Corporation for LED display, conference, professional audio and access-control project quotations, consultation, installation and support in Bangladesh.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact Sasha Corporation for Your Technology Project",
    description: "Talk to our team about product selection, BOQ, site survey, installation and technical support across Bangladesh.",
    url: "/contact/",
    type: "website",
    images: [{ url: socialImageUrl(), width: 1200, height: 630, alt: "Contact Sasha Corporation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sasha Corporation",
    description: "Request a technology project quotation, consultation or support.",
    images: [socialImageUrl()],
  },
};

const conferenceQuoteProducts = conferenceSystemCatalog.map((product) => ({ slug: product.slug, name: product.name, model: product.model }));
const rentalQuoteProducts = rentalCatalog.map(({ slug, title }) => ({ slug, title }));

type IconName = "whatsapp" | "phone" | "mail" | "clock" | "user" | "shield" | "document" | "box" | "layers" | "pin" | "screen" | "settings" | "map" | "arrow" | "support";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const paths: Record<IconName, React.ReactNode> = {
    whatsapp: <><path d="M20.5 11.6a8.4 8.4 0 0 1-12.3 7.5L4 20.2l1.1-4.1A8.4 8.4 0 1 1 20.5 11.6Z" /><path d="M8.5 8.2c.2-.4.4-.4.7-.4h.5l.8 1.9c.1.3.1.5-.1.7l-.6.7c.9 1.8 2 2.8 3.8 3.7l.7-.8c.2-.2.4-.3.7-.1l1.8.8c.3.1.4.3.4.6-.1 1-1.2 1.8-2.2 1.8-2.6-.1-6.8-2.5-8-6.4-.3-1 .5-2.2 1.5-2.5Z" /></>,
    phone: <path d="M7.4 3.6 9.7 7c.3.5.2 1.1-.2 1.5L8.1 9.9a15.4 15.4 0 0 0 6 6l1.4-1.4c.4-.4 1-.5 1.5-.2l3.4 2.3c.5.3.7.9.5 1.4l-.7 2.1c-.2.6-.8 1-1.4 1C10 20.5 3.5 14 2.9 5.2c0-.6.4-1.2 1-1.4L6 3.1c.5-.2 1.1 0 1.4.5Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    user: <><circle cx="12" cy="8" r="3" /><path d="M6 19c.6-3.2 2.6-5 6-5s5.4 1.8 6 5" /></>,
    shield: <><path d="M12 3 5 6v5c0 4.5 2.8 8 7 10 4.2-2 7-5.5 7-10V6l-7-3Z" /><path d="m9.5 12 1.6 1.6 3.5-3.7" /></>,
    document: <><path d="M6 3h8l4 4v14H6Z" /><path d="M14 3v5h5M9 12h6M9 16h6" /></>,
    box: <><path d="m4 7 8-4 8 4-8 4Z" /><path d="M4 7v10l8 4 8-4V7M12 11v10" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    screen: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15M15 6v15" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    support: <><path d="M4 13v-2a8 8 0 0 1 16 0v2" /><path d="M4 13H2v5h4v-5H4ZM20 13h2v5h-4v-5h2ZM18 19c-1 1.3-3 2-6 2" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className={styles.eyebrow}><span />{children}</div>;
}

const responseItems: Array<{ icon: IconName; title: string; note: string }> = [
  { icon: "document", title: "Solution Type", note: "e.g. LED, Conference, PA" },
  { icon: "box", title: "Model / Product", note: "Share a model if you have one" },
  { icon: "layers", title: "Quantity", note: "Units / Rooms / Area" },
  { icon: "pin", title: "Project Location", note: "City / Address" },
  { icon: "screen", title: "Room / Screen Size", note: "e.g. 10ft × 6ft" },
  { icon: "settings", title: "Installation Requirement", note: "Fixing, cabling, accessories" },
];

const helpItems: Array<{ icon: IconName; title: string; note: string; href: string }> = [
  { icon: "document", title: "New Project / Quotation", note: "For BOQ, pricing and system planning", href: "#quotation" },
  { icon: "settings", title: "Existing System Support", note: "For troubleshooting, maintenance and spare parts", href: `tel:${siteConfig.phone}` },
  { icon: "user", title: "Site Survey / Consultation", note: "For room or site evaluation and planning", href: "#quotation" },
];

export default function ContactPage() {
  const whatsappHref = buildWhatsAppHref();
  const emailAddress = `${siteConfig.emailUser}@${siteConfig.emailDomain}`;
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&t=&z=18&ie=UTF8&iwloc=B&output=embed`;
  const mapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address)}`;
  const contactStructuredData = {
    "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Sasha Corporation", url: `${siteConfig.canonicalOrigin}/contact/`,
    mainEntity: { "@type": "Organization", name: BRAND_NAME, telephone: siteConfig.phone, email: emailAddress, address: { "@type": "PostalAddress", streetAddress: siteConfig.address, addressCountry: "BD" } },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }} />
      <section className={styles.hero}>
        <Image src="/assets/contact/contact-office-reception.png" alt="Modern corporate reception prepared for integrated technology projects" fill priority sizes="100vw" className={styles.heroImage} />
        <div className={styles.heroVeil} />
        <div className={styles.shell}>
          <div className={styles.heroContent}>
            <Eyebrow>Contact Sasha Corporation</Eyebrow>
            <h1>Let&apos;s Discuss Your<br className={styles.desktopBreak} /> Technology Project</h1>
            <p>Tell us what you need — our team can help with product selection, BOQ, site survey, installation and technical support.</p>
            <div className={styles.heroActions}>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className={styles.primaryButton}><Icon name="whatsapp" size={18} /> WhatsApp Us</a>
              <a href={`tel:${siteConfig.phone}`} className={styles.secondaryButton}><Icon name="phone" size={18} /> Call Sales &amp; Support</a>
              <a href={`mailto:${emailAddress}`} className={styles.secondaryButton}><Icon name="mail" size={18} /> Email Us</a>
            </div>
            <div className={styles.heroBenefits}>
              <div><span><Icon name="clock" size={18} /></span><b>Quick Response</b><small>During business hours</small></div>
              <div><span><Icon name="user" size={18} /></span><b>Expert Support</b><small>From our team</small></div>
              <div><span><Icon name="shield" size={18} /></span><b>End-to-End Solution</b><small>From planning to installation</small></div>
            </div>
          </div>
          <div className={styles.heroBrand} aria-label="Sasha Corporation">
            <Image src="/assets/brand/sasha/sasha-corporation-final-l.webp" alt="Sasha Corporation" width={240} height={110} />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.contactSection}`} id="quotation">
        <div className={`${styles.shell} ${styles.contactGrid}`}>
          <aside className={styles.contactCard}>
            <h2>Contact Our Team</h2>
            <p className={styles.cardIntro}>We&apos;re here to help. Reach out to us through any of the following channels.</p>
            <div className={styles.contactList}>
              <div className={styles.contactItem}><span><Icon name="phone" /></span><div><b>Phone</b><a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a></div></div>
              <div className={styles.contactItem}><span><Icon name="mail" /></span><div><b>Email</b><EmailReveal user={siteConfig.emailUser} domain={siteConfig.emailDomain} title="Email Sasha Corporation" /></div></div>
              <div className={styles.contactItem}><span><Icon name="pin" /></span><div><b>Office Address</b><p>{siteConfig.address}</p></div></div>
              <div className={styles.contactItem}><span><Icon name="clock" /></span><div><b>Business Hours</b><p>Sat – Thu, 10:00 AM – 7:00 PM</p></div></div>
            </div>
            <div className={styles.contactActions}>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className={styles.whatsappButton}><Icon name="whatsapp" size={17} /> WhatsApp</a>
              <a href={`tel:${siteConfig.phone}`} className={styles.navyButton}><Icon name="phone" size={17} /> Call Now</a>
              <a href={mapOpenUrl} target="_blank" rel="noreferrer" className={styles.outlineButton}>Get Directions</a>
            </div>
          </aside>
          <div className={styles.formCard}>
            <h2>Request a Quotation</h2>
            <p className={styles.cardIntro}>Fill in the details below and our team will get back to you shortly.</p>
            <ContactForm maroon="#ff6a00" maroonDark="#ed5d00" conferenceProducts={conferenceQuoteProducts} rentalProducts={rentalQuoteProducts} />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.responseSection}`}>
        <div className={styles.shell}>
          <div className={styles.responseHeading}>
            <div><Eyebrow>Get a faster &amp; more accurate quotation</Eyebrow><h2>What to Share for a Faster Response</h2></div>
            <p>The more details you provide, the better we can understand your requirement and recommend the right solution.</p>
          </div>
          <div className={styles.responseGrid}>
            {responseItems.map((item) => <div className={styles.responseItem} key={item.title}><span><Icon name={item.icon} /></span><b>{item.title}</b><small>{item.note}</small></div>)}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.officeSection}`}>
        <div className={`${styles.shell} ${styles.officeCard}`}>
          <div className={styles.mapFrame}><iframe title="Sasha Corporation office location" src={mapEmbedSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          <div className={styles.officeDetails}>
            <h2>Visit Our Office</h2><p className={styles.cardIntro}>You are always welcome to visit our office for a better discussion.</p>
            <div><Icon name="pin" /><span>{siteConfig.address}</span></div>
            <div><Icon name="clock" /><span>Sat – Thu, 10:00 AM – 7:00 PM</span></div>
            <div><Icon name="phone" /><a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a></div>
            <a href={mapOpenUrl} target="_blank" rel="noreferrer" className={styles.mapButton}><Icon name="map" size={18} /> Open in Google Maps <Icon name="arrow" size={17} /></a>
          </div>
          <div className={styles.officeImage}>
            <Image src="/assets/contact/contact-office-reception.png" alt="Sasha Corporation office reception" fill sizes="(max-width: 900px) 100vw, 300px" />
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.helpSection}`}>
        <div className={styles.shell}>
          <Eyebrow>How can we help you?</Eyebrow>
          <div className={styles.helpGrid}>
            {helpItems.map((item) => <Link href={item.href} className={styles.helpCard} key={item.title}><span><Icon name={item.icon} /></span><div><b>{item.title}</b><small>{item.note}</small></div><Icon name="arrow" size={19} /></Link>)}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={`${styles.shell} ${styles.finalCtaInner}`}>
          <div><h2>Not Sure Which Solution You Need?</h2><p>Talk to our team and we&apos;ll help you identify the right system for your project.</p></div>
          <div><a href={whatsappHref} target="_blank" rel="noreferrer" className={styles.primaryButton}><Icon name="whatsapp" size={19} /> Chat on WhatsApp</a><a href={`tel:${siteConfig.phone}`} className={styles.darkOutlineButton}><Icon name="phone" size={19} /> Call Our Team</a></div>
        </div>
      </section>
    </main>
  );
}
