import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import Featured from "@/components/Featured";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import Quotation from "@/components/Quotation";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import Map from "@/components/Map";
import Contact from "@/components/Contact";
import { getHeroImages } from "@/lib/hero-images";
import { getAboutContent } from "@/lib/about";
import { getFeaturedPhotos } from "@/lib/photos";
import { getServices } from "@/lib/services";
import { getStoryContent } from "@/lib/story";
import { getTestimonials } from "@/lib/testimonials";
import { SITE_URL, SITE_NAME, buildBreadcrumbSchema } from "@/lib/site";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const [heroImages, aboutContent, featuredPhotos, services, storyContent, testimonials] =
    await Promise.all([
      getHeroImages(),
      getAboutContent(),
      getFeaturedPhotos(),
      getServices(),
      getStoryContent(),
      getTestimonials(),
    ]);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Hero images={heroImages.map((s) => s.url)} />
      <Marquee />
      <About content={aboutContent} />
      <Gallery photos={featuredPhotos} />
      <Services services={services} />
      <Featured content={storyContent} />
      <Testimonials
        slides={testimonials.map((t) => ({
          img: t.imageUrl,
          ratio: t.ratio,
          quote: t.quote,
          author: t.author,
          role: t.role,
        }))}
      />
      <Process />
      <Quotation />
      <CtaBanner />
      <Map />
      <Faq />
      <Contact />
    </main>
  );
}
