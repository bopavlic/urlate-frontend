"use client";

import { useActionState } from "react";
import { deleteAccountAction } from "@/src/account/actions";
import type { DeletionState } from "@/src/account/flow";

const field =
  "h-14 w-full rounded-2xl border-2 border-line bg-surface px-4 text-lg outline-none focus:border-ink";
const primary =
  "flex h-14 w-full items-center justify-center rounded-full bg-ink px-6 text-lg font-semibold text-paper disabled:opacity-60 sm:w-fit";

export function DeleteAccountForm() {
  const [state, action, pending] = useActionState<DeletionState, FormData>(
    deleteAccountAction,
    { step: "email" },
  );

  if (state.step === "done") {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-2xl bg-surface p-6">
        <p className="font-display text-4xl font-black uppercase leading-none">
          Your account is deleted.
        </p>
        <p className="text-muted">
          Your profile and sign-in are gone, along with tallies only you could see. If
          you want to come back, you can sign up again any time.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex max-w-md flex-col gap-5" noValidate>
      {state.step === "email" ? (
        <label className="flex flex-col gap-2">
          <span className="font-semibold">The email you sign in with</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className={field}
            aria-invalid={Boolean(state.error)}
            aria-describedby={state.error ? "deletion-error" : undefined}
          />
        </label>
      ) : (
        <>
          <p>
            We sent a 6-digit code to <strong>{state.email}</strong> if it belongs to an
            Ur Late account. It expires in 15 minutes.
          </p>
          <label className="flex flex-col gap-2">
            <span className="font-semibold">Code</span>
            <input
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={7}
              required
              className={`${field} font-display text-3xl tracking-[0.3em]`}
              aria-invalid={Boolean(state.error)}
              aria-describedby={state.error ? "deletion-error" : undefined}
            />
          </label>
        </>
      )}

      {state.error ? (
        <p id="deletion-error" role="alert" className="text-danger">
          {state.error}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className={primary}>
        {state.step === "email"
          ? pending
            ? "Sending…"
            : "Email me a code"
          : pending
            ? "Deleting…"
            : "Delete my account"}
      </button>

      {state.step === "code" ? (
        <button
          type="submit"
          name="intent"
          value="restart"
          className="w-fit font-semibold underline underline-offset-4"
        >
          Use a different email
        </button>
      ) : null}
    </form>
  );
}
