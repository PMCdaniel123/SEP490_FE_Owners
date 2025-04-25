"use client";

import { Edit, Save, Wallet2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BankProps, WalletData } from "@/types";
import { BASE_URL } from "@/constants/environments";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { walletSchema } from "@/lib/zod/schema";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { Button } from "../ui/button";

interface WalletDetailProps {
  walletData: WalletData | null;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Wallet({ walletData, editMode, setEditMode }: WalletDetailProps) {
  const [loading, setLoading] = useState(true);
  const [bankData, setBankData] = useState<BankProps[]>([]);
  const form = useForm<z.infer<typeof walletSchema>>({
    resolver: zodResolver(walletSchema),
    defaultValues: walletData
      ? {
          bankName: walletData.bankName,
          bankAccountName: walletData.bankAccountName,
          bankNumber: walletData.bankNumber,
        }
      : {
          bankName: "",
          bankAccountName: "",
          bankNumber: "",
        },
  });

  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const response = await fetch(`https://api.vietqr.io/v2/banks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải danh sách ngan hang.");
        }

        const data = await response.json();
        setBankData(data.data);
        setLoading(false);
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

    fetchBankData();
  }, []);

  useEffect(() => {
    if (!walletData) return;
    form.reset({
      bankName: walletData?.bankName || "",
      bankAccountName: walletData?.bankAccountName || "",
      bankNumber: walletData?.bankNumber || "",
    });
  }, [form, walletData]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  const updateBank = async (data: z.infer<typeof walletSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/owner-wallets/` + walletData?.ownerWalletId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi cập nhật tài khoản ngân hàng.");
      }

      const responseData = await response.json();
      console.log(responseData);
      setEditMode(false);
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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-end">
        {!editMode && (
          <Button
            className="flex gap-2 items-center justify-center bg-primary text-white py-3 rounded-md hover:bg-secondary cursor-pointer"
            onClick={() => setEditMode(true)}
          >
            <span className="font-semibold flex items-center gap-2">
              <Edit size={18} /> Chỉnh sửa
            </span>
          </Button>
        )}
        {walletData?.bankAccountName !== null && editMode && (
          <Button
            className="flex gap-2 items-center justify-center bg-red-500 text-white py-3 rounded-md hover:bg-red-300 cursor-pointer"
            onClick={() => setEditMode(false)}
          >
            <span className="font-semibold flex items-center gap-2">
              <X size={18} /> Hủy
            </span>
          </Button>
        )}
      </div>
      <div className="border border-primary dark:bg-gray-800 p-4 rounded-md relative">
        <h2 className="font-semibold text-base mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-white px-4">
          <Wallet2 className="h-5 w-5 text-primary dark:text-primary-dark" />
          <span>Tài khoản ngân hàng</span>
        </h2>
        <Form {...form}>
          <form
            className="grid sm:grid-cols-2 gap-6 mt-4"
            onSubmit={form.handleSubmit(updateBank)}
          >
            <div className="sm:col-span-1 flex flex-col gap-2">
              <FormField
                control={form.control}
                name="bankAccountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-fourth font-semibold text-sm ml-6">
                      Tên chủ tài khoản ngân hàng
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="py-4 px-4 rounded-md file:bg-seventh"
                        placeholder="Nhập tên chủ tài khoản ngân hàng..."
                        disabled={!editMode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:col-span-1 flex flex-col gap-2">
              <FormField
                control={form.control}
                name="bankNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-fourth font-semibold text-sm ml-6">
                      Số tài khoản ngân hàng
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="py-4 px-4 rounded-md file:bg-seventh"
                        placeholder="Nhập số tài khoản ngân hàng..."
                        disabled={!editMode}
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
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-fourth font-semibold text-sm ml-6">
                      Tên ngân hàng
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        disabled={!editMode}
                      >
                        <SelectTrigger className="py-4 px-4 rounded-md w-full">
                          <SelectValue placeholder="Chọn tên ngân hàng" />
                        </SelectTrigger>
                        <SelectContent>
                          {bankData.map((bank) => (
                            <SelectItem
                              className="rounded-sm flex items-center gap-2 focus:bg-primary focus:text-white p-2 transition-colors duration-200"
                              value={bank.name}
                              key={bank.id}
                            >
                              <Image
                                src={bank.logo}
                                alt={bank.name}
                                width={50}
                                height={50}
                              />
                              <span>{bank.name}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            {editMode && (
              <div className="sm:col-span-2 flex flex-col gap-2 w-full">
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
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Wallet;
