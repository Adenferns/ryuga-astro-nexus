import { useEffect, useState, type PointerEvent, type ReactNode, type RefObject } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/** Feeds the `.spot` sheen (see index.css) with the pointer position inside a card. */
export const spot = (e: PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ---------- Liquid glass ----------
   A displacement map where red = horizontal and green = vertical position. Sampling from
   `scale` px away (negative = from the centre) bends whatever sits behind the lens into a
   magnifier. backdrop-filter: url() only renders in Chromium; elsewhere .pf-lens is plain frosted glass. */
const MAP = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
    "<defs><linearGradient id='x' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='#000'/><stop offset='1' stop-color='#f00'/></linearGradient>" +
    "<linearGradient id='y' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#000'/><stop offset='1' stop-color='#0f0'/></linearGradient></defs>" +
    "<rect width='160' height='160' fill='#000'/><rect width='160' height='160' fill='url(#x)'/>" +
    "<rect width='160' height='160' fill='url(#y)' style='mix-blend-mode:screen'/></svg>",
);

/** Mount once, before any .pf-lens, so Chromium never flashes a transparent lens. */
export const LiquidFilter = () => (
  <svg aria-hidden width="0" height="0" className="pointer-events-none absolute">
    <filter id="pf-lens" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
      <feImage href={`data:image/svg+xml;utf8,${MAP}`} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
      <feDisplacementMap in="SourceGraphic" in2="map" scale="-24" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>
);

// Refraction is the costliest thing on the page: Chromium + mouse + wide screens only; everyone else gets frosted glass.
const refracts = () =>
  typeof window !== "undefined" &&
  "chrome" in window &&
  window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches;

// Idle path (fractions of the free area): a loop around the figure that never crosses the face.
const ORBIT_X = [0.1, 0.85, 0.96, 0.9, 0.3, 0.04, 0.1];
const ORBIT_Y = [0.8, 0.86, 0.5, 0.08, 0.03, 0.5, 0.8];

/** Glass lens that follows the pointer over `boundsRef`, and orbits on its own on touch screens / when idle. */
export const Lens = ({ boundsRef, size = 150 }: { boundsRef: RefObject<HTMLElement>; size?: number }) => {
  const reduce = useReducedMotion();
  const visible = useInView(boundsRef);
  const [liquid, setLiquid] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 110, damping: 20, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 110, damping: 20, mass: 0.7 });
  useEffect(() => setLiquid(refracts()), []);

  useEffect(() => {
    const el = boundsRef.current;
    if (!el) return;
    const room = () => {
      const r = el.getBoundingClientRect();
      return { w: Math.max(0, r.width - size), h: Math.max(0, r.height - size), r };
    };
    if (reduce) {
      const { w, h } = room();
      x.set(w * 0.5);
      y.set(h * 0.84);
      return;
    }
    if (!visible) return; // nothing animates while the hero is off-screen
    let drift: ReturnType<typeof animate>[] = [];
    const start = () => {
      const { w, h } = room();
      drift = [
        animate(x, ORBIT_X.map((f) => f * w), { duration: 34, repeat: Infinity, ease: "linear" }),
        animate(y, ORBIT_Y.map((f) => f * h), { duration: 34, repeat: Infinity, ease: "linear" }),
      ];
    };
    const stop = () => drift.forEach((a) => a.stop());
    start();
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return stop;
    const move = (e: globalThis.PointerEvent) => {
      stop();
      const { w, h, r } = room();
      x.set(clamp(e.clientX - r.left - size / 2, 0, w));
      y.set(clamp(e.clientY - r.top - size / 2, 0, h));
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", start);
    return () => {
      stop();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", start);
    };
  }, [boundsRef, reduce, size, visible, x, y]);

  return (
    <motion.div
      aria-hidden
      data-liquid={liquid || undefined}
      style={{ x: sx, y: sy, width: size, height: size }}
      className="pf-lens pointer-events-none absolute left-0 top-0 z-10"
    />
  );
};

/** Wrapper that leans toward the pointer. Mouse only; a no-op on touch. */
export const Magnetic = ({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) => {
  const reduce = useReducedMotion();
  const [on, setOn] = useState(false);
  useEffect(() => setOn(window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduce), [reduce]);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  return (
    <motion.div
      style={{ x, y }}
      className="inline-block"
      onPointerMove={(e) => {
        if (!on || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};
