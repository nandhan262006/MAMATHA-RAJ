import { getHeroImages } from "@/lib/hero-images";
import HeroSlotCard from "@/components/admin/HeroSlotCard";

export const metadata = { title: "Homepage Images" };

export default async function HomepageAdminPage() {
  const slots = await getHeroImages();

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-[#C4552D]">
        Homepage
      </p>
      <h1 className="mt-2 font-serif text-4xl font-light text-[#1A1714]">
        Hero images
      </h1>
      <p className="mt-3 max-w-xl text-[#6B6259]">
        The background collage on the homepage has 24 slots. Replace any slot
        with a new photo (JPG, PNG, WebP or AVIF, up to 15 MB) — changes go
        live immediately.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {slots.map((s) => (
          <HeroSlotCard
            key={s.slot}
            slot={s.slot}
            url={s.url}
            isCustom={s.isCustom}
          />
        ))}
      </div>
    </div>
  );
}
