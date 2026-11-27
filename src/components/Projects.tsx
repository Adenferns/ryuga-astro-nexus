import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

// A flight-manifest style index rather than a card grid.
const Projects = () => (
  <section id="projects" className="scroll-mt-24 py-28 md:py-44">
    <div className="container">
      <SectionHead
        index="iii"
        label="Projects"
        title={
          <>
            Built, flown, <em className="text-primary">shipped.</em>
          </>
        }
      />

      <ol className="border-t border-white/10">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Reveal>
              <Link
                to={`/work#${p.slug}`}
                className="group grid gap-x-10 gap-y-3 border-b border-white/10 py-8 transition-colors duration-300 hover:bg-white/[0.025] md:grid-cols-[3.5rem_minmax(0,1.3fr)_minmax(0,1fr)] md:py-10 lg:grid-cols-[3.5rem_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,0.8fr)]"
              >
                <span className="font-display text-2xl italic tabular-nums text-primary md:pt-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="label mb-3">{p.category}</p>
                  <h3 className="font-display text-4xl leading-[1.04] tracking-[-0.02em] md:text-5xl">
                    {p.title}
                  </h3>
                </div>
                <p className="max-w-md leading-relaxed text-muted-foreground md:pt-7">
                  {p.description}
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs tracking-wide text-muted-foreground md:col-start-3 lg:col-start-auto lg:justify-end lg:pt-8 lg:text-right">
                  {p.stack.map((t) => (
                    <li key={t.name}>{t.name}</li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          </li>
        ))}
      </ol>

      <Button asChild variant="outline" className="glass mt-10 h-11 border-white/15 bg-transparent px-6 hover:bg-white/5">
        <Link to="/work">
          See every project in detail <ArrowUpRight />
        </Link>
      </Button>
    </div>
  </section>
);

export default Projects;
