import { createFileRoute } from "@tanstack/react-router";
import { profileHouseUrl, renderIosProfile } from "@/lib/ios-profile";

export const Route = createFileRoute("/api/ios-profile")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const house = profileHouseUrl(
          request.url,
          request.headers.get("x-forwarded-host"),
          request.headers.get("x-forwarded-proto"),
        );
        if (!house) return new Response("CINEVO could not build an iPhone profile for this address.", { status: 400 });
        return new Response(renderIosProfile(house), {
          headers: {
            "content-type": "application/x-apple-aspen-config",
            "content-disposition": 'attachment; filename="CINEVO.mobileconfig"',
            "cache-control": "no-store",
          },
        });
      },
    },
  },
});
