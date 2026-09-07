"use client";

import { useEffect, useRef, useState } from "react";

import { BRAND_NAME } from "@/lib/brand";
import { siteConfig } from "@/lib/site";
import {
  getConferenceInquiryProductLabel,
  resolveConferenceInquiry,
  type ConferenceInquiryProduct,
  type ConferencePackageInquiry,
  type ConferenceRoomSizeInquiry,
} from "@/app/conference-system/conferenceInquiry";
import { resolveRentalInquiry, type RentalInquiryContext, type RentalInquiryProduct } from "./rentalInquiry";
import styles from "./contact.module.css";

type SubmitState = "idle" | "submitting" | "success" | "error";
const NO_RENTAL_PRODUCTS: readonly RentalInquiryProduct[] = [];

function SendIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>;
}

function PaperclipIcon() {
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m20.5 11.5-8.8 8.8a5 5 0 0 1-7.1-7.1l9.2-9.2a3.5 3.5 0 1 1 5 5l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.4-8.4" /></svg>;
}

export default function ContactForm({
  maroon,
  maroonDark,
  conferenceProducts = [],
  rentalProducts = NO_RENTAL_PRODUCTS,
}: {
  maroon: string;
  maroonDark: string;
  conferenceProducts?: readonly ConferenceInquiryProduct[];
  rentalProducts?: readonly RentalInquiryProduct[];
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedConferenceProducts, setSelectedConferenceProducts] = useState<ConferenceInquiryProduct[]>([]);
  const [selectedConferencePackage, setSelectedConferencePackage] = useState<ConferencePackageInquiry | null>(null);
  const [selectedConferenceRoomSize, setSelectedConferenceRoomSize] = useState<ConferenceRoomSizeInquiry | null>(null);
  const [inquiryProjectKey, setInquiryProjectKey] = useState("");
  const [selectedRentalInquiry, setSelectedRentalInquiry] = useState<RentalInquiryContext | null>(null);

  const email = `${siteConfig.emailUser}@${siteConfig.emailDomain}`;
  const actionUrl = `https://formsubmit.co/ajax/${encodeURIComponent(email)}`;

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams(window.location.search);
    const rentalContext = resolveRentalInquiry(params, rentalProducts);
    const context = resolveConferenceInquiry(params, conferenceProducts);
    if (!rentalContext && !context.projectType) return;

    queueMicrotask(() => {
      if (cancelled) return;
      setSelectedRentalInquiry(rentalContext);
      if (rentalContext) {
        setProjectType(rentalContext.projectType);
        setInquiryProjectKey(rentalContext.projectKey);
        setMessage((current) => current || rentalContext.message);
        return;
      }
      setProjectType(context.projectType);
      setInquiryProjectKey(context.projectKey);
      setSelectedConferenceProducts(context.products);
      setSelectedConferencePackage(context.packageInquiry);
      setSelectedConferenceRoomSize(context.roomSizeInquiry);
      if (context.message) setMessage((current) => current || context.message);
    });
    return () => { cancelled = true; };
  }, [conferenceProducts, rentalProducts]);

  const subject = projectType ? `${BRAND_NAME} — New ${projectType} inquiry` : `${BRAND_NAME} — New project inquiry`;
  const quotationContext = selectedConferenceProducts.length
    ? selectedConferenceProducts.map(getConferenceInquiryProductLabel).join(", ")
    : selectedConferencePackage?.label || selectedConferenceRoomSize?.label || selectedRentalInquiry?.packageInquiry?.label;

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current || state === "submitting") return;
    setState("submitting");
    setErrorMessage("");

    try {
      const formData = new FormData(formRef.current);
      if (String(formData.get("_honey") ?? "").trim()) {
        setState("success");
        return;
      }
      const response = await fetch(actionUrl, { method: "POST", body: formData, headers: { Accept: "application/json" } });
      if (!response.ok) {
        const details = await response.text().catch(() => "");
        throw new Error(details || "Submission failed. Please try again.");
      }
      formRef.current.reset();
      setProjectType("");
      setMessage("");
      setFileName("");
      setState("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Submission failed. Please try again.");
      setState("error");
    }
  }

  return (
    <form ref={formRef} className={styles.quoteForm} onSubmit={submitForm} encType="multipart/form-data">
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" className={styles.honeyField} tabIndex={-1} autoComplete="off" />
      {inquiryProjectKey ? <input type="hidden" name="inquiry_project" value={inquiryProjectKey} /> : null}
      {selectedRentalInquiry ? (["package", "model", "event", "service"] as const).map((field) => {
        const detail = selectedRentalInquiry[`${field}Inquiry`];
        return detail ? <span key={field} hidden><input type="hidden" name={`rental_${field}_key`} value={detail.key} /><input type="hidden" name={`rental_${field}`} value={detail.label} /></span> : null;
      }) : null}
      {selectedConferenceProducts.length ? <><input type="hidden" name="conference_product_slugs" value={selectedConferenceProducts.map((product) => product.slug).join(", ")} /><input type="hidden" name="conference_products" value={selectedConferenceProducts.map(getConferenceInquiryProductLabel).join(", ")} /></> : null}
      {selectedConferencePackage ? <><input type="hidden" name="conference_package_key" value={selectedConferencePackage.key} /><input type="hidden" name="conference_package" value={selectedConferencePackage.label} /></> : null}
      {selectedConferenceRoomSize ? <input type="hidden" name="conference_room_size" value={selectedConferenceRoomSize.key} /> : null}

      {quotationContext ? <div className={styles.formContext} style={{ borderColor: `${maroon}35` }}><b>Quotation context:</b> {quotationContext}</div> : null}

      <div className={styles.formField}>
        <label htmlFor="contact-name">Full Name <span>*</span></label>
        <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="Your full name" />
      </div>
      <div className={styles.formField}>
        <label htmlFor="contact-phone">Phone Number <span>*</span></label>
        <input id="contact-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+880" />
      </div>
      <div className={styles.formField}>
        <label htmlFor="contact-email">Email Address</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="your@email.com" />
      </div>
      <div className={styles.formField}>
        <label htmlFor="contact-type">Solution Type <span>*</span></label>
        <select id="contact-type" name="project_type" required value={projectType} onChange={(event) => setProjectType(event.currentTarget.value)}>
          <option value="">Select a solution</option>
          <option>Indoor LED Display</option><option>Outdoor LED Display</option><option>Rental LED Display</option><option>Conference System</option><option>Hybrid / Video Meeting Room</option><option>PA Sound System</option><option>Turnstile Gate System</option><option>Accessories / Controller</option><option>Service &amp; Support</option>
        </select>
      </div>
      <div className={styles.formField}>
        <label htmlFor="project-location">Project Location <span>*</span></label>
        <input id="project-location" name="project_location" type="text" required placeholder="Dhaka" />
      </div>
      <div className={styles.formField}>
        <label htmlFor="project-quantity">Quantity / Room / Screen Size</label>
        <input id="project-quantity" name="quantity_or_size" type="text" placeholder="e.g. 2 units / 1 room / 10ft × 6ft" />
      </div>
      <div className={`${styles.formField} ${styles.formWide}`}>
        <label htmlFor="project-timeline">Expected Timeline</label>
        <select id="project-timeline" name="expected_timeline" defaultValue=""><option value="" disabled>Select timeline</option><option>Immediately</option><option>Within 2 weeks</option><option>Within 1 month</option><option>Within 3 months</option><option>Planning stage</option></select>
      </div>
      <div className={`${styles.formField} ${styles.formWide}`}>
        <label htmlFor="contact-message">Requirement Details <span>*</span></label>
        <textarea id="contact-message" name="message" required rows={4} value={message} onChange={(event) => setMessage(event.currentTarget.value)} placeholder="Tell us about your project, requirements, and any specific details..." />
      </div>

      <label className={`${styles.fileField} ${styles.formWide}`} htmlFor="contact-attachment">
        <PaperclipIcon />
        <span><b>Attach Drawing / BOQ / Reference File (Optional)</b><small>PDF, DWG, JPG, PNG (Max 10MB)</small></span>
        <em>{fileName || "Choose File"}</em>
        <input id="contact-attachment" name="attachment" type="file" accept=".pdf,.dwg,.jpg,.jpeg,.png" onChange={(event) => setFileName(event.currentTarget.files?.[0]?.name || "")} />
      </label>

      {state === "success" ? <div className={`${styles.formStatus} ${styles.formSuccess}`} role="status">Thank you. Your project requirement has been sent successfully.</div> : null}
      {state === "error" ? <div className={`${styles.formStatus} ${styles.formError}`} role="alert">Could not submit right now. Please try again or WhatsApp us.{errorMessage ? <small>{errorMessage}</small> : null}</div> : null}

      <button type="submit" disabled={state === "submitting"} className={styles.submitButton} style={{ background: `linear-gradient(135deg, ${maroon}, ${maroonDark})` }}><SendIcon /> {state === "submitting" ? "Sending Requirement..." : "Send Project Requirement"}</button>
      <p className={styles.responseNote}>▣ We usually respond during business hours.</p>
    </form>
  );
}
