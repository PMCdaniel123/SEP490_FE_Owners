"use client";

import Loader from "@/components/loader/Loader";
import PromotionForm from "@/components/owner-form/PromotionForm";
import { PromotionProps } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PromotionDetail() {
  const { promotionId } = useParams() as { promotionId: string };
  const [promotionDetail, setPromotionDetail] = useState<PromotionProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!promotionId) return;

    const getPromotionDetail = async () => {
      try {
        const response = await fetch(`https://localhost:5050/promotions/${promotionId}`);
        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải mã khuyến mãi.");
        }

        const data = await response.json();
        const formattedPromotion = {
          ...data,
          discount: data.discount + "",
        };
        setPromotionDetail(formattedPromotion);
        setLoading(false);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi!";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          theme: "light",
        });
        setPromotionDetail(null);
        setLoading(false);
      }
    };

    getPromotionDetail();
  }, [promotionId]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl">
      <PromotionForm initialData={promotionDetail} />
    </div>
  );
}

export default PromotionDetail;