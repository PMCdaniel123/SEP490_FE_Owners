"use client";

import {
  Boxes,
  DiamondPercent,
  History,
  Home,
  KeyRound,
  Landmark,
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

function Sidebar() {
  const { owner } = useSelector((state: RootState) => state.auth);
  const [isValidate, setIsValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!owner) {
      return;
    }

    const fetchOwner = async () => {
      try {
        const response = await fetch(
          `https://localhost:5050/workspace-owners/${owner.id}`
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
    <aside className="w-72 bg-white p-4 rounded-xl">
      <h1 className="text-2xl font-extrabold my-4 text-primary text-center">
        WorkHive
      </h1>
      <nav className="flex flex-col gap-1 mt-9">
        {isValidate && (
          <SidebarItem icon={Home} label="Trang chủ" href="/dashboard" />
        )}
        <SidebarItem
          icon={KeyRound}
          label="Xác thực doanh nghiệp"
          href="/authentication"
        />
        {isValidate && (
          <SidebarItem
            icon={History}
            label="Quản lý đặt chỗ"
            href="/bookings"
          />
        )}
        {isValidate && (
          <SidebarItem icon={UsersRound} label="Khách hàng" href="/customers" />
        )}
        {isValidate && (
          <SidebarItem icon={Sofa} label="Không gian" href="/workspaces" />
        )}
        {isValidate && (
          <SidebarItem icon={Boxes} label="Tiện ích" href="/amenities" />
        )}
        {isValidate && (
          <SidebarItem
            icon={UtensilsCrossed}
            label="Thực đơn"
            href="/beverages"
          />
        )}
        {isValidate && (
          <SidebarItem
            icon={DiamondPercent}
            label="Khuyến mãi"
            href="/promotions"
          />
        )}
        {isValidate && (
          <SidebarItem
            icon={MessageSquareQuote}
            label="Phản hồi"
            href="/feedback"
          />
        )}
        {isValidate && (
          <SidebarItem icon={Landmark} label="Rút tiền" href="/withdrawal" />
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
