import Navbar from "./_components/ui/navbar";
import Cursor from "./_components/ui/cursor";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-cursor-none">
      <Navbar />
      <Cursor />
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
