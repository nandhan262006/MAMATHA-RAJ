import { getStoryContent } from "@/lib/story";
import { getStoryPhotos } from "@/lib/story-photos";
import StoryEditor from "@/components/admin/StoryEditor";
import StoryGalleryManager from "@/components/admin/StoryGalleryManager";
import DriveImportForm from "@/components/admin/DriveImportForm";

export const metadata = { title: "Featured Story" };

export default async function StoryAdminPage() {
  const [content, photos] = await Promise.all([
    getStoryContent(),
    getStoryPhotos(),
  ]);

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-[#C4552D]">
        Homepage
      </p>
      <h1 className="mt-2 font-serif text-4xl font-light text-[#1A1714]">
        Featured Story
      </h1>
      <p className="mt-3 max-w-xl text-[#6B6259]">
        Edit the highlighted wedding story — banner image, heading, description,
        details and the two side photos. Changes go live immediately after
        saving.
      </p>

      <div className="mt-8">
        <StoryEditor content={content} />
      </div>

      <section className="mt-12">
        <h2 className="mb-1 font-serif text-2xl font-light text-[#1A1714]">
          Wedding gallery
        </h2>
        <p className="mb-4 text-sm text-[#6B6259]">
          Full photo set shown on the /story page ({photos.length} photos).
        </p>
        <StoryGalleryManager photos={photos} />
        <div className="mt-4">
          <DriveImportForm target="story" />
        </div>
      </section>
    </div>
  );
}
