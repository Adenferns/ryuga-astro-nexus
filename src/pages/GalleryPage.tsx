import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { allPhotos, photo } from "@/data/gallery";

const pad = (n: number) => String(n).padStart(2, "0");

// Photos per chapter, picked by what they show.
const STACK = [3, 8, 15, 5, 14];
const REVEAL = [2, 1, 27, 28, 29];
const TRACK = [18, 20, 23, 24, 6, 13, 11, 12, 16, 17, 21];
const TILT = [10, 9, 22, 26, 30, 7];

type Open = (src: string) => void;

/** Photo on a blurred copy of itself, so any aspect ratio fits without cropping. */
const Frame = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => (
  <div className={`relative overflow-hidden bg-black/40 ${className}`}>
    <img
      src={src}
      alt=""
      aria-hidden
      className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-2xl"
    />
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="relative h-full w-full object-contain"
    />
  </div>
);

const Chapter = ({
  index,
  label,
  title,
  note,
}: {
  index: string;
  label: string;
  title: ReactNode;
  note: string;
}) => (
  <Reveal className="container pb-12 pt-28 md:pb-16 md:pt-44">
    <Eyebrow index={index} label={label} />
    <h2 className="max-w-4xl font-display text-5xl leading-[1.02] tracking-[-0.02em] md:text-7xl">
      {title}
    </h2>
    <p className="mt-5 max-w-md text-muted-foreground">{note}</p>
  </Reveal>
);

/* ---------- 1. Stack: each photo fills the window, sinks a little, then the next one pushes over it ---------- */

const StackCard = ({ n, i, total, onOpen }: { n: number; i: number; total: number; onOpen: Open }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.3], [0, 36]);
  const light = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const filter = useMotionTemplate`brightness(${light})`;

  return (
    // Taller than the screen so the card stays pinned while the next one slides over it.
    <div ref={ref} className="relative h-[170svh]">
      <div className="sticky top-0 h-screen">
        <motion.button
          type="button"
          onClick={() => onOpen(photo(n))}
          aria-label={`Open photo ${n}`}
          style={{ scale, filter, borderRadius }}
          className="relative block h-full w-full overflow-hidden"
        >
          <Frame src={photo(n)} alt="Drone build" className="h-full w-full" />
          <span className="absolute bottom-8 left-8 font-display text-4xl italic tabular-nums drop-shadow md:left-12 md:text-5xl">
            {pad(i + 1)}
            <span className="text-white/60"> / {pad(total)}</span>
          </span>
        </motion.button>
      </div>
    </div>
  );
};

/* ---------- 2. Reveal: opens to fill the window, then eases back as it leaves ---------- */

