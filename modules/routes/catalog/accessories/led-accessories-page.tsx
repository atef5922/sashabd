import AccessoryLandingPage, { accessoryMetadata } from "./AccessoryLandingPage";

export const metadata = accessoryMetadata("led-accessories");

export default function LedAccessoriesListingPage() {
  return <AccessoryLandingPage category="led-accessories" />;
}
