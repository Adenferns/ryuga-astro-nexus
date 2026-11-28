import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// Only what the site already states about Alister: the craft, the role and the company.
const chapters = [
  { kicker: "The craft", title: "PCB design", line: "Designing the printed circuit boards that everything else sits on." },
  { kicker: "The craft", title: "Embedded systems", line: "Developing the embedded systems that run on those boards." },
  { kicker: "The team", title: "Robotics Lead", line: "Leading robotics at Ryuga Aerospace, a student-led aerospace, robotics and software team." },
  { kicker: "The company", title: "Delga.ai", line: "Working from India with Delga.ai, a Y Combinator-backed startup based in San Francisco." },
] as const;

const N = chapters.length;
const pad = (n: number) => String(n).padStart(2, "0");

/** True from 1024px up, where the chapters pin and travel sideways; below that they simply stack. */
const useWide = () => {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(q.matches);
    on();
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);
  return wide;
};

const Panel = ({ i, wide }: { i: number; wide: boolean }) => {
  const c = chapters[i];
  const light = i % 2 === 1; // champagne panels alternate with midnight ones
  return (
    <article
      className={`relative flex shrink-0 flex-col justify-between overflow-hidden p-6 md:p-16 ${
        wide ? "h-[100svh] w-[100vw] pt-32" : "min-h-[72svh] pt-20"
      } ${light ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[0.18em] -right-[0.04em] select-none font-display text-[min(62vw,34rem)] leading-none text-transparent opacity-25 [-webkit-text-stroke:1px_currentColor]"
      >
        {pad(i + 1)}
      </span>
      <p className="relative font-mono text-[0.7rem] uppercase tracking-[0.22em] opacity-70">
        {pad(i + 1)} / {pad(N)} — {c.kicker}
      </p>
      <div className="relative">
        <h3 className="font-display text-[clamp(3.4rem,11vw,10.5rem)] leading-[0.92] tracking-[-0.03em]">{c.title}</h3>
        <p className="mt-6 max-w-md text-lg leading-relaxed opacity-75">{c.line}</p>
      </div>
      <div aria-hidden className="relative flex gap-2">
        {chapters.map((_, k) => (
          <span key={k} className={`h-px w-10 ${k <= i ? "bg-current" : "bg-current opacity-25"}`} />
        ))}
      </div>
    </article>
  );
};

export const Chapters = () => {
  const wide = useWide();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(N - 1) * 100}vw`]);
  const pinned = wide && !reduce;

  return (
    <section id="chapters" ref={ref} className={pinned ? "relative" : ""} style={pinned ? { height: `${N * 100}svh` } : undefined}>
      <div className={pinned ? "sticky top-0 h-[100svh] overflow-hidden" : ""}>
        <motion.div style={pinned ? { x } : undefined} className={pinned ? "flex w-fit" : "flex flex-col"}>
          {chapters.map((_, i) => (
            <Panel key={i} i={i} wide={pinned} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
