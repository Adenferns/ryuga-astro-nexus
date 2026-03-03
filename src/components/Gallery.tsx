import { useState } from "react";
import { X } from "lucide-react";

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
import img17 from "../assets/Gallery/img17.jpeg";
import img18 from "../assets/Gallery/img18.jpeg";
import img19 from "../assets/Gallery/img19.jpeg";
import img20 from "../assets/Gallery/img20.jpeg";
import img21 from "../assets/Gallery/img21.jpeg";
import img22 from "../assets/Gallery/img22.jpeg";
import img23 from "../assets/Gallery/img23.jpeg";
import img24 from "../assets/Gallery/img24.jpeg";
import img25 from "../assets/Gallery/img25.jpeg";
import img26 from "../assets/Gallery/img26.jpeg";
import img27 from "../assets/Gallery/img27.jpeg";
import img28 from "../assets/Gallery/img28.jpeg";
import img29 from "../assets/Gallery/img29.jpeg";
import img30 from "../assets/Gallery/img30.jpeg";

const Gallery = () => {
  const galleryItems = [
    img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,
    img11,img12,img13,img14,img15,img16,img17,img18,img19,img20,
    img21,img22,img23,img24,img25,img26,img27,img28,img29,img30
  ].reverse();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const imagesPerPage = 8;
  const totalPages = Math.ceil(galleryItems.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = galleryItems.slice(
    startIndex,
    startIndex + imagesPerPage
  );

  return (
    <section id="gallery" className="py-24 relative">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our workshops, competitions, and project developments
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {currentImages.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(item)}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <img
                src={item}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === i + 1
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-primary/20"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>

            <img
              src={selectedImage}
              alt="Full view"
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;