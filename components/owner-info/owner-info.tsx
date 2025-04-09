"use client";

/* eslint-disable @next/next/no-img-element */
import { FileText, Globe, IdCard, Save, Upload, User } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import dayjs from "dayjs";
import { OwnerProps } from "@/types";
import { Button, Upload as AntUpload, ConfigProvider } from "antd";
import ImgCrop from "antd-img-crop";
import { BASE_URL } from "@/constants/environments";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateAvatar } from "@/stores/slices/authSlice";

interface OwnerInfoProps {
  ownerInfo: OwnerProps | null;
}

function OwnerInfo({ ownerInfo }: OwnerInfoProps) {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | string | null | undefined>(
    ownerInfo?.avatar
  );
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const handleAvatarChange = (file: File) => {
    setAvatar(file);
    setVisible(true);
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("images", file);
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/images/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải lên ảnh.");
      }

      const result = await response.json();
      setLoading(false);
      return result.data[0];
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

  const onChangeAvatar = async () => {
    let imgUrl = avatar;
    setLoading(true);
    if (typeof imgUrl !== "string" && imgUrl) {
      try {
        const uploadedUrl = await uploadImage(imgUrl);
        if (!uploadedUrl) {
          throw new Error("Có lỗi xảy ra khi tải lên ảnh.");
        }
        imgUrl = uploadedUrl;
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
        return;
      }
    }
    try {
      const response = await fetch(
        `${BASE_URL}/workspace-owners/${ownerInfo?.id}/avatar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatarUrl: imgUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi cập nhật hình đại diện.");
      }

      toast.success("Cập nhật hình đại diện thành công!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      dispatch(updateAvatar(imgUrl));
      setLoading(false);
      setVisible(false);
      router.push("/authentication");
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

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="border border-primary dark:bg-gray-800 p-6 rounded-lg relative">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-white px-4">
          <User className="h-5 w-5 text-primary dark:text-primary-dark" />
          Thông tin cá nhân
        </h2>
        <div className="flex items-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden border my-2 mr-2">
            {avatar ? (
              <img
                src={
                  typeof avatar === "string"
                    ? avatar
                    : URL.createObjectURL(avatar)
                }
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="/logo.png"
                alt="Default Avatar"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <ImgCrop rotationSlider>
            <AntUpload
              beforeUpload={(file) => {
                handleAvatarChange(file);
                return false;
              }}
              showUploadList={false}
            >
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorBgContainer: "#835101",
                      colorText: "#fff",
                      defaultHoverBg: "#B49057",
                      defaultHoverColor: "#fff",
                      defaultHoverBorderColor: "#B49057",
                      paddingBlockLG: 12,
                      defaultActiveColor: "#fff",
                    },
                  },
                }}
              >
                <Button
                  size="large"
                  icon={<Upload className="mr-2" size={20} />}
                >
                  Chọn ảnh
                </Button>
              </ConfigProvider>
            </AntUpload>
          </ImgCrop>
        </div>
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
      {visible && (
        <button
          className="flex gap-2 font-semibold items-center justify-center bg-primary text-white py-3 rounded-md hover:bg-secondary cursor-pointer"
          onClick={onChangeAvatar}
        >
          <Save size={18} /> Lưu thay đổi
        </button>
      )}
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
