import Link from "next/link";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/delete-account", label: "Delete your account" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-[1fr_auto] sm:px-8">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-xs text-muted">
            Keeps track of who kept whom waiting. In minutes.
          </p>
          <p className="text-muted">
            Questions?{" "}
            <a
              href="mailto:hello@urlate.app"
              className="font-semibold text-ink underline underline-offset-4"
            >
              hello@urlate.app
            </a>
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted underline-offset-4 hover:text-ink hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
