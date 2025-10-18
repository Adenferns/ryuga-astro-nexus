import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import News from "@/components/News";
import Gallery from "@/components/Gallery";
import Join from "@/components/Join";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Projects />
      <Team />
      <News />
      <Gallery />
      <Join />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
