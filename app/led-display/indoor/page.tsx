import { permanentRedirect } from "next/navigation";

export default function LegacyIndoorRedirectPage() {
  permanentRedirect("/led-display/indoor-led/");
}
