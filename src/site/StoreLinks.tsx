import { connection } from "next/server";

// Store listings are read per request, so the same Docker image goes live with the stores
// by changing env, not rebuilding. Render inside <Suspense fallback={<StoreLinksFallback />}>.

export async function StoreLinks({ tone = "paper" }: { tone?: "paper" | "pitch" }) {
  await connection();
  const links = [
    { href: process.env.APP_STORE_URL, label: "Download on the App Store" },
    { href: process.env.PLAY_STORE_URL, label: "Get it on Google Play" },
  ].filter((link): link is { href: string; label: string } => Boolean(link.href));

  if (links.length === 0) return <StoreLinksFallback tone={tone} />;
  const border = tone === "pitch" ? "border-chalk text-chalk" : "border-ink";
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={`flex h-12 items-center justify-center rounded-full border-2 px-6 text-center font-semibold ${border}`}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function StoreLinksFallback({ tone = "paper" }: { tone?: "paper" | "pitch" }) {
  return (
    <p className={tone === "pitch" ? "text-chalk/70" : "text-muted"}>
      Coming soon to the App Store and Google Play.
    </p>
  );
}
