import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/session";
import SidebarNav from "@/components/admin/SidebarNav";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF6F1] lg:flex-row">
      <SidebarNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="hidden items-center justify-end border-b border-[#1A1714]/10 px-8 py-4 lg:flex">
          <LogoutButton />
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
