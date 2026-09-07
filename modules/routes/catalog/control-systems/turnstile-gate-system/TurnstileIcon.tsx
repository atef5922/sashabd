import type { ReactNode } from "react";

const shapes = {
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>,
  gate: <><rect x="2" y="5" width="5" height="16" rx="1" /><rect x="17" y="5" width="5" height="16" rx="1" /><path d="M7 9h4v10H7m10-10h-4v10h4M4 8h1m14 0h1" /></>,
  shield: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z" /><path d="m8 12 3 3 5-6" /></>,
  card: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h4" /></>,
  face: <><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M8 9h.01M16 9h.01M9 16c2 1 4 1 6 0M12 10v3h1" /></>,
  fingerprint: <><path d="M4 10a8 8 0 0 1 16 0M7 20c2-3 2-5 2-9a3 3 0 0 1 6 0c0 5 0 8 3 10M4 15v-4a8 8 0 0 1 1-4M6 17v-6a6 6 0 0 1 12 0v4M12 11c0 5 0 8-2 11m4-4 1 4M20 11v7" /></>,
  qr: <><path d="M3 3h6v6H3zm12 0h6v6h-6zM3 15h6v6H3zm12 0h3v3h-3zm3 3h3v3h-3zM12 3v9H3m9 3v6m3-9h6" /></>,
  building: <><path d="M4 22V3h12v19M16 10h4v12M2 22h20M8 7h4m-4 4h4m-4 4h4m-4 7v-3h4v3" /></>,
  factory: <><path d="M3 22V3h4v10l7-5v5l7-5v14H3ZM7 18h1m4 0h1m4 0h1" /></>,
  school: <><path d="m2 8 10-5 10 5-10 5L2 8Zm4 3v7c4 3 8 3 12 0v-7m4-3v10" /></>,
  health: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M8 4V2h8v2m-4 4v8m-4-4h8" /></>,
  users: <><circle cx="9" cy="7" r="4" /><path d="M2 21v-3a7 7 0 0 1 14 0v3M17 4a4 4 0 0 1 0 8m1 3a5 5 0 0 1 4 5v1" /></>,
  plan: <><rect x="4" y="4" width="16" height="18" rx="2" /><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M8 11h8m-8 4h8m-8 4h5" /></>,
  settings: <><path d="M4 3v18M12 3v18M20 3v18M1 8h6m2 8h6m2-10h6" /></>,
  support: <><path d="M4 12v-1a8 8 0 0 1 16 0v7a3 3 0 0 1-3 3h-3" /><rect x="2" y="11" width="5" height="8" rx="2" /><rect x="17" y="11" width="5" height="8" rx="2" /></>,
  tools: <><path d="M14.5 6.5a4 4 0 0 0-5-5l2.2 2.2-2.8 2.8-2.2-2.2a4 4 0 0 0 5 5L20 18a1.4 1.4 0 0 1-2 2l-8.3-8.3" /><path d="m5 13-3 3 6 6 3-3m-7-1 2 2" /></>,
  monitor: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4M6 7h12" /></>,
  team: <><circle cx="12" cy="7" r="3" /><circle cx="5" cy="9" r="2.5" /><circle cx="19" cy="9" r="2.5" /><path d="M7 21v-2a5 5 0 0 1 10 0v2M1 20v-1a4 4 0 0 1 5-4m17 5v-1a4 4 0 0 0-5-4" /></>,
  truck: <><path d="M3 5h11v12H3zM14 9h4l3 3v5h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
  link: <><path d="m9.5 14.5 5-5" /><path d="M7 17H5a4 4 0 0 1 0-8h3m9-2h2a4 4 0 0 1 0 8h-3" /></>,
  search: <><circle cx="10" cy="10" r="7" /><path d="m15 15 6 6" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
} satisfies Record<string, ReactNode>;

export type TurnstileIconName = keyof typeof shapes;
export default function TurnstileIcon({ name }: { name: TurnstileIconName }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shapes[name]}</svg>;
}
