export type TurnstileFaq = { q: string; a: string };

export type TurnstileKind =
  | "tripod_turnstile"
  | "flap_barrier"
  | "swing_speed_gate"
  | "full_height_turnstile"
  | "waist_high_turnstile"
  | "ai_face_turnstile";

export type TurnstileItem = {
  slug: string;
  title: string;
  subtitle: string;
  priceLabel: string;
  tags: string[];
  image: string;
  kind: TurnstileKind;
};

// Item names/labels align with the referenced model list.
// Detail page text/specs are written uniquely to avoid copying.
export const turnstileCatalog: TurnstileItem[] = [
  {
    slug: "tripod-turnstile-gate-access-control-system",
    title: "Quantum Tripod Turnstile DS-Q50S for Secure Access",
    subtitle: "Single-lane tripod turnstile option for controlled entry with RFID/biometric device integration.",
    priceLabel: "৳350,000 – ৳480,000",
    tags: ["Access Control", "Security Gate", "Turnstile"],
    image: "/images/Turnstile/Tripod-Turnstile-Gate-Access.webp",
    kind: "tripod_turnstile",
  },
  {
    slug: "flap-barrier-access-control-gate",
    title: "Flap Barrier Turnstile Gate DS318 with Stainless Steel Body",
    subtitle: "Premium optical barrier gate for modern lobbies with anti-tailgating sensor logic and access integration.",
    priceLabel: "৳520,000 – ৳850,000",
    tags: ["Flap Barrier", "Optical Turnstile", "Access Control"],
    image: "/images/Turnstile/Flap-Barrier-Access-Control-Gate.webp",
    kind: "flap_barrier",
  },
  {
    slug: "swing-barrier-speed-gate-turnstile",
    title: "DS2000 Swing Turnstile Gate Price in Bangladesh",
    subtitle: "Fast passage gate for premium entrances with sensors and wide-lane friendly options.",
    priceLabel: "৳340,000 – ৳495,000",
    tags: ["Speed Gate", "Swing Barrier", "Premium Turnstile"],
    image: "/images/Turnstile/Swing-Barrier-Speed-Gate.webp",
    kind: "swing_speed_gate",
  },
  {
    slug: "full-height-turnstile-gate-for-factory-restricted-entry",
    title: "DS-Q20 Turnstile Gate Advanced Access Control System",
    subtitle:
      "Heavy-duty full-height gate for high-security entrances—ideal for factories and restricted zones with strict access policies and logging.",
    priceLabel: "৳550,000 – ৳780,000",
    tags: ["Full Height", "High Security", "Factory Entry"],
    image: "/images/Turnstile/Full-Height-Turnstile-Gate.webp",
    kind: "full_height_turnstile",
  },
  {
    slug: "waist-high-turnstile-gate-single-double-lane",
    title: "Waist-High Turnstile Gate Single / Double Lane",
    subtitle: "Durable waist-high turnstile solution for moderate traffic entry points with access device support.",
    priceLabel: "৳295,000 – ৳620,000",
    tags: ["Turnstile", "Access Control", "Security"],
    image: "/images/Turnstile/Waist-High-Turnstile-Gate.webp",
    kind: "waist_high_turnstile",
  },
  {
    slug: "ai-face-recognition-turnstile-gate",
    title: "AI Face Recognition Turnstile Gate",
    subtitle: "Smart gate option with face recognition terminal integration and attendance/HR reporting workflows.",
    priceLabel: "৳650,000 – ৳1,200,000",
    tags: ["Biometric", "Face Recognition", "Smart Gate"],
    image: "/images/Turnstile/AI-Face-Recognition-Turnstile-Gate.webp",
    kind: "ai_face_turnstile",
  },
  {
    slug: "ds312-flap-turnstile-gate",
    title: "DS312 Flap Turnstile Gate",
    subtitle: "Compact flap turnstile solution for office, bank, and lobby access control with RFID or biometric integration.",
    priceLabel: "৳480,000 – ৳780,000",
    tags: ["Flap Barrier", "Access Control", "Lobby Turnstile"],
    image: "/images/Turnstile/DS312-flap-turnstile-dimension-600x600.webp",
    kind: "flap_barrier",
  },
  {
    slug: "daosafe-ds112-tripod-turnstile",
    title: "Daosafe DS112 Tripod Turnstile Gate",
    subtitle: "Stainless steel tripod turnstile for staff entrance, attendance control, and controlled pedestrian flow.",
    priceLabel: "৳320,000 – ৳460,000",
    tags: ["Tripod Turnstile", "Access Control", "Attendance"],
    image: "/images/Turnstile/Daosafe-ds112-tripod-turnstile-dimension-600x600.webp",
    kind: "tripod_turnstile",
  },
  {
    slug: "ds212-swing-turnstile-gate",
    title: "DS212 Swing Turnstile Gate",
    subtitle: "Swing barrier turnstile for premium entrances, wide lane access, and fast visitor or staff movement.",
    priceLabel: "৳360,000 – ৳520,000",
    tags: ["Swing Barrier", "Speed Gate", "Wide Lane"],
    image: "/images/Turnstile/ds212-swing-turnstile-size-600x600.webp",
    kind: "swing_speed_gate",
  },
  {
    slug: "ds2000-speed-gate-turnstile",
    title: "DS2000 Speed Gate Turnstile",
    subtitle: "Modern speed gate turnstile for corporate reception, commercial buildings, and high-traffic entry points.",
    priceLabel: "৳420,000 – ৳680,000",
    tags: ["Speed Gate", "Swing Barrier", "Premium Entrance"],
    image: "/images/Turnstile/DS2000-dimension-600x600.webp",
    kind: "swing_speed_gate",
  },
  {
    slug: "ds-q50s-tripod-turnstile-gate",
    title: "DS-Q50S Tripod Turnstile Gate",
    subtitle: "Tripod gate model for secure entry control with card reader, fingerprint, or face terminal support.",
    priceLabel: "৳350,000 – ৳480,000",
    tags: ["Tripod Turnstile", "Security Gate", "RFID Access"],
    image: "/images/Turnstile/ds-q50s-tripod-gate-diemnsions-600x600.webp",
    kind: "tripod_turnstile",
  },
  {
    slug: "ds-q70-20-flap-barrier-turnstile",
    title: "DS-Q70-20 Flap Barrier Turnstile Gate",
    subtitle: "Flap barrier gate for modern access control projects with sensor-based passage control and smooth operation.",
    priceLabel: "৳520,000 – ৳850,000",
    tags: ["Flap Barrier", "Optical Turnstile", "Access Control"],
    image: "/images/Turnstile/ds-q70-20-768x768.webp",
    kind: "flap_barrier",
  },
];

export function getTurnstileBySlug(slug: string): TurnstileItem | undefined {
  return turnstileCatalog.find((x) => x.slug === slug);
}
