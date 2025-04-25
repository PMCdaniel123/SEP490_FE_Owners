"use client";

import Loader from "@/components/loader/Loader";
import VerifyTable from "@/components/table/verify-table";
import { BASE_URL } from "@/constants/environments";
import { VerifyTableColumns } from "@/constants/table-columns";
import { RootState } from "@/stores";
import { VerifyOwnerProps } from "@/types";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function VerifyRequests() {
  const { owner } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const [verifyList, setVerifyList] = useState<VerifyOwnerProps[]>([]);

  const fetchVerifyList = async (id: string | null) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/owner-verify-requests/owners/${id}`
      );
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải danh sách xác thực.");
      }
      const data = await response.json();
      const formatted =
        data === null || data === undefined
          ? []
          : data.sort(
              (a: VerifyOwnerProps, b: VerifyOwnerProps) =>
                dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()
            );
      setVerifyList(formatted);
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
      setVerifyList([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!owner) return;

    fetchVerifyList(owner.id);
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
      <VerifyTable columns={VerifyTableColumns} data={verifyList} />
    </div>
  );
}

export default VerifyRequests;
