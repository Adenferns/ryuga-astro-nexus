import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { useIsMobile } from "@/hooks/use-mobile";

// Every item below comes from the profile text — nothing added.
const layers = [
  {
    key: "hardware",
    n: "01",
    name: "Hardware",
    line: "Boards, power and sensors.",
    items: [
      "KiCad schematic and PCB design",
      "Power supply and relay circuits",
      "Raspberry Pi 5 systems",
      "Pixhawk 2.4.8 flight controller",
      "Pi Camera Module 3 (IMX708)",
      "Industrial cameras and PTZ",
    ],
  },
  {
    key: "firmware",
    n: "02",
    name: "Firmware",
    line: "Microcontrollers and the buses between them.",
    items: ["ESP32 and ESP32-S3", "ESPHome and ESP-IDF", "Arduino ecosystem", "UART, I2C and SPI", "C and C++ for embedded"],
  },
  {
    key: "software",
    n: "03",
    name: "Software",
    line: "Services, protocols and tooling.",
    items: ["Python", "FastAPI, REST and Server-Sent Events", "MAVLink", "Linux workflows (Manjaro, KDE)", "Git and GitHub"],
  },
  {
    key: "intelligence",
    n: "04",
    name: "Intelligence",
    line: "Perception, estimation and detection.",
    items: [
      "OpenCV, ORB features and RANSAC",
      "Visual-inertial odometry",
      "Sensor fusion with adaptive covariance",
      "YOLO object detection",
      "GPU-accelerated video processing",
    ],
  },
] as const;

type Key = (typeof layers)[number]["key"];

/** Line art printed on each plate (viewBox 100x100). Quiet by design: one hairline weight. */
const Art = ({ kind }: { kind: Key }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.55" strokeLinecap="round" className="absolute inset-0 h-full w-full">
    {kind === "hardware" && (
      <>
        <rect x="38" y="38" width="24" height="24" rx="1.5" />
        <path d="M38 46H20V26H8M38 54H14V74H6M62 46H80V26H92M62 54H86V74H94M46 38V18H30M54 38V12H70M46 62V82H34M54 62V88H66" />
        {[[8, 26], [6, 74], [92, 26], [94, 74], [30, 18], [70, 12], [34, 82], [66, 88]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />
        ))}
      </>
    )}
    {kind === "firmware" && (
      <>
        <rect x="26" y="26" width="48" height="48" rx="2" />
        <rect x="38" y="38" width="24" height="24" rx="1" />
        {[34, 42, 50, 58, 66].map((p) => (
          <path key={p} d={`M${p} 26V16M${p} 74V84M26 ${p}H16M74 ${p}H84`} />
        ))}
        <circle cx="31" cy="31" r="1.2" />
      </>
    )}
    {kind === "software" && (
      <>
        {[
          [16, 22, 34], [24, 32, 46], [24, 42, 28], [16, 52, 40], [24, 62, 52], [24, 72, 22],
        ].map(([x, y, w]) => (
          <path key={`${x}-${y}`} d={`M${x} ${y}H${x + w}`} />
        ))}
      </>
    )}
    {kind === "intelligence" && (
      <>
        {[[22, 28], [34, 60], [50, 22], [64, 48], [78, 30], [72, 70], [40, 78], [58, 64], [26, 46]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.4" />
        ))}
        <rect x="46" y="38" width="32" height="34" rx="1" />
        <path d="M46 44v-6h6M78 66v6h-6" />
        <path d="M14 14h8M14 14v8M86 86h-8M86 86v-8" />
      </>
    )}
  </svg>
);

const Plate = ({ i, gap, active, explode, kind, label }: { i: number; gap: number; active: number; explode: MotionValue<number>; kind: Key; label: string }) => {
  const z = useTransform(explode, [0, 1], [i * 6, i * gap]);
  const lit = active === i;
  return (
    <motion.div style={{ z, transformStyle: "preserve-3d" }} className="absolute inset-0">
      <motion.div
        animate={{ z: lit ? 30 : 0 }}
        transition={{ type: "spring", stiffness: 130, damping: 17 }}
        style={{ transformStyle: "preserve-3d" }}
        className={`absolute inset-0 overflow-hidden rounded-[1.6rem] border shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-colors duration-500 ${
          lit ? "border-primary/70 bg-primary/[0.13] text-primary" : "border-white/15 bg-white/[0.05] text-white/40"
        }`}
      >
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),transparent_45%)]" />
        <Art kind={kind} />
        <span className="absolute bottom-3 left-4 font-sans text-[0.6rem] font-medium uppercase tracking-[0.22em]">{label}</span>
      </motion.div>
    </motion.div>
  );
};

export const Stack = () => {
  const reduce = useReducedMotion();
  // Tighter layer spacing on phones so the top plate stays clear of the nav.
  const gap = useIsMobile() ? 56 : 92;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(p, "change", (v) => setActive(Math.min(3, Math.max(0, Math.floor((v - 0.12) / 0.22)))));

  const explode = useTransform(p, [0, 0.12], reduce ? [1, 1] : [0, 1]);
  const spin = useTransform(p, [0, 1], reduce ? [-34, -34] : [-42, -24]);
  const layer = layers[active];

  return (
    <section id="stack" ref={ref} className="relative h-[310svh] md:h-[400svh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pb-4 pt-[4.5rem] md:pt-20">
        <div className="container grid items-center gap-2 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <Reveal>
              <Eyebrow index="i" label="The stack" />
              <h2 className="font-display text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl md:text-7xl">
                Four layers. <em className="text-primary">One system.</em>
              </h2>
              <p className="mt-4 hidden max-w-md text-muted-foreground md:block">
                I like owning the whole path — from a sensor’s signal to a decision on screen.
              </p>
            </Reveal>

            <div className="mt-5 min-h-[13rem] md:mt-10 md:min-h-[15rem]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={layer.key}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                >
                  <p className="flex items-baseline gap-3">
                    <span className="font-display text-2xl italic text-primary">{layer.n}</span>
                    <span className="font-display text-3xl md:text-4xl">{layer.name}</span>
                  </p>
                  <p className="mt-1 text-muted-foreground">{layer.line}</p>
                  <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                    {layer.items.map((it) => (
                      <li key={it} className="py-1.5 text-sm md:py-2.5 md:text-[0.95rem]">
                        {it}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="order-1 max-lg:translate-y-6 lg:order-2">
            <div className="relative mx-auto aspect-square w-[min(54vw,30rem)] [perspective:1500px] sm:w-[min(62vw,30rem)] lg:w-[min(36vw,32rem)]">
              <motion.div
                aria-hidden
                style={{ rotateX: 58, rotateZ: spin, transformStyle: "preserve-3d" }}
                className="absolute inset-[16%]"
              >
                {layers.map((l, i) => (
                  <Plate key={l.key} i={i} gap={gap} active={active} explode={explode} kind={l.key} label={l.name} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
