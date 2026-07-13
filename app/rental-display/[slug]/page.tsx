import { permanentRedirect } from "next/navigation";
import { rentalCatalog } from "@/lib/productsCatalog";

export async function generateStaticParams() {
  return rentalCatalog.map((x) => ({ slug: x.slug }));
}

export default async function RentalDisplayLegacyTopLevelProductRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/led-display/rental-display/${slug}/`);
}
