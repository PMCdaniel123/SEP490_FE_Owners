/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "../ui/input";
import { ImagePlus, X } from "lucide-react";

interface ImagePreview {
  id: string;
  file?: File;
  url?: string;
}

interface ImageUploadProps {
  existingImages: string[];
  onExistingImagesChange: (urls: string[]) => void;
  onNewImagesChange: (files: File[]) => void;
}

const MultiImageUpload = ({
  existingImages,
  onExistingImagesChange,
  onNewImagesChange,
}: ImageUploadProps) => {
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState("Chưa có ảnh nào được chọn");

  useEffect(() => {
    const allImages = [...existingImages.map((url) => ({ id: url, url }))];
    setImages(allImages);
  }, [existingImages]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length > 0) {
      setFileNames(validImages.map((file) => file.name).join(", "));
    } else {
      setFileNames("Chưa có tệp nào được chọn");
    }

    const newImages = validImages.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
    setNewImages((prev) => [...prev, ...validImages]);
  };

  useEffect(() => {
    onNewImagesChange(newImages);
  }, [newImages, onNewImagesChange]);

  const removeImage = (id: string) => {
    const isUrl = existingImages.includes(id);

    if (isUrl) {
      onExistingImagesChange(existingImages.filter((url) => url !== id));
    } else {
      setImages((prevImages) => prevImages.filter((img) => img.id !== id));
      setNewImages((prev) =>
        prev.filter((file) => URL.createObjectURL(file) !== id)
      );

      URL.revokeObjectURL(id);
      setFileNames("Chưa có ảnh nào được chọn");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4 border rounded-md">
        <label
          htmlFor="images"
          className="cursor-pointer py-3 px-5 bg-primary text-white rounded-s-md text-center flex gap-2 items-center"
        >
          <ImagePlus /> Chọn hình ảnh
        </label>
        <Input
          className="py-3 px-4 rounded-md file:bg-seventh border h-[50px] hidden"
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <span className="text-gray-500 text-sm">{fileNames}</span>
      </div>
      <div className="flex flex-wrap gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative w-36 h-36 border rounded-md overflow-hidden"
          >
            <img
              src={img.url || img.id}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => removeImage(img.id)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              type="button"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiImageUpload;
