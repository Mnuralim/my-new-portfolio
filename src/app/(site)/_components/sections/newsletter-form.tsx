"use client";

import { useActionState, useId } from "react";
import { subscribeNewsletter } from "@/actions/subscriber";

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, {
    error: null,
    success: null,
  });
  const emailId = useId();
  const statusId = useId();

  return (
    <form action={formAction} className="flex flex-1 max-w-sm min-w-[220px] flex-col gap-2">
      <div className="flex gap-2">
        <label htmlFor={emailId} className="sr-only">
          Alamat email
        </label>
        <input
          id={emailId}
          type="email"
          name="email"
          required
          placeholder="email@domain.com"
          aria-describedby={statusId}
          defaultValue={state.formData?.get("email") as string}
          className="flex-1 min-w-0 h-12 px-5 rounded-full outline-none transition-colors placeholder:text-[var(--c-muted3)] focus:border-[var(--color-accent)]"
          style={{
            background: "var(--c-bg)",
            border: "1px solid var(--c-border)",
            color: "var(--c-text)",
          }}
        />
        <button
          type="submit"
          disabled={pending}
          className="btn-primary btn-tactile disabled:opacity-50"
        >
          {pending ? "..." : "Subscribe"}
        </button>
      </div>
      <p id={statusId} aria-live="polite" className="text-[0.9rem] px-1">
        {state.error && <span style={{ color: "var(--color-accent2)" }}>{state.error}</span>}
        {state.success && <span style={{ color: "var(--color-accent)" }}>{state.success}</span>}
      </p>
    </form>
  );
}
