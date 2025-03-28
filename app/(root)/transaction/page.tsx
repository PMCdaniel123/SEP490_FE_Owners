"use client";

import Loader from "@/components/loader/Loader";
import TransactionTable from "@/components/table/transaction-table";
import { BASE_URL } from "@/constants/environments";
import { TransactionTableColumns } from "@/constants/table-columns";
import { RootState } from "@/stores";
import { TransactionProp } from "@/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function TransactionPage() {
  const [transactionList, setTransactionList] = useState<TransactionProp[]>([]);
  const [loading, setLoading] = useState(true);
  const { owner } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!owner) return;

    const getWorkspaceByOwnerId = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/owners/${owner?.id}/transactions`
        );

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải danh sách giao dịch.");
        }
        const data = await response.json();
        const formatted =
          data.transactions === null || data.transactions === undefined
            ? []
            : data.transactions;
        setTransactionList(formatted);
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
        setTransactionList([]);
        setLoading(false);
      }
    };

    getWorkspaceByOwnerId();
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
      <TransactionTable
        data={transactionList}
        columns={TransactionTableColumns}
      />
    </div>
  );
}

export default TransactionPage;
