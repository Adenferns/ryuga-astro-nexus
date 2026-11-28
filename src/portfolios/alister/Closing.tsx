import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { person } from "@/data/people";
import { useClocks } from "./clock";

const a = person("alister")!;
const contacts = [
  { label: a.email, href: `mailto:${a.email}`, hint: "Email" },
  { label: "LinkedIn", href: a.linkedin, hint: "Profile" },
];
const ticker = ["PCB design", "Embedded systems", "Robotics", "Delga.ai", "Y Combinator-backed", "India ↔ San Francisco"];

export const Ticker = () => (
  <div aria-hidden className="overflow-hidden border-y border-white/10 py-5">
    <div className="flex w-max animate-marquee">
      {[0, 1].map((k) => (
        <ul key={k} className="flex shrink-0 items-center">
          {ticker.map((t) => (
            <li key={t} className="flex items-center whitespace-nowrap font-display text-3xl italic text-muted-foreground">
              {t}
              <span className="mx-8 text-xl not-italic text-primary">✦</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

export const Now = () => {
  const { india, sf } = useClocks();
  return (
    <section id="now" className="py-28 md:py-40">
      <div className="container">
        <Reveal className="mb-12 md:mb-16">
          <Eyebrow index="ii" label="Now" />
          <h2 className="max-w-4xl font-display text-5xl leading-[1.02] tracking-[-0.02em] md:text-7xl">
            Working from India, <em className="text-primary">for San Francisco.</em>
          </h2>
        </Reveal>
        <Reveal>
          <div className="glass grid gap-8 rounded-[2rem] p-8 md:grid-cols-[1fr_auto] md:items-end md:p-12">
            <div>
              <p className="label">Company</p>
              <p className="mt-3 font-display text-6xl leading-none tracking-[-0.02em] md:text-8xl">Delga.ai</p>
              <p className="mt-5 flex flex-wrap items-center gap-3 text-muted-foreground">
                Based in San Francisco
                <span className="rounded-full border border-primary/40 px-3 py-0.5 text-xs text-primary">Y Combinator-backed</span>
              </p>
            </div>
            <div className="flex gap-10 md:text-right">
              <div>
                <p className="label">India</p>
                <p className="mt-2 font-display text-5xl tabular-nums leading-none md:text-6xl">{india}</p>
                <p className="mt-2 text-xs text-muted-foreground">Where Alister works</p>
              </div>
              <div>
                <p className="label">San Francisco</p>
                <p className="mt-2 font-display text-5xl tabular-nums leading-none md:text-6xl">{sf}</p>
                <p className="mt-2 text-xs text-muted-foreground">Delga.ai HQ</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export const Contact = () => (
  <section id="contact" className="py-28 md:py-40">
    <div className="container">
      <Reveal>
        <Eyebrow index="iii" label="Contact" />
        <h2 className="font-display text-6xl leading-[1] tracking-[-0.02em] md:text-8xl">
          Let’s <em className="text-primary">talk.</em>
        </h2>
        <p className="mt-6 max-w-md text-lg text-muted-foreground">Robotics, PCB design or embedded systems — write in.</p>
      </Reveal>
      <ul className="mt-12 max-w-2xl divide-y divide-white/10 border-y border-white/10">
        {contacts.map((c) => (
          <li key={c.href}>
            <a
              href={c.href}
              {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              className="group flex items-center justify-between gap-4 py-6 font-display text-3xl transition-colors duration-200 hover:text-primary md:text-4xl"
            >
              <span className="min-w-0 break-words">{c.label}</span>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </li>
        ))}
      </ul>
      <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Alister Fernandes</span>
        <span className="flex gap-6">
          <Link to="/crew" className="hover:text-foreground">Part of the Ryuga Aerospace crew</Link>
          <a href="#top" className="hover:text-foreground">Back to top</a>
        </span>
      </footer>
    </div>
  </section>
);
