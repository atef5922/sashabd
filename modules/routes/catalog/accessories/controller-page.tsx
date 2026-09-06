import AccessoryLandingPage, { accessoryMetadata } from "./AccessoryLandingPage";

export const metadata = accessoryMetadata("controller");

export default function ControllerProductsPage() {
  return <AccessoryLandingPage category="controller" />;
}
