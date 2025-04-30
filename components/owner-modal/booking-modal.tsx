/* eslint-disable @next/next/no-img-element */
"use client";

import {
  BookingProps,
  CustomerProps,
  formatCurrency,
  PromotionProps,
  Workspace,
} from "@/types";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import dayjs from "dayjs";
import {
  fetchCustomerDetail,
  fetchPromotionDetail,
  fetchWorkspaceDetail,
} from "@/features";
import { Card, CardContent } from "../ui/card";
import {
  Boxes,
  Calendar,
  Clock,
  Eye,
  EyeOff,
  History,
  MapPin,
  Ruler,
  User,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "react-toastify";
import { BASE_URL } from "@/constants/environments";

export interface BookingWorkspaceProps {
  workspace: Workspace;
  address: string;
  googleMapUrl: string;
}

function BookingModal({ bookingId }: { bookingId: string }) {
  const [customer, setCustomer] = useState<CustomerProps | null>(null);
  const [workspace, setWorkspace] = useState<BookingWorkspaceProps | null>(
    null
  );
  const [booking, setBooking] = useState<BookingProps | null>(null);
  const [promotion, setPromotion] = useState<PromotionProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!bookingId) return;
    setLoading(true);
    const fetchBooking = async () => {
      try {
        const response = await fetch(`${BASE_URL}/getbookingbyid/${bookingId}`);
        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải thông tin đặt chỗ.");
        }

        const data = await response.json();
        const formatted =
          data.bookingByBookingIdDTO === null ||
          data.bookingByBookingIdDTO === undefined
            ? null
            : data.bookingByBookingIdDTO;
        setBooking(formatted);
        await Promise.all([
          fetchCustomerDetail(formatted.userId, setCustomer),
          fetchWorkspaceDetail(formatted.workspaceId, setWorkspace),
          fetchPromotionDetail(formatted.promotionId, setPromotion),
        ]);
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Đã xảy ra lỗi!";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          theme: "light",
        });
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

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
        <p className="text-sm font-semibold text-primary">
          {dayjs(booking?.created_At).format("HH:mm:ss DD/MM/YYYY")}
        </p>
        <p className="text-base font-semibold text-primary flex gap-2">
          <History /> Thông tin đơn đặt chỗ
        </p>
        <p>Mã đặt chỗ: ĐC{Number(bookingId).toString().padStart(4, "0")}</p>
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
        <p>
          Mã khuyến mãi: {booking?.promotionId ? promotion?.code : "Không có"}
        </p>
        {promotion?.discount && <p>Giảm giá (%): {promotion?.discount}%</p>}
        <p>
          Phương thức thanh toán:{" "}
          {booking?.payment_Method === "WorkHive Wallet"
            ? "Thanh toán bằng ví WorkHive"
            : "Thanh toán bằng ngân hàng"}
        </p>
        <div className="my-2">
          <Card className="relative overflow-hidden rounded-md shadow-lg border border-gray-100">
            <div className="relative group">
              <div className="overflow-hidden h-56">
                <img
                  src={
                    workspace?.workspace?.images[0].imgUrl || "/placeholder.png"
                  }
                  alt={workspace?.workspace?.name || ""}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex justify-between items-end">
                  <Badge className="bg-primary hover:bg-secondary text-white">
                    {workspace?.workspace?.category}
                  </Badge>
                </div>
              </div>
            </div>

            <CardContent className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">
                {workspace?.workspace?.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3 flex items-center">
                <MapPin className="mr-1 text-gray-400" size={14} />
                <span className="truncate">{workspace?.address}</span>
              </p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center text-gray-700 text-sm">
                  <Users className="mr-1 text-blue-500" size={16} />
                  <span>{workspace?.workspace?.capacity} người</span>
                </div>
                <div className="flex items-center text-gray-700 text-sm justify-end">
                  <Ruler className="mr-1 text-green-500" size={16} />
                  <span>{workspace?.workspace?.area} m²</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <div className="flex flex-col gap-1">
                  {Number(workspace?.workspace?.shortTermPrice) > 0 && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-700 text-sm">
                        <Clock className="mr-1 text-orange-500" size={16} />
                        <span>Theo giờ</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(
                          Number(workspace?.workspace?.shortTermPrice)
                        )}
                      </span>
                    </div>
                  )}

                  {Number(workspace?.workspace?.longTermPrice) > 0 && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-700 text-sm">
                        <Calendar className="mr-1 text-purple-500" size={16} />
                        <span>Theo ngày</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(
                          Number(workspace?.workspace?.longTermPrice)
                        )}
                      </span>
                    </div>
                  )}
                </div>
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
          booking &&
          (booking.amenities.length + booking.beverages.length > 0 ? (
            <div className="flex flex-col gap-4">
              {booking.amenities.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-primary flex gap-2 text-sm">
                    <Boxes size={16} /> Tiện ích
                  </p>
                  <ul className="list-disc pl-6 ">
                    {booking?.amenities.map((item, index) => (
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
                    {booking?.beverages.map((item, index) => (
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
