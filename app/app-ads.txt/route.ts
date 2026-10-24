import { connection } from "next/server";
import { appAdsTxt } from "@/src/well-known/app-ads";

// urlate.app/app-ads.txt for AdMob, from ADMOB_PUBLISHER_ID (pub-…), read per request.
export async function GET() {
  await connection();
  const body = appAdsTxt(process.env.ADMOB_PUBLISHER_ID);
  if (!body) return new Response("Not found", { status: 404 });
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
