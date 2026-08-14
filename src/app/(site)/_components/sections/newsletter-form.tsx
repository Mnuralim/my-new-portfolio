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
      <div className="flex">
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
          className="flex-1 font-mono text-meta-sm px-4 py-2.5 outline-none transition-colors rounded-l-[8px]"
          style={{
            background: "var(--c-cardbg)",
            border: "1px solid var(--c-border)",
            borderRight: "none",
            color: "var(--c-text)",
          }}
        />
        <button
          type="submit"
          disabled={pending}
          className="btn-primary btn-tactile font-mono text-meta-xs px-5 py-2.5 whitespace-nowrap rounded-l-none disabled:opacity-50"
        >
          {pending ? "..." : "Subscribe"}
        </button>
      </div>
      <p id={statusId} aria-live="polite" className="text-meta-xs">
        {state.error && <span style={{ color: "var(--color-accent2)" }}>{state.error}</span>}
        {state.success && <span style={{ color: "var(--color-accent)" }}>{state.success}</span>}
      </p>
    </form>
  );
}
