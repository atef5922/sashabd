import { permanentRedirect } from "next/navigation";

export default function LegacyBlogHubRedirectPage() {
  permanentRedirect("/blog/");
}
