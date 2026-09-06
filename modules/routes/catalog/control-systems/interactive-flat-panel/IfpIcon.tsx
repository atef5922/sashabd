import type { CSSProperties } from "react";

const paths = {
  arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
  screen: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8m-4-4v4M7 8h10M7 12h5" /></>,
  pen: <><path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14v6Z" /></>,
  cast: <><path d="M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M3 12a7 7 0 0 1 7 7M3 16a3 3 0 0 1 3 3" /><circle cx="3" cy="20" r=".5" /></>,
  cpu: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" /><rect x="9" y="9" width="6" height="6" rx="1" /></>,
  users: <><circle cx="9" cy="7" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5v2" /></>,
  school: <><path d="m2 8 10-5 10 5-10 5-10-5Zm4 3v6c4 3 8 3 12 0v-6m4-3v9" /></>,
  shield: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z" /><path d="m8 12 3 3 5-6" /></>,
  clipboard: <><path d="M9 4H6a2 2 0 0 0-2 2v14h16V6a2 2 0 0 0-2-2h-3" /><rect x="9" y="2" width="6" height="4" rx="1" /><path d="M8 11h8m-8 4h6" /></>,
  settings: <><path d="m10 3-1 3-3 1-3-1-1 4 3 2v3l-2 2 3 3 3-1 3 1 1 2 4-1v-3l2-2 3-1-1-4-3-1-1-3 1-3-4-1-2 2Z" /><circle cx="12" cy="12" r="3" /></>,
  headset: <><path d="M4 14v-3a8 8 0 0 1 16 0v7a3 3 0 0 1-3 3h-3" /><rect x="2" y="11" width="5" height="8" rx="2" /><rect x="17" y="11" width="5" height="8" rx="2" /></>,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 3h.01" /></>,
  phone: <path d="m7 3 3 5-3 2c1 4 3 6 7 7l2-3 5 3c-1 4-3 5-6 4C8 19 5 16 3 9 2 6 3 4 7 3Z" />,
  chat: <><path d="M21 11a9 9 0 0 1-13 8l-6 2 2-6a9 9 0 1 1 17-4Z" /><path d="M8 7c0 5 4 9 9 9M8 7l2 3m7 6-3-2" /></>,
} as const;

export type IfpIconName = keyof typeof paths;

export default function IfpIcon({ name, className, style }: { name: IfpIconName; className?: string; style?: CSSProperties }) {
  return <svg className={className} style={style} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name]}</svg>;
}
