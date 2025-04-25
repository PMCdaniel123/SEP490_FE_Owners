"use client";

import Loader from "@/components/loader/Loader";
import BookingTable from "@/components/table/booking-table";
import { BASE_URL } from "@/constants/environments";
import { BookingTableColumns } from "@/constants/table-columns";
import { RootState } from "@/stores";
import { BookingListProps } from "@/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function BookingManagement() {
  const [bookingList, setBookingList] = useState<BookingListProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { owner } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!owner) return;

    const getBookingByOwnerId = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/getallbookingbyownerid/` + owner?.id
        );

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải danh sách đặt chỗ.");
        }
        const data = await response.json();
        const formattedBooking =
          data.bookingByOwnerIdDTOs === null ||
          data.bookingByOwnerIdDTOs === undefined
            ? []
            : data.bookingByOwnerIdDTOs
                .filter(
                  (booking: BookingListProps) => booking.status === "Success"
                )
                .sort(
                  (a: BookingListProps, b: BookingListProps) =>
                    new Date(b.created_At).getTime() -
                    new Date(a.created_At).getTime()
                );
        setBookingList(formattedBooking);
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
    <div className="p-4 bg-white rounded-md">
      <BookingTable columns={BookingTableColumns} data={bookingList} />
    </div>
  );
}

export default BookingManagement;
