import { getServices } from "@/lib/services";
import ServiceEditorCard from "@/components/admin/ServiceEditorCard";
import { AddServiceButton } from "@/components/admin/ServiceCardButtons";

export const metadata = { title: "Services" };

export default async function ServicesAdminPage() {
  const services = await getServices();

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#C4552D]">
            Homepage
          </p>
          <h1 className="mt-2 font-serif text-4xl font-light text-[#1A1714]">
            Services
          </h1>
          <p className="mt-3 max-w-xl text-[#6B6259]">
            Edit the cards in the homepage services carousel — category, title,
            description and image. Changes go live immediately after saving.
          </p>
        </div>
        <div className="w-full sm:w-auto sm:min-w-56">
          <AddServiceButton />
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {services.map((s, i) => (
          <ServiceEditorCard key={s.id} service={s} index={i} />
        ))}
      </div>
    </div>
  );
}
