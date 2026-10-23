/**
 * The visitor's IP as the proxy in front of this site reports it, so the API can rate-limit
 * per visitor rather than per website. The rightmost entry is the one our proxy added.
 */
export function visitorIp(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || null;
}
