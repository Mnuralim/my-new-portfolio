"use client";

import { useActionState } from "react";
import { login } from "@/actions/auth";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, {
    error: null,
    success: null,
  });

  return (
    <form
      action={formAction}
      className="bg-[#f2f2ee] dark:bg-[#111111] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] p-8 w-full max-w-sm"
    >
      <div className="section-label mb-8">ADMIN / LOGIN</div>

      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-meta-xs tracking-widest text-[#6b6b66] dark:text-[#999999] mb-2">
            EMAIL
          </label>
          <input
            type="email"
            name="email"
            required
            defaultValue={state.formData?.get("email") as string}
            className="w-full bg-[#fafaf8] dark:bg-[#0a0a0a] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] px-4 py-3 text-meta-lg font-mono text-[#111111] dark:text-[#f0f0f0] outline-none focus:border-accent transition-colors"
          />
        </div>

        <div>
          <label className="block text-meta-xs tracking-widest text-[#6b6b66] dark:text-[#999999] mb-2">
            PASSWORD
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full bg-[#fafaf8] dark:bg-[#0a0a0a] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] px-4 py-3 text-meta-lg font-mono text-[#111111] dark:text-[#f0f0f0] outline-none focus:border-accent transition-colors"
          />
        </div>

        {state.error && (
          <p className="text-meta-sm text-accent2 tracking-wide">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="btn-primary w-full mt-2 disabled:opacity-50"
        >
          {pending ? "MASUK..." : "MASUK"}
        </button>
      </div>
    </form>
  );
}
