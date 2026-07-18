"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "../../lib/site";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [showMessenger, setShowMessenger] = useState(false);

  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const messenger = siteConfig.socials.facebook;

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 250);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setShowMessenger((prev) => !prev);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-center gap-3 md:bottom-6 md:right-6">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`grid h-12 w-12 place-items-center rounded-full border bg-white text-slate-900 shadow-lg transition ${
          showTop ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
        }`}
        style={{ borderColor: "rgba(15,23,42,0.12)" }}
      >
        <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true">
          <path d="M10 14V6M10 6l-4 4M10 6l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <a
        href={showMessenger ? messenger : wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={showMessenger ? "Chat on Messenger" : "Chat on WhatsApp"}
        className={`grid h-14 w-14 place-items-center rounded-2xl text-white shadow-lg transition hover:-translate-y-0.5 ${
          showMessenger ? "bg-[#1877F2] hover:bg-[#166fe0]" : "bg-emerald-600 hover:bg-emerald-700"
        }`}
        title={showMessenger ? "Messenger" : "WhatsApp"}
      >
        <span className="sr-only">{showMessenger ? "Chat on Messenger" : "Chat on WhatsApp support"}</span>
        {showMessenger ? (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.91 1.46 5.51 3.75 7.2V22l3.2-1.76c.98.27 2.01.41 3.05.41 5.52 0 10-4.14 10-9.25S17.52 2 12 2zm1.09 12.34-2.54-2.7-4.8 2.7 5.28-5.61 2.58 2.7 4.74-2.7-5.26 5.61z" />
          </svg>
        ) : (
          <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true">
            <path d="M19.11 17.53c-.27-.14-1.63-.8-1.88-.9-.25-.09-.43-.14-.61.14-.18.27-.7.9-.86 1.09-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.21-1.37-.82-.73-1.37-1.63-1.53-1.9-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.12 2.81c.14.18 1.93 2.95 4.68 4.13.66.28 1.17.45 1.57.57.66.21 1.26.18 1.73.11.53-.08 1.63-.66 1.86-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.2-.52-.34z" />
            <path d="M26.67 5.33C23.83 2.49 20.06.93 16 .93 7.89.93 1.33 7.49 1.33 15.6c0 2.6.68 5.14 1.97 7.39L1.33 31.07l8.27-1.97c2.17 1.18 4.62 1.8 7.13 1.8h.01c8.11 0 14.67-6.56 14.67-14.67 0-4.06-1.56-7.83-4.4-10.9zm-10.94 23.1h-.01c-2.2 0-4.36-.59-6.24-1.71l-.45-.27-4.91 1.17 1.17-4.79-.29-.49c-1.23-1.95-1.88-4.21-1.88-6.52C3.13 8.53 8.93 2.73 16 2.73c3.5 0 6.78 1.36 9.26 3.83 2.47 2.47 3.83 5.76 3.83 9.26 0 7.07-5.8 12.67-12.67 12.61z" />
          </svg>
        )}
      </a>
    </div>
  );
}
