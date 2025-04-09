"use client";

import FeedbackSection from "@/components/layout/feedback-section";
import ResponseBooking from "@/components/layout/response-booking";
import Loader from "@/components/loader/Loader";
import { BASE_URL } from "@/constants/environments";
import { RootState } from "@/stores";
import { ResponseBookingProps } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function FeedbackManagemet() {
  const [responseBooking, setResponseBooking] = useState<
    ResponseBookingProps[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { owner } = useSelector((state: RootState) => state.auth);
  const [selectedBooking, setSelectedBooking] =
    useState<ResponseBookingProps | null>(null);

  const checkOwnerResponse = async (feedbackId: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}/response-feedbacks/feedback/${feedbackId}`
      );
      if (response.ok) {
        const data = await response.json();
        return data && data.id !== 0;
      }
    } catch (error) {
      console.error(
        `Error checking owner response for feedback ${feedbackId}:`,
        error
      );
    }
    return false;
  };

  const getBookingWithFeedbackByOwnerId = useCallback(async () => {
    if (!owner) return;
    try {
      const response = await fetch(
        `${BASE_URL}/bookings/feedback/owner/${owner?.id}`
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải danh sách đơn đặt chỗ.");
      }
      
      const data = await response.json();
      const formatted =
        data === null || data === undefined
          ? []
          : data.sort((a: ResponseBookingProps, b: ResponseBookingProps) => {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            });

      const bookingsWithResponseInfo = await Promise.all(
        formatted.map(async (booking: ResponseBookingProps) => {
          if (!booking.feedbackIds?.length) {
            return { ...booking, hasOwnerResponse: false };
          }

          const hasAnyResponse = await Promise.any(
            booking.feedbackIds.map(
              async (feedbackId) => await checkOwnerResponse(feedbackId)
            )
          ).catch(() => false);

          return { ...booking, hasOwnerResponse: hasAnyResponse };
        })
      );
      setResponseBooking(bookingsWithResponseInfo);
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
      setResponseBooking([]);
      setLoading(false);
    }
  }, [owner]);

  useEffect(() => {
    getBookingWithFeedbackByOwnerId();
  }, [getBookingWithFeedbackByOwnerId]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1 h-fit sticky top-0">
        <ResponseBooking
          responseBooking={responseBooking}
          selectedBooking={selectedBooking}
          setSelectedBooking={setSelectedBooking}
        />
      </div>
      <div className="md:col-span-2">
        <FeedbackSection
          selectedBooking={selectedBooking}
          ownerId={owner?.id}
          refetchBooking={getBookingWithFeedbackByOwnerId}
        />
      </div>
    </div>
  );
}

export default FeedbackManagemet;
