"use client";

import Loader from "@/components/loader/Loader";
import BeverageForm from "@/components/owner-form/BeverageForm";
import { BeverageProps } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function BeverageDetail() {
  const { beverageId } = useParams() as { beverageId: string };
  const [beverageDetail, setBeverageDetail] = useState<BeverageProps | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!beverageId) return;

    const getAmenityDetail = async () => {
      try {
        const response = await fetch(
          `https://localhost:5050/beverages/${beverageId}`
        );
        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải món.");
        }

        const data = await response.json();
        const formattedBeverage = {
          ...data,
          price: data.price + "",
        };
        setBeverageDetail(formattedBeverage);
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
        setBeverageDetail(null);
        setLoading(false);
      }
    };
    getAmenityDetail();
  }, [beverageId]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl">
      <BeverageForm initialData={beverageDetail} />
    </div>
  );
}

export default BeverageDetail;
