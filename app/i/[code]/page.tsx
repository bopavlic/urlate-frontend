import type { Metadata } from "next";
import { Suspense } from "react";
import { formatInviteCode, initials } from "@/src/invite/code";
import { inviteCopy, inviteTitle, type InvitePreview } from "@/src/invite/copy";
import { loadInvite } from "@/src/invite/load";
import type { InviteProblem } from "@/src/invite/problem";
import { LogoMark } from "@/src/site/Logo";
import { StoreLinks } from "@/src/site/StoreLinks";
import { Ticket } from "@/src/site/Ticket";

// Invite landing: who invited you, the balance, and how to get into the app. Rendered per
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
        <LogoMark />
        <span className="font-display text-xl">Ur Late</span>
      </header>
      <Suspense fallback={<InviteSkeleton />}>
        <InviteContent params={props.params} />
      </Suspense>
      <footer className="mt-auto text-sm text-muted">
        Ur Late keeps track of who kept whom waiting. In minutes.
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
  const direction = preview.balance?.direction === "YOU_OWE_THEM" ? "owe" : "owed";
  return (
    <>
      <section className="flex flex-col gap-5">
        <Avatar name={preview.inviterName} url={preview.inviterAvatarUrl} />
        <h1 className="text-balance font-display text-5xl leading-[1.02] tracking-[-0.02em]">
          {headline}
        </h1>
        <p className="text-lg text-muted">{detail}</p>
        {minutes > 0 && (
          <Ticket
            tone={direction === "owed" ? "owed" : "owing"}
            minutes={minutes}
            offender={(direction === "owed" ? preview.inviterName : "You").toUpperCase()}
            waiter={(direction === "owed" ? "You" : preview.inviterName).toUpperCase()}
            className="w-full"
          />
        )}
      </section>

      <section className="flex flex-col gap-3 rounded-3xl bg-surface p-6">
        <p className="font-semibold text-muted">Your invite code</p>
        <p className="text-balance font-display text-4xl tracking-wider tabular-nums">
          {formatInviteCode(preview.code)}
        </p>
        <p className="text-muted">
          Enter this code in the app after installing.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <a
          href={`urlate://i/${preview.code}`}
          className="flex h-14 items-center justify-center rounded-full bg-accent text-lg font-semibold text-on-accent"
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
    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface font-display text-2xl text-ink">
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
      <h1 className="text-balance font-display text-5xl leading-[1.02] tracking-[-0.02em]">
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
