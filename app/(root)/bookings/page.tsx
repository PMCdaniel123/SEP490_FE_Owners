"use client";

import Loader from "@/components/loader/Loader";
import BookingTable from "@/components/table/booking-table";
import { BookingTableColumns } from "@/constants/table-columns";
import { RootState } from "@/stores";
import { BookingProps } from "@/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function BookingManagement() {
  const [bookingList, setBookingList] = useState<BookingProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { owner } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!owner) return;

    const getBookingByOwnerId = async () => {
      try {
        const response = await fetch(
          "https://localhost:5050/getallbookingbyownerid/" + owner?.id
        );

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải danh sách đặt chỗ.");
        }
        const data = await response.json();
        const formattedAmenities = data.bookingByOwnerIdDTOs;
        setBookingList(formattedAmenities);
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
        setBookingList([]);
        setLoading(false);
      }
    };

    getBookingByOwnerId();
  }, [owner]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl">
      <BookingTable columns={BookingTableColumns} data={bookingList} />
    </div>
  );
}

export default BookingManagement;
