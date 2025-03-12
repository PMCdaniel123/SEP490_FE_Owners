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

function Sidebar() {
  return (
    <aside className="w-72 bg-white p-4 rounded-xl">
      <h1 className="text-2xl font-extrabold my-4 text-primary text-center">
        WorkHive
      </h1>
      <nav className="flex flex-col gap-2 mt-10">
        <SidebarItem icon={Home} label="Trang chủ" href="/dashboard" />
        <SidebarItem
          icon={KeyRound}
          label="Xác thực doanh nghiệp"
          href="/authentication"
        />
        <SidebarItem icon={History} label="Quản lý đặt chỗ" href="/bookings" />
        <SidebarItem icon={UsersRound} label="Khách hàng" href="/customers" />
        <SidebarItem icon={Sofa} label="Không gian" href="/workspaces" />

        <SidebarItem icon={Boxes} label="Tiện ích" href="/amenities" />
        <SidebarItem
          icon={UtensilsCrossed}
          label="Thực đơn"
          href="/beverages"
        />
        <SidebarItem
          icon={DiamondPercent}
          label="Khuyến mãi"
          href="/promotions"
        />
        <SidebarItem
          icon={MessageSquareQuote}
          label="Phản hồi"
          href="/feedback"
        />

        <SidebarItem icon={Landmark} label="Rút tiền" href="/withdrawal" />
      </nav>
    </aside>
  );
}

export default Sidebar;
