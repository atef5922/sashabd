import type { AccessoryCategory } from "./landing-content";

// Category illustrations only; exact product photography remains in the catalog.
export const accessoryHeroArt: Record<AccessoryCategory, { src: string; alt: string }> = {
  "receiving-card": { src: "/images/accessories/heroes/receiving-card-hero.webp", alt: "Illustration of LED receiving circuit boards and a modular display cabinet" },
  controller: { src: "/images/accessories/heroes/controller-hero.webp", alt: "Illustration of rackmount LED video processors with a video wall" },
  "power-supply": { src: "/images/accessories/heroes/power-supply-hero.webp", alt: "Illustration of enclosed LED cabinet power supplies in a technical workspace" },
  "led-accessories": { src: "/images/accessories/heroes/led-accessories-hero.webp", alt: "Illustration of LED ribbon cables, connectors, fixing hardware and a transport case" },
};
