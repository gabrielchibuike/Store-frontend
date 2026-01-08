"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
}

export function AdminProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(
    images && images.length > 0 ? images[0] : ""
  );

  if (!images || images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400">
          No Images Available
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Product Image"
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`relative aspect-square rounded-md overflow-hidden bg-gray-100 border-2 transition-all ${
              selectedImage === img
                ? "border-teal-600 ring-1 ring-teal-600"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
