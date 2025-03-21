"use client";

import Loader from "@/components/loader/Loader";
import PromotionTable from "@/components/table/promotion-table";
import { PromotionTableColumns } from "@/constants/table-columns";
import { PromotionProps } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PromotionManagement() {
  const [promotionList, setPromotionList] = useState<PromotionProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch("https://localhost:5050/promotions");

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải danh sách khuyến mãi.");
        }
        const data = await response.json();
        setPromotionList(data.promotions);
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
        setPromotionList([]);
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl">
      <PromotionTable columns={PromotionTableColumns} data={promotionList} />
    </div>
  );
}

export default PromotionManagement;