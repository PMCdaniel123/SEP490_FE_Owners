"use client";

import Loader from "@/components/loader/Loader";
import WithdrawalTable from "@/components/table/withdrawal-table";
import Wallet from "@/components/wallet/wallet";
import { BASE_URL } from "@/constants/environments";
import { WithdrawalTableColumns } from "@/constants/table-columns";
import { RootState } from "@/stores";
import { WalletData, WithdrawalProps } from "@/types";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function WithdrawalManagement() {
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const { owner } = useSelector((state: RootState) => state.auth);
  const [withdrawalList, setWithdrawalList] = useState<WithdrawalProps[]>([]);
  const [canWithdrawal, setCanWithdrawal] = useState(true);

  useEffect(() => {
    if (!owner) return;
    setLoading(true);
    const getWalletData = async () => {
      try {
        const balanceResponse = await fetch(
          `${BASE_URL}/owner-drawal-requests/` + owner?.id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!balanceResponse.ok) {
          throw new Error("Có lỗi xảy ra khi danh sách yêu cầu rút tiền.");
        }

        const data = await balanceResponse.json();
        const formatted: WithdrawalProps[] =
          data.requests === null || data.requests === undefined
            ? []
            : data.requests.sort(
                (a: WithdrawalProps, b: WithdrawalProps) =>
                  dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()
              );
        if (formatted.length === 0) {
          setCanWithdrawal(true);
        } else {
          setCanWithdrawal(
            formatted[0].status === "Success" || formatted[0].status === "Fail"
          );
        }
        setWithdrawalList(formatted);
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
        setLoading(false);
      }
    };

    getWalletData();
  }, [owner, editMode]);

  useEffect(() => {
    if (!owner) return;
    setLoading(true);
    const getWalletData = async () => {
      try {
        const balanceResponse = await fetch(
          `${BASE_URL}/owner-wallets/` + owner?.id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!balanceResponse.ok) {
          throw new Error("Có lỗi xảy ra khi tải ví doanh nghiệp.");
        }

        const data = await balanceResponse.json();
        setWalletData(data);
        if (
          data?.bankName === null ||
          data?.bankNumber === null ||
          data?.bankAccountName === null
        ) {
          setEditMode(true);
        }
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
        setLoading(false);
      }
    };

    getWalletData();
  }, [owner, editMode]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 bg-white rounded-md">
        <Wallet
          walletData={walletData}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </div>
      {!editMode && (
        <div className="p-4 bg-white rounded-md">
          <WithdrawalTable
            columns={WithdrawalTableColumns}
            data={withdrawalList}
            walletData={walletData}
            editMode={editMode}
            canWithdrawal={canWithdrawal}
          />
        </div>
      )}
    </div>
  );
}

export default WithdrawalManagement;
