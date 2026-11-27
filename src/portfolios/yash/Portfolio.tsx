import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidFilter } from "./kit";
import { Hero } from "./Hero";
import { Stack } from "./Stack";
import { Systems } from "./Systems";
import { Approach, Contact } from "./Closing";

const links = [
  { href: "#stack", label: "Stack" },
  { href: "#systems", label: "Systems" },
  { href: "#approach", label: "Approach" },
];

const sections = ["top", "stack", "systems", "approach", "contact"];

/** Dots on the right edge showing the current section; desktop only. */
const Rail = () => {
  const [current, setCurrent] = useState("top");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <nav aria-label="Sections" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 xl:flex">
      {sections.map((id) => (
        <a key={id} href={`#${id}`} aria-label={id} className="group flex items-center justify-end gap-3">
          <span className="label opacity-0 transition-opacity duration-200 group-hover:opacity-100">{id === "top" ? "intro" : id}</span>
          <span className={`block h-1.5 rounded-full transition-all duration-300 ${current === id ? "w-6 bg-primary" : "w-1.5 bg-white/30"}`} />
        </a>
      ))}
    </nav>
  );
};

const PortfolioNav = () => (
  <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
    <nav aria-label="Portfolio" className="glass flex h-[3.25rem] items-center gap-1 rounded-full py-1.5 pl-2 pr-1.5">
      <Link
        to="/crew"
        aria-label="Back to the crew"
        className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Crew</span>
      </Link>
      <a href="#top" className="mx-2 font-display text-xl leading-none tracking-[-0.01em]">
        Yash Shaw
      </a>
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="hidden rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground md:block"
        >
          {l.label}
        </a>
      ))}
      <Button asChild size="sm" className="ml-1 h-10 px-5">
        <a href="#contact">Contact</a>
      </Button>
    </nav>
  </header>
);

const Portfolio = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = "Yash Shaw — Portfolio · Ryuga Aerospace";
    return () => {
      document.title = prev;
    };
  }, []);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <>
      <LiquidFilter />
      <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary" />
      <PortfolioNav />
      <Rail />
      <main>
        <Hero />
        <Stack />
        <Systems />
        <Approach />
        <Contact />
      </main>
    </>
  );
};

export default Portfolio;
