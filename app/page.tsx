import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import About from "@/components/About";
import Tools from "@/components/Tools";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Hero />
        <FeaturedWork />
        <About />
        <Tools />
        <Contact />
      </main>
    </>
  );
}
