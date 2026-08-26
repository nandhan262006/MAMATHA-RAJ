import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllPhotos, getFeaturedPhotos } from "@/lib/photos";
import { getStoryPhotos } from "@/lib/story-photos";
import { SERVICE_PAGES } from "@/lib/service-pages";

export const dynamic = "force-dynamic";

function abs(src: string): string {
  return src.startsWith("http") ? src : new URL(src, SITE_URL).toString();
}

function imageEntries(
  photos: { src: string; thumb?: string | null }[]
): string[] {
  return photos
    .filter((p) => p.src)
    .slice(0, 1000)
    .map((p) => abs(p.src));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allPhotos, featuredPhotos, storyPhotos] = await Promise.all([
    getAllPhotos(),
    getFeaturedPhotos(),
    getStoryPhotos(),
  ]);

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: imageEntries(featuredPhotos),
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...SERVICE_PAGES.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [abs(s.image)],
    })),
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      images: imageEntries(allPhotos),
    },
    {
      url: `${SITE_URL}/story`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      images: imageEntries(storyPhotos),
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
