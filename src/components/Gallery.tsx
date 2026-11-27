import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { photo } from "@/data/gallery";

// Home-page teaser: three photos, then on to the full gallery.
const shots = [
  { n: 2, className: "md:col-span-2 md:row-span-2", alt: "The team with their drones at an exhibition" },
  { n: 3, className: "", alt: "Quadcopter on a pink backdrop" },
  { n: 15, className: "", alt: "Drone on its landing pad" },
];

const Gallery = () => (
  <section id="gallery" className="scroll-mt-24 py-28 md:py-44">
    <div className="container">
      <SectionHead
        index="v"
        label="Gallery"
        title={
          <>
            Frames from <em className="text-muted-foreground">the field.</em>
          </>
        }
      />

      <div className="grid gap-4 md:h-[34rem] md:grid-cols-3 md:grid-rows-2">
        {shots.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08} className={s.className}>
            <Link
              to="/gallery"
              aria-label="Open the gallery"
              className="group block aspect-[4/3] h-full w-full overflow-hidden rounded-3xl border border-white/10 md:aspect-auto"
            >
              <img
                src={photo(s.n)}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </Link>
          </Reveal>
        ))}
      </div>

      <Button asChild size="lg" className="mt-10 h-12 px-7">
        <Link to="/gallery">
          Open the gallery <ArrowUpRight />
        </Link>
      </Button>
    </div>
  </section>
);

export default Gallery;
