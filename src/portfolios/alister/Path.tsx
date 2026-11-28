import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Eyebrow, Reveal } from "@/components/Reveal";

// Only what the site already states about Alister: the role, the craft, and the company.
const steps = [
  { n: "01", kicker: "The craft", title: "PCB design", line: "Designing the printed circuit boards that everything else sits on." },
  { n: "02", kicker: "The craft", title: "Embedded systems", line: "Developing the embedded systems that run on those boards." },
  { n: "03", kicker: "The team", title: "Robotics Lead", line: "Leading robotics at Ryuga Aerospace, a student-led aerospace, robotics and software team." },
  { n: "04", kicker: "The company", title: "Delga.ai, San Francisco", line: "Working at a Y Combinator-backed startup in San Francisco." },
] as const;

const Step = ({ s }: { s: (typeof steps)[number] }) => {
  const ref = useRef<HTMLLIElement>(null);
  const lit = useInView(ref, { margin: "-42% 0px -42% 0px" });
  const reduce = useReducedMotion();
  return (
    <li ref={ref} className="relative pb-20 pl-14 last:pb-0 md:pb-32 md:pl-20">
      {/* Solder pad on the trace: it lights up as the signal reaches it */}
      <span
        aria-hidden
        className={`absolute left-0 top-2 grid h-7 w-7 place-items-center rounded-full border transition-colors duration-500 md:h-9 md:w-9 ${
          lit ? "border-primary bg-primary/15" : "border-white/20 bg-background"
        }`}
      >
        <span className={`h-2 w-2 rounded-full transition-colors duration-500 ${lit ? "bg-primary" : "bg-white/25"}`} />
      </span>
      <motion.div
        animate={reduce ? undefined : { opacity: lit ? 1 : 0.35, y: lit ? 0 : 10, filter: lit ? "blur(0px)" : "blur(3px)" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="flex items-baseline gap-4">
          <span className="font-display text-2xl italic text-primary">{s.n}</span>
          <span className="label">{s.kicker}</span>
        </p>
        <h3 className="mt-3 font-display text-4xl leading-[1.04] tracking-[-0.02em] md:text-6xl">{s.title}</h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">{s.line}</p>
      </motion.div>
    </li>
  );
};

export const Path = () => {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 62%", "end 62%"] });
  const grow = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });
  const head = useTransform(grow, (v) => `${v * 100}%`);

  return (
    <section id="path" className="py-28 md:py-40">
      <div className="container grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow index="i" label="The path" />
            <h2 className="font-display text-5xl leading-[1.02] tracking-[-0.02em] md:text-7xl">
              From the bench <em className="text-primary">to the bay.</em>
            </h2>
            <p className="mt-6 max-w-sm text-muted-foreground">One signal, four stops. Scroll to send it down the line.</p>
          </div>
        </Reveal>

        <ol ref={ref} className="relative lg:col-span-7">
          {/* The trace: a dim line, a champagne line that grows with scroll, and a bright head riding its end */}
          <span aria-hidden className="absolute bottom-0 left-[13px] top-4 w-px bg-white/12 md:left-[17px]" />
          <motion.span
            aria-hidden
            style={{ scaleY: reduce ? 1 : grow }}
            className="absolute bottom-0 left-[13px] top-4 w-px origin-top bg-primary md:left-[17px]"
          />
          {!reduce && (
            <span aria-hidden className="absolute bottom-0 left-[13px] top-4 w-px md:left-[17px]">
              <motion.span
                style={{ top: head }}
                className="absolute -left-[3px] h-2 w-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_14px_3px_hsl(var(--primary)/0.7)]"
              />
            </span>
          )}
          {steps.map((s) => (
            <Step key={s.n} s={s} />
          ))}
        </ol>
      </div>
    </section>
  );
};
