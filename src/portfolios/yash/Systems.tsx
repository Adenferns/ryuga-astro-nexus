import { useEffect, useRef, useState, type ComponentType } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { Cams, Home, Integration, Pcb, Vio } from "./illustrations";
import { spot } from "./spot";

type Sys = {
  slug: string;
  kicker: string;
  title: string;
  status?: string;
  body: string;
  points: string[];
  next?: string;
  Art: ComponentType<{ still: boolean }>;
};

// Drawn from the profile text. GitHub links are deliberately absent: these repositories are private.
const systems: Sys[] = [
  {
    slug: "aerovision",
    kicker: "Drone navigation",
    title: "AEROVISION",
    status: "Ongoing",
    body: "Visual positioning and navigation from camera and inertial data — aimed at places where GPS is unavailable or unreliable.",
    points: [
      "Raspberry Pi 5 with Camera Module 3 (IMX708)",
      "Pixhawk 2.4.8 flight controller over MAVLink",
      "ORB feature matching with RANSAC outlier rejection",
      "Position and velocity estimation, adaptive covariance",
      "Simulation and real-image testing",
    ],
    Art: Vio,
  },
  {
    slug: "home-auto",
    kicker: "Smart home",
    title: "Home Auto",
    status: "Offline-first",
    body: "Home automation built around local control — reliable, and independent of cloud services or internet access.",
    points: [
      "ESP32-S3 running ESPHome and ESP-IDF",
      "Python and FastAPI hub with REST and Server-Sent Events",
      "Relay-based lighting control",
      "Mobile app integration over local Wi-Fi",
    ],
    next: "Next: Alexa integration with automatic offline fallback, and voice control through television systems.",
    Art: Home,
  },
  {
    slug: "surveillance",
    kicker: "Computer vision",
    title: "Multi-camera surveillance",
    status: "In development",
    body: "AI-based surveillance infrastructure for processing many camera streams at once, while keeping video processing and detection efficient.",
    points: [
      "RTSP video streaming",
      "GPU-accelerated decoding on NVIDIA hardware",
      "YOLO object detection",
      "Real-time analytics across cameras",
      "Server infrastructure and performance tuning",
    ],
    Art: Cams,
  },
  {
    slug: "pcb",
    kicker: "Hardware",
    title: "Electronics & PCB",
    body: "Hands-on circuit and board design, from schematic through to a working prototype.",
    points: [
      "KiCad schematic and PCB design",
      "Power supply and relay circuits",
      "Microcontroller integration",
      "I2C debugging and hardware interfacing",
      "Component selection and system integration",
    ],
    Art: Pcb,
  },
  {
    slug: "integration",
    kicker: "Systems",
    title: "Hardware integration",
    body: "Working with complete hardware systems rather than isolated parts.",
    points: [
      "Raspberry Pi-based systems",
      "Camera and sensor integration",
      "ESP32-based automation",
      "Drone flight controllers",
      "Industrial cameras and PTZ systems",
      "Embedded communication interfaces",
    ],
    Art: Integration,
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

const Block = ({ s, i, onActive, still }: { s: Sys; i: number; onActive: (i: number) => void; still: boolean }) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  return (
    <article ref={ref} className="flex min-h-[70svh] flex-col justify-center py-12 lg:min-h-[88svh]">
      {/* Phones: the schematic sits inline, no pinned panel */}
      <div className="glass mb-8 aspect-[4/3] rounded-3xl p-3 lg:hidden">
        <s.Art still={still} />
      </div>
      <p className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="font-display text-2xl italic text-primary">{pad(i + 1)}</span>
        <span className="label">{s.kicker}</span>
        {s.status && <span className="rounded-full border border-primary/40 px-3 py-0.5 text-xs text-primary">{s.status}</span>}
      </p>
      <h3 className="font-display text-5xl leading-[1.02] tracking-[-0.02em] md:text-6xl">{s.title}</h3>
      <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{s.body}</p>
      <ul className="mt-8 max-w-lg divide-y divide-white/10 border-y border-white/10">
        {s.points.map((p) => (
          <li key={p} className="py-2.5 text-[0.95rem]">
            {p}
          </li>
        ))}
      </ul>
      {s.next && <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">{s.next}</p>}
    </article>
  );
};

export const Systems = () => {
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const Art = systems[active].Art;
  return (
    <section id="systems" className="scroll-mt-0 py-28 md:py-40">
      <div className="container">
        <Reveal className="mb-12 md:mb-20">
          <Eyebrow index="ii" label="Selected systems" />
          <h2 className="max-w-4xl font-display text-5xl leading-[1.02] tracking-[-0.02em] md:text-7xl">
            Things I’ve built, <em className="text-muted-foreground">and am building.</em>
          </h2>
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="order-2 lg:order-1">
            {systems.map((s, i) => (
              <Block key={s.slug} s={s} i={i} onActive={setActive} still={reduce} />
            ))}
          </div>
          <div className="relative order-1 hidden lg:order-2 lg:block">
            <div className="sticky top-[max(6rem,calc(50svh-17.5rem))]">
              <div onPointerMove={spot} className="glass spot relative rounded-[2rem] p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#0a0e17]/60">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute inset-0 p-4"
                    >
                      <Art still={reduce} />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <p className="flex items-baseline justify-between px-4 pb-2 pt-4">
                  <span className="font-display text-xl italic text-primary">
                    Fig. {pad(active + 1)}
                  </span>
                  <span className="label">{systems[active].title}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
