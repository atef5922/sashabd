import type { ReactNode } from "react";

const shapes = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  speaker: <><rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="15" r="4" /><circle cx="12" cy="6" r="1" /></>,
  mic: <><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8" /></>,
  amp: <><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="16" cy="12" r="3" /><path d="M5 9h4m-4 3h4m-4 3h4" /></>,
  network: <><rect x="8" y="2" width="8" height="5" rx="1" /><path d="M12 7v5M4 16v-4h16v4" /><rect x="1" y="16" width="6" height="5" rx="1" /><rect x="9" y="16" width="6" height="5" rx="1" /><rect x="17" y="16" width="6" height="5" rx="1" /><path d="M12 12v4" /></>,
  settings: <><path d="M4 3v18M12 3v18M20 3v18" /><path d="M1 8h6m2 8h6m2-10h6" /></>,
  building: <><path d="M4 22V3h12v19M16 9h4v13M2 22h20M8 7h4M8 11h4m-4 4h4m-4 7v-3h4v3" /></>,
  school: <><path d="m2 8 10-5 10 5-10 5L2 8Zm4 3v7c4 3 8 3 12 0v-7m4-3v10" /></>,
  mosque: <><path d="M5 12h14v10H5V12Zm1 0c0-4 6-7 6-7s6 3 6 7M2 22V8m20 14V8M9 22v-5a3 3 0 0 1 6 0v5M12 2v3" /></>,
  factory: <><path d="M3 22V4h4v10l7-5v5l7-5v13H3ZM7 18h1m4 0h1m4 0h1" /></>,
  health: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M8 4V2h8v2m-4 4v8m-4-4h8" /></>,
  shop: <><path d="M3 10V5h18v5M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M4 13v9h16v-9M9 22v-7h6v7" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  shield: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z" /><path d="m8 12 3 3 5-6" /></>,
  plan: <><rect x="4" y="4" width="16" height="18" rx="2" /><rect x="9" y="2" width="6" height="4" rx="1" /><path d="M8 11h8m-8 4h8m-8 4h5" /></>,
  headset: <><path d="M4 12v-1a8 8 0 0 1 16 0v7a3 3 0 0 1-3 3h-3" /><rect x="2" y="11" width="5" height="8" rx="2" /><rect x="17" y="11" width="5" height="8" rx="2" /></>,
  search: <><circle cx="10" cy="10" r="7" /><path d="m15 15 6 6" /></>,
  chat: <><path d="M21 11a9 9 0 0 1-13 8l-6 2 2-6a9 9 0 1 1 17-4Z" /><path d="M8 7c0 5 4 9 9 9M8 7l2 3m7 6-3-2" /></>,
} satisfies Record<string, ReactNode>;
export type PaIconName = keyof typeof shapes;
export default function PaIcon({ name }: { name: PaIconName }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shapes[name]}</svg>;
}
