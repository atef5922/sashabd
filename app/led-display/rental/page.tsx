import { permanentRedirect } from "next/navigation";

export default function LegacyRentalRedirectPage() {
  permanentRedirect("/led-display/rental-display/");
}
