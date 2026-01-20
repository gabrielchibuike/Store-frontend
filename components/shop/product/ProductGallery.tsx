"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-50 group shadow-sm transition-all duration-500">
        {images[selectedImage] ? (
          <Image
            src={images[selectedImage]}
            alt={`Product image ${selectedImage + 1}`}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
            <div className="text-muted-foreground/20 font-black text-6xl uppercase tracking-tighter -rotate-12 select-none">
              No Photo
            </div>
          </div>
        )}

        {/* Navigation Arrows - Visible on touch and hover */}
        {images.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <Button
              variant="secondary"
              size="icon"
              className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg pointer-events-auto opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg pointer-events-auto opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Image Counter Badge for Mobile */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 md:hidden">
            {selectedImage + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails - Scrollable on very small screens if needed */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative aspect-square w-20 md:w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50 ring-offset-2 transition-all duration-300",
              selectedImage === index
                ? "ring-2 ring-primary scale-95"
                : "hover:opacity-80 grayscale-[20%] hover:grayscale-0",
            )}
            onClick={() => setSelectedImage(index)}
          >
            {image ? (
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-400">
                {index + 1}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
