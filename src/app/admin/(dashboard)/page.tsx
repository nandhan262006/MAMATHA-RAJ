export default function AdminOverviewPage() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-[#C4552D]">
        Dashboard
      </p>
      <h1 className="mt-2 font-serif text-4xl font-light text-[#1A1714]">
        Welcome back
      </h1>
      <p className="mt-4 max-w-xl text-[#6B6259]">
        You&apos;re signed in. Features will be added here one by one.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-dashed border-[#1A1714]/15 bg-white/60 p-6">
          <h2 className="font-serif text-xl text-[#1A1714]">Coming soon</h2>
          <p className="mt-2 text-sm text-[#6B6259]">
            New admin features will appear in the sidebar as they&apos;re built.
          </p>
        </div>
      </div>
    </div>
  );
}
