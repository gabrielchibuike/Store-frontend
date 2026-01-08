import { CloudUpload, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import Image from "next/image";

export function ProductGallery() {
  const { setValue, watch } = useFormContext();
  const [previews, setPreviews] = useState<string[]>([]);
  const images = watch("images");

  useEffect(() => {
    if (images && images.length > 0) {
      const newPreviews = Array.from(images).map((file: any) =>
        URL.createObjectURL(file)
      );
      setPreviews(newPreviews);

      return () => {
        newPreviews.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setPreviews([]);
    }
  }, [images]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue("images", Array.from(e.target.files));
    }
  };

  const removeImage = (index: number) => {
    const currentImages = watch("images") || [];
    const newImages = currentImages.filter((_: any, i: number) => i !== index);
    setValue("images", newImages);
  };

  return (
    <div className="bg-background p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Product Gallery</h3>

      <div className="border-2 border-dashed border-gray-200 rounded-lg p-10 flex flex-col items-center justify-center text-center bg-gray-50/50 min-h-[200px] relative">
        <input
          type="file"
          multiple
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
        <div className="bg-white p-3 rounded-full shadow-sm mb-4">
          <CloudUpload className="h-6 w-6 text-teal-600" />
        </div>
        <p className="text-sm font-medium text-gray-900">
          Drop files here or click to upload
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {previews.map((src, index) => (
          <div
            key={index}
            className="aspect-square bg-gray-50 rounded-md border border-gray-100 relative group overflow-hidden"
          >
            <Image
              src={src}
              alt={`Preview ${index}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        {[...Array(Math.max(0, 4 - previews.length))].map((_, i) => (
          <div
            key={`placeholder-${i}`}
            className="aspect-square bg-gray-50 rounded-md border border-gray-100"
          ></div>
        ))}
      </div>
    </div>
  );
}
