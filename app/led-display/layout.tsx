import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LED Display | Bangladesh",
  description: "Browse indoor, outdoor, and rental LED display solutions in Bangladesh.",
};

export default function LedDisplayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="products-underlined">{children}</div>;
}
