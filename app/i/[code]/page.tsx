import type { Metadata } from "next";
import { Suspense } from "react";
import { formatInviteCode, initials } from "@/src/invite/code";
import { inviteCopy, inviteTitle, type InvitePreview } from "@/src/invite/copy";
import { loadInvite } from "@/src/invite/load";
import type { InviteProblem } from "@/src/invite/problem";
import { StoreLinks } from "@/src/site/StoreLinks";

// Invite landing: who invited you, the score, and how to get into the app. Rendered per
// request (the invite can be used or expire at any moment) and kept out of search.

export async function generateMetadata(
  props: PageProps<"/i/[code]">,
): Promise<Metadata> {
  const { code } = await props.params;
  const result = await loadInvite(code);
  const title =
    "preview" in result
      ? inviteTitle(result.preview)
      : "You’re invited to Ur Late";
  const description =
    "preview" in result
      ? inviteCopy(result.preview).headline
      : "Who’s been waiting on who?";
  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: { title, description, siteName: "Ur Late" },
  };
}

export default function InvitePage(props: PageProps<"/i/[code]">) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8 px-4 py-8">
      <header className="flex items-center gap-2">
        <span
          aria-hidden
          className="h-7 w-5 rotate-6 rounded-[3px] bg-accent shadow-sm"
        />
        <span className="font-display text-2xl font-black uppercase tracking-wide">
          Ur Late
        </span>
      </header>
      <Suspense fallback={<InviteSkeleton />}>
        <InviteContent params={props.params} />
      </Suspense>
      <footer className="mt-auto text-sm text-muted">
        Ur Late keeps score of who kept whom waiting. In minutes.
      </footer>
    </main>
  );
}

async function InviteContent({
  params,
}: {
  params: PageProps<"/i/[code]">["params"];
}) {
  const { code } = await params;
  const result = await loadInvite(code);
  if ("problem" in result) return <Problem problem={result.problem} />;
  return <Invite preview={result.preview} />;
}

function Invite({ preview }: { preview: InvitePreview }) {
  const { headline, detail } = inviteCopy(preview);
  const minutes = preview.balance?.minutes ?? 0;
  return (
    <>
      <section className="flex flex-col gap-5">
        <Avatar name={preview.inviterName} url={preview.inviterAvatarUrl} />
        <h1 className="font-display text-5xl font-black leading-[0.95] uppercase">
          {headline}
        </h1>
        <p className="text-lg text-muted">{detail}</p>
        {minutes > 0 && (
          <div className="flex w-fit -rotate-2 items-baseline gap-2 rounded-xl bg-accent px-6 py-4 text-on-accent shadow-md">
            <span className="font-display text-7xl font-black tabular-nums leading-none">
              {minutes}
            </span>
            <span className="font-display text-2xl font-extrabold uppercase">
              min
            </span>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted">
          Your invite code
        </p>
        <p className="font-display text-5xl font-black tracking-widest tabular-nums">
          {formatInviteCode(preview.code)}
        </p>
        <p className="text-muted">
          Enter this code in the app after installing.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <a
          href={`urlate://i/${preview.code}`}
          className="flex h-14 items-center justify-center rounded-full bg-ink text-lg font-semibold text-paper"
        >
          Open in Ur Late
        </a>
        <StoreLinks />
      </section>
    </>
  );
}

function Avatar({ name, url }: { name: string; url: string | null }) {
  if (url) {
    // Short-lived presigned S3 URL: next/image would cache it past its expiry.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt="" className="h-16 w-16 rounded-full object-cover" />
    );
  }
  return (
    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent font-display text-3xl font-black text-on-accent">
      {initials(name)}
    </span>
  );
}

const PROBLEMS: Record<InviteProblem, { headline: string; detail: string }> = {
  "not-found": {
    headline: "That code doesn’t ring a bell.",
    detail: "Check it for typos, or ask whoever sent it for a fresh link.",
  },
  expired: {
    headline: "This invite ran out of time.",
    detail: "Fitting, really. Ask for a new one.",
  },
  used: {
    headline: "This invite has already been used.",
    detail: "If that wasn’t you, ask for a new one.",
  },
  unavailable: {
    headline: "We’re running a little late.",
    detail: "We couldn’t load this invite just now. Try again in a minute.",
  },
};

function Problem({ problem }: { problem: InviteProblem }) {
  const { headline, detail } = PROBLEMS[problem];
  return (
    <section className="flex flex-col gap-4">
      <h1 className="font-display text-5xl font-black leading-[0.95] uppercase">
        {headline}
      </h1>
      <p className="text-lg text-muted">{detail}</p>
      <StoreLinks />
    </section>
  );
}

function InviteSkeleton() {
  return (
    <section aria-busy className="flex flex-col gap-5">
      <span className="h-16 w-16 animate-pulse rounded-full bg-surface" />
      <span className="h-24 w-full animate-pulse rounded-lg bg-surface" />
      <span className="h-6 w-2/3 animate-pulse rounded bg-surface" />
    </section>
  );
}
