import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import { motion } from "motion/react";
import photo from "@/assets/portfolio/alister-portrait.jpg";
import { useClocks } from "./clock";

const ease = [0.23, 1, 0.32, 1] as const;

/** HH:MM with rolling digits. Starts at 00:00 so the first paint rolls into the real time. */
const Time = ({ t }: { t: string }) => {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(true), []);
  const [h, m] = on ? t.split(":").map(Number) : [0, 0];
  const f = { minimumIntegerDigits: 2 };
  return (
    <p aria-label={t} className="font-display text-[4.4rem] leading-[0.9] tabular-nums tracking-[-0.03em] md:text-[clamp(5rem,12.5vw,13rem)]">
      <NumberFlow value={h} format={f} />
      <span className="mx-[0.04em] opacity-50">:</span>
      <NumberFlow value={m} format={f} />
    </p>
  );
};

const Half = ({ light, place, note, t }: { light?: boolean; place: string; note: string; t: string }) => (
  <div
    className={`flex flex-col px-6 pt-28 md:px-12 md:pt-32 ${
      light ? "bg-primary pt-[6.5rem] text-primary-foreground md:items-end md:text-right" : "bg-background text-foreground"
    }`}
  >
    <p className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] opacity-70">
      <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-primary-foreground" : "bg-primary"}`} />
      {place}
    </p>
    <div className="mt-5">
      <Time t={t} />
    </div>
    <p className="mt-4 hidden font-mono text-[0.7rem] uppercase tracking-[0.18em] opacity-60 md:block">{note}</p>
  </div>
);

export const Hero = () => {
  const { india, sf } = useClocks();
  return (
    <section id="top" className="relative grid min-h-[max(100svh,46rem)] grid-rows-2 overflow-hidden md:grid-cols-2 md:grid-rows-1">
      <Half place="India" note="IST · where Alister works" t={india} />
      <Half light place="San Francisco" note="PT · Delga.ai headquarters" t={sf} />

      {/* Porthole straddling the seam. The wrapper centres it; the inner element animates, so the two transforms never collide. */}
      <div className="absolute left-1/2 top-[47%] z-20 w-[min(46vw,13rem)] -translate-x-1/2 -translate-y-1/2 md:top-[44%] md:w-[min(30vw,25rem)]">
        <motion.div
          initial={{ clipPath: "circle(0% at 50% 50%)", scale: 0.9 }}
          animate={{ clipPath: "circle(50% at 50% 50%)", scale: 1 }}
          transition={{ duration: 1.3, ease, delay: 0.25 }}
          className="aspect-square w-full"
        >
          <img
            src={photo}
            alt="Portrait of Alister Fernandes"
            width={900}
            height={1200}
            decoding="async"
            className="h-full w-full rounded-full object-cover object-[50%_22%] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] ring-[6px] ring-background"
          />
        </motion.div>
      </div>

      {/* Difference blend: the name reads light on midnight and dark on champagne */}
      <h1 className="pointer-events-none absolute inset-x-0 bottom-5 z-30 px-6 font-display text-[clamp(3rem,17vw,9rem)] leading-[0.84] tracking-[-0.035em] text-white mix-blend-difference md:bottom-8 md:whitespace-nowrap md:px-12 md:text-[clamp(3rem,12.2vw,11.5rem)]">
        {["Alister", "Fernandes"].map((w, i) => (
          <span key={w} className="block overflow-hidden pb-[0.1em] md:inline-block md:pr-[0.22em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease, delay: 0.7 + i * 0.12 }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </h1>
    </section>
  );
};
