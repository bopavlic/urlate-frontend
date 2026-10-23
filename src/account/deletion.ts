// Form helpers for /delete-account (Google Play requires a web page for deletion requests).

export function parseEmail(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

export function parseCode(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  const code = value.replace(/\s/g, "");
  return /^\d{6}$/.test(code) ? code : null;
}

const MESSAGES: Record<string, string> = {
  INVALID_CODE:
    "That code is wrong or has expired. Check the latest email, or start again for a new code.",
  RATE_LIMITED: "Too many tries. Wait 15 minutes and try again.",
};

export function deletionErrorMessage(code: string | undefined): string {
  return (
    (code && MESSAGES[code]) ||
    "Something went wrong on our side. Please try again in a minute."
  );
}
