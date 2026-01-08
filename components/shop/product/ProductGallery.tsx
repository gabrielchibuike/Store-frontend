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
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100 group">
        {/* Placeholder for real image since we don't have the assets */}
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          {/* In a real app, use next/image here */}
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-300">
            Image {selectedImage + 1}
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative aspect-square overflow-hidden rounded-md bg-gray-100 ring-offset-2 transition-all",
              selectedImage === index
                ? "ring-2 ring-primary"
                : "hover:opacity-80"
            )}
            onClick={() => setSelectedImage(index)}
          >
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-300">
              {index + 1}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
