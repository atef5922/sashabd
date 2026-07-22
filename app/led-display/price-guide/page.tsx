import { permanentRedirect } from "next/navigation";

export default function LegacyPriceGuidePage() {
  permanentRedirect("/led-display/");
}
