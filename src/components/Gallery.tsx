import { Image as ImageIcon } from "lucide-react";

const Gallery = () => {
  // Placeholder gallery items
  const galleryItems = Array(8).fill(null);

  return (
    <section id="gallery" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our workshops, competitions, and project developments
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((_, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-xl overflow-hidden bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/20">
                <ImageIcon className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-medium">Project Showcase {index + 1}</p>
                  <p className="text-xs text-muted-foreground">Workshop Event</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
