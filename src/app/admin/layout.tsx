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
      <aside className="md:w-56 border-b-2 md:border-b-0 md:border-r-2 border-black dark:border-[#2a2a2a] p-6 flex flex-col justify-between bg-black text-[#ffff00] dark:bg-transparent dark:text-inherit">
        <div>
          <div className="font-display font-extrabold text-[1rem] tracking-tight mb-8">
            ADMIN
          </div>
          <SidebarNav />
        </div>

        <div className="mt-8 flex items-center gap-2">
          <ThemeToggle />
          <form action={logOut} className="flex-1">
            <button
              type="submit"
              className="
                w-full bg-transparent text-[#ffff00] font-mono text-meta-xs font-bold px-4 py-3
                tracking-widest border-2 border-[#2a2a2a] cursor-pointer uppercase
                transition-all duration-200 hover:border-accent hover:text-[#ffff00]
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
