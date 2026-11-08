"use client";

import { usePathname } from "next/navigation";

// full-page navigations: the OAuth flow needs a real redirect, not a client transition
export function LoginButtons() {
  const returnTo = encodeURIComponent(usePathname());
  return (
    <div className="flex flex-wrap gap-2">
      <a href={`/api/auth/google?returnTo=${returnTo}`} className="btn-ghost btn-tactile !h-11">
        Lanjut dengan Google
      </a>
      <a href={`/api/auth/github?returnTo=${returnTo}`} className="btn-ghost btn-tactile !h-11">
        Lanjut dengan GitHub
      </a>
    </div>
  );
}
