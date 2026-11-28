import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { PortfolioNav } from "../PortfolioNav";
import { LiquidFilter } from "./kit";
import { Backdrop } from "./Backdrop";
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
      <Backdrop />
      <PortfolioNav name="Yash Shaw" links={links} />
      <Rail />
      <main className="relative z-10">
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
