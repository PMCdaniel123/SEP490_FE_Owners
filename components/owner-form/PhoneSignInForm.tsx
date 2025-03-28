"use client";

import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ownerPhoneSchema } from "@/lib/zod/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useEffect, useState } from "react";
import { OwnerPhoneSignInProps } from "@/types";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { login } from "@/stores/slices/authSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { BASE_URL } from "@/constants/environments";

interface PhoneSignInFormProps {
  initialData?: OwnerPhoneSignInProps | null;
}

function PhoneSignInForm({ initialData }: PhoneSignInFormProps) {
  const form = useForm<z.infer<typeof ownerPhoneSchema>>({
    resolver: zodResolver(ownerPhoneSchema),
    defaultValues: initialData
      ? { ...initialData }
      : {
          phone: "",
          password: "",
        },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSignIn = async (values: z.infer<typeof ownerPhoneSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/owners/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: values.phone,
          password: values.password,
        }),
      });

      if (!response.ok) {
        toast.error("Đăng nhập thất bại! Vui lòng kiểm tra lại.", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "dark",
        });
        return;
      }

      const result = await response.json();
      const token = result.token;

      localStorage.setItem("owner_token", token);
      router.push("/authentication");

      try {
        const decodeResponse = await fetch(`${BASE_URL}/users/decodejwttoken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        });
        const decoded = await decodeResponse.json();
        const ownerData = {
          id: decoded.claims.sub,
          email: decoded.claims.email,
          phone: decoded.claims.Phone,
        };
        toast.success("Đăng nhập thành công!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "dark",
        });

        dispatch(login(ownerData));
      } catch {
        toast.error("Có lỗi xảy ra khi giải mã token.", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "dark",
        });
        return;
      }
    } catch {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form
          className="grid sm:grid-cols-3 gap-6"
          onSubmit={form.handleSubmit(onSignIn)}
        >
          <div className="sm:col-span-3 flex flex-col gap-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fifth font-medium text-sm ml-6">
                    Số điện thoại
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập số điện thoại..."
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fifth font-medium text-sm ml-6">
                    Mật khẩu
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập mật khẩu..."
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
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingOutlined style={{ color: "white" }} />
              ) : (
                <span className="font-bold">Đăng nhập</span>
              )}
            </button>
          </div>
          <div className="flex items-center my-2 w-full sm:col-span-3">
            <hr className="w-[10%] border-sixth h-1" />
            <span className="w-[64%] px-3 text-fifth font-medium text-sm">
              Hoặc tiếp tục với
            </span>
            <hr className="w-full border-sixth h-1" />
          </div>
          <div className="text-center w-full sm:col-span-3">
            <Button className="text-white py-6 font-semibold w-full hover:bg-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="150"
                height="150"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Đăng nhập với Google
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default PhoneSignInForm;
