import AccessoryLandingPage, { accessoryMetadata } from "./AccessoryLandingPage";

export const metadata = accessoryMetadata("power-supply");

export default function PowerSupplyListingPage() {
  return <AccessoryLandingPage category="power-supply" />;
}