const RevealFrame = ({ n, i, total }: { n: number; i: number; total: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  // 0 = frame enters at the bottom, 0.5 = it exactly fills the window, 1 = it has left at the top.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const wipe = i % 2 === 1;
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5],
    [
      wipe ? "inset(0% 100% 0% 0% round 24px)" : "inset(20% 12% 20% 12% round 36px)",
      "inset(0% 0% 0% 0% round 0px)",
    ],
  );
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [wipe ? 1.2 : 1.3, 1]);
  const outScale = useTransform(scrollYProgress, [0.5, 1], [1, 0.92]);
  const light = useTransform(scrollYProgress, [0.5, 1], [1, 0.5]);
  const filter = useMotionTemplate`brightness(${light})`;

  return (
    <div ref={ref} className="relative h-[100svh] overflow-hidden">
      <motion.div style={{ scale: outScale, filter }} className="h-full w-full">
        <motion.div style={{ clipPath }} className="relative h-full w-full overflow-hidden">
          <motion.img
            src={photo(n)}
            alt="Team and projects on show"
            loading="lazy"
            decoding="async"
            style={{ scale: imgScale }}
            className="h-full w-full object-cover object-[50%_35%]"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-8 md:p-12">
            <span className="label text-white/80">No. {n}</span>
            <span className="font-display text-3xl italic tabular-nums md:text-4xl">
              {pad(i + 1)}
              <span className="text-white/60"> / {pad(total)}</span>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ---------- 3. Track: vertical scroll drives a horizontal strip ---------- */

const TrackItem = ({ n, i, className, onOpen }: { n: number; i: number; className: string; onOpen: Open }) => (
  <button
    type="button"
    onClick={() => onOpen(photo(n))}
    aria-label={`Open photo ${n}`}
    className={`group shrink-0 text-left ${className}`}
  >
    <img
      src={photo(n)}
      alt="Workshop and demo"
      loading="lazy"
      decoding="async"
      className="h-full w-auto max-w-none rounded-2xl border border-white/10 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
    />
    <span className="label mt-3 block">{pad(i + 1)}</span>
  </button>
);

const Track = ({ onOpen }: { onOpen: Open }) => {
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const pinned = !isMobile && !reduce;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  // Distance to travel = track width minus one screen; re-measured as images load.
  useEffect(() => {
    const el = trackRef.current;
    if (!pinned || !el) return;
    const measure = () => setShift(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -shift]);

  if (!pinned) {
    return (
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4">
        {TRACK.map((n, i) => (
          <TrackItem key={n} n={n} i={i} onOpen={onOpen} className="h-[50svh] snap-center" />
        ))}
      </div>
    );
  }

  return (
    <section ref={sectionRef} style={{ height: `calc(100vh + ${shift}px)` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-10 px-[8vw]">
          {TRACK.map((n, i) => (
            <TrackItem
              key={n}
              n={n}
              i={i}
              onOpen={onOpen}
              className={`h-[56vh] ${i % 2 ? "translate-y-10" : "-translate-y-10"}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ---------- 4. Tilt: 3D card that follows the pointer, with a moving glare ---------- */

const TiltCard = ({ n, onOpen }: { n: number; onOpen: Open }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const px = useMotionValue(0); // pointer position across the card, -0.5 .. 0.5
  const py = useMotionValue(0);
  const spring = { stiffness: 160, damping: 18 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), spring);
  const gx = useTransform(px, [-0.5, 0.5], [0, 100]);
  const gy = useTransform(py, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.22), transparent 55%)`;

  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div style={{ perspective: 900 }}>
      <motion.button
        ref={ref}
        type="button"
        onClick={() => onOpen(photo(n))}
        onPointerMove={move}
        onPointerLeave={leave}
        aria-label={`Open photo ${n}`}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl p-2"
      >
        <img
          src={photo(n)}
          alt="Team, demos and presentations"
          loading="lazy"
          decoding="async"
          className="h-full w-full rounded-2xl object-cover"
        />
        <motion.span
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-2 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      </motion.button>
    </div>
  );
};

/* ---------- 5. Archive: everything, in two rows drifting opposite ways ---------- */

const Row = ({ items, reverse, seconds, onOpen }: { items: typeof allPhotos; reverse?: boolean; seconds: number; onOpen: Open }) => (
  <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
    <div
      style={{ animationDuration: `${seconds}s` }}
      className={`flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none ${
        reverse ? "[animation-direction:reverse]" : ""
      }`}
    >
      {[...items, ...items].map((p, i) => {
        const copy = i >= items.length;
        return (
          <div key={i} className="shrink-0 pr-4" aria-hidden={copy || undefined}>
            <button
              type="button"
              tabIndex={copy ? -1 : 0}
              onClick={() => onOpen(p.src)}
              aria-label={`Open photo ${p.n}`}
              className="block h-44 overflow-hidden rounded-2xl border border-white/10 md:h-60"
            >
              <img
                src={p.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-auto max-w-none object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </button>
          </div>
        );
      })}
    </div>
  </div>
);

/* ---------- Lightbox with next / previous ---------- */

const Lightbox = ({ src, onChange }: { src: string | null; onChange: (s: string | null) => void }) => {
  const list = allPhotos.map((p) => p.src);
  const idx = src ? list.indexOf(src) : -1;
  const step = (d: number) => onChange(list[(idx + d + list.length) % list.length]);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };
  const arrow =
    "glass absolute top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-150 active:scale-[0.95]";

  return (
    <Dialog open={src !== null} onOpenChange={(o) => !o && onChange(null)}>
      <DialogContent
        aria-describedby={undefined}
        onKeyDown={onKey}
        className="max-w-5xl border-0 bg-transparent p-0 shadow-none sm:rounded-3xl"
      >
        <DialogTitle className="sr-only">Gallery photo</DialogTitle>
        {src && (
          <img
            src={src}
            alt="Ryuga Aerospace gallery photo, enlarged"
            className="max-h-[85vh] w-full rounded-2xl object-contain"
          />
        )}
        <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className={`${arrow} left-3`}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" aria-label="Next photo" onClick={() => step(1)} className={`${arrow} right-3`}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </DialogContent>
    </Dialog>
  );
};

/* ---------- Page ---------- */

const GalleryPage = () => {
  const [open, setOpen] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const evens = allPhotos.filter((_, i) => i % 2 === 0);
  const odds = allPhotos.filter((_, i) => i % 2 === 1);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
      />
      <Nav />
      <main>
        <header className="container pb-8 pt-44 md:pt-56">
          <Reveal>
            <Eyebrow index="—" label="Gallery" />
            <h1 className="max-w-5xl font-display text-6xl font-normal leading-[0.98] tracking-[-0.03em] md:text-9xl">
              The work, <em className="text-primary">in frames.</em>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {allPhotos.length} photographs from build days, workshops and exhibitions — shown five
              different ways. Keep scrolling.
            </p>
          </Reveal>
        </header>

        <Chapter
          index="i"
          label="Builds"
          title={
            <>
              The hardware behind <em className="text-muted-foreground">every flight.</em>
            </>
          }
          note="Frames, flight controllers and wiring, one build at a time."
        />
        <div>
          {STACK.map((n, i) => (
            <StackCard key={n} n={n} i={i} total={STACK.length} onOpen={setOpen} />
          ))}
        </div>

        <Chapter
          index="ii"
          label="On show"
          title={
            <>
              Stands, stages and <em className="text-muted-foreground">the team.</em>
            </>
          }
          note="Exhibitions and ceremonies where the machines meet an audience."
        />
        {REVEAL.map((n, i) => (
          <RevealFrame key={n} n={n} i={i} total={REVEAL.length} />
        ))}

        <Chapter
          index="iii"
          label="In the room"
          title={
            <>
              Workshops, demos and <em className="text-muted-foreground">build sessions.</em>
            </>
          }
          note="Sharing the work with students — scroll to move along the strip."
        />
        <Track onOpen={setOpen} />

        <Chapter
          index="iv"
          label="Up close"
          title={
            <>
              Hover. <em className="text-muted-foreground">Tilt.</em>
            </>
          }
          note="Details, demos and presentations. On a touch screen, tap to open."
        />
        <div className="container grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3">
          {TILT.map((n, i) => (
            <Reveal key={n} delay={(i % 3) * 0.07}>
              <TiltCard n={n} onOpen={setOpen} />
            </Reveal>
          ))}
        </div>

        <Chapter
          index="v"
          label="The archive"
          title={
            <>
              Everything, <em className="text-muted-foreground">in motion.</em>
            </>
          }
          note="Hover to pause, click any frame to open it."
        />
        <div className="space-y-4">
          <Row items={evens} seconds={70} onOpen={setOpen} />
          <Row items={odds} reverse seconds={80} onOpen={setOpen} />
        </div>

        <section className="container py-28 md:py-44">
          <Reveal>
            <div className="glass flex flex-col items-start gap-8 rounded-[2rem] p-8 md:flex-row md:items-center md:justify-between md:p-14">
              <h2 className="max-w-xl font-display text-4xl leading-[1.05] tracking-[-0.02em] md:text-6xl">
                Want us at your <em className="text-primary">event?</em>
              </h2>
              <Button asChild size="lg" className="h-12 px-8">
                <Link to="/#contact">
                  Get in touch <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
      <Lightbox src={open} onChange={setOpen} />
    </>
  );
};

export default GalleryPage;
