import { formatCurrency, WithdrawalProps } from "@/types";
import dayjs from "dayjs";
import { useEffect } from "react";

function WithdrawalModal({ request }: { request: WithdrawalProps }) {
  useEffect(() => {
    if (!request) {
      return;
    }
  }, [request]);

  return (
    <div className="mt-8">
      <div className="flex flex-col mt-4 gap-3 border border-primary bg-white text-black p-4 rounded-md">
        <p>
          <span className="font-semibold">Tiêu đề: </span>
          {request?.title}
        </p>
        <p>
          <span className="font-semibold">Mô tả: </span>
          {request?.description}
        </p>
        <p>
          <span className="font-semibold">Ngày tạo: </span>
          {dayjs(request?.createdAt).format("HH:mm:ss DD/MM/YYYY")}
        </p>
        <p>
          <span className="font-semibold">Tên ngân hàng: </span>
          {request?.bankName}
        </p>
        <p>
          <span className="font-semibold">Tên chủ tài khoản ngân hàng: </span>
          {request?.bankAccountName}
        </p>
        <p>
          <span className="font-semibold">Số tài khoản ngân hàng: </span>
          {request?.bankNumber}
        </p>
        <p>
          <span className="font-semibold">Số tiền: </span>
          {formatCurrency(Number(request?.balance || "0"))}
        </p>
        <p>
          <span className="font-semibold">Trạng thái: </span>
          {request?.status === "Handling" ? (
            <span className="text-yellow-500">Chờ xử lý</span>
          ) : request?.status === "Success" ? (
            <span className="text-green-500">Thành công</span>
          ) : (
            <span className="text-red-500">Thất bại</span>
          )}
        </p>
        {request?.status !== "Handling" && (
          <p>
            <span className="font-semibold">Tin nhắn: </span>
            {request?.managerResponse}
          </p>
        )}
      </div>
    </div>
  );
}

export default WithdrawalModal;
