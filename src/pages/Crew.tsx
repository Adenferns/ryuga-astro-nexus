import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { people } from "@/data/people";

const Crew = () => (
  <>
    <Nav />
    <main>
      <header className="container pb-12 pt-44 md:pb-20 md:pt-56">
        <Reveal>
          <Eyebrow index="—" label="Portfolios" />
          <h1 className="max-w-5xl font-display text-6xl font-normal leading-[0.98] tracking-[-0.03em] md:text-9xl">
            Four people. <em className="text-primary">Four portfolios.</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Each member of the crew builds their own. Open one to see the work, the stack and how they think.
          </p>
        </Reveal>
      </header>

      <section className="container grid gap-5 pb-28 sm:grid-cols-2 lg:grid-cols-4 md:pb-44">
        {people.map((p, i) => {
          const body = (
            <>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src={p.photo}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover object-top transition-transform duration-700 ease-out ${
                    p.portfolio ? "group-hover:scale-[1.04]" : "grayscale-[0.5]"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <span className="label absolute bottom-4 left-4">{p.company}</span>
              </div>
              <div className="px-2 pb-2 pt-5">
                <h2 className="font-display text-3xl leading-tight">{p.name}</h2>
                <p className="label mt-2">{p.role}</p>
                <p className={`mt-5 flex items-center gap-2 text-sm ${p.portfolio ? "text-primary" : "text-muted-foreground"}`}>
                  {p.portfolio ? (
                    <>
                      Open portfolio <ArrowUpRight className="h-4 w-4" />
                    </>
                  ) : (
                    "In progress"
                  )}
                </p>
              </div>
            </>
          );
          return (
            <Reveal key={p.slug} delay={(i % 4) * 0.06} className="h-full">
              {p.portfolio ? (
                <Link to={`/crew/${p.slug}`} className="glass glass-hover group block h-full rounded-3xl p-3">
                  {body}
                </Link>
              ) : (
                <div className="glass h-full rounded-3xl p-3 opacity-80" aria-disabled>
                  {body}
                </div>
              )}
            </Reveal>
          );
        })}
      </section>
    </main>
    <Footer />
  </>
);

export default Crew;
