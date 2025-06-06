"use client";

import WithdrawalForm from "@/components/owner-form/WithdrawalForm";
import { Modal } from "antd";
import { CheckCheck, TriangleAlert } from "lucide-react";
import { useState } from "react";

function NewWithdrawal() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="p-4 bg-white rounded-md">
        <WithdrawalForm />
      </div>
      <Modal
        title={
          <p className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="text-yellow-400">
              <TriangleAlert />
            </span>{" "}
            <span>Lưu ý</span>
          </p>
        }
        open={isOpen}
        onCancel={() => setIsOpen(!isOpen)}
        footer={null}
      >
        <div className="flex flex-col border border-primary rounded-md p-6 mt-4">
          <p className="text-center text-gray-500 italic mb-4 text-sm">
            Để hoàn tất quá trình rút tiền, vui lòng cung cấp đầy đủ các thông
            tin bắt buộc.
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500">
                <CheckCheck />
              </span>
              <span>
                Yêu cầu rút tiền sẽ được xem xét trong vòng <b>24 giờ</b> kể từ
                thời điểm gửi.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">
                <CheckCheck />
              </span>
              <span>
                Mỗi lần rút tiền sẽ rút <b>toàn bộ số tiền</b> hiện đang có trên
                hệ thống.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">
                <CheckCheck />
              </span>
              <span>
                Khi yêu cầu rút tiền <b>đang chờ xử lý</b>, nếu có bất kì khách
                hàng nào yêu cầu hoàn tiền thì yêu cầu rút tiền sẽ{" "}
                <b>thất bại</b>.
              </span>
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
}

export default NewWithdrawal;
