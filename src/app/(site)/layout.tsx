import { Suspense } from "react";
import Navbar from "./_components/ui/navbar";
import { getCvs } from "@/lib/data";

async function NavbarWithCvs() {
  const cvs = await getCvs();
  return <Navbar cvs={cvs} />;
}

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
        <NavbarWithCvs />
      </Suspense>
      <div id="main-content" className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
