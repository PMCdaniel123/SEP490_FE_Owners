"use client";

import { Save, SquarePen } from "lucide-react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { AmenityProps } from "@/types";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { amenitySchema } from "@/lib/zod/schema";
import ImageUpload from "../custom-ui/image-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";
import { BASE_URL } from "@/constants/environments";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";

interface AmenityFormProps {
  initialData?: AmenityProps | null;
}

function AmenityForm({ initialData }: AmenityFormProps) {
  const { owner } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? Cookies.get("owner_token") : null;
  const form = useForm<z.infer<typeof amenitySchema>>({
    resolver: zodResolver(amenitySchema),
    defaultValues: initialData
      ? { ...initialData }
      : {
          name: "",
          description: "",
          price: "",
          imgUrl: "",
          quantity: "Vật dụng",
          category: "",
          status: "Active",
        },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("images", file);
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/images/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải lên ảnh.");
      }

      const result = await response.json();
      setLoading(false);
      return result.data[0];
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Đã xảy ra lỗi!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      setLoading(false);
    }
  };

  const onCreate = async (values: z.infer<typeof amenitySchema>) => {
    // console.log(amenitySchema.parse(values));
    let imgUrl = values.imgUrl;
    setLoading(true);
    if (typeof imgUrl !== "string") {
      try {
        const uploadedUrl = await uploadImage(imgUrl);
        if (!uploadedUrl) {
          throw new Error("Có lỗi xảy ra khi tải lên ảnh.");
        }
        imgUrl = uploadedUrl;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Đã xảy ra lỗi!";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          theme: "light",
        });
        setLoading(false);
        return;
      }
    }

    const data = {
      ...amenitySchema.parse(values),
      imgUrl,
      ownerId: owner?.id,
    };
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/amenities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tạo tiện ích.");
      }

      toast.success("Tạo tiện ích thành công!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      setLoading(false);
      router.push("/amenities");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Đã xảy ra lỗi!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      setLoading(false);
    }
  };

  const onUpdate = async (values: z.infer<typeof amenitySchema>) => {
    // console.log(amenitySchema.parse(values));
    let imgUrl = values.imgUrl;

    setLoading(true);
    if (typeof imgUrl !== "string") {
      try {
        const uploadedUrl = await uploadImage(imgUrl);
        if (!uploadedUrl) {
          throw new Error("Có lỗi xảy ra khi tải lên ảnh.");
        }
        imgUrl = uploadedUrl;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Đã xảy ra lỗi!";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          theme: "light",
        });
        setLoading(false);
        return;
      }
    }

    const data = {
      // ...amenitySchema.parse(values),
      imgUrl,
      name: values.name,
      description: values.description,
      price: Number(values.price),
      quantity: Number(values.quantity),
      category: values.category,
      status: values.status,
    };

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/amenities/` + initialData?.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi cập nhật tiện ích.");
      }

      toast.success("Cập nhật tiện ích thành công!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      setLoading(false);
      router.push("/amenities");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Đã xảy ra lỗi!";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-base font-bold text-primary flex items-center gap-4 mt-4">
        <SquarePen />
        {initialData ? (
          <span>Chỉnh sửa tiện ích</span>
        ) : (
          <span>Tạo mới tiện ích</span>
        )}
      </h1>
      <Separator className="mt-4 mb-8 bg-primary" />
      <Form {...form}>
        <form
          className="grid sm:grid-cols-3 gap-6"
          onSubmit={
            initialData
              ? form.handleSubmit(onUpdate)
              : form.handleSubmit(onCreate)
          }
        >
          <div className="sm:col-span-3 items-start justify-between gap-6 grid sm:grid-cols-3">
            <div className="sm:col-span-2 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-fourth font-bold text-sm ml-6">
                        Tên tiện ích
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="py-4 px-4 rounded-md file:bg-seventh"
                          placeholder="Nhập tên tiện ích..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-fourth font-bold text-sm ml-6">
                        Mô tả
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="py-4 px-4 rounded-md file:bg-seventh"
                          placeholder="Mô tả..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-1 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-sm ml-6">
                    Loại tiện ích
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="py-4 px-4 rounded-md w-full">
                        <SelectValue placeholder="Chọn phân loại" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Vật dụng"
                        >
                          Vật dụng
                        </SelectItem>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Dịch vụ"
                        >
                          Dịch vụ
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-1 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-sm ml-6">
                    Số lượng
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-4 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập số lượng..."
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-1 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-sm ml-6">
                    Giá tiền (VND)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-4 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập giá tiền..."
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="imgUrl"
              render={({ field }) => {
                const imageUrl =
                  typeof field.value === "string"
                    ? field.value
                    : field.value instanceof File
                    ? URL.createObjectURL(field.value)
                    : "";
                return (
                  <FormItem>
                    <FormLabel className="text-fourth font-bold text-sm ml-6">
                      Hình ảnh
                    </FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={imageUrl}
                        handleChange={(image) => field.onChange(image)}
                        handleRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="sm:col-span-1 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-sm ml-6">
                    Trạng thái
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || "Inactive"}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="py-4 px-4 rounded-md w-full">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Active"
                        >
                          Hoạt động
                        </SelectItem>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Inactive"
                        >
                          Ngừng hoạt động
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-2 w-full">
            <button
              className={cn(
                "z-10 flex gap-2 items-center justify-center",
                "bg-primary text-white font-bold py-3 px-6 rounded-md",
                "hover:bg-secondary transition-colors duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              type="submit"
              disabled={!form.formState.isDirty || loading}
            >
              {loading ? (
                <LoadingOutlined style={{ color: "white" }} />
              ) : (
                <span className="font-bold flex items-center gap-2">
                  <Save size={18} /> Xác nhận
                </span>
              )}
            </button>
          </div>
          <div className="sm:col-span-1 flex flex-col gap-2 w-full">
            <button
              className={cn(
                "z-10 flex gap-2 items-center justify-center cursor-pointer",
                "bg-white text-gray-500 border border-gray-500 font-bold py-3 px-6 rounded-md",
                "hover:bg-gray-500 hover:text-white transition-colors duration-200"
              )}
              type="button"
              disabled={loading}
              onClick={() => router.push("/amenities")}
            >
              <span className="font-bold flex items-center gap-2">Hủy</span>
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AmenityForm;
