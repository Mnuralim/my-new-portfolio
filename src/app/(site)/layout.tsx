import { Suspense } from "react";
import Navbar from "./_components/ui/navbar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Suspense fallback={<div className="h-[77px]" />}>
        <Navbar />
      </Suspense>
      <div id="main-content" className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
