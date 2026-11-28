import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

type Seg = [d: string, endX: number, endY: number];

// PCB-style traces kept to the page margins so they never strike through text. Wide screens and phones get their own layout.
const wide: Seg[] = [
  ["M0 120H18L34 136V400L18 416V500", 18, 500],
  ["M0 600H18L34 616V780L18 796V880", 18, 880],
  ["M1440 200H1350L1310 240V480L1270 520H1190", 1190, 520],
  ["M1440 640H1380L1340 680V820L1300 860H1120", 1120, 860],
  ["M1400 0V60L1360 100H1240", 1240, 100],
];
const narrow: Seg[] = [
  ["M0 120H14L26 132V330", 26, 330],
  ["M390 260H376L364 272V520", 364, 520],
  ["M0 600H14L26 612V780", 26, 780],
  ["M390 700H376L364 712V820", 364, 820],
];

const Traces = ({ paths, box, still }: { paths: Seg[]; box: string; still: boolean }) => {
  const p = useSpring(useScroll().scrollYProgress, { stiffness: 80, damping: 24 });
  return (
    <svg viewBox={box} preserveAspectRatio="xMidYMid slice" fill="none" className="absolute inset-0 h-full w-full">
      {paths.map(([d, x, y], i) => (
        <Trace key={d} d={d} x={x} y={y} p={p} k={2 + (i % 3) * 0.6} still={still} />
      ))}
    </svg>
  );
};

const Trace = ({ d, x, y, p, k, still }: { d: string; x: number; y: number; p: ReturnType<typeof useSpring>; k: number; still: boolean }) => {
  // Scrolling the whole page runs the pulse k times along the trace.
  const offset = useTransform(p, [0, 1], [0, -k]);
  return (
    <>
      <path d={d} stroke="rgb(255 255 255 / .14)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={x} cy={y} r="4" stroke="rgb(255 255 255 / .16)" strokeWidth="1" />
      {!still && (
        <>
          <motion.path d={d} pathLength={1} strokeDasharray="0.07 1" stroke="hsl(var(--primary) / .16)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDashoffset: offset }} />
          <motion.path d={d} pathLength={1} strokeDasharray="0.07 1" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDashoffset: offset }} />
        </>
      )}
    </>
  );
};

/** Fixed layer behind the page: PCB traces with a pulse that travels as you scroll. */
export const Backdrop = () => {
  const still = !!useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="hidden h-full w-full md:block">
        <Traces paths={wide} box="0 0 1440 900" still={still} />
      </div>
      <div className="h-full w-full md:hidden">
        <Traces paths={narrow} box="0 0 390 844" still={still} />
      </div>
    </div>
  );
};
