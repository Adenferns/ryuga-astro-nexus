import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/data/projects";
import { achievements, type Achievement } from "@/data/achievements";
import { useIsMobile } from "@/hooks/use-mobile";

const pad = (n: number) => String(n).padStart(2, "0");
const ease = [0.23, 1, 0.32, 1] as const;

/* ---------- Project showcase: pinned photo that follows the scroll ---------- */

/** Photo when a project has one; otherwise a typographic cover in the house style. */
const Visual = ({ project, className }: { project: Project; className: string }) =>
  project.image ? (
    <img src={project.image} alt={project.alt ?? ""} loading="lazy" className={`${className} object-cover`} />
  ) : (
    <div
      role="img"
      aria-label={`${project.title} — ${project.category}`}
      className={`${className} relative flex flex-col justify-between overflow-hidden pb-16 bg-[#0a0e17] p-7 md:p-10`}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_10%,hsl(var(--primary)/0.2),transparent),linear-gradient(hsl(0_0%_100%/0.04)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.04)_1px,transparent_1px)] bg-[length:100%_100%,48px_48px,48px_48px]"
      />
      <p className="label relative">{project.domain} · {project.category}</p>
      <p className="relative font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.98] tracking-[-0.02em]">
        {project.title}
      </p>
    </div>
  );

const ProjectBlock = ({
  project,
  index,
  onActive,
}: {
  project: Project;
  index: number;
  onActive: (i: number) => void;
}) => {
  const ref = useRef<HTMLElement>(null);
  // Counts as "current" while it crosses the middle band of the viewport.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <article
      ref={ref}
      id={project.slug}
      className="flex min-h-[70svh] scroll-mt-28 flex-col justify-center py-12 lg:min-h-[85svh]"
    >
      <div className="mb-8 overflow-hidden rounded-3xl lg:hidden">
        <Visual project={project} className="aspect-[4/3] w-full" />
      </div>
      <p className="mb-5 flex items-center gap-4">
        <span className="font-display text-2xl italic text-primary">{pad(index + 1)}</span>
        <span className="label">{project.domain} · {project.category}</span>
        {project.by && <span className="rounded-full border border-white/15 px-3 py-0.5 text-xs text-muted-foreground">by {project.by}</span>}
      </p>
      <h3 className="font-display text-4xl leading-[1.04] tracking-[-0.02em] md:text-6xl">
        {project.title}
      </h3>
      <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
        {project.overview}
      </p>
      <ul className="mt-8 max-w-lg space-y-3">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3 leading-relaxed">
            <span aria-hidden className="mt-[0.7em] h-px w-5 shrink-0 bg-primary" />
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-10 max-w-lg">
        <p className="label mb-3">Built with</p>
        <dl className="divide-y divide-white/10 border-y border-white/10">
          {project.stack.map((t) => (
            <div key={t.name} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3 text-sm">
              <dt className="font-medium">{t.name}</dt>
              <dd className="text-muted-foreground">{t.role}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
};

const Showcase = () => {
  const [active, setActive] = useState(0);
  return (
    <section id="projects" className="container grid gap-16 py-12 lg:grid-cols-2 lg:gap-24">
      <div className="relative hidden lg:block">
        <div className="sticky top-28 h-[calc(100svh-9rem)]">
          <div className="glass relative h-full rounded-[2rem] p-2">
            <div className="relative h-full overflow-hidden rounded-3xl">
              {projects.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.07 }}
                  transition={{ duration: 0.8, ease }}
                  className="absolute inset-0"
                >
                  <Visual project={p} className="h-full w-full" />
                </motion.div>
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
              <p className="absolute bottom-5 left-6 font-display text-3xl italic tabular-nums">
                {pad(active + 1)}
                <span className="text-muted-foreground"> / {pad(projects.length)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        {projects.map((p, i) => (
          <ProjectBlock key={p.slug} project={p} index={i} onActive={setActive} />
        ))}
      </div>
    </section>
  );
};

/* ---------- Achievements: vertical scroll drives a horizontal track ---------- */

const CARD_VW = 34;
const GAP_VW = 3;
const PAD_VW = 8;

const AchievementCard = ({ a, index, pinned }: { a: Achievement; index: number; pinned: boolean }) => (
  <article
    className={`glass flex shrink-0 flex-col overflow-hidden rounded-3xl ${pinned ? "" : "w-full"}`}
    style={pinned ? { width: `${CARD_VW}vw` } : undefined}
  >
    {a.image ? (
      <img src={a.image} alt={a.alt ?? ""} loading="lazy" className="aspect-[16/10] w-full object-cover" />
    ) : (
      <div className="flex aspect-[16/10] w-full items-end bg-gradient-to-br from-white/[0.07] to-transparent p-6">
        <span className="font-display text-7xl italic leading-none text-primary/80">{pad(index + 1)}</span>
      </div>
    )}
    <div className="flex flex-1 flex-col p-6 md:p-7">
      <p className="label mb-4 text-primary">{a.date}</p>
      <h3 className="font-display text-2xl leading-[1.1] md:text-3xl">{a.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
    </div>
  </article>
);

const Achievements = () => {
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const pinned = !isMobile && !reduce;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // All distances are in vw so no measuring is needed: track width minus one screen.
  const n = achievements.length;
  const shift = n * CARD_VW + (n - 1) * GAP_VW + 2 * PAD_VW - 100;
  const transform = useTransform(scrollYProgress, (v) => `translateX(${-v * shift}vw)`);

  const header = (
    <div className="container">
      <Eyebrow index="ii" label="Recognition" />
      <h2 className="max-w-3xl font-display text-5xl leading-[1.02] tracking-[-0.02em] md:text-7xl">
        Awards, <em className="text-muted-foreground">finals</em> and research.
      </h2>
    </div>
  );

  if (!pinned) {
    return (
      <section id="achievements" className="scroll-mt-24 py-24">
        <div className="mb-12">{header}</div>
        <div className="container grid gap-5 md:grid-cols-2">
          {achievements.map((a, i) => (
            <Reveal key={a.title}>
              <AchievementCard a={a} index={i} pinned={false} />
            </Reveal>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="achievements"
      ref={ref}
      className="relative scroll-mt-0"
      style={{ height: `${n * 55 + 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-10 overflow-hidden pt-16">
        {header}
        <motion.div
          style={{ transform, paddingLeft: `${PAD_VW}vw`, paddingRight: `${PAD_VW}vw`, gap: `${GAP_VW}vw` }}
          className="flex w-max items-stretch"
        >
          {achievements.map((a, i) => (
            <AchievementCard key={a.title} a={a} index={i} pinned />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ---------- Page ---------- */

const Work = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
      />
      <Nav />
      <main>
        <header className="container pb-16 pt-44 md:pb-24 md:pt-56">
          <Reveal>
            <Eyebrow index="i" label="Our work" />
            <h1 className="max-w-5xl font-display text-6xl font-normal leading-[0.98] tracking-[-0.03em] md:text-9xl">
              Work that <em className="text-primary">flies.</em>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Six builds, from GPS-denied navigation to a long-endurance VTOL — and the recognition
              they earned along the way.
            </p>
          </Reveal>
        </header>

        <Showcase />
        <Achievements />

        <section className="container py-28 md:py-44">
          <Reveal>
            <div className="glass flex flex-col items-start gap-8 rounded-[2rem] p-8 md:flex-row md:items-center md:justify-between md:p-14">
              <h2 className="max-w-xl font-display text-4xl leading-[1.05] tracking-[-0.02em] md:text-6xl">
                Have something that should <em className="text-primary">fly?</em>
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
    </>
  );
};

export default Work;
