import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { achievements } from "@/data/achievements";

const News = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? achievements : achievements.slice(0, 4);

  return (
    <section id="news" className="scroll-mt-24 py-28 md:py-44">
      <div className="container">
        <SectionHead
          index="iv"
          label="Milestones"
          title={
            <>
              Wins, workshops, <em className="text-muted-foreground">and research.</em>
            </>
          }
        />

        <ol className="grid gap-4 md:grid-cols-2">
          {visible.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={(i % 2) * 0.06} className="h-full">
                <article className="glass glass-hover flex h-full flex-col rounded-3xl p-7 md:p-9">
                  <p className="label mb-10 text-primary">{item.date}</p>
                  <h3 className="font-display text-3xl leading-[1.08] tracking-[-0.01em] md:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{item.description}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="glass h-11 border-white/15 bg-transparent px-6 hover:bg-white/5"
            aria-expanded={showAll}
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? "Show less" : `Show all ${achievements.length}`}
          </Button>
          <Button asChild variant="ghost" className="h-11 px-6">
            <Link to="/work#achievements">
              Recognition in detail <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default News;
