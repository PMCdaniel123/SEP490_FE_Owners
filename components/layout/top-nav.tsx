"use client";

import {
  Banknote,
  ChevronsUpDown,
  LockKeyhole,
  LogOut,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";
import OwnerNotification from "../owner-notification/owner-notification";
import { formatCurrency } from "@/types";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "@/stores/slices/authSlice";
import { toast } from "react-toastify";
import { RootState } from "@/stores";
import Link from "next/link";
import { BASE_URL } from "@/constants/environments";

function TopNav() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("owner_token") : null;
  const router = useRouter();
  const dispatch = useDispatch();
  const { owner } = useSelector((state: RootState) => state.auth);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token !== null && token !== undefined && token !== "") {
      const getCustomerData = async () => {
        try {
          const decodeResponse = await fetch(
            `${BASE_URL}/owners/decodejwttoken`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: token,
              }),
            }
          );

          if (!decodeResponse.ok) {
            throw new Error("Có lỗi xảy ra khi giải mã token.");
          }

          const decoded = await decodeResponse.json();
          const ownerData = {
            id: decoded.claims.sub,
            email: decoded.claims.email,
            phone: decoded.claims.Phone,
          };
          dispatch(login(ownerData));

          const balanceResponse = await fetch(
            `${BASE_URL}/owner-wallets/` + ownerData.id,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!balanceResponse.ok) {
            throw new Error("Có lỗi xảy ra khi tải số tiền.");
          }

          const balanceData = await balanceResponse.json();
          if (
            balanceData.balance === null ||
            balanceData.balance === undefined
          ) {
            balanceData.balance = 0;
          }
          setBalance(balanceData.balance);
          setIsLoading(false);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Đã xảy ra lỗi!";
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            theme: "light",
          });
          localStorage.removeItem("owner_token");
          router.push("/");
          setIsLoading(false);
        }
      };
      getCustomerData();
    }
  }, [dispatch, token, router]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleLogOut = () => {
    dispatch(logout());
    router.push("/");
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center justify-between w-[560px] bg-white rounded-xl py-3 px-4 h-full">
        <p className="font-bold text-primary">Số tiền trên hệ thống:</p>
        <p className="bg-primary text-white text-sm px-3 py-1 rounded-lg flex items-center gap-2">
          <Banknote />
          {formatCurrency(balance)}
        </p>
      </div>
      <div className="flex items-center justify-end w-full mb-4 gap-4">
        <OwnerNotification />
        <div ref={dropdownRef} className="relative">
          <div
            className="group flex items-center justify-center bg-white rounded-xl py-2 px-4 gap-4 group hover:bg-primary hover:text-white cursor-pointer transition-colors duration-200"
            onClick={() => setOpen(!open)}
          >
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full border group-hover:bg-white"
            />
            <div className="flex flex-col justify-center items-start">
              <p className="text-sm font-semibold">SĐT: {owner?.phone}</p>
              <p className="text-sm">{owner?.email}</p>
            </div>
            <ChevronsUpDown size={20} />
          </div>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 z-10 mt-2 w-auto gap-3 rounded-xl bg-white shadow-xl pb-4 border"
            >
              <div className="flex items-center justify-center py-2 px-4 gap-4 bg-primary rounded-t-xl">
                <Image
                  src={"/logo.png"}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-full border bg-white"
                />
                <div className="flex flex-col justify-center items-start">
                  <p className="text-sm font-semibold text-white">
                    SĐT: {owner?.phone}
                  </p>
                  <p className="text-sm font-medium text-white">
                    {owner?.email}
                  </p>
                </div>
              </div>
              <Separator className="mb-2" />
              <Link
                href="/authentication"
                className="px-4 flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
              >
                <Settings size={16} /> <span>Sửa thông tin</span>
              </Link>
              <li className="px-4 flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer">
                <LockKeyhole size={16} /> <span>Đổi mật khẩu</span>
              </li>
              <li
                className="px-4 flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
                onClick={handleLogOut}
              >
                <LogOut size={16} /> <span>Đăng xuất</span>
              </li>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopNav;
