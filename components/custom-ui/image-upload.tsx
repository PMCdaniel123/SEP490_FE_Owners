/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";

interface ImageUploadProps {
  value: string;
  handleChange: (file: File | string) => void;
  handleRemove: () => void;
}

const ImageUpload = ({
  value,
  handleChange,
  handleRemove,
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
    }
  }, [value]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      handleChange(file);
    }
  };

  const removeImage = () => {
    handleRemove();
    setPreview("");
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        className="py-3 px-4 rounded-md file:bg-seventh border h-[50px]"
        id="image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {preview && (
        <div className="relative w-36 h-36 border rounded-md overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            type="button"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
