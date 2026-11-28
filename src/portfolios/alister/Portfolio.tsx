import { useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { PortfolioNav } from "../PortfolioNav";
import { Backdrop } from "./Backdrop";
import { Hero } from "./Hero";
import { Path } from "./Path";
import { Contact, Now, Ticker } from "./Closing";

const links = [
  { href: "#path", label: "Path" },
  { href: "#now", label: "Now" },
];

const Portfolio = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = "Alister Fernandes — Portfolio · Ryuga Aerospace";
    return () => {
      document.title = prev;
    };
  }, []);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <>
      <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary" />
      <Backdrop />
      <PortfolioNav name="Alister Fernandes" links={links} />
      <main className="relative z-10">
        <Hero />
        <Ticker />
        <Path />
        <Now />
        <Contact />
      </main>
    </>
  );
};

export default Portfolio;
