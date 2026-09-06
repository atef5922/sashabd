import AccessoryLandingPage, { accessoryMetadata } from "./AccessoryLandingPage";

export const metadata = accessoryMetadata("receiving-card");

export default function ReceivingCardListingPage() {
  return <AccessoryLandingPage category="receiving-card" />;
}
