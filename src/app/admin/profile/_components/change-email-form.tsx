"use client";

import { changeEmail } from "@/actions/auth";
import { useActionWithToast } from "@/app/admin/_components/use-action-toast";

interface Props {
  currentEmail: string;
}

export function ChangeEmailForm({ currentEmail }: Props) {
  const [state, dispatch, pending] = useActionWithToast(changeEmail);

  return (
    <div className="bg-card border border-line rounded-[14px] p-6">
      <span className="text-meta-xs tracking-widest text-accent block mb-6">
        GANTI EMAIL
      </span>

      <form action={dispatch} className="flex flex-col gap-4">
        <div>
          <label className="block text-meta-2xs tracking-widest text-muted mb-1.5">
            EMAIL BARU
          </label>
          <input
            name="email"
            type="email"
            required
            defaultValue={currentEmail}
            className="w-full bg-base border border-line rounded-[9px] px-3 py-2.5 text-meta-md font-mono text-fg outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-meta-2xs tracking-widest text-muted mb-1.5">
            PASSWORD
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full bg-base border border-line rounded-[9px] px-3 py-2.5 text-meta-md font-mono text-fg outline-none focus:border-accent"
          />
        </div>

        {state.error && (
          <p className="text-meta-xs text-accent2">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="btn-primary disabled:opacity-50"
        >
          {pending ? "MENYIMPAN..." : "SIMPAN EMAIL"}
        </button>
      </form>
    </div>
  );
}
