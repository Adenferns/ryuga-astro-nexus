import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { spot } from "./spot";

const approach = [
  ["Practical implementation", "Concepts become working prototypes. I value building systems that solve actual problems."],
  ["Hands-on experimentation", "Learning by building across hardware, software and testing, rather than staying inside one domain."],
  ["Whole-system thinking", "Understanding how electronics, firmware, software and intelligent systems work together."],
] as const;

const interests = [
  "Robotics and autonomous systems",
  "UAV and drone technologies",
  "Embedded electronics",
  "Artificial intelligence",
  "Computer vision",
  "Smart-home automation",
  "PCB and hardware engineering",
  "3D printing and rapid prototyping",
  "Emerging hardware and computing",
];

const contacts = [
  { label: "yg.shaw2004@gmail.com", href: "mailto:yg.shaw2004@gmail.com", hint: "Email" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yash-shaw-607188250/", hint: "Profile" },
  { label: "GitHub", href: "https://github.com/YashShawDevs", hint: "YashShawDevs" },
];

export const Approach = () => (
  <section id="approach" className="scroll-mt-0 py-28 md:py-40">
    <div className="container">
      <Reveal className="mb-12 md:mb-20">
        <Eyebrow index="iii" label="Approach" />
        <h2 className="max-w-4xl font-display text-5xl leading-[1.02] tracking-[-0.02em] md:text-7xl">
          Practical. Curious. <em className="text-primary">Whole-system.</em>
        </h2>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {approach.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.07} className="h-full">
            <div onPointerMove={spot} className="glass spot h-full rounded-3xl p-7 md:p-8">
              <p className="font-display text-xl italic text-primary">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-10 font-display text-3xl leading-tight">{t}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-24 md:mt-32">
        <p className="label mb-8">Interests</p>
        <ul className="grid gap-x-16 border-t border-white/10 md:grid-cols-2">
          {interests.map((t) => (
            <li
              key={t}
              className="border-b border-white/10 py-5 font-display text-2xl leading-tight transition-[padding,color] duration-300 ease-out hover:pl-3 hover:text-primary md:text-3xl"
            >
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export const Contact = () => (
  <section id="contact" className="scroll-mt-0 pb-10 pt-28 md:pt-40">
    <div className="container">
      <Reveal>
        <Eyebrow index="iv" label="Contact" />
        <h2 className="max-w-5xl font-display text-6xl leading-[0.98] tracking-[-0.03em] md:text-9xl">
          Let’s <em className="text-primary">talk.</em>
        </h2>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
          Always open to conversations about drones, embedded systems, computer vision and hardware.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mt-14 md:mt-20">
        <ul className="border-t border-white/10">
          {contacts.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 border-b border-white/10 py-6 transition-colors duration-300 hover:bg-white/[0.025] md:py-8"
              >
                <span className="font-display text-3xl leading-tight transition-colors duration-300 group-hover:text-primary md:text-5xl">
                  {c.label}
                </span>
                <span className="flex items-center gap-3">
                  <span className="label hidden sm:inline">{c.hint}</span>
                  <ArrowUpRight className="h-6 w-6 text-primary transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <footer className="mt-24 flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Yash Shaw</p>
        <p className="flex items-center gap-6">
          <Link to="/crew" className="transition-colors duration-200 hover:text-foreground">
            Part of the Ryuga Aerospace crew
          </Link>
          <a href="#top" className="transition-colors duration-200 hover:text-foreground">
            Back to top
          </a>
        </p>
      </footer>
    </div>
  </section>
);
