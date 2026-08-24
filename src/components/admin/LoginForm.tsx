"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState);

  return (
    <form action={action} className="w-full max-w-sm">
      <label
        htmlFor="password"
        className="block text-xs uppercase tracking-[0.2em] text-[#6B6259] mb-2"
      >
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoFocus
        autoComplete="current-password"
        required
        className="w-full rounded-lg border border-[#1A1714]/15 bg-white px-4 py-3 text-[#1A1714] outline-none transition focus:border-[#C4552D] focus:ring-2 focus:ring-[#C4552D]/20"
        placeholder="••••••••••"
      />

      {state.error ? (
        <p className="mt-3 text-sm text-[#A3431F]" role="alert">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-lg bg-[#C4552D] px-4 py-3 font-medium text-[#FFF9F2] transition hover:bg-[#A3431F] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
