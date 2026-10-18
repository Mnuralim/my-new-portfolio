import { logOut } from "@/actions/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SidebarNav } from "./_components/sidebar-nav";
import ThemeToggle from "@/app/_components/theme-toggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="sticky top-0 z-40 grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 md:flex md:flex-col md:items-stretch md:gap-0 md:w-56 md:shrink-0 md:h-screen md:overflow-y-auto md:p-6 border-b md:border-b-0 md:border-r border-line bg-card text-fg">
        <div className="font-display font-extrabold text-[1rem] tracking-tight md:mb-8">
          ADMIN
        </div>
        <div className="col-span-2 min-w-0 md:flex-1">
          <SidebarNav />
        </div>

        <div className="row-start-1 col-start-2 md:mt-8 flex items-center gap-2">
          <ThemeToggle />
          <form action={logOut} className="md:flex-1">
            <button
              type="submit"
              className="
                w-full bg-transparent text-muted font-mono text-meta-xs font-bold px-3 py-2 md:px-4 md:py-3
                tracking-widest border border-line rounded-[9px] cursor-pointer uppercase
                transition-all duration-200 hover:border-accent hover:text-accent
              "
            >
              LOGOUT
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10">{children}</main>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        toastClassName="font-mono text-meta-md"
      />
    </div>
  );
}
