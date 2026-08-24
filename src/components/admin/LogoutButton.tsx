"use client";

import { logout } from "@/app/admin/actions";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded-lg border border-[#1A1714]/15 px-4 py-2 text-sm text-[#6B6259] transition hover:border-[#C4552D] hover:text-[#C4552D]"
      >
        Log out
      </button>
    </form>
  );
}
