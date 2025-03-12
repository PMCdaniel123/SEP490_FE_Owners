import { bookingList, customerList, workspaceList } from "@/constants/constant";
import {
  BookingProps,
  CustomerProps,
  formatCurrency,
  WorkspaceProps,
} from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

function BookingModal({ bookingId }: { bookingId: string }) {
  const [booking, setBooking] = useState<BookingProps | null>(null);
  const [customer, setCustomer] = useState<CustomerProps | null>(null);
  const [workspace, setWorkspace] = useState<WorkspaceProps | null>(null);

  useEffect(() => {
    if (!bookingId) {
      return;
    }
    setBooking(bookingList[Number(bookingId) - 1]);
    setCustomer(
      customerList[Number(bookingList[Number(bookingId) - 1].id) - 1]
    );
    setWorkspace(
      workspaceList[Number(bookingList[Number(bookingId) - 1].id) - 1]
    );
  }, [bookingId]);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2">
        <Image
          src={customer?.avatar || "/logo.png"}
          height={60}
          width={60}
          alt={customer?.name || ""}
          className="rounded-full object-cover border"
        />
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold text-primary">
            {customer?.name}
          </p>
        </div>
      </div>
      <div className="mt-4 border rounded-md p-4 flex flex-col gap-2 bg-primary text-white">
        <p>Ngày tạo: {booking?.createdAt}</p>
        <p>Tên phòng: {workspace?.name}</p>
        <p>Địa chỉ: {workspace?.address} </p>
        <p>
          Loại phòng:{" "}
          {Number(workspace?.category) === 2
            ? "Văn phòng"
            : Number(workspace?.category) === 3
            ? "Phòng họp"
            : Number(workspace?.category) === 4
            ? "Phòng hội thảo"
            : "Bàn cá nhân"}
        </p>
        <p>Bắt đầu từ: {booking?.startDate}</p>
        <p>Kết thúc lúc: {booking?.endDate}</p>
      </div>
      <p className="mt-4 text-primary text-lg font-bold flex justify-end">
        Tổng tiền: {formatCurrency(Number(booking?.price))}
      </p>
    </div>
  );
}

export default BookingModal;
