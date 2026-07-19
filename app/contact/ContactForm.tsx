"use client";

import { useRef, useState } from "react";

import { BRAND_NAME } from "@/lib/brand";
import { siteConfig } from "@/lib/site";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactForm({
  maroon,
  maroonDark,
}: {
  maroon: string;
  maroonDark: string;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const email = `${siteConfig.emailUser}@${siteConfig.emailDomain}`;
  const actionUrl = `https://formsubmit.co/ajax/${encodeURIComponent(email)}`;

  return (
    <form
      ref={formRef}
      className="mt-5 grid gap-3 md:grid-cols-2 md:gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!formRef.current) return;
        if (state === "submitting") return;

        setState("submitting");
        setErrorMessage("");

        try {
          const formData = new FormData(formRef.current);
          const honey = String(formData.get("_honey") ?? "").trim();
          if (honey) {
            setState("success");
            formRef.current.reset();
            return;
          }

          const res = await fetch(actionUrl, {
            method: "POST",
            body: formData,
            headers: { Accept: "application/json" },
          });

          if (!res.ok) {
            const text = await res.text().catch(() => "");
            setErrorMessage(text || "Submission failed. Please try again.");
            setState("error");
            return;
          }

          setState("success");
          formRef.current.reset();
        } catch (err) {
          setErrorMessage(err instanceof Error ? err.message : "Submission failed. Please try again.");
          setState("error");
        }
      }}
    >
      {/* FormSubmit config */}
      <input type="hidden" name="_subject" value={`${BRAND_NAME} — New contact inquiry`} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label htmlFor="contact-name" className="text-sm font-semibold text-slate-900">
          Full Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="mt-2 w-full rounded-[12px] border px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 md:rounded-xl md:py-3"
          style={{ borderColor: `${maroon}22` }}
        />
      </div>

      <div>
        <label htmlFor="contact-phone" className="text-sm font-semibold text-slate-900">
          Phone Number
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          required
          placeholder="+8801XXXXXXXXX"
          className="mt-2 w-full rounded-[12px] border px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 md:rounded-xl md:py-3"
          style={{ borderColor: `${maroon}22` }}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm font-semibold text-slate-900">
          Email (Optional)
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="mt-2 w-full rounded-[12px] border px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 md:rounded-xl md:py-3"
          style={{ borderColor: `${maroon}22` }}
        />
      </div>

      <div>
        <label htmlFor="contact-type" className="text-sm font-semibold text-slate-900">
          Project Type
        </label>
        <select
          id="contact-type"
          name="project_type"
          className="mt-2 w-full rounded-[12px] border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:ring-2 md:rounded-xl md:py-3"
          style={{ borderColor: `${maroon}22` }}
          defaultValue="Indoor LED Display"
        >
          <option>Indoor LED Display</option>
          <option>Outdoor LED Display</option>
          <option>Rental LED Display</option>
          <option>PA Sound System</option>
          <option>Turnstile Gate System</option>
          <option>Accessories / Controller</option>
          <option>Service & Support</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label htmlFor="contact-message" className="text-sm font-semibold text-slate-900">
          Requirement Details
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Share location, screen size, indoor/outdoor, and timeline..."
          className="mt-2 w-full rounded-[12px] border px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-2 md:rounded-xl"
          style={{ borderColor: `${maroon}22` }}
        />
      </div>

      {state === "success" ? (
        <div
          className="md:col-span-2 rounded-xl border px-4 py-3 text-sm font-semibold"
          style={{ borderColor: `${maroon}22`, background: `${maroon}0D`, color: maroonDark }}
          role="status"
        >
          Your request is submitted.
        </div>
      ) : null}

      {state === "error" ? (
        <div
          className="md:col-span-2 rounded-xl border px-4 py-3 text-sm font-semibold text-red-700"
          style={{ borderColor: "rgba(185,28,28,0.25)", background: "rgba(185,28,28,0.06)" }}
          role="alert"
        >
          Could not submit right now. Please try again or WhatsApp us.
          {errorMessage ? <div className="mt-1 text-xs font-medium text-red-700/90">{errorMessage}</div> : null}
        </div>
      ) : null}

      <div className="md:col-span-2 flex flex-col items-start gap-2 md:flex-row md:flex-wrap md:items-center md:gap-3">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex min-h-10 items-center justify-center rounded-md px-4 py-2.5 text-[11px] font-extrabold text-white shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70 md:rounded-xl md:px-5 md:py-3 md:text-sm md:font-semibold"
          style={{ background: maroonDark }}
        >
          {state === "submitting" ? "Submitting..." : "Send Inquiry"}
        </button>
        <span className="text-xs text-slate-500">Submitting sends your inquiry to our team email.</span>
      </div>
    </form>
  );
}
