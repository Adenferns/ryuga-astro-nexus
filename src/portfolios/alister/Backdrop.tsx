import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Fixed dial of hairline rings behind the page; it turns as you scroll and a champagne marker rides the middle ring. */
export const Backdrop = () => {
  const still = !!useReducedMotion();
  const { scrollYProgress: p } = useScroll();
  const turn = useTransform(p, [0, 1], still ? [0, 0] : [0, 140]);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.svg
        viewBox="-600 -600 1200 1200"
        fill="none"
        style={{ rotate: turn }}
        className="absolute left-[62%] top-[26%] h-[140vmax] w-[140vmax] max-w-none -translate-x-1/2 -translate-y-1/2 md:h-[95vmax] md:w-[95vmax]"
      >
        <circle r="220" stroke="rgb(255 255 255 / .10)" strokeDasharray="1 11" strokeWidth="2" />
        <circle r="340" stroke="rgb(255 255 255 / .07)" />
        <circle r="460" stroke="rgb(255 255 255 / .09)" strokeDasharray="3 18" />
        <circle r="580" stroke="rgb(255 255 255 / .05)" />
        <circle cx="340" r="5" fill="hsl(var(--primary))" />
        <circle cx="340" r="14" stroke="hsl(var(--primary) / .35)" />
        <circle cy="-460" r="3" fill="rgb(255 255 255 / .5)" />
      </motion.svg>
    </div>
  );
};
