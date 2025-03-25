"use client";

import Loader from "@/components/loader/Loader";
import BeverageTable from "@/components/table/beverage-table";
import { BASE_URL } from "@/constants/environments";
import { BeverageTableColumns } from "@/constants/table-columns";
import { RootState } from "@/stores";
import { BeverageProps } from "@/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function BeverageManagement() {
  const [beverageList, setBeverageList] = useState<BeverageProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { owner } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!owner) return;

    const getBeveragesByOwnerId = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/beverages/Owner/` + owner?.id
        );

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải danh sách thực đơn.");
        }
        const data = await response.json();
        const formattedBeverages =
          data.beverages === null || data.beverages === undefined
            ? []
            : data.beverages;
        setBeverageList(formattedBeverages);
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
        setBeverageList([]);
        setLoading(false);
      }
    };

    getBeveragesByOwnerId();
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
      <BeverageTable columns={BeverageTableColumns} data={beverageList} />
    </div>
  );
}

export default BeverageManagement;
