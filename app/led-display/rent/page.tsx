import { permanentRedirect } from "next/navigation";

export default function RentLegacyRedirectPage() {
  permanentRedirect("/led-display/rent-guide/");
}
