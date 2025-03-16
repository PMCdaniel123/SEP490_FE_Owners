/* eslint-disable @next/next/no-img-element */
"use client";

import {
  BookingProps,
  CustomerProps,
  formatCurrency,
  Workspace,
} from "@/types";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import dayjs from "dayjs";
import { fetchCustomerDetail, fetchWorkspaceDetail } from "@/features";
import { Card, CardContent } from "../ui/card";
import {
  Boxes,
  Eye,
  EyeOff,
  History,
  Ruler,
  Sofa,
  User,
  Users,
  UtensilsCrossed,
} from "lucide-react";

export interface BookingWorkspaceProps {
  workspace: Workspace;
  address: string;
  googleMapUrl: string;
}

function BookingModal({ booking }: { booking: BookingProps }) {
  const [customer, setCustomer] = useState<CustomerProps | null>(null);
  const [workspace, setWorkspace] = useState<BookingWorkspaceProps | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!booking) {
      return;
    }

    fetchCustomerDetail(booking.userId, setCustomer, setLoading);
    fetchWorkspaceDetail(booking.workspaceId, setWorkspace, setLoading);
  }, [booking]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="border rounded-md p-4 flex flex-col gap-2 text-black">
        <p className="text-base font-semibold text-primary flex gap-2">
          <User /> Thông tin khách hàng
        </p>
        <p>Họ và tên: {customer?.name}</p>
        <p>Email: {customer?.email}</p>
        <p>Số điện thoại: {customer?.phone}</p>
      </div>
      <div className="border rounded-md p-4 flex flex-col gap-2 text-black mt-4">
        <p className="text-base font-semibold text-primary flex gap-2">
          <History /> Thông tin đơn đặt chỗ
        </p>
        <p>Ngày tạo: {dayjs(booking?.created_At).format("HH:mm DD/MM/YYYY")}</p>
        <p>
          Bắt đầu từ: {dayjs(booking?.start_Date).format("HH:mm DD/MM/YYYY")}
        </p>
        <p>
          Kết thúc lúc: {dayjs(booking?.end_Date).format("HH:mm DD/MM/YYYY")}
        </p>
        {booking?.status === "Handling" ? (
          <p className="flex items-center justify-start gap-1">
            Trạng thái: <span className="text-yellow-500">Chờ xử lý</span>
          </p>
        ) : booking?.status === "Success" ? (
          <p className="flex items-center justify-start gap-1">
            Trạng thái: <span className="text-green-500">Thành công</span>
          </p>
        ) : (
          <p className="flex items-center justify-start gap-1">
            Trạng thái: <span className="text-red-500">Thất bại</span>
          </p>
        )}
        {booking?.promotionId && <p>Mã giảm giá: {booking?.promotionId}</p>}
        <p>Phương thức thanh toán: {booking?.payment_Method}</p>
        <div className="my-2">
          <Card className="rounded-md shadow-md py-0 gap-2">
            <div className="relative">
              <img
                src={workspace?.workspace?.images[0].imgUrl || "/logo.png"}
                alt={workspace?.workspace?.name || ""}
                className="w-full h-48 object-cover rounded-t-md"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm">
                {formatCurrency(Number(workspace?.workspace?.shortTermPrice))} -{" "}
                {formatCurrency(Number(workspace?.workspace?.longTermPrice))}
              </div>
            </div>
            <CardContent className="mb-4">
              <h3 className="text-lg font-semibold">
                {workspace?.workspace?.name}
              </h3>
              <p className="text-gray-600 text-sm truncate whitespace-nowrap">
                {workspace?.address}
              </p>
              <div className="flex items-center text-gray-600 text-sm mt-2 justify-between">
                <span className="flex items-center">
                  <Users className="mr-1" size={16} />{" "}
                  {workspace?.workspace?.capacity} người
                </span>
                <span className="flex items-center">
                  <Ruler className="mr-1" size={16} />{" "}
                  {workspace?.workspace?.area} m2
                </span>
                <span className="flex items-center">
                  <Sofa className="mr-1" size={16} />{" "}
                  {workspace?.workspace?.category === "Văn phòng"
                    ? "Văn phòng"
                    : workspace?.workspace?.category === "Phòng họp"
                    ? "Phòng họp"
                    : workspace?.workspace?.category === "Phòng hội thảo"
                    ? "Phòng hội thảo"
                    : "Bàn cá nhân"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        <p
          className="text-sm text-primary flex gap-2 my-4 border rounded-md p-2 border-primary hover:bg-primary hover:text-white transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? (
            <span className="flex items-center gap-2">
              <Eye size={16} /> Xem chi tiết
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <EyeOff size={16} /> Ẩn chi tiết
            </span>
          )}
        </p>
        {isOpen &&
          (booking.amenities.length + booking.beverages.length > 0 ? (
            <div className="flex flex-col gap-4">
              {booking.amenities.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-primary flex gap-2 text-sm">
                    <Boxes size={16} /> Tiện ích
                  </p>
                  <ul className="list-disc pl-6 ">
                    {booking.amenities.map((item, index) => (
                      <li key={index}>
                        <img
                          src={item.image}
                          alt={item.amenityName}
                          className="inline-block w-10 h-10 mr-2 mb-2 "
                        />
                        {item.amenityName} -{" "}
                        {formatCurrency(Number(item.unitPrice))} (x
                        {item.quantity})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {booking.beverages.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-primary flex gap-2 text-sm">
                    <UtensilsCrossed size={16} /> Thực đơn
                  </p>
                  <ul className="list-disc pl-6 ">
                    {booking.beverages.map((item, index) => (
                      <li key={index}>
                        <img
                          src={item.image}
                          alt={item.beverageName}
                          className="inline-block w-10 h-10 mr-2 mb-2 "
                        />
                        {item.beverageName} -{" "}
                        {formatCurrency(Number(item.unitPrice))} (x
                        {item.quantity})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-sixth italic flex items-center">Trống</p>
          ))}
      </div>
      <p className="mt-4 text-primary text-lg font-bold flex justify-end">
        Tổng tiền: {formatCurrency(Number(booking?.price))}
      </p>
    </div>
  );
}

export default BookingModal;
