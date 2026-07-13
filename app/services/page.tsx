import { permanentRedirect } from "next/navigation";

export default function LegacyServicesRedirectPage() {
  permanentRedirect("/services-support/");
}
