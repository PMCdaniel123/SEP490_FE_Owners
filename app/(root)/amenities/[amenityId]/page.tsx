"use client";

import Loader from "@/components/loader/Loader";
import AmenityForm from "@/components/owner-form/AmenityForm";
import { BASE_URL } from "@/constants/environments";
import { AmenityProps } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AmenityDetail() {
  const { amenityId } = useParams() as { amenityId: string };
  const [amenityDetail, setAmenityDetail] = useState<AmenityProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!amenityId) return;

    const getAmenityDetail = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/amenities/${amenityId}`
        );
        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải tiện ích.");
        }

        const data = await response.json();
        const formattedAmenity = {
          ...data,
          price: data.price + "",
          quantity: data.quantity + "",
        };
        setAmenityDetail(formattedAmenity);
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
        setAmenityDetail(null);
        setLoading(false);
      }
    };
    getAmenityDetail();
  }, [amenityId]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl">
      <AmenityForm initialData={amenityDetail} />
    </div>
  );
}

export default AmenityDetail;
