import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import Featured from "@/components/Featured";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import CtaBanner from "@/components/CtaBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Marquee />
      <About />
      <Gallery />
      <Services />
      <Featured />
      <Testimonials />
      <Process />
      <CtaBanner />
      <Contact />
      <Footer />
    </main>
  );
}
