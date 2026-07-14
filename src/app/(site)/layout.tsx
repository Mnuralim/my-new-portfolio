import { Suspense } from "react";
import Navbar from "./_components/ui/navbar";
import Cursor from "./_components/ui/cursor";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-cursor-none">
      <Suspense fallback={<div className="h-[77px]" />}>
        <Navbar />
      </Suspense>
      <Cursor />
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
