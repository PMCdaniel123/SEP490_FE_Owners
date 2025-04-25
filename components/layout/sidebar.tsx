"use client";

import {
  ArrowLeftRight,
  Boxes,
  DiamondPercent,
  History,
  Home,
  KeyRound,
  Landmark,
  LayoutList,
  MessageSquareQuote,
  Sofa,
  UsersRound,
  UtensilsCrossed,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "@/constants/environments";
import { motion } from "framer-motion";
import Image from "next/image";

function Sidebar() {
  const { owner } = useSelector((state: RootState) => state.auth);
  const [isValidate, setIsValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!owner) {
      return;
    }

    const fetchOwner = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/workspace-owners/${owner.id}`
        );

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải thông tin xác thực.");
        }

        const data = await response.json();
        setIsValidate(data.owner.status === "Success");
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
      }
    };

    fetchOwner();
  }, [owner]);

  if (isLoading) {
    return null;
  }

  return (
    <motion.aside
      initial={{ width: "276px" }}
      animate={{ width: isCollapsed ? "84px" : "276px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white p-4 rounded-md min-h-screen flex flex-col border border-primary"
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mb-2 flex justify-center items-center w-full p-4 bg-gray-200 rounded-md hover:bg-gray-300 transition"
      >
        <LayoutList className="w-5 h-5" />
      </motion.button>
      <div className="flex items-center gap-2 justify-center mt-4 mb-6">
        <Image src={"/workhive.png"} alt="logo" width={50} height={50} />
        <motion.h1
          initial={{ opacity: 1 }}
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className={`text-2xl font-extrabold text-primary text-center ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          WorkHive
        </motion.h1>
      </div>
      <nav className="flex flex-col gap-2">
        {isValidate && (
          <SidebarItem
            icon={Home}
            label="Trang chủ"
            href="/dashboard"
            collapsed={isCollapsed}
          />
        )}
        <SidebarItem
          icon={KeyRound}
          label="Xác thực doanh nghiệp"
          href="/authentication"
          collapsed={isCollapsed}
        />
        {isValidate && (
          <SidebarItem
            icon={History}
            label="Quản lý đặt chỗ"
            href="/bookings"
            collapsed={isCollapsed}
          />
        )}
        {isValidate && (
          <SidebarItem
            icon={UsersRound}
            label="Khách hàng"
            href="/customers"
            collapsed={isCollapsed}
          />
        )}
        {isValidate && (
          <SidebarItem
            icon={Sofa}
            label="Không gian"
            href="/workspaces"
            collapsed={isCollapsed}
          />
        )}
        {isValidate && (
          <SidebarItem
            icon={Boxes}
            label="Tiện ích"
            href="/amenities"
            collapsed={isCollapsed}
          />
        )}
        {isValidate && (
          <SidebarItem
            icon={UtensilsCrossed}
            label="Thực đơn"
            href="/beverages"
            collapsed={isCollapsed}
          />
        )}
        {isValidate && (
          <SidebarItem
            icon={DiamondPercent}
            label="Khuyến mãi"
            href="/promotions"
            collapsed={isCollapsed}
          />
        )}
        {isValidate && (
          <SidebarItem
            icon={MessageSquareQuote}
            label="Phản hồi"
            href="/feedback"
            collapsed={isCollapsed}
          />
        )}
        {isValidate && (
          <SidebarItem
            icon={Landmark}
            label="Rút tiền"
            href="/withdrawal"
            collapsed={isCollapsed}
          />
        )}
        {isValidate && (
          <SidebarItem
            icon={ArrowLeftRight}
            label="Lịch sử giao dịch"
            href="/transaction"
            collapsed={isCollapsed}
          />
        )}
      </nav>
    </motion.aside>
  );
}

export default Sidebar;
