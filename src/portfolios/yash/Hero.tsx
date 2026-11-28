import { useRef, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import portrait from "@/assets/portfolio/yash-portrait.jpg";
import { Lens, Magnetic } from "./kit";

const ease = [0.23, 1, 0.32, 1] as const;

/** Line mask reveal: the text rises out of a clipped slot. */
const Line = ({ children, delay }: { children: ReactNode; delay: number }) => (
  <span className="block overflow-hidden pb-[0.12em]">
    <motion.span
      className="block"
      initial={{ y: "108%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.span>
  </span>
);

const Float = ({ className, delay = 0, paused, children }: { className: string; delay?: number; paused: boolean; children: ReactNode }) => (
  <motion.div
    className={`glass absolute z-20 rounded-2xl px-4 py-3 ${className}`}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: paused ? 0 : [0, -7, 0] }}
    transition={{
      opacity: { duration: 0.8, delay: 1.1 + delay },
      y: { duration: 7, repeat: paused ? 0 : Infinity, ease: "easeInOut", delay: 1.1 + delay },
    }}
  >
    {children}
  </motion.div>
);

const Portrait = () => {
  const reduce = useReducedMotion();
  const bounds = useRef<HTMLDivElement>(null);
  const onScreen = useInView(bounds);
  const rx = useSpring(useMotionValue(0), { stiffness: 90, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 90, damping: 16 });

  return (
    <div
      className="mx-auto w-[min(62vw,27rem)] sm:w-[min(80vw,27rem)] [perspective:1200px]"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 9);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease, delay: 0.15 }}
        className="relative"
      >
        {/* Champagne bloom behind the arch */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.22),transparent)] blur-2xl"
        />
        <div className="glass rounded-t-[999px] rounded-b-[2rem] p-2.5">
          <div ref={bounds} className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] bg-[#0c111b]">
            <img
              src={portrait}
              alt="Portrait of Yash Shaw"
              width={960}
              height={1280}
              decoding="async"
              className="h-full w-full object-cover object-[50%_18%]"
            />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#090b10]/70 to-transparent" />
            <Lens boundsRef={bounds} size={150} />
          </div>
        </div>

        <Float className="-bottom-6 left-2 sm:-left-12 sm:bottom-20" delay={0} paused={!onScreen}>
          <p className="label">Building now</p>
          <p className="mt-1 font-display text-xl leading-tight">AEROVISION</p>
          <p className="text-xs text-muted-foreground">Visual-inertial odometry</p>
        </Float>
        <Float className="hidden sm:block sm:-right-14 sm:top-10" delay={0.25} paused={!onScreen}>
          <p className="label">Across the stack</p>
          <p className="mt-1 text-sm leading-snug">
            PCB <span className="text-primary">→</span> firmware <span className="text-primary">→</span> software{" "}
            <span className="text-primary">→</span> vision
          </p>
        </Float>
      </motion.div>
    </div>
  );
};

export const Hero = () => {
  // On phones the hero is taller than the screen, so fading it on scroll would hide its own buttons.
  const mobile = useIsMobile();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 lg:pt-24">
      <div className="container grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <motion.div style={mobile ? undefined : { y: textY, opacity: textOpacity }} className="order-2 mt-6 lg:order-1 lg:col-span-7 lg:mt-0">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="label mb-8 flex items-center gap-4"
          >
            <span aria-hidden className="h-px w-10 bg-primary" />
            Portfolio — Ryuga Aerospace crew
          </motion.p>

          <h1 className="font-display text-[clamp(4.75rem,15vw,13.5rem)] font-normal leading-[0.86] tracking-[-0.035em]">
            <Line delay={0.25}>Yash</Line>
            <Line delay={0.37}>
              <em className="text-primary">Shaw</em>
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
            className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            I build the layers between sensors and software — embedded systems, drones and computer vision.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.82 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {["Aerospace & UAV Engineer · Ryuga Aerospace", "Savir Power and Automation Pvt Ltd · Verna"].map((t) => (
              <li key={t} className="glass rounded-full px-4 py-1.5 text-sm">
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.95 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Magnetic>
              <Button asChild size="lg" className="h-12 px-7">
                <a href="#stack">
                  Explore the work <ArrowDown />
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
