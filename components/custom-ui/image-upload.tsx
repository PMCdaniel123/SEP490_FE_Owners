/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "../ui/input";
import { ImagePlus, X } from "lucide-react";

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
  const [fileNames, setFileNames] = useState("Chưa có hình ảnh nào được chọn");

  useEffect(() => {
    if (typeof value === "string" && value !== "") {
      setPreview(value);
      setFileNames(value);
    }
  }, [value]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFileNames(file.name);
      const url = URL.createObjectURL(file);
      setPreview(url);
      handleChange(file);
    }
  };

  const removeImage = () => {
    handleRemove();
    setFileNames("Chưa có ảnh nào được chọn");
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
        <span className="text-gray-500 text-sm truncate max-w-[400px]">
          {fileNames}
        </span>
      </div>
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
