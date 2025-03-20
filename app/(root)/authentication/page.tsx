"use client";

import Loader from "@/components/loader/Loader";
import AuthItem from "@/components/owner-form/authentication-form/auth-item";
import IdentifyForm from "@/components/owner-form/authentication-form/IdentifyForm";
import LicenseForm from "@/components/owner-form/authentication-form/LicenseForm";
// import PhoneForm from "@/components/owner-form/authentication-form/PhoneForm";
import SocialForm from "@/components/owner-form/authentication-form/SocialForm";
import { Form } from "@/components/ui/form";
import { identifySchema } from "@/lib/zod/schema";
import { RootState } from "@/stores";
import { LoadingOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdCard, FileText, Waypoints, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

function AuthenticationManagement() {
  const { owner } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const [newLoading, setNewLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof identifySchema>>({
    resolver: zodResolver(identifySchema),
    defaultValues: {
      identityName: "",
      identityNumber: "",
      dateOfBirth: "",
      sex: "",
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
      charterCapital: "",
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
          if (data.owner.status !== "Fail") {
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

  const onCreate = async (values: z.infer<typeof identifySchema>) => {
    const data = {
      ...values,
      identityFile: "",
      licenseFile: "",
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
        <div className="flex flex-col w-full">
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
                icon={Waypoints}
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
