"use client";

import Loader from "@/components/loader/Loader";
import { Separator } from "@/components/ui/separator";
import { BASE_URL } from "@/constants/environments";
import { formatCurrency, VerifyOwnerProps } from "@/types";
import dayjs from "dayjs";
import { BadgeInfo, ChevronLeft, FileText, Globe, User } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function VerifyOwnerDetail() {
  const { verifyId } = useParams() as { verifyId: string };
  const [verifyDetail, setVerifyDetail] = useState<VerifyOwnerProps | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!verifyId) return;

    setLoading(true);
    const fetchOwnerData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/owner-verify-requests/${verifyId}`
        );

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải thông tin xác thực.");
        }

        const data = await response.json();
        setVerifyDetail(data);
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

    fetchOwnerData();
  }, [verifyId]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="p-4 bg-white rounded-md">
        <div className="flex flex-col gap-6">
          <div className="w-full mx-auto bg-primary border border-primary rounded-md p-4 mb-4 flex flex-col relative">
            <h1 className="text-base font-bold text-center text-white flex items-center justify-center gap-4">
              <BadgeInfo /> Chi tiết yêu cầu xác thực doanh nghiệp
            </h1>
            <div
              className="absolute top-4 left-4 flex items-center text-white hover:text-gray-300 cursor-pointer"
              onClick={() => router.push("/authentication/verify-requests")}
            >
              <ChevronLeft />
              <p>Trở lại</p>
            </div>
          </div>
          <div className="border border-primary p-4 rounded-md relative">
            <h2 className="font-semibold text-base mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-white px-4">
              <User className="h-5 w-5 text-primary" />
              Thông tin chung
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mt-4">
              <p className="text-sm">
                <span className="font-semibold">Trạng thái:</span>{" "}
                {verifyDetail?.status === "Handling" ? (
                  <span className="text-yellow-500">Chờ xác thực</span>
                ) : verifyDetail?.status === "Success" ? (
                  <span className="text-green-500">Xác thực thành công</span>
                ) : (
                  <span className="text-red-500">Xác thực thất bại</span>
                )}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Ngày tạo:</span>{" "}
                {verifyDetail?.createdAt
                  ? dayjs(verifyDetail?.createdAt).format("HH:mm DD/MM/YYYY")
                  : "Chưa cập nhật"}
              </p>
              {verifyDetail?.userId && (
                <p className="text-sm">
                  <span className="font-semibold">
                    Nhân viên xử lý yêu cầu:{" "}
                  </span>
                  NV{Number(verifyDetail?.userId).toString().padStart(4, "0")}
                </p>
              )}
              {verifyDetail?.userId && (
                <p className="text-sm">
                  <span className="font-semibold">Tin nhắn: </span>
                  {verifyDetail?.message}
                </p>
              )}
              {verifyDetail?.userId && (
                <p className="text-sm">
                  <span className="font-semibold">Ngày xử lý: </span>
                  {dayjs(verifyDetail?.updatedAt).format("HH:mm DD/MM/YYYY")}
                </p>
              )}
            </div>
          </div>
          <Separator className="my-4" />
          <div className="border border-primary p-4 rounded-md relative">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-white px-4">
              <Globe className="h-5 w-5 text-primary" />
              Tài khoản mạng xã hội
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mt-4">
              <Link className="text-sm" href={verifyDetail?.facebook || ""}>
                <span className="font-semibold">Facebook:</span>{" "}
                <span className="text-primary hover:text-secondary underline">
                  {verifyDetail?.facebook || "Chưa cập nhật"}
                </span>
              </Link>
              <Link className="text-sm" href={verifyDetail?.instagram || ""}>
                <span className="font-semibold">Instagram:</span>{" "}
                <span className="text-primary hover:text-secondary underline">
                  {verifyDetail?.instagram || "Chưa cập nhật"}
                </span>
              </Link>
              <Link className="text-sm" href={verifyDetail?.tiktok || ""}>
                <span className="font-semibold">Tiktok:</span>{" "}
                <span className="text-primary hover:text-secondary underline">
                  {verifyDetail?.tiktok || "Chưa cập nhật"}
                </span>
              </Link>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="border border-primary p-4 rounded-md relative">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-white px-4">
              <FileText className="h-5 w-5 text-primary" />
              Giấy phép kinh doanh
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mt-4">
              <p className="text-sm">
                <span className="font-semibold">Họ và tên:</span>{" "}
                {verifyDetail?.ownerName}
              </p>
              <p className="text-sm">
                <span className="font-semibold">
                  Ngày đăng kí doanh nghiệp:
                </span>{" "}
                {dayjs(verifyDetail?.registrationDate).format("DD/MM/YYYY")}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Tên công ty:</span>{" "}
                {verifyDetail?.licenseName}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Số giấy phép:</span>{" "}
                {verifyDetail?.licenseNumber}
              </p>
              <p className="md:col-span-2 text-sm">
                <span className="font-semibold">Địa chỉ:</span>{" "}
                {verifyDetail?.licenseAddress}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Vốn điều lệ:</span>{" "}
                {formatCurrency(Number(verifyDetail?.charterCapital))}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Tệp đính kèm:</span>{" "}
                <a
                  href={verifyDetail?.licenseFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary underline"
                >
                  Xem tệp
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyOwnerDetail;
