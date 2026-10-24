import { connection } from "next/server";

// Store listings are read per request, so the same Docker image goes live with the stores
// by changing env, not rebuilding. Render inside <Suspense fallback={<StoreLinksFallback />}>.

export async function StoreLinks() {
  await connection();
  const links = [
    { href: process.env.APP_STORE_URL, label: "Download on the App Store" },
    { href: process.env.PLAY_STORE_URL, label: "Get it on Google Play" },
  ].filter((link): link is { href: string; label: string } => Boolean(link.href));

  if (links.length === 0) return <StoreLinksFallback />;
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {links.map((link, index) => (
        <a
          key={link.label}
          href={link.href}
          className={`flex h-12 items-center justify-center rounded-full px-6 text-center font-semibold ${
            index === 0 ? "bg-accent text-on-accent" : "bg-surface text-ink"
          }`}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function StoreLinksFallback() {
  return (
    <p className="w-fit rounded-full bg-surface px-4 py-2 text-muted">
      Coming soon to the App Store and Google Play.
    </p>
  );
}
