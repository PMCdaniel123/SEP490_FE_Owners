"use client";

import {
  AmenityProps,
  BeverageProps,
  BookingProps,
  CustomerProps,
  FeedbackProps,
  formatCurrency,
  PromotionProps,
  TopRevenueWorkspace,
  TransactionProp,
  WithdrawalProps,
  Workspace,
} from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CustomerDropdown from "@/components/owner-dropdown/customer-dropdown";
import BookingDropdown from "@/components/owner-dropdown/booking-dropdown";
import FeedbackDropdown from "@/components/owner-dropdown/feedback-dropdown";
import dayjs from "dayjs";
import WithdrawalDropdown from "@/components/owner-dropdown/withdrawal-dropdown";

const formatDateTime = (dateStr: string): string => {
  return dayjs(dateStr).format("HH:mm DD/MM/YYYY");
};

export const topWorkspaceTableColumns: ColumnDef<TopRevenueWorkspace>[] = [
  {
    accessorKey: "workspaceName",
    header: () => (
      <div className="text-white font-semibold text-base text-center">
        Tên không gian
      </div>
    ),
    cell: ({ row }) => {
      return (
        <p className="text-left font-medium">{row.getValue("workspaceName")}</p>
      );
    },
  },
  {
    accessorKey: "totalBookings",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Tổng lượt đặt</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {row.getValue("totalBookings")}
        </p>
      );
    },
  },
  { accessorKey: "longTermPrice", header: () => <p></p>, cell: () => <p></p> },
  {
    accessorKey: "shortTermPrice",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Đơn giá</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatCurrency(Number(row.getValue("shortTermPrice")))} -{" "}
          {formatCurrency(Number(row.getValue("longTermPrice")))}
        </p>
      );
    },
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Doanh thu</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatCurrency(row.getValue("revenue"))}
        </p>
      );
    },
  },
];

export const CustomerTableColumns: ColumnDef<CustomerProps>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã khách hàng</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          KH{Number(row.getValue("id")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Họ và tên</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("name")}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Số điện thoại</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("phone")}</p>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Email</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("email")}</p>;
    },
  },
  {
    accessorKey: "sex",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Giới tính</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("sex")}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;

      return <CustomerDropdown customer={customer} />;
    },
  },
];

const workspaceCategory: Record<string, string> = {
  "Bàn cá nhân": "Bàn cá nhân",
  "Văn phòng": "Văn phòng",
  "Phòng họp": "Phòng họp",
  "Phòng hội thảo": "Phòng hội thảo",
};

export const WorkspaceTableColumns: ColumnDef<Workspace>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã không gian</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          WS{Number(row.getValue("id")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Tên không gian</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("name")}</p>;
    },
  },
  {
    accessorKey: "image",
    header: () => (
      <div className="text-white font-semibold text-base text-center">
        Hình ảnh
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <Image
            src={row.original.images[0].imgUrl}
            alt={row.original.name}
            width={80}
            height={80}
            className="object-cover rounded-md"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "shortTermPrice",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Giá giờ</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatCurrency(Number(row.getValue("shortTermPrice")))}
        </p>
      );
    },
  },
  {
    accessorKey: "longTermPrice",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Giá ngày</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatCurrency(Number(row.getValue("longTermPrice")))}
        </p>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Phân loại</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {workspaceCategory[String(row.getValue("category"))] ||
            "Không xác định"}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Trạng thái</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return row.getValue("status") === "Active" ? (
        <p className="text-center font-medium flex items-center justify-center text-green-500">
          <span>Hoạt động</span>
        </p>
      ) : (
        <p className="text-center font-medium flex items-center justify-center text-red-500">
          <span>Ngừng hoạt động</span>
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const workspace = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="py-2">
            <Link
              className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
              href={`workspaces/${workspace.id}`}
            >
              <Eye size={16} /> <span>Xem thông tin chi tiết</span>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const AmenityTableColumns: ColumnDef<AmenityProps>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã tiện ích</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          TI{Number(row.getValue("id")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Tên tiện ích</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("name")}</p>;
    },
  },
  {
    accessorKey: "image",
    header: () => (
      <div className="text-white font-semibold text-base text-center">
        Hình ảnh
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <Image
            src={row.original.imgUrl}
            alt={row.original.name}
            width={80}
            height={80}
            className="object-cover rounded-md"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Đơn giá</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatCurrency(Number(row.getValue("price")))}
        </p>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Số lượng</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("quantity")}</p>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Phân loại</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("category")}</p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Trạng thái</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return row.getValue("status") === "Active" ? (
        <p className="text-center font-medium flex items-center justify-center text-green-500">
          <span>Hoạt động</span>
        </p>
      ) : (
        <p className="text-center font-medium flex items-center justify-center text-red-500">
          <span>Ngừng hoạt động</span>
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const amenity = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="py-2">
            <Link
              className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
              href={`amenities/${amenity.id}`}
            >
              <Eye size={16} /> <span>Xem thông tin chi tiết</span>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const BeverageTableColumns: ColumnDef<BeverageProps>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã món</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          M{Number(row.getValue("id")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Tên món</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("name")}</p>;
    },
  },
  {
    accessorKey: "image",
    header: () => (
      <div className="text-white font-semibold text-base text-center">
        Hình ảnh
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <Image
            src={row.original.imgUrl}
            alt={row.original.name}
            width={80}
            height={80}
            className="object-cover rounded-md"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Đơn giá</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatCurrency(Number(row.getValue("price")))}
        </p>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Phân loại</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("category")}</p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Trạng thái</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return row.getValue("status") === "Active" ? (
        <p className="text-center font-medium flex items-center justify-center text-green-500">
          <span>Hoạt động</span>
        </p>
      ) : (
        <p className="text-center font-medium flex items-center justify-center text-red-500">
          <span>Ngừng hoạt động</span>
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const beverage = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="py-2">
            <Link
              className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
              href={`beverages/${beverage.id}`}
            >
              <Eye size={16} /> <span>Xem thông tin chi tiết</span>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const PromotionTableColumns: ColumnDef<PromotionProps>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã khuyến mãi</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <p className="text-center font-medium">{row.getValue("code")}</p>;
    },
  },
  {
    accessorKey: "discount",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Giảm giá</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("discount")}%</p>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Ngày bắt đầu</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatDateTime(row.getValue("startDate"))}
        </p>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Ngày kết thúc</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatDateTime(row.getValue("endDate"))}
        </p>
      );
    },
  },
  {
    accessorKey: "workspaceID",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mã không gian</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          WS{Number(row.getValue("workspaceID")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Trạng thái</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return row.getValue("status") === "Active" ? (
        <p className="text-center font-medium flex items-center justify-center text-green-500">
          <span>Hoạt động</span>
        </p>
      ) : (
        <p className="text-center font-medium flex items-center justify-center text-red-500">
          <span>Ngừng hoạt động</span>
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const promotion = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="py-2">
            <Link
              className="px-4 rounded-sm flex items-center gap-2 hover:bg-primary hover:text-white py-1 transition-colors duration-200 cursor-pointer"
              href={`promotions/${promotion.id}`}
            >
              <Eye size={16} /> <span>Xem thông tin chi tiết</span>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const WithdrawalTableColumns: ColumnDef<WithdrawalProps>[] = [
  {
    accessorKey: "bankNumber",
    header: () => {
      return (
        <div className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer">
          <p>Số tài khoản ngân hàng</p>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("bankNumber")}</p>
      );
    },
  },
  {
    accessorKey: "bankName",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Tên ngân hàng</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("bankName")}</p>
      );
    },
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Số tiền</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatCurrency(Number(row.getValue("balance")))}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Ngày tạo</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {dayjs(row.getValue("createdAt")).format("HH:mm:ss DD/MM/YYYY")}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Trạng thái</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return row.getValue("status") === "Handling" ? (
        <p className="text-center font-medium flex items-center justify-center text-yellow-500">
          <span>Chờ xử lý</span>
        </p>
      ) : row.getValue("status") === "Success" ? (
        <p className="text-center font-medium flex items-center justify-center text-green-500">
          <span>Thành công</span>
        </p>
      ) : (
        <p className="text-center font-medium flex items-center justify-center text-red-500">
          <span>Thất bại</span>
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;

      return <WithdrawalDropdown request={request} />;
    },
  },
];

