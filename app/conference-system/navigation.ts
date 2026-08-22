import { conferenceBrandConfigs, conferenceCategoryConfigs } from "./taxonomy";

export type ConferenceNavigationItem = {
  href: string;
  label: string;
  shortLabel?: string;
  description?: string;
};

export type ConferenceNavigationGroup = {
  id: "system" | "component" | "package" | "brand";
  title: string;
  items: readonly ConferenceNavigationItem[];
};

export const conferenceNavigationGroups: readonly ConferenceNavigationGroup[] = [
  {
    id: "system",
    title: "System Types",
    items: conferenceCategoryConfigs
      .filter((category) => category.group === "system" || category.group === "connection")
      .map((category) => ({
        href: `/conference-system/${category.slug}/`,
        label: category.label,
        shortLabel: category.shortLabel,
      })),
  },
  {
    id: "component",
    title: "Core Components",
    items: conferenceCategoryConfigs
      .filter((category) => category.group === "component")
      .map((category) => ({
        href: `/conference-system/${category.slug}/`,
        label: category.shortLabel ?? category.label,
      })),
  },
  {
    id: "package",
    title: "Complete Setup",
    items: conferenceCategoryConfigs
      .filter((category) => category.group === "package")
      .map((category) => ({
        href: `/conference-system/${category.slug}/`,
        label: category.label,
        description: "Complete room-based conference system planning",
      })),
  },
  {
    id: "brand",
    title: "Featured Brands",
    items: conferenceBrandConfigs
      .filter((brand) => brand.featured)
      .map((brand) => ({
        href: `/conference-system/brands/${brand.slug}/`,
        label: brand.name,
      })),
  },
];

export const conferenceBrandsHubLink: ConferenceNavigationItem = {
  href: "/conference-system/brands/",
  label: "View All Brands",
};
