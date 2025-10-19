import { Image as ImageIcon } from "lucide-react";
import img1 from "../assets/Gallery/img1.jpeg";
import img2 from "../assets/Gallery/img2.jpeg";
import img3 from "../assets/Gallery/img3.jpeg";
import img4 from "../assets/Gallery/img4.jpeg";
import img5 from "../assets/Gallery/img5.jpeg";
import img6 from "../assets/Gallery/img6.jpeg";
import img7 from "../assets/Gallery/img7.jpeg";
import img8 from "../assets/Gallery/img8.jpeg";
import img9 from "../assets/Gallery/img9.jpeg";
import img10 from "../assets/Gallery/img10.jpeg";
import img11 from "../assets/Gallery/img11.jpeg";
import img12 from "../assets/Gallery/img12.jpeg";
import img13 from "../assets/Gallery/img13.jpeg";
import img14 from "../assets/Gallery/img14.jpeg";
import img15 from "../assets/Gallery/img15.jpeg";
import img16 from "../assets/Gallery/img16.jpeg";



const Gallery = () => {
  
  const galleryItems = [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14,img15,img16];

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
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-xl overflow-hidden bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
               <img
                    src={item}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4">
                  
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
