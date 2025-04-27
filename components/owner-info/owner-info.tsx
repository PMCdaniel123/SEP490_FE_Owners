"use client";

/* eslint-disable @next/next/no-img-element */
import { Edit, FileText, Globe, Save, Upload, User, X } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import dayjs from "dayjs";
import { formatCurrency, OwnerProps } from "@/types";
import { Button, Upload as AntUpload, ConfigProvider } from "antd";
import ImgCrop from "antd-img-crop";
import { BASE_URL } from "@/constants/environments";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateAvatar } from "@/stores/slices/authSlice";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { socialSchema } from "@/lib/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import GoogleMap from "../google-map/google-map";
import Cookies from "js-cookie";

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
  const token =
    typeof window !== "undefined" ? Cookies.get("owner_token") : null;
  const [isEdit, setIsEdit] = useState(false);
  const form = useForm<z.infer<typeof socialSchema>>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      facebook: ownerInfo?.facebook || "",
      instagram: ownerInfo?.instagram || "",
      tiktok: ownerInfo?.tiktok || "",
    },
  });

  useEffect(() => {
    if (isEdit && ownerInfo) {
      form.reset({
        facebook: ownerInfo?.facebook || "",
        instagram: ownerInfo?.instagram || "",
        tiktok: ownerInfo?.tiktok || "",
      });
    }
  }, [isEdit, form, ownerInfo]);

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
            Authorization: `Bearer ${token}`,
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

  const handleUpdateSocial = async (data: z.infer<typeof socialSchema>) => {
    setLoading(true);
    const rawData = {
      facebook: data.facebook,
      instagram: data.instagram,
      tiktok: data.tiktok,
      id: ownerInfo?.id,
    };
    try {
      const response = await fetch(
        `${BASE_URL}/workspace-owners/${ownerInfo?.id}/socials`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(rawData),
        }
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi cập nhật tài khoản mạng xã hội.");
      }

      toast.success("Cập nhật tài khoản mạng xã hội thành công!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "light",
      });
      setLoading(false);
      setIsEdit(false);
      window.location.reload();
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

  return (
    <div className="flex flex-col gap-6">
      <div className="border border-primary p-4 rounded-md relative">
        <h2 className="font-semibold text-base mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-white px-4">
          <User className="h-5 w-5 text-primary" />
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
                src="/workhive.png"
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
                  size="middle"
                  icon={<Upload className="mr-2" size={16} />}
                >
                  Chọn ảnh
                </Button>
              </ConfigProvider>
            </AntUpload>
          </ImgCrop>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mt-4">
          <p className="text-sm">
            <strong>Email:</strong> {ownerInfo?.email}
          </p>
          <p className="text-sm">
            <strong>Số điện thoại:</strong> {ownerInfo?.phone}
          </p>
          <p className="text-sm">
            <strong>Trạng thái:</strong>{" "}
            {ownerInfo?.status === "Success" ? (
              <span className="text-green-500">Xác thực thành công</span>
            ) : ownerInfo?.status === "Fail" ? (
              <span className="text-red-500">Xác thực thất bại</span>
            ) : (
              <span className="text-yellow-500">Xác thực thành công</span>
            )}
          </p>
          <p className="text-sm">
            <strong>Ngày tạo tài khoản:</strong>{" "}
            {dayjs(ownerInfo?.createdAt).format("HH:mm DD/MM/YYYY")}
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
      <Separator className="my-2" />
      <div className="border border-primary p-4 rounded-md relative">
        <h2 className="font-semibold text-base mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-white px-4">
          <Globe className="h-5 w-5 text-primary" />
          Tài khoản mạng xã hội
        </h2>
        {!isEdit && (
          <button
            className="font-medium text-sm rounded-md cursor-pointer hover:bg-secondary flex items-center gap-2 text-white absolute -top-[18px] right-4 bg-primary px-4 py-2"
            onClick={() => setIsEdit(true)}
          >
            <Edit className="h-4 w-4" />
            Chỉnh sửa
          </button>
        )}
        {isEdit && (
          <div className="flex items-center gap-2 absolute -top-[18px] right-4">
            <button
              className="font-medium text-sm rounded-md cursor-pointer hover:bg-red-300 flex items-center gap-2 text-white bg-red-500 px-4 py-2"
              onClick={() => setIsEdit(false)}
            >
              <X className="h-4 w-4" />
              Hủy
            </button>
          </div>
        )}
        {!isEdit && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mt-4">
            <Link className="text-sm" href={ownerInfo?.facebook || ""}>
              <strong>Facebook:</strong>{" "}
              <span className="text-primary hover:text-secondary underline">
                {ownerInfo?.facebook || "Chưa cập nhật"}
              </span>
            </Link>
            <Link className="text-sm" href={ownerInfo?.instagram || ""}>
              <strong>Instagram:</strong>{" "}
              <span className="text-primary hover:text-secondary underline">
                {ownerInfo?.instagram || "Chưa cập nhật"}
              </span>
            </Link>
            <Link className="text-sm" href={ownerInfo?.tiktok || ""}>
              <strong>Tiktok:</strong>{" "}
              <span className="text-primary hover:text-secondary underline">
                {ownerInfo?.tiktok || "Chưa cập nhật"}
              </span>
            </Link>
          </div>
        )}
        {isEdit && (
          <Form {...form}>
            <form
              className="grid sm:grid-cols-2 gap-6 mt-4"
              onSubmit={form.handleSubmit(handleUpdateSocial)}
            >
              <div className="sm:col-span-1 flex flex-col gap-2 w-full">
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-fourth font-bold text-sm ml-6">
                        Facebook
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="py-4 px-4 text-sm rounded-md file:bg-seventh"
                          placeholder="Nhập đường dẫn hợp lệ..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-1 flex flex-col gap-2 w-full">
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-fourth font-bold text-sm ml-6">
                        Instagram
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="py-4 px-4 text-sm rounded-md file:bg-seventh"
                          placeholder="Nhập đường dẫn hợp lệ..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-1 flex flex-col gap-2 w-full">
                <FormField
                  control={form.control}
                  name="tiktok"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-fourth font-bold text-sm ml-6">
                        Tiktok
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="py-4 px-4 text-sm rounded-md file:bg-seventh"
                          placeholder="Nhập đường dẫn hợp lệ..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-2 w-full">
                <button
                  className="z-10 flex gap-2 items-center justify-center bg-primary text-white py-3 rounded-md hover:bg-secondary"
                  type="submit"
                >
                  {loading ? (
                    <LoadingOutlined style={{ color: "white" }} />
                  ) : (
                    <span className="font-bold flex items-center gap-2">
                      <Save size={18} /> Xác nhận
                    </span>
                  )}
                </button>
              </div>
            </form>
          </Form>
        )}
      </div>
      <Separator className="my-2" />
      <div className="border border-primary p-4 rounded-md relative">
        <h2 className="font-semibold text-base mb-4 flex items-center gap-2 text-primary absolute -top-4 left-4 bg-white px-4">
          <FileText className="h-5 w-5 text-primary" />
          Giấy phép kinh doanh
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mt-4">
          <p className="text-sm">
            <strong>Họ và tên:</strong> {ownerInfo?.ownerName}
          </p>
          <p className="text-sm">
            <strong>Giới tính:</strong> {ownerInfo?.sex}
          </p>
          <p className="text-sm">
            <strong>Ngày đăng kí doanh nghiệp:</strong>{" "}
            {ownerInfo?.registrationDate
              ? dayjs(ownerInfo?.registrationDate).format("DD/MM/YYYY")
              : "Chưa cập nhật"}
          </p>
          <p className="text-sm">
            <strong>Tên công ty:</strong> {ownerInfo?.licenseName}
          </p>
          <p className="text-sm">
            <strong>Số giấy phép:</strong> {ownerInfo?.licenseNumber}
          </p>
          <p className="text-sm md:col-span-2">
            <strong>Địa chỉ:</strong> {ownerInfo?.licenseAddress}
          </p>
          <p className="text-sm">
            <strong>Vốn điều lệ:</strong>{" "}
            {ownerInfo?.charterCapital
              ? formatCurrency(Number(ownerInfo?.charterCapital))
              : "Chưa cập nhật"}
          </p>
          <p className="text-sm">
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
        {ownerInfo?.googleMapUrl && (
          <div className="mt-8 rounded-md">
            <GoogleMap url={ownerInfo?.googleMapUrl} />
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerInfo;
