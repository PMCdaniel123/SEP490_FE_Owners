import { Edit, FileText, Globe, IdCard, User } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { OwnerProps } from "@/types";

interface OwnerInfoProps {
  ownerInfo: OwnerProps | null;
  handleEdit: () => void;
}

function OwnerInfo({ ownerInfo, handleEdit }: OwnerInfoProps) {
  console.log(ownerInfo);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-end">
        <Button
          onClick={handleEdit}
          className="flex gap-2 items-center justify-center bg-primary text-white py-3 rounded-md hover:bg-secondary cursor-pointer"
        >
          <span className="font-medium flex items-center gap-2">
            <Edit size={18} /> Chỉnh sửa
          </span>
        </Button>
      </div>
      <div className="border border-primary dark:bg-gray-800 p-6 rounded-lg relative">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-white px-4">
          <User className="h-5 w-5 text-primary dark:text-primary-dark" />
          Thông tin cá nhân
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mt-4">
          <p>
            <strong>Email:</strong> {ownerInfo?.email}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {ownerInfo?.phone}
          </p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            {ownerInfo?.status === "Success" ? (
              <span className="text-green-500">Xác thực thành công</span>
            ) : ownerInfo?.status === "Fail" ? (
              <span className="text-red-500">Xác thực thất bại</span>
            ) : (
              <span className="text-yellow-500">Xác thực thành công</span>
            )}
          </p>
          <p>
            <strong>Ngày tạo:</strong>{" "}
            {dayjs(ownerInfo?.updatedAt).format("HH:mm DD/MM/YYYY")}
          </p>
        </div>
      </div>
      <Separator className="my-4 dark:border-gray-700" />
      <div className="border border-primary dark:bg-gray-800 p-6 rounded-lg relative">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-white px-4">
          <IdCard className="h-5 w-5 text-primary dark:text-primary-dark" />
          Căn cước công dân
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mt-4">
          <p>
            <strong>Họ và tên:</strong> {ownerInfo?.identityName}
          </p>
          <p>
            <strong>Số CCCD:</strong> {ownerInfo?.identityNumber}
          </p>
          <p>
            <strong>Ngày sinh:</strong>{" "}
            {dayjs(ownerInfo?.dateOfBirth).format("DD/MM/YYYY")}
          </p>
          <p>
            <strong>Giới tính:</strong> {ownerInfo?.sex}
          </p>
          <p>
            <strong>Quốc tịch:</strong> {ownerInfo?.nationality}
          </p>
          <p>
            <strong>Quê quán:</strong> {ownerInfo?.placeOfOrigin}
          </p>
          <p>
            <strong>Nơi cư trú:</strong> {ownerInfo?.placeOfResidence}
          </p>
          <p>
            <strong>Ngày hết hạn:</strong>{" "}
            {dayjs(ownerInfo?.identityExpiredDate).format("DD/MM/YYYY")}
          </p>
          <p>
            <strong>Ngày cấp:</strong>{" "}
            {dayjs(ownerInfo?.identityCreatedDate).format("DD/MM/YYYY")}
          </p>
          <p>
            <strong>Tệp đính kèm:</strong>{" "}
            <a
              href={ownerInfo?.identityFile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary underline"
            >
              Xem tệp
            </a>
          </p>
        </div>
      </div>
      <Separator className="my-4 dark:border-gray-700" />
      <div className="border border-primary dark:bg-gray-800 p-6 rounded-lg relative">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-white px-4">
          <Globe className="h-5 w-5 text-primary dark:text-primary-dark" />
          Tài khoản mạng xã hội
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mt-4">
          <Link href={ownerInfo?.facebook || ""}>
            <strong>Facebook:</strong>{" "}
            <span className="text-primary hover:text-secondary underline">
              {ownerInfo?.facebook}
            </span>
          </Link>
          <Link href={ownerInfo?.instagram || ""}>
            <strong>Instagram:</strong>{" "}
            <span className="text-primary hover:text-secondary underline">
              {ownerInfo?.instagram}
            </span>
          </Link>
          <Link href={ownerInfo?.tiktok || ""}>
            <strong>Tiktok:</strong>{" "}
            <span className="text-primary hover:text-secondary underline">
              {ownerInfo?.tiktok}
            </span>
          </Link>
        </div>
      </div>
      <Separator className="my-4 dark:border-gray-700" />
      <div className="border border-primary dark:bg-gray-800 p-6 rounded-lg relative">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-white px-4">
          <FileText className="h-5 w-5 text-primary dark:text-primary-dark" />
          Giấy phép kinh doanh
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 mt-4">
          <p>
            <strong>Tên công ty:</strong> {ownerInfo?.licenseName}
          </p>
          <p>
            <strong>Số giấy phép:</strong> {ownerInfo?.licenseNumber}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {ownerInfo?.licenseAddress}
          </p>
          <p>
            <strong>Vốn điều lệ:</strong> {ownerInfo?.charterCapital}
          </p>
          <p>
            <strong>Tệp đính kèm:</strong>{" "}
            <a
              href={ownerInfo?.licenseFile}
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
  );
}

export default OwnerInfo;
