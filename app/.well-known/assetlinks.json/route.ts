import { connection } from "next/server";
import { assetLinks } from "@/src/well-known/app-links";

// Android App Links for urlate.app/i/* and /s/*: comma-separated SHA-256 fingerprints of the
// app's signing certificates (debug, upload and Play signing), read per request.
export async function GET() {
  await connection();
  const body = assetLinks(process.env.ANDROID_SHA256_CERT_FINGERPRINTS);
  if (!body) return new Response("Not found", { status: 404 });
  return Response.json(body);
}
