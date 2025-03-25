"use client";

import Loader from "@/components/loader/Loader";
import CustomerTable from "@/components/table/customer-table";
import { BASE_URL } from "@/constants/environments";
import { CustomerTableColumns } from "@/constants/table-columns";
import { RootState } from "@/stores";
import { CustomerProps } from "@/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CustomerManagement() {
  const [customerList, setCustomerList] = useState<CustomerProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { owner } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!owner) return;

    const getCustomersByOwnerId = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/users/owner/` + owner?.id
        );

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải danh sách khách hàng.");
        }
        const data = await response.json();
        const formattedCustomer =
          data.users === null || data.users === undefined ? [] : data.users;
        setCustomerList(formattedCustomer);
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
        setCustomerList([]);
        setLoading(false);
      }
    };

    getCustomersByOwnerId();
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
      <CustomerTable columns={CustomerTableColumns} data={customerList} />
    </div>
  );
}

export default CustomerManagement;
