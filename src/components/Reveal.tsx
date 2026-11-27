import type { ReactNode } from "react";
import { motion } from "motion/react";

// Scroll-triggered entrance. Plays once; MotionConfig(reducedMotion="user") strips the movement.
export const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay }}
  >
    {children}
  </motion.div>
);

// "02  CREW ————" — italic serif index in champagne, small-caps label, then a hairline.
export const Eyebrow = ({ index, label }: { index: string; label: string }) => (
  <div className="mb-6 flex items-center gap-4">
    <span className="font-display text-xl italic text-primary">{index}</span>
    <span className="label">{label}</span>
    <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
  </div>
);

export const SectionHead = ({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: ReactNode;
}) => (
  <Reveal className="mb-14 md:mb-24">
    <Eyebrow index={index} label={label} />
    <h2 className="max-w-4xl font-display text-5xl font-normal leading-[1.02] tracking-[-0.02em] md:text-7xl">
      {title}
    </h2>
  </Reveal>
);
