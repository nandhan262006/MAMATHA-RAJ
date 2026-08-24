import { getAllPhotos } from "@/lib/photos";
import PhotoLibrary from "@/components/admin/PhotoLibrary";
import DriveImportForm from "@/components/admin/DriveImportForm";

export const metadata = { title: "Portfolio" };

export default async function PortfolioAdminPage() {
  const photos = await getAllPhotos();
  const featuredCount = photos.filter((p) => p.featured).length;

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-[#C4552D]">
        Portfolio
      </p>
      <h1 className="mt-2 font-serif text-4xl font-light text-[#1A1714]">
        All photos ({photos.length})
      </h1>
      <p className="mt-3 max-w-xl text-[#6B6259]">
        Toggle which photos appear in the homepage portfolio grid.{" "}
        <span className="font-medium text-[#1A1714]">{featuredCount}</span>{" "}
        currently shown. The full library is public at{" "}
        <a
          href="/portfolio"
          target="_blank"
          className="underline hover:text-[#C4552D]"
        >
          /portfolio
        </a>
        .
      </p>

      <div className="mt-8">
        <DriveImportForm target="photos" />
      </div>

      <div className="mt-6">
        <PhotoLibrary photos={photos} />
      </div>
    </div>
  );
}
