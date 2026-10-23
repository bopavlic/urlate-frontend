// Same rules as the API (urlate-backend/src/domain/invite.ts): Crockford base32, 8 characters,
// typed however people like. Anything else never reaches the API's URL path.
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const LENGTH = 8;
const LOOK_ALIKES: Record<string, string> = { O: "0", I: "1", L: "1" };

export function normalizeInviteCode(input: string): string | null {
  const code = input
    .toUpperCase()
    .replace(/[\s-]/g, "")
    .replace(/[OIL]/g, (char) => LOOK_ALIKES[char]!);
  if (code.length !== LENGTH) return null;
  for (const char of code) if (!ALPHABET.includes(char)) return null;
  return code;
}

/** "AB12CD34" → "AB12-CD34", easier to read out and type. */
export function formatInviteCode(code: string): string {
  return `${code.slice(0, 4)}-${code.slice(4)}`;
}

export function initials(name: string): string {
  const letters = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
  return letters || "?";
}
