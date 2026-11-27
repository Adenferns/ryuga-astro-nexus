import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Reveal, SectionHead } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { person, type Person } from "@/data/people";

// The page is organised by where the crew ships, not by who they are.
const companies = [
  { name: "Endure Technologies", slugs: ["aden", "snidon"] },
  { name: "Savir Power and Automation Pvt Ltd", slugs: ["yash"] },
  { name: "Delga.ai", slugs: ["alister"] },
].map((c) => {
  const members = c.slugs.map((s) => person(s) as Person);
  const first = members[0];
  return { ...c, members, place: first.place, note: first.note };
});

const iconLink =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-[transform,color,border-color] duration-200 hover:border-primary/50 hover:text-foreground active:scale-[0.97]";

const MemberCard = ({ m }: { m: Person }) => (
  <article className="glass flex min-w-[17rem] flex-1 gap-4 rounded-3xl p-3">
    <img
      src={m.photo}
      alt={m.name}
      loading="lazy"
      decoding="async"
      className="aspect-[4/5] w-28 shrink-0 rounded-2xl object-cover object-top sm:w-32"
    />
    <div className="flex min-w-0 flex-1 flex-col py-1 pr-1">
      <h3 className="font-display text-2xl leading-tight">{m.name}</h3>
      <p className="label mt-2">{m.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
        {m.github && (
          <a href={m.github} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on GitHub`} className={iconLink}>
            <Github className="h-4 w-4" />
          </a>
        )}
        <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`} className={iconLink}>
          <Linkedin className="h-4 w-4" />
        </a>
        <a href={`mailto:${m.email}`} aria-label={`Email ${m.name}`} className={iconLink}>
          <Mail className="h-4 w-4" />
        </a>
        {m.portfolio ? (
          <Link
            to={`/crew/${m.slug}`}
            className="ml-auto inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-transform duration-150 active:scale-[0.97]"
          >
            Portfolio <ArrowUpRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="label ml-auto">Portfolio soon</span>
        )}
      </div>
    </div>
  </article>
);

const Team = () => (
  <section id="team" className="scroll-mt-24 py-28 md:py-44">
    <div className="container">
      <SectionHead
        index="ii"
        label="Crew"
        title={
          <>
            Four engineers. Three companies. <em className="text-primary">One team.</em>
          </>
        }
      />

      <Reveal className="-mt-8 mb-14 md:-mt-12 md:mb-20">
        <Button asChild variant="outline" className="glass h-11 border-white/15 bg-transparent px-6 hover:bg-white/5">
          <Link to="/crew">
            View portfolios <ArrowUpRight />
          </Link>
        </Button>
      </Reveal>

      <div className="border-t border-white/10">
        {companies.map((c) => (
          <Reveal key={c.name}>
            <div className="grid gap-8 border-b border-white/10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
              <div className="lg:col-span-5">
                <p className="label mb-5 text-primary">Now at</p>
                <h3 className="font-display text-5xl leading-[1.02] tracking-[-0.02em] md:text-6xl">{c.name}</h3>
                <p className="label mt-5">
                  {c.place}
                  {c.note && <span className="text-foreground"> · {c.note}</span>}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:col-span-7">
                {c.members.map((m) => (
                  <MemberCard key={m.slug} m={m} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
