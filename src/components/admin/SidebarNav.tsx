"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/app/admin/actions";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/homepage", label: "Homepage Images" },
  { href: "/admin/about", label: "About Section" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/story", label: "Featured Story" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-[#1A1714]/10 bg-[#2C2824] px-4 py-3 lg:hidden">
        <Link href="/admin" className="text-sm tracking-[0.25em] uppercase text-[#FFF9F2]">
          Mamatharaj <span className="text-[#E8764D]">Admin</span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="rounded-md border border-white/15 px-3 py-1.5 text-sm text-[#FFF9F2]"
        >
          Menu
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          open ? "block" : "hidden"
        } w-full shrink-0 bg-[#2C2824] px-5 py-6 lg:sticky lg:top-0 lg:block lg:h-screen lg:w-64`}
      >
        <div className="hidden lg:mb-10 lg:block">
          <Link href="/" className="text-xs uppercase tracking-[0.35em] text-[#E8764D]">
            Mamatharaj
          </Link>
          <p className="mt-1 font-serif text-2xl font-light text-[#FFF9F2]">Admin</p>
        </div>

        <nav className="space-y-1" onClick={() => setOpen(false)}>
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-[#C4552D] text-[#FFF9F2]"
                    : "text-[#FFF9F2]/70 hover:bg-white/5 hover:text-[#FFF9F2]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 space-y-3 border-t border-white/10 pt-4">
          <Link
            href="/"
            target="_blank"
            className="block text-xs text-[#FFF9F2]/50 transition hover:text-[#FFF9F2]"
          >
            View live site ↗
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="text-xs font-medium text-[#E8764D] transition hover:text-[#FFF9F2]"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
