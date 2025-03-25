/* eslint-disable @next/next/no-img-element */
import { feedbackList } from "@/constants/constant";
import {
  CustomerProps,
  FeedbackProps,
  formatCurrency,
  Price,
  Workspace,
} from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Ruler, Sofa, Users } from "lucide-react";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { fetchCustomerDetail } from "@/features";
import { BASE_URL } from "@/constants/environments";

interface FeedbackWorkspaceProps {
  workspace: Workspace | null;
  address: string;
  googleMapUrl: string;
}

function FeedbackModal({ feedbackId }: { feedbackId: string }) {
  const [feedback, setFeedback] = useState<FeedbackProps | null>(null);
  const [customer, setCustomer] = useState<CustomerProps | null>(null);
  const [workspace, setWorkspace] = useState<FeedbackWorkspaceProps | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!feedbackId) {
      return;
    }
    setFeedback(feedbackList[Number(feedbackId) - 1]);
    fetchCustomerDetail("1", setCustomer, setLoading);
    const getWorkspaceDetail = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/workspaces/${Number(
            feedbackList[Number(feedbackId) - 1].id
          )}`
        );
        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải không gian.");
        }

        const data = await response.json();
        const formattedWorkspace = {
          workspace: {
            ...data.getWorkSpaceByIdResult,
            shortTermPrice:
              data.getWorkSpaceByIdResult.prices.find(
                (price: Price) => price.category === "Giờ"
              )?.price + "" || "",
            longTermPrice:
              data.getWorkSpaceByIdResult.prices.find(
                (price: Price) => price.category === "Ngày"
              )?.price + "" || "",
          },
          address: data.getWorkSpaceByIdResult.address,
          googleMapUrl: data.getWorkSpaceByIdResult.googleMapUrl,
        };
        setWorkspace(formattedWorkspace);
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
        setWorkspace(null);
        setLoading(false);
      }
    };

    getWorkspaceDetail();
  }, [feedbackId]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

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
          <p className="text-xs text-fifth">{feedback?.createdAt}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 border rounded-md p-4 mt-4">
        <p className="text-fourth">{feedback?.content}</p>
        <Image
          src={feedback?.image || "/logo.png"}
          height={100}
          width={200}
          alt={"feedback"}
          className="rounded-md object-cover"
        />
      </div>
      <div className="mt-4">
        <Card className="rounded-md shadow-md py-0 gap-2">
          <div className="relative">
            <img
              src={workspace?.workspace?.images[0].imgUrl || "/logo.png"}
              alt={workspace?.workspace?.name || ""}
              className="w-full h-48 object-cover rounded-t-md"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm">
              {formatCurrency(Number(workspace?.workspace?.shortTermPrice))} -{" "}
              {formatCurrency(Number(workspace?.workspace?.longTermPrice))}
            </div>
          </div>
          <CardContent className="mb-4">
            <h3 className="text-lg font-semibold">
              {workspace?.workspace?.name}
            </h3>
            <p className="text-gray-600 text-sm truncate whitespace-nowrap">
              {workspace?.address}
            </p>
            <div className="flex items-center text-gray-600 text-sm mt-2 justify-between">
              <span className="flex items-center">
                <Users className="mr-1" size={16} />{" "}
                {workspace?.workspace?.capacity} người
              </span>
              <span className="flex items-center">
                <Ruler className="mr-1" size={16} />{" "}
                {workspace?.workspace?.area} m²
              </span>
              <span className="flex items-center">
                <Sofa className="mr-1" size={16} />{" "}
                {workspace?.workspace?.category === "Văn phòng"
                  ? "Văn phòng"
                  : workspace?.workspace?.category === "Phòng họp"
                  ? "Phòng họp"
                  : workspace?.workspace?.category === "Phòng hội thảo"
                  ? "Phòng hội thảo"
                  : "Bàn cá nhân"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FeedbackModal;
