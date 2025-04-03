"use client";

import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/constants/environments";
import { LoadingOutlined } from "@ant-design/icons";
import { CircleArrowLeft, KeyRound, SquareCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/owners/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        toast.error("Email không tồn tại.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "light",
        });
        return;
      }
      toast.success("Vui lòng kiểm tra email!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "light",
      });
      setLoading(false);
      localStorage.setItem("email_ls", email);
      router.push("reset_password");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary text-white py-6 px-6 rounded-tr-md flex items-center gap-2">
        <KeyRound /> <span>Quên mật khẩu</span>
      </h1>
      <div className="w-[76%] mx-auto mt-10 gap-8 flex flex-col">
        <div
          className="flex items-center gap-2 text-primary hover:text-secondary cursor-pointer"
          onClick={() => router.push("/")}
        >
          <span>
            <CircleArrowLeft />
          </span>{" "}
          Quay lại
        </div>
        <div className="flex items-center justify-center p-4 border border-primary rounded-md">
          <p className="text-fifth text-sm flex items-center gap-4">
            <span>
              <SquareCheckBig size={16} />
            </span>{" "}
            Vui lòng nhập địa chỉ email bạn đã đăng ký. Chúng tôi sẽ kiểm tra và
            gửi hướng dẫn đặt lại mật khẩu nếu tài khoản tồn tại.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="sm:col-span-3 flex flex-col gap-2 w-full">
            <label className="text-fifth font-medium text-xs ml-6">Email</label>
            <Input
              type="email"
              placeholder="Nhập email..."
              className="py-6 px-4 rounded-md file:bg-seventh"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="sm:col-span-3 flex flex-col gap-2 w-full">
            <button
              className="z-10 flex gap-2 items-center justify-center bg-primary text-white py-3 rounded-md hover:bg-secondary"
              type="submit"
              disabled={loading || !email || email === ""}
              onClick={handleForgotPassword}
            >
              {loading ? (
                <LoadingOutlined style={{ color: "white" }} />
              ) : (
                <span className="font-semibold">Xác nhận</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
