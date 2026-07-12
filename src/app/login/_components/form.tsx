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
      className="bg-black border-2 border-black dark:bg-[#111111] dark:border-[#2a2a2a] p-8 w-full max-w-sm"
    >
      <div className="text-meta-xs tracking-[4px] text-[#ffff00] uppercase flex items-center gap-3 mb-8">
        ADMIN / LOGIN
        <span className="flex-1 h-px bg-[#2a2a2a]" />
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-meta-xs tracking-widest text-[#999999] mb-2">
            EMAIL
          </label>
          <input
            type="email"
            name="email"
            required
            defaultValue={state.formData?.get("email") as string}
            className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] px-4 py-3 text-meta-lg font-mono text-[#ffff00] outline-none focus:border-accent transition-colors"
          />
        </div>

        <div>
          <label className="block text-meta-xs tracking-widest text-[#999999] mb-2">
            PASSWORD
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] px-4 py-3 text-meta-lg font-mono text-[#ffff00] outline-none focus:border-accent transition-colors"
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
