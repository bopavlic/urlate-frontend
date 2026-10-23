import { connection } from "next/server";
import { appleAppSiteAssociation } from "@/src/well-known/app-links";

// iOS universal links for urlate.app/i/* and /s/*. APPLE_TEAM_ID is read per request so one
// Docker image works before and after the Apple Developer account exists.
export async function GET() {
  await connection();
  const body = appleAppSiteAssociation(process.env.APPLE_TEAM_ID);
  if (!body) return new Response("Not found", { status: 404 });
  return Response.json(body);
}
