import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/session";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Sign in",
};

export default async function LoginPage() {
  if (await isAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF6F1] px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#C4552D]">
            Mamatharaj
          </p>
          <h1 className="mt-2 font-serif text-4xl font-light text-[#1A1714]">
            Admin
          </h1>
          <p className="mt-3 text-sm text-[#6B6259]">
            Enter the password to manage your site.
          </p>
        </div>

        <div className="rounded-2xl border border-[#1A1714]/8 bg-white p-8 shadow-[0_20px_60px_-30px_rgba(26,23,20,0.25)]">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-[#6B6259]/70">
          <Link href="/" className="transition hover:text-[#C4552D]">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
