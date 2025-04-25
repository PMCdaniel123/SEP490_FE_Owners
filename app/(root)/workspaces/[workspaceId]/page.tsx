"use client";

import Loader from "@/components/loader/Loader";
import WorkspaceForm from "@/components/owner-form/WorkspaceForm";
import { BASE_URL } from "@/constants/environments";
import {
  Details,
  Facilities,
  Image,
  Policies,
  Price,
  Workspace,
} from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function WorkspaceDetail() {
  const { workspaceId } = useParams() as { workspaceId: string };
  const [workspaceDetail, setWorkspaceDetail] = useState<Workspace | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workspaceId) return;

    const getAmenityDetail = async () => {
      try {
        const response = await fetch(`${BASE_URL}/workspaces/${workspaceId}`);
        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải không gian.");
        }

        const data = await response.json();
        const formattedWorkspace = {
          ...data.getWorkSpaceByIdResult,
          shortTermPrice:
            data.getWorkSpaceByIdResult.prices.find(
              (price: Price) => price.category === "Giờ"
            )?.price + "" || "",
          longTermPrice:
            data.getWorkSpaceByIdResult.prices.find(
              (price: Price) => price.category === "Ngày"
            )?.price + "" || "",
          pricesStr: data.getWorkSpaceByIdResult.prices.map(
            (price: Price) => price.price
          ),
          facilitiesStr: data.getWorkSpaceByIdResult.facilities.map(
            (facility: Facilities) => facility.facilityName
          ),
          policiesStr: data.getWorkSpaceByIdResult.policies.map(
            (policy: Policies) => policy.policyName
          ),
          detailsStr: data.getWorkSpaceByIdResult.details.map(
            (detail: Details) => detail.detailName
          ),
          imagesStr: data.getWorkSpaceByIdResult.images.map(
            (image: Image) => image.imgUrl
          ),
          cleanTime: data.getWorkSpaceByIdResult.cleanTime + "",
          area: data.getWorkSpaceByIdResult.area + "",
          capacity: data.getWorkSpaceByIdResult.capacity + "",
          openTime:
            data.getWorkSpaceByIdResult.openTime === null
              ? "00:00:00"
              : data.getWorkSpaceByIdResult.openTime,
          closeTime:
            data.getWorkSpaceByIdResult.closeTime === null
              ? "23:59:00"
              : data.getWorkSpaceByIdResult.closeTime,
        };
        setWorkspaceDetail(formattedWorkspace);
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
        setWorkspaceDetail(null);
        setLoading(false);
      }
    };
    getAmenityDetail();
  }, [workspaceId]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-md">
      <WorkspaceForm initialData={workspaceDetail} />
    </div>
  );
}

export default WorkspaceDetail;
