import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "../yash/kit";

export const Intro = () => (
  <section id="intro" className="container py-24 md:py-36">
    <Reveal>
      <p className="max-w-5xl font-display text-4xl leading-[1.08] tracking-[-0.02em] md:text-7xl">
        PCB design and embedded systems, <span className="text-muted-foreground">from India — for a San Francisco startup.</span>
      </p>
      <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {["Robotics Lead · Ryuga Aerospace", "Delga.ai · San Francisco", "Y Combinator-backed", "Based in India"].map((t) => (
          <li key={t} className="flex items-center gap-3">
            <span aria-hidden className="h-px w-5 bg-primary" />
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-12 flex flex-wrap gap-3">
        <Magnetic>
          <Button asChild size="lg" className="h-12 px-7">
            <a href="#chapters">
              The path <ArrowDown />
            </a>
          </Button>
        </Magnetic>
        <Magnetic>
          <Button asChild size="lg" variant="outline" className="h-12 border-white/20 bg-transparent px-7 hover:bg-white/5">
            <a href="#contact">Get in touch</a>
          </Button>
        </Magnetic>
      </div>
    </Reveal>
  </section>
);
