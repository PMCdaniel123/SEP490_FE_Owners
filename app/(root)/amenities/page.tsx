"use client";

import Loader from "@/components/loader/Loader";
import AmenityTable from "@/components/table/amenity-table";
import { BASE_URL } from "@/constants/environments";
import { AmenityTableColumns } from "@/constants/table-columns";
import { RootState } from "@/stores";
import { AmenityProps } from "@/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function AmenitiesManagement() {
  const [amenityList, setAmenityList] = useState<AmenityProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { owner } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!owner) return;

    const getAmenitiesByOwnerId = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/amenities/Owner/` + owner?.id
        );

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi tải danh sách tiện ích.");
        }
        const data = await response.json();
        const formattedAmenities =
          data.amenities === null || data.amenities === undefined
            ? []
            : data.amenities;
        setAmenityList(formattedAmenities);
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
        setAmenityList([]);
        setLoading(false);
      }
    };

    getAmenitiesByOwnerId();
  }, [owner]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-md">
      <AmenityTable columns={AmenityTableColumns} data={amenityList} />
    </div>
  );
}

export default AmenitiesManagement;
