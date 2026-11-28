import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { person } from "@/data/people";

const a = person("alister")!;
const links = [
  { label: a.email, href: `mailto:${a.email}`, hint: "Email" },
  { label: "LinkedIn", href: a.linkedin, hint: "Profile" },
];

export const Contact = () => (
  <section id="contact" className="container py-28 md:py-44">
    <Reveal>
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">Contact — write in</p>
      <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              className="group flex items-center justify-between gap-6 py-7 font-display text-[clamp(2rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.02em] transition-colors duration-300 hover:text-primary md:py-10"
            >
              <span className="min-w-0 break-words">{l.label}</span>
              <ArrowUpRight className="h-7 w-7 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-12 md:w-12" />
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
    <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
      <span>© {new Date().getFullYear()} Alister Fernandes</span>
      <span className="flex gap-6">
        <Link to="/crew" className="hover:text-foreground">Ryuga Aerospace crew</Link>
        <a href="#top" className="hover:text-foreground">Top</a>
      </span>
    </footer>
  </section>
);
