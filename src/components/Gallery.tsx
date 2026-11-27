import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SectionHead } from "@/components/Reveal";
import { useIsMobile } from "@/hooks/use-mobile";

// Every img*.jpeg in assets/Gallery, newest (highest number) first. Drop a file in to add a photo.
const modules = import.meta.glob<string>("../assets/Gallery/*.jpeg", {
  eager: true,
  query: "?url",
  import: "default",
});
const num = (path: string) => Number(path.match(/img(\d+)/)?.[1] ?? 0);
const images = Object.entries(modules)
  .sort(([a], [b]) => num(b) - num(a))
  .map(([, url]) => url);

const INITIAL = 12;

const Gallery = () => {
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  // Columns drift at different speeds as the section scrolls past — transform only, so it stays on the GPU.
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start end", "end start"] });
  const k = reduce ? 0 : 1;
  const y0 = useTransform(scrollYProgress, [0, 1], [70 * k, -70 * k]);
  const y1 = useTransform(scrollYProgress, [0, 1], [-40 * k, 120 * k]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120 * k, -120 * k]);
  const ys = [y0, y1, y2];

  const cols = isMobile ? 2 : 3;
  const visible = showAll ? images : images.slice(0, INITIAL);
  const columns = Array.from({ length: cols }, (_, c) => visible.filter((_, i) => i % cols === c));

  return (
    <section id="gallery" className="scroll-mt-24 overflow-hidden py-28 md:py-44">
      <div className="container">
        <SectionHead
          index="v"
          label="Gallery"
          title={
            <>
              Workshops, competitions, <em className="text-muted-foreground">build days.</em>
            </>
          }
        />

        <div ref={gridRef} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {columns.map((col, c) => (
            <motion.div
              key={c}
              style={{ y: ys[c] }}
              className={`flex flex-col gap-3 md:gap-5 ${c === 1 ? "md:pt-20" : ""}`}
            >
              {col.map((src) => (
                <motion.button
                  key={src}
                  type="button"
                  onClick={() => setSelected(src)}
                  aria-label="Open photo"
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="group block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-[border-color] duration-200 hover:border-primary/40"
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </motion.button>
              ))}
            </motion.div>
          ))}
        </div>

        {images.length > INITIAL && (
          <Button
            variant="outline"
            className="glass mt-24 h-11 border-white/15 bg-transparent px-6 hover:bg-white/5"
            aria-expanded={showAll}
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? "Show fewer" : `Show all ${images.length}`}
          </Button>
        )}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent
          aria-describedby={undefined}
          className="max-w-5xl border-0 bg-transparent p-0 shadow-none sm:rounded-3xl"
        >
          <DialogTitle className="sr-only">Gallery photo</DialogTitle>
          {selected && (
            <img
              src={selected}
              alt="Ryuga Aerospace gallery photo, enlarged"
              className="max-h-[85vh] w-full rounded-2xl object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
