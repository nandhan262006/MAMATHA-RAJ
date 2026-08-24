import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import Featured from "@/components/Featured";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import CtaBanner from "@/components/CtaBanner";
import Map from "@/components/Map";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getHeroImages } from "@/lib/hero-images";
import { getAboutContent } from "@/lib/about";
import { getFeaturedPhotos } from "@/lib/photos";
import { getServices } from "@/lib/services";
import { getStoryContent } from "@/lib/story";
import { getTestimonials } from "@/lib/testimonials";

export const dynamic = "force-dynamic";

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

  return (
    <main className="flex flex-1 flex-col">
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
        <CtaBanner />
        <Map />
        <Contact />
      <Footer />
    </main>
  );
}
