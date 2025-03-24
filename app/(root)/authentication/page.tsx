"use client";

import Loader from "@/components/loader/Loader";
import AuthItem from "@/components/owner-form/authentication-form/auth-item";
import IdentifyForm from "@/components/owner-form/authentication-form/IdentifyForm";
import LicenseForm from "@/components/owner-form/authentication-form/LicenseForm";
// import PhoneForm from "@/components/owner-form/authentication-form/PhoneForm";
import SocialForm from "@/components/owner-form/authentication-form/SocialForm";
import OwnerInfo from "@/components/owner-info/owner-info";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { identifySchema } from "@/lib/zod/schema";
import { RootState } from "@/stores";
import { OwnerProps } from "@/types";
import { LoadingOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdCard, FileText, Save, Globe, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

function AuthenticationManagement() {
  const { owner } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const [newLoading, setNewLoading] = useState(false);
  const [ownerInfo, setOwnerInfo] = useState<OwnerProps | null>(null);
  const [isEditing, setIsEditing] = useState(true);
  const [status, setStatus] = useState("");
  const form = useForm<z.infer<typeof identifySchema>>({
    resolver: zodResolver(identifySchema),
    defaultValues: {
      identityName: "",
      identityNumber: "",
      dateOfBirth: "",
      sex: "Nam",
      nationality: "",
      placeOfOrigin: "",
      placeOfResidence: "",
      identityExpiredDate: "",
      identityCreatedDate: "",
      identityFile: undefined,
      facebook: "",
      instagram: "",
      tiktok: "",
      licenseName: "",
      licenseNumber: "",
      licenseAddress: "",
      googleMapUrl: "",
      charterCapital: "0",
      licenseFile: undefined,
    },
  });

  useEffect(() => {
    if (owner) {
      const fetchOwnerData = async () => {
        try {
          const response = await fetch(
            `https://localhost:5050/workspace-owners/${owner.id}`
          );

          if (!response.ok) {
            throw new Error("Có lỗi xảy ra khi tải thông tin xác thực.");
          }

          const data = await response.json();
          if (data.owner.status !== "Success") {
            setIsEditing(true);
            setStatus(data.owner.status);
            form.setValue("identityName", data.owner.identityName);
            form.setValue("identityNumber", data.owner.identityNumber);
            form.setValue("dateOfBirth", data.owner.dateOfBirth);
            form.setValue("sex", data.owner.sex);
            form.setValue("nationality", data.owner.nationality);
            form.setValue("placeOfOrigin", data.owner.placeOfOrigin);
            form.setValue("placeOfResidence", data.owner.placeOfResidence);
            form.setValue(
              "identityExpiredDate",
              data.owner.identityExpiredDate
            );
            form.setValue(
              "identityCreatedDate",
              data.owner.identityCreatedDate
            );
            form.setValue("identityFile", data.owner.identityFile);
            form.setValue("facebook", data.owner.facebook);
            form.setValue("instagram", data.owner.instagram);
            form.setValue("tiktok", data.owner.tiktok);
            form.setValue("licenseName", data.owner.licenseName);
            form.setValue("licenseNumber", data.owner.licenseNumber);
            form.setValue("licenseAddress", data.owner.licenseAddress);
            form.setValue("googleMapUrl", data.owner.googleMapUrl);
            form.setValue("charterCapital", data.owner.charterCapital + "");
            form.setValue("licenseFile", data.owner.licenseFile);
          } else {
            setIsEditing(false);
            setOwnerInfo(data.owner);
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

      fetchOwnerData();
    }
  }, [owner, form]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
    form.reset();
    form.setValue("identityName", "" + ownerInfo?.identityName);
    form.setValue("identityNumber", "" + ownerInfo?.identityNumber);
    form.setValue("dateOfBirth", "" + ownerInfo?.dateOfBirth);
    form.setValue("sex", "" + ownerInfo?.sex);
    form.setValue("nationality", "" + ownerInfo?.nationality);
    form.setValue("placeOfOrigin", "" + ownerInfo?.placeOfOrigin);
    form.setValue("placeOfResidence", "" + ownerInfo?.placeOfResidence);
    form.setValue("identityExpiredDate", "" + ownerInfo?.identityExpiredDate);
    form.setValue("identityCreatedDate", "" + ownerInfo?.identityCreatedDate);
    form.setValue("identityFile", new File([], ""));
    form.setValue("facebook", "" + ownerInfo?.facebook);
    form.setValue("instagram", "" + ownerInfo?.instagram);
    form.setValue("tiktok", "" + ownerInfo?.tiktok);
    form.setValue("licenseName", "" + ownerInfo?.licenseName);
    form.setValue("licenseNumber", "" + ownerInfo?.licenseNumber);
    form.setValue("licenseAddress", "" + ownerInfo?.licenseAddress);
    form.setValue("googleMapUrl", "" + ownerInfo?.googleMapUrl);
    form.setValue("charterCapital", "" + ownerInfo?.charterCapital + "");
    form.setValue("licenseFile", new File([], ""));
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("files", file);
    setLoading(true);
    try {
      const response = await fetch("https://localhost:5050/files/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải file PDF.");
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

  const onCreate = async (values: z.infer<typeof identifySchema>) => {
    let identityFile = values.identityFile;
    let licenseFile = values.licenseFile;

    if (typeof identityFile !== "string") {
      try {
        const uploadedUrl = await uploadFile(identityFile);
        if (!uploadedUrl) {
          throw new Error("Có lỗi xảy ra khi tải lên ảnh.");
        }
        identityFile = uploadedUrl;
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

    if (typeof licenseFile !== "string") {
      try {
        const uploadedUrl = await uploadFile(licenseFile);
        if (!uploadedUrl) {
          throw new Error("Có lỗi xảy ra khi tải lên ảnh.");
        }
        licenseFile = uploadedUrl;
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

    const data = {
      ...values,
      identityFile,
      licenseFile,
    };

    setNewLoading(true);
    try {
      const response = await fetch(
        `https://localhost:5050/owners/${owner?.id}/verify`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tạo yêu cầu xác thực thông tin.");
      }

      toast.success(
        "Yêu cầu xác thực thành công! Vui lòng đợi hệ thống xác thực trong vòng 24h",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          theme: "light",
        }
      );
      setNewLoading(false);
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
      setNewLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl">
      <h1 className="text-xl font-bold text-center text-primary mt-10">
        Xác thực tài khoản
      </h1>
      <p className="text-center text-fifth mt-2 text-sm max-w-xl mx-auto">
        Để được xác minh, bạn phải gửi tất cả các thông tin bắt buộc sau. Nên
        bắt đầu bằng cách xác minh danh tính hoặc Địa chỉ.
      </p>

      <div className="mt-10">
        {isEditing ? (
          <div className="flex flex-col w-full gap-6">
            {ownerInfo?.status === "Success" && (
              <div className="flex items-center justify-between">
                <span className="text-green-500 border rounded-lg border-green-500 px-4 py-2">
                  Xác thực thành công
                </span>
                <Button
                  onClick={() => setIsEditing(false)}
                  className="flex gap-2 items-center justify-center bg-red-500 text-white py-3 rounded-md hover:bg-red-300 cursor-pointer"
                >
                  <span className="font-medium flex items-center gap-2">
                    <X size={18} /> Hủy
                  </span>
                </Button>
              </div>
            )}
            {status === "Handling" && (
              <div className="flex items-center justify-start">
                <span className="text-yellow-500 border rounded-lg border-yellow-500 px-4 py-2">
                  Chờ xác thực! Vui lòng chờ đợi!
                </span>
              </div>
            )}
            {status === "Fail" && (
              <div className="flex items-center justify-start">
                <span className="text-red-500 border rounded-lg border-red-500 px-4 py-2">
                  Xác thực thất bại! Vui lòng xác thực lại!
                </span>
              </div>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onCreate)}
                className="flex flex-col gap-4"
              >
                <AuthItem
                  icon={IdCard}
                  title="Căn cước công dân"
                  form={<IdentifyForm form={form} />}
                />
                <AuthItem
                  icon={Globe}
                  title="Tài khoản mạng xã hội"
                  form={<SocialForm form={form} />}
                />
                <AuthItem
                  icon={FileText}
                  title="Giấy phép kinh doanh"
                  form={<LicenseForm form={form} />}
                />
                <div className="flex flex-col gap-2 w-full">
                  <button
                    className="z-10 flex gap-2 items-center justify-center bg-primary text-white py-3 rounded-md hover:bg-secondary"
                    type="submit"
                  >
                    {newLoading ? (
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
          </div>
        ) : (
          <OwnerInfo ownerInfo={ownerInfo} handleEdit={handleEdit} />
        )}

        {/* <AuthItem
          icon={Phone}
          title="Xác thực số điện thoại"
          form={<PhoneForm onSubmit={() => {}} />}
        /> */}
      </div>
    </div>
  );
}

export default AuthenticationManagement;
