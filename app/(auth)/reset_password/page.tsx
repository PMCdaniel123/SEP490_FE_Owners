"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { BASE_URL } from "@/constants/environments";
import { resetPasswordSchema } from "@/lib/zod/schema";
import { LoadingOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleArrowLeft, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

function ResetPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const email_ls =
    typeof window !== "undefined" ? localStorage.getItem("email_ls") : null;

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email_ls ? email_ls : "",
      token: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!email_ls) {
      router.push("/forgot_password");
      return;
    }
    form.reset({
      email: email_ls ? email_ls : "",
      token: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [form, router, email_ls]);

  const handleResetPassword = async (
    values: z.infer<typeof resetPasswordSchema>
  ) => {
    const data = {
      token: values.token,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/owners/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        toast.error("Token không chính xác.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "light",
        });
        return;
      }
      toast.success("Đặt lại mật khẩu thành công!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "light",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary text-white py-6 px-6 rounded-tr-md flex items-center gap-2">
        <KeyRound /> <span>Đặt lại mật khẩu</span>
      </h1>
      <div className="w-[76%] mx-auto mt-4 gap-6 flex flex-col">
        <div
          className="flex items-center gap-2 text-primary hover:text-secondary cursor-pointer"
          onClick={() => router.push("/")}
        >
          <span>
            <CircleArrowLeft />
          </span>{" "}
          Quay lại
        </div>
        <Form {...form}>
          <form
            className="grid sm:grid-cols-3 gap-4"
            onSubmit={form.handleSubmit(handleResetPassword)}
          >
            <div className="sm:col-span-3 flex flex-col gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="py-6 px-4 rounded-md file:bg-seventh"
                        placeholder="Nhập email..."
                        type="email"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-3 flex flex-col gap-2 w-full">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-fifth font-medium text-xs ml-6">
                      Token
                    </FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-3 flex flex-col gap-2 w-full">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-fifth font-medium text-xs ml-6">
                      Mật khẩu mới
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 px-4 rounded-md file:bg-seventh"
                        placeholder="Nhập mật khẩu mới..."
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-3 flex flex-col gap-2 w-full">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-fifth font-medium text-xs ml-6">
                      Mật khẩu xác nhận
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="py-6 px-4 rounded-md file:bg-seventh"
                        placeholder="Nhập mật khẩu xác nhận..."
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-3 flex flex-col gap-2 w-full">
              <button
                className="z-10 flex gap-2 items-center justify-center bg-primary text-white py-3 rounded-md hover:bg-secondary"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <LoadingOutlined style={{ color: "white" }} />
                ) : (
                  <span className="font-semibold">Xác nhận</span>
                )}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
