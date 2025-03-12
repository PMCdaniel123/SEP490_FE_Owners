import { customerList } from "@/constants/constant";
import { CustomerProps } from "@/types";
import { Ban } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

function CustomerModal({ customerId }: { customerId: string }) {
  const [customer, setCustomer] = useState<CustomerProps | null>(null);

  useEffect(() => {
    if (!customerId) {
      return;
    }
    setCustomer(customerList[Number(customerId) - 1]);
  }, [customerId]);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2">
        <Image
          src={customer?.avatar || "/logo.png"}
          height={60}
          width={60}
          alt={customer?.name || ""}
          className="rounded-full object-cover border"
        />
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold text-primary">
            {customer?.name}
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-4 gap-3 border bg-primary text-white p-4 rounded-md">
        <p>
          <span className="font-semibold">Email: </span>
          {customer?.email}
        </p>
        <p>
          <span className="font-semibold">Số điện thoại: </span>
          {customer?.phone}
        </p>
        <p>
          <span className="font-semibold">Ngày sinh: </span>
          {customer?.dateOfBirth}
        </p>
        <p>
          <span className="font-semibold">Giới tính: </span>
          {customer?.gender}
        </p>
      </div>
      <div className="mt-4 flex justify-end">
        <button className="border flex items-center gap-2 rounded-md font-semibold border-red-500 text-red-500 px-6 py-2 hover:bg-red-500 hover:text-white transition-colors duration-300">
          <Ban size={16} /> Chặn
        </button>
      </div>
    </div>
  );
}

export default CustomerModal;
