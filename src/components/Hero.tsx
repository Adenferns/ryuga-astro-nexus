import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import NumberFlow from "@number-flow/react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/drone4.jpg";

const lines: ReactNode[] = [
  "We build drones",
  <>
    that <em className="text-primary">think.</em>
  </>,
];

const Stat = ({ value, label }: { value: number; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="px-5 py-6 md:px-10 md:py-8">
      <NumberFlow
        value={inView ? value : 0}
        className="font-display text-5xl tabular-nums leading-none md:text-7xl"
      />
      <p className="label mt-3">{label}</p>
    </div>
  );
};

const Hero = () => (
  <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
    {/* Photo is softened and sunk into the midnight base so type and glass sit above it. */}
    <img
      src={heroImage}
      alt=""
      fetchPriority="high"
      className="absolute inset-0 h-full w-full origin-[15%_40%] scale-[1.3] object-cover object-[50%_40%] brightness-[0.6] saturate-[0.7]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/10" />
    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/70 to-transparent" />

    <div className="container relative z-10 pb-10 pt-44">
      <p className="label mb-8 flex items-center gap-4">
        <span aria-hidden className="h-px w-10 bg-primary" />
        Ryuga Aerospace — student-led
      </p>

      <h1 className="font-display text-[clamp(3.5rem,10.5vw,10rem)] font-normal leading-[0.96] tracking-[-0.03em]">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.1em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.1 + i * 0.12 }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
          A student-led team building autonomous drones, robotics and AI — now with engineers
          shipping inside industry.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-12 px-7">
            <a href="#team">
              Meet the crew <ArrowDown />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="glass h-12 border-white/15 bg-transparent px-7 hover:bg-white/5"
          >
            <a href="#projects">View projects</a>
          </Button>
        </div>
      </div>

      <div className="glass mt-14 grid grid-cols-3 divide-x divide-white/10 rounded-3xl">
        <Stat value={6} label="Projects built" />
        <Stat value={4} label="Engineers in industry" />
        <Stat value={3} label="Companies" />
      </div>
    </div>
  </section>
);

export default Hero;