export const TransactionTableColumns: ColumnDef<TransactionProp>[] = [
  {
    accessorKey: "amount",
    header: () => {
      return (
        <div className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer">
          <p>Số tiền</p>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatCurrency(row.getValue("amount"))}
        </p>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Mô tả</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("description")}</p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Ngày tạo</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {dayjs(row.getValue("createdAt")).format("HH:mm:ss DD/MM/YYYY")}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Trạng thái</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return row.getValue("status") === "Withdraw Success" ? (
        <p className="text-center font-medium flex items-center justify-center text-yellow-500">
          <span>Rút tiền</span>
        </p>
      ) : row.getValue("status") === "PAID" ? (
        <p className="text-center font-medium flex items-center justify-center text-green-500">
          <span>Nhận tiền</span>
        </p>
      ) : (
        <p className="text-center font-medium flex items-center justify-center text-red-500">
          <span>Hoàn tiền</span>
        </p>
      );
    },
  },
];

export const BookingTableColumns: ColumnDef<BookingProps>[] = [
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Khách hàng</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          KH{Number(row.getValue("userId")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "workspaceId",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Không gian</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          WS{Number(row.getValue("workspaceId")).toString().padStart(4, "0")}
        </p>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Tổng tiền</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {formatCurrency(Number(row.getValue("price")))}
        </p>
      );
    },
  },
  {
    accessorKey: "start_Date",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Bắt đầu</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {dayjs(row.getValue("start_Date")).format("HH:mm DD/MM/YYYY")}
        </p>
      );
    },
  },
  {
    accessorKey: "end_Date",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Kết thúc</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {dayjs(row.getValue("end_Date")).format("HH:mm DD/MM/YYYY")}
        </p>
      );
    },
  },
  {
    accessorKey: "created_At",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Ngày tạo</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">
          {dayjs(row.getValue("created_At")).format("HH:mm DD/MM/YYYY")}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const booking = row.original;

      return <BookingDropdown booking={booking} />;
    },
  },
];

export const FeedbackTableColumns: ColumnDef<FeedbackProps>[] = [
  {
    accessorKey: "customerId",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Khách hàng</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("customerId")}</p>
      );
    },
  },
  {
    accessorKey: "workspaceId",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Không gian</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("workspaceId")}</p>
      );
    },
  },
  {
    accessorKey: "content",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Nội dung</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center w-60">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-center font-medium truncate w-full">
                {row.getValue("content")}
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-white">{row.getValue("content")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "image",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Hình ảnh</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <Image
            src={row.original.image}
            alt={row.original.customerId}
            width={80}
            height={80}
            className="object-cover rounded-md"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-white font-semibold text-base text-center items-center flex justify-center cursor-pointer"
        >
          <p>Ngày tạo</p>
          <ArrowUpDown size={16} className="ml-2" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium">{row.getValue("createdAt")}</p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const feedback = row.original;
      return <FeedbackDropdown feedbackId={feedback.id} />;
    },
  },
];
