"use client";

import { Info, Save, SquarePen } from "lucide-react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import MultiText from "../custom-ui/multi-text";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { workspaceSchema } from "@/lib/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import MultiImageUpload from "../custom-ui/multi-image-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Checkbox } from "../ui/checkbox";
import { Workspace } from "@/types";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useRouter } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import { BASE_URL } from "@/constants/environments";
import DetailToolTip from "../tooltip-btn/detail-tooltip";
import FacilitiesToolTip from "../tooltip-btn/facilities-tooltip";
import PoliciesToolTip from "../tooltip-btn/policies-tooltip";
import Cookies from "js-cookie";

interface WorkspaceFormProps {
  initialData?: Workspace | null;
}

function WorkspaceForm({ initialData }: WorkspaceFormProps) {
  const { owner } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const token =
    typeof window !== "undefined" ? Cookies.get("owner_token") : null;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    initialData ? initialData.imagesStr : []
  );

  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: initialData
      ? { ...initialData }
      : {
          name: "",
          description: "",
          openTime: "",
          closeTime: "",
          is24h: 0,
          area: "",
          cleanTime: "",
          shortTermPrice: "",
          longTermPrice: "",
          imagesStr: existingImages,
          newImages: [],
          facilitiesStr: [],
          policiesStr: [],
          detailsStr: [],
          capacity: "",
          category: "Bàn cá nhân",
          status: "Active",
          code: "",
        },
  });
  const is24h = form.watch("is24h");

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

  const onCreate = async (values: z.infer<typeof workspaceSchema>) => {
    const uploadedUrls: string[] = [...existingImages];

    setLoading(true);
    for (const file of selectedFiles) {
      const url = await uploadImage(file);
      if (url) uploadedUrls.push(url);
    }

    if (uploadedUrls.length === 0) {
      toast.error("Bạn phải tải lên ít nhất một ảnh hợp lệ.");
      setLoading(false);
      return;
    }

    const data = {
      name: values.name,
      description: values.description,
      openTime: values.openTime,
      closeTime: values.closeTime,
      code: values.code,
      is24h: values.is24h,
      area: Number(values.area),
      cleanTime: Number(values.cleanTime),
      prices: [
        {
          price: Number(values.shortTermPrice),
          category: "Giờ",
        },
        {
          price: Number(values.longTermPrice),
          category: "Ngày",
        },
      ],
      images: uploadedUrls.map((url) => ({ imgUrl: url })),
      facilities: values.facilitiesStr.map((facility) => ({
        facilityName: facility,
      })),
      policies: values.policiesStr.map((policy) => ({
        policyName: policy,
      })),
      details: values.detailsStr.map((detail) => ({
        detailName: detail,
      })),
      capacity: Number(values.capacity),
      category: values.category,
      status: values.status,
      ownerId: Number(owner?.id),
    };

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/workspaces`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tạo không gian.");
      }

      toast.success("Tạo không gian thành công!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      setLoading(false);
      router.push("/workspaces");
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

  const onUpdate = async (values: z.infer<typeof workspaceSchema>) => {
    const uploadedUrls: string[] = [...existingImages];

    setLoading(true);
    for (const file of selectedFiles) {
      const url = await uploadImage(file);
      if (url) uploadedUrls.push(url);
    }

    if (uploadedUrls.length === 0) {
      toast.error("Bạn phải tải lên ít nhất một ảnh hợp lệ.");
      setLoading(false);
      return;
    }

    const data = {
      name: values.name,
      description: values.description,
      openTime: values.openTime,
      closeTime: values.closeTime,
      code: values.code,
      is24h: values.is24h,
      area: Number(values.area),
      cleanTime: Number(values.cleanTime),
      prices: [
        {
          price: Number(values.shortTermPrice),
          category: "Giờ",
        },
        {
          price: Number(values.longTermPrice),
          category: "Ngày",
        },
      ],
      images: uploadedUrls.map((url) => ({ imgUrl: url })),
      facilities: values.facilitiesStr.map((facility) => ({
        facilityName: facility,
      })),
      policies: values.policiesStr.map((policy) => ({
        policyName: policy,
      })),
      details: values.detailsStr.map((detail) => ({
        detailName: detail,
      })),
      capacity: Number(values.capacity),
      category: values.category,
      status: values.status,
    };

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/workspaces/` + initialData?.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi cập nhật không gian.");
      }

      toast.success("Cập nhật không gian thành công!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      setLoading(false);
      router.push("/workspaces");
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
          <span>Chỉnh sửa không gian</span>
        ) : (
          <span>Tạo mới không gian</span>
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
            <div className="sm:col-span-2 grid sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-fourth font-bold text-sm ml-6">
                        Tên không gian
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="py-4 px-4 rounded-md file:bg-seventh"
                          placeholder="Tên công ty + Loại không gian + ..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-2 my-0">
                <FormField
                  control={form.control}
                  name="is24h"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-6">
                      <FormLabel className="text-fourth font-bold text-sm ml-6">
                        Mở cửa 24h
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          {...field}
                          checked={field.value === 1}
                          onCheckedChange={(value) => {
                            field.onChange(value ? 1 : 0);
                            if (value) {
                              form.setValue("openTime", "00:00:00");
                              form.setValue("closeTime", "23:59:00");
                            } else {
                              form.setValue("openTime", "");
                              form.setValue("closeTime", "");
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-2 gap-6 grid sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <FormField
                    control={form.control}
                    name="openTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-fourth font-bold text-sm ml-6">
                          Thời gian mở cửa
                        </FormLabel>
                        <FormControl>
                          <TimePicker
                            placeholder="Nhập thời gian mở cửa..."
                            disabled={is24h === 1}
                            format="HH:mm"
                            value={
                              field.value ? dayjs(field.value, "HH:mm") : null
                            }
                            onChange={(time, timeString) => {
                              console.log(time);
                              field.onChange(timeString);
                            }}
                            style={{
                              width: "100%",
                              height: "36px",
                              borderRadius: "10px",
                              border: "1px solid var(--input)",
                              boxShadow: "1px",
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="sm:col-span-1">
                  <FormField
                    control={form.control}
                    name="closeTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-fourth font-bold text-sm ml-6">
                          Thời gian đóng cửa
                        </FormLabel>
                        <FormControl>
                          <TimePicker
                            placeholder="Nhập thời gian đóng cửa..."
                            disabled={is24h === 1}
                            format="HH:mm"
                            value={
                              field.value ? dayjs(field.value, "HH:mm") : null
                            }
                            onChange={(time, timeString) => {
                              console.log(time);
                              field.onChange(timeString);
                            }}
                            style={{
                              width: "100%",
                              height: "36px",
                              borderRadius: "10px",
                              border: "1px solid var(--input)",
                              boxShadow: "1px",
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-1 flex flex-col gap-4 h-full justify-center w-full p-4 bg-primary rounded-md shadow-md">
              <Label className="text-white font-bold text-sm ml-6">
                Giá tiền
              </Label>
              <FormField
                control={form.control}
                name="shortTermPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-bold text-sm">
                      1. Theo giờ
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="py-4 px-4 rounded-md file:bg-white placeholder:text-white text-white"
                        placeholder="Nhập giá theo giờ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longTermPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-bold text-sm">
                      2. Theo ngày
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="py-4 px-4 rounded-md file:bg-white placeholder:text-white text-white"
                        placeholder="Nhập giá theo ngày..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="sm:col-span-1 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-sm ml-6">
                    Loại không gian
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || "Văn phòng"}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="py-4 px-4 rounded-md w-full">
                        <SelectValue placeholder="Chọn loại không gian" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Bàn cá nhân"
                        >
                          Bàn cá nhân
                        </SelectItem>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Văn phòng"
                        >
                          Văn phòng
                        </SelectItem>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Phòng họp"
                        >
                          Phòng họp
                        </SelectItem>
                        <SelectItem
                          className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                          value="Phòng hội thảo"
                        >
                          Phòng hội thảo
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
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-sm ml-6">
                    Diện tích (m²)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-4 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập diện tích..."
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
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-sm ml-6">
                    Sức chứa tối đa (người)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-4 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập sức chứa tối đa..."
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
          <div className="sm:col-span-1 flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="cleanTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-sm ml-6">
                    Thời gian dọn dẹp (phút)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-4 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập thời gian dọn dẹp..."
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
              name="detailsStr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-sm ml-6 flex gap-4 items-center">
                    <span>Chi tiết không gian</span>
                    <DetailToolTip />
                  </FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Nhập chi tiết không gian - Enter để thêm mới..."
                      value={field.value}
                      handleChange={(tag) =>
                        field.onChange([...field.value, tag])
                      }
                      handleRemove={(tag) =>
                        field.onChange([
                          ...field.value.filter((item) => item !== tag),
                        ])
                      }
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
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-sm ml-6">
                    Mã bàn
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-4 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập mã bàn..."
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
              name="facilitiesStr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-sm ml-6 flex gap-4 items-center">
                    <span>Cơ sở vật chất</span>
                    <FacilitiesToolTip />
                  </FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Nhập cơ sở vật chất - Enter để thêm mới..."
                      value={field.value}
                      handleChange={(tag) =>
                        field.onChange([...field.value, tag])
                      }
                      handleRemove={(tag) =>
                        field.onChange([
                          ...field.value.filter((item) => item !== tag),
                        ])
                      }
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
            <FormField
              control={form.control}
              name="policiesStr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-sm ml-6 flex gap-4 items-center">
                    <span>Quy định chung</span>
                    <PoliciesToolTip />
                  </FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Nhập quy định chung - Enter để thêm mới..."
                      value={field.value}
                      handleChange={(tag) =>
                        field.onChange([...field.value, tag])
                      }
                      handleRemove={(tag) =>
                        field.onChange([
                          ...field.value.filter((item) => item !== tag),
                        ])
                      }
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
              name="imagesStr"
              render={() => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-sm ml-6 flex gap-4 items-center">
                    <span>Hình ảnh</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info size={20} className="text-primary" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-white font-medium">
                            Có thể thêm nhiều hình ảnh
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <FormControl>
                    <MultiImageUpload
                      existingImages={existingImages}
                      onExistingImagesChange={setExistingImages}
                      onNewImagesChange={setSelectedFiles}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-2 w-full">
            <button
              className="z-10 flex gap-2 items-center justify-center bg-primary text-white py-3 rounded-md hover:bg-secondary"
              type="submit"
              disabled={loading}
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
        </form>
      </Form>
    </div>
  );
}

export default WorkspaceForm;
