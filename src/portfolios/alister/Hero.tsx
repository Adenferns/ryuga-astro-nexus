import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import photo from "@/assets/portfolio/alister-portrait.jpg";
import { Magnetic } from "../yash/kit";
import { useSfTime } from "./clock";

const ease = [0.23, 1, 0.32, 1] as const;

/** Each letter rises out of its own clipped slot, one after another. */
const Letters = ({ text, delay, className = "" }: { text: string; delay: number; className?: string }) => (
  <span className={`block overflow-hidden pb-[0.14em] ${className}`} aria-label={text}>
    {[...text].map((c, i) => (
      <motion.span
        key={i}
        aria-hidden
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease, delay: delay + i * 0.045 }}
      >
        {c}
      </motion.span>
    ))}
  </span>
);

const Portrait = () => {
  const reduce = useReducedMotion();
  const time = useSfTime();
  const ry = useSpring(useMotionValue(0), { stiffness: 90, damping: 16 });
  const rx = useSpring(useMotionValue(0), { stiffness: 90, damping: 16 });
  return (
    <div
      className="relative mx-auto w-[min(66vw,25rem)] sm:w-[min(72vw,25rem)] [perspective:1200px]"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 6);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {/* Slow dashed ring, like a solder-pad outline, turning behind the frame */}
      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        fill="none"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-[14%] h-[128%] w-[128%] text-primary/50"
      >
        <circle cx="50" cy="50" r="49" stroke="currentColor" strokeWidth="0.25" strokeDasharray="0.6 2.4" />
        <circle cx="50" cy="1" r="1.2" fill="hsl(var(--primary))" />
      </motion.svg>

      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease, delay: 0.2 }}
        className="relative"
      >
        <div className="glass rounded-[2.75rem] p-2.5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] bg-[#0c111b]">
            <img
              src={photo}
              alt="Portrait of Alister Fernandes"
              width={900}
              height={1200}
              decoding="async"
              className="h-full w-full object-cover object-[50%_24%]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#090b10]/65 via-[#090b10]/10 to-[#090b10]/30" />
          </div>
        </div>

        <motion.div
          className="glass absolute -bottom-6 left-3 z-20 rounded-2xl px-4 py-3 sm:-left-12 sm:bottom-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="label">San Francisco</p>
          <p className="mt-1 font-display text-3xl leading-none tabular-nums">{time}</p>
          <p className="mt-1 text-xs text-muted-foreground">Delga.ai · local time</p>
        </motion.div>
        <motion.div
          className="glass absolute -right-2 top-8 z-20 hidden rounded-2xl px-4 py-3 sm:block sm:-right-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.45 }}
        >
          <p className="label">Role</p>
          <p className="mt-1 font-display text-xl leading-tight">Robotics Lead</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Hero = () => {
  const mobile = useIsMobile(); // the hero is taller than a phone screen, so it must not fade on scroll
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 lg:pt-24">
      <div className="container grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <motion.div style={mobile ? undefined : { y: textY, opacity: textOpacity }} className="order-2 lg:order-1 lg:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="label mb-8 flex items-center gap-4"
          >
            <span aria-hidden className="h-px w-10 bg-primary" />
            Portfolio — Ryuga Aerospace crew
          </motion.p>

          <h1 className="font-display text-[clamp(4.4rem,14vw,12.5rem)] font-normal leading-[0.88] tracking-[-0.035em]">
            <Letters text="Alister" delay={0.25} />
            <Letters
              text="Fernandes"
              delay={0.55}
              className="italic text-transparent [-webkit-text-stroke:1px_hsl(var(--primary))]"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1 }}
            className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            PCB design and embedded systems development — from the board on the bench to a startup in San Francisco.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.1 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {["Robotics Lead · Ryuga Aerospace", "Delga.ai · San Francisco", "Y Combinator-backed"].map((t) => (
              <li key={t} className="glass rounded-full px-4 py-1.5 text-sm">
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.2 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Magnetic>
              <Button asChild size="lg" className="h-12 px-7">
                <a href="#path">
                  Follow the path <ArrowDown />
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="outline" className="glass h-12 border-white/15 bg-transparent px-7 hover:bg-white/5">
                <a href="#contact">Get in touch</a>
              </Button>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div style={mobile ? undefined : { y: portraitY }} className="order-1 lg:order-2 lg:col-span-5">
          <Portrait />
        </motion.div>
      </div>
    </section>
  );
};
