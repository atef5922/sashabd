import { permanentRedirect } from "next/navigation";

export default function LegacyTurnstileGateSystemPage() {
  permanentRedirect("/turnstile-gate/");
}
