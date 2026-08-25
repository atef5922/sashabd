import { buildConferenceExplorerProducts } from "../conferenceExplorerData";
import { balanceConferenceProductsByBrand } from "../conferenceExplorerOrder";

export const dynamic = "force-static";

export function GET() {
  return Response.json(balanceConferenceProductsByBrand(buildConferenceExplorerProducts()), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
