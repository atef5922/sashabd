import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Products | ${BRAND_NAME}`,
  description:
    "Browse indoor and outdoor LED display solutions and related accessories in Bangladesh.",
  alternates: { canonical: "/led-display/" },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE:
  // আগে এখানে যে "Products" header/card ছিল (h1 Products + description)
  // সেটা remove করে দেওয়া হয়েছে।
  // এখন প্রতিটা child page (indoor/outdoor/accessories) নিজে নিজে banner/hero দেখাবে।
  return <div className="products-underlined">{children}</div>;
}
