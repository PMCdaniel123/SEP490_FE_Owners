import { RootState } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { LoadingOutlined } from "@ant-design/icons";
import { Save } from "lucide-react";
import { BASE_URL } from "@/constants/environments";
import { toast } from "react-toastify";
import { changePasswordSchema } from "@/lib/zod/schema";

interface ChangePasswordModalProps {
  changePassword: boolean;
  setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChangePasswordModal({
  changePassword,
  setChangePassword,
}: ChangePasswordModalProps) {
  const { owner } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
  });

  useEffect(() => {
    if (changePassword) {
      form.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [form, changePassword]);

  const onCreate = async (values: z.infer<typeof changePasswordSchema>) => {
    const requestData = {
      userId: owner?.id,
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/users/updatepassword`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi thay đổi mật khẩu.");
      }

      toast.success("Thay đổi mật khẩu thành công!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });

      form.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setLoading(false);
      setChangePassword(false);
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
    <div className="mt-8">
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onCreate)}
        >
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Mật khẩu hiện tại
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập mật khẩu hiện tại"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Mật khẩu mới
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập mật khẩu mới"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-fourth font-bold text-base ml-6">
                    Xác nhận mật khẩu mới
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-6 px-4 rounded-md file:bg-seventh"
                      placeholder="Nhập xác nhận mật khẩu mới"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
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

export default ChangePasswordModal;
