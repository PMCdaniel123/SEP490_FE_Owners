"use client";

import { Save, SquarePen } from "lucide-react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { PromotionProps, Workspace } from "@/types";
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
import { promotionSchema } from "@/lib/zod/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { LoadingOutlined } from "@ant-design/icons";
import { BASE_URL } from "@/constants/environments";
import "dayjs/locale/vi";
dayjs.locale("vi");
import Cookies from "js-cookie";

interface PromotionFormProps {
  initialData?: PromotionProps | null;
}

function PromotionForm({ initialData }: PromotionFormProps) {
  const router = useRouter();
  const { owner } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const token =
    typeof window !== "undefined" ? Cookies.get("owner_token") : null;
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const form = useForm<z.infer<typeof promotionSchema>>({
    resolver: zodResolver(promotionSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          startDate: dayjs(initialData.startDate).format("YYYY-MM-DDTHH:mm"),
          endDate: dayjs(initialData.endDate).format("YYYY-MM-DDTHH:mm"),
        }
      : {
          code: "",
          description: "",
          discount: "",
          startDate: "",
          endDate: "",
          status: "Active",
          workspaceId: 0,
        },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        startDate: dayjs(initialData.startDate).format("YYYY-MM-DDTHH:mm"),
        endDate: dayjs(initialData.endDate).format("YYYY-MM-DDTHH:mm"),
      });
    }
  }, [initialData, form]);

  useEffect(() => {
    if (!owner) return;

    const getWorkspaces = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/workspaces/owner/${owner.id}`
        );

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải danh sách không gian.");
        }

        const data = await response.json();
        setWorkspaces(data.workspaces);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Đã xảy ra lỗi!";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          theme: "light",
        });
      }
    };

    getWorkspaces();
  }, [owner]);

  const onSubmit = async (values: z.infer<typeof promotionSchema>) => {
    const data = {
      ...values,
      startDate: dayjs(values.startDate ?? "").format("YYYY-MM-DDTHH:mm"),
      endDate: dayjs(values.endDate ?? "").format("YYYY-MM-DDTHH:mm"),
      discount: Number(values.discount),
    };

    if (!initialData) {
      data.workspaceId = values.workspaceId;
    }

    setLoading(true);
    try {
      const response = await fetch(
        initialData
          ? `${BASE_URL}/promotions/${initialData.id}`
          : `${BASE_URL}/promotions`,
        {
          method: initialData ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(
          initialData
            ? "Có lỗi xảy ra khi cập nhật mã khuyến mãi."
            : "Có lỗi xảy ra khi tạo mã khuyến mãi."
        );
      }

      const result = await response.json();
      if (
        result.notification === "Mã khuyến mãi đã tồn tại cho workspace này"
      ) {
        throw new Error(result.notification);
      }

      toast.success(
        initialData
          ? "Cập nhật mã khuyến mãi thành công!"
          : "Tạo mã khuyến mãi thành công!",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          theme: "light",
        }
      );
      setLoading(false);
      router.push("/promotions");
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
          <span>Chỉnh sửa mã khuyến mãi</span>
        ) : (
          <span>Tạo mới mã khuyến mãi</span>
        )}
      </h1>
      <Separator className="mt-4 mb-8 bg-primary" />
      <Form {...form}>
        <form
          className="grid sm:grid-cols-3 gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="sm:col-span-3 items-start justify-between gap-6 grid sm:grid-cols-3">
            <div className="sm:col-span-2 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-fourth font-bold text-sm ml-6">
                        Mã khuyến mãi
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="py-4 px-4 rounded-md file:bg-seventh"
                          placeholder="Nhập mã khuyến mãi..."
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
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-sm ml-6">
                    Ngày bắt đầu
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-4 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập ngày bắt đầu..."
                      type="datetime-local"
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
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-sm ml-6">
                    Ngày kết thúc
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-4 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập ngày kết thúc..."
                      type="datetime-local"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:col-span-3 grid sm:grid-cols-3 gap-6">
            <div className="sm:col-span-1 flex flex-col gap-2 w-full">
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-fourth font-bold text-sm ml-6">
                      Giảm giá (%)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="py-4 px-4 rounded-md file:bg-seventh"
                        placeholder="Nhập % giảm giá..."
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-fourth font-bold text-sm ml-6">
                      Trạng thái
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || "Active"}
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
            {!initialData && (
              <div className="sm:col-span-1 flex flex-col gap-2 w-full">
                <FormField
                  control={form.control}
                  name="workspaceId"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-fourth font-bold text-sm ml-6">
                        Áp dụng cho không gian
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ? field.value.toString() : ""}
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                        >
                          <SelectTrigger className="py-4 px-4 rounded-md w-full">
                            <SelectValue placeholder="Chọn không gian" />
                          </SelectTrigger>
                          <SelectContent>
                            {workspaces.map((workspace) => (
                              <SelectItem
                                key={workspace.id}
                                value={workspace.id.toString()}
                                className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                              >
                                {workspace.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs">
                        {fieldState.error?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            )}
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

export default PromotionForm;
