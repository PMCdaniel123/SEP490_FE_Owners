"use client";

import { Save, SquarePen } from "lucide-react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { withdrawalSchema } from "@/lib/zod/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { BASE_URL } from "@/constants/environments";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";

function WithdrawalForm() {
  const form = useForm<z.infer<typeof withdrawalSchema>>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      title: "Yêu cầu rút tiền",
      description:
        "Tạo mới yêu cầu rút tiền lúc " +
        dayjs(new Date()).format("HH:mm:ss DD/MM/YYYY"),
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { owner } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    form.reset({
      title: "Yêu cầu rút tiền",
      description:
        "Tạo mới yêu cầu rút tiền lúc " +
        dayjs(new Date()).format("HH:mm:ss DD/MM/YYYY"),
    });
  }, [form]);

  const onCreate = async (values: z.infer<typeof withdrawalSchema>) => {
    setLoading(true);
    const data = {
      ...values,
      workspaceOwnerId: owner?.id,
    };
    try {
      const response = await fetch(`${BASE_URL}/owner-withdrawal-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tạo yêu cầu rút tiền.");
      }

      const result = await response.json();
      console.log(result);
      setLoading(false);
      router.push("/withdrawal");
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
      <div className="w-2xl mx-auto bg-white border border-primary rounded-lg p-6 mt-4">
        <h1 className="text-xl font-bold text-primary flex items-center justify-center gap-4 mt-4">
          <SquarePen />
          <span>Tạo mới yêu cầu rút tiền</span>
        </h1>
        <p className="text-center text-gray-500 italic mb-8 text-sm">
          Để hoàn tất quá trình xác minh, vui lòng cung cấp đầy đủ các thông tin
          bắt buộc.
        </p>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li className="flex items-start">
            ✅{" "}
            <span className="ml-2">
              Yêu cầu xác minh sẽ được xem xét trong vòng 12 giờ kể từ thời điểm
              gửi.
            </span>
          </li>
          <li className="flex items-start">
            ✅{" "}
            <span className="ml-2">
              Lần gửi yêu cầu rút tiền tiếp theo sẽ cách lần gửi yêu cầu rút
              tiền mới nhất ít nhất 12 giờ.
            </span>
          </li>
          <li className="flex items-start">
            ✅{" "}
            <span className="ml-2">
              Mỗi lần rút tiền sẽ rút toàn bộ số tiền hiện đang có trên hệ
              thống.
            </span>
          </li>
        </ul>
      </div>
      <Separator className="my-8 bg-primary" />
      <Form {...form}>
        <form
          className="grid sm:grid-cols-2 gap-6"
          onSubmit={form.handleSubmit(onCreate)}
        >
          <div className="sm:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-fourth font-bold text-base ml-6">
                      Tiêu đề
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 px-4 rounded-md file:bg-seventh"
                        placeholder="Nhập tiêu đề..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="sm:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-fourth font-bold text-base ml-6">
                      Mô tả
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 px-4 rounded-md file:bg-seventh"
                        placeholder="Nhập mô tả..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="sm:col-span-2 flex flex-col gap-2 w-full mt-2">
            <button
              className="z-10 flex gap-2 items-center justify-center bg-primary text-white py-3 rounded-md hover:bg-secondary"
              type="submit"
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

export default WithdrawalForm;
