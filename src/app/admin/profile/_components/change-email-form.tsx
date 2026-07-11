"use client";

import { changeEmail } from "@/actions/auth";
import { useActionWithToast } from "@/app/admin/_components/use-action-toast";

interface Props {
  currentEmail: string;
}

export function ChangeEmailForm({ currentEmail }: Props) {
  const [state, dispatch, pending] = useActionWithToast(changeEmail);

  return (
    <div className="bg-[#f2f2ee] dark:bg-[#111111] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] p-6">
      <span className="text-meta-xs tracking-widest text-[#1a1a1a] dark:text-[#e8ff47] block mb-6">
        GANTI EMAIL
      </span>

      <form action={dispatch} className="flex flex-col gap-4">
        <div>
          <label className="block text-meta-2xs tracking-widest text-[#6b6b66] dark:text-[#999999] mb-1.5">
            EMAIL BARU
          </label>
          <input
            name="email"
            type="email"
            required
            defaultValue={currentEmail}
            className="w-full bg-[#fafaf8] dark:bg-[#0a0a0a] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#111111] dark:text-[#f0f0f0] outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-meta-2xs tracking-widest text-[#6b6b66] dark:text-[#999999] mb-1.5">
            PASSWORD
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full bg-[#fafaf8] dark:bg-[#0a0a0a] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#111111] dark:text-[#f0f0f0] outline-none focus:border-accent"
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
