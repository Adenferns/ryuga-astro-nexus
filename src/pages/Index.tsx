import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Team from "@/components/Team";
import Projects from "@/components/Projects";
import News from "@/components/News";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Nav />
    <main>
      <Hero />
      <Marquee />
      <About />
      <Team />
      <Projects />
      <News />
      <Gallery />
      <Contact />
    </main>
    <Footer />
  </>
);

export default Index;
