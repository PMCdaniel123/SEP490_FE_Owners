import { CustomerProps } from "@/types";
import dayjs from "dayjs";
import { Ban } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

function CustomerModal({ customer }: { customer: CustomerProps }) {
  useEffect(() => {
    if (!customer) {
      return;
    }
  }, [customer]);

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
      <div className="flex flex-col mt-4 gap-3 border border-primary bg-white text-black p-4 rounded-md">
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
          {dayjs(customer?.dateOfBirth).format("DD/MM/YYYY")}
        </p>
        <p>
          <span className="font-semibold">Giới tính: </span>
          {customer?.sex}
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
