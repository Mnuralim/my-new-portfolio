import type { Metadata } from "next";
import { LoginForm } from "./_components/form";

// private pages: robots.txt alone does not stop indexing of linked URLs
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-3">
      <LoginForm />
    </div>
  );
}
