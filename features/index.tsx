import { BookingWorkspaceProps } from "@/components/owner-modal/booking-modal";
import { BASE_URL } from "@/constants/environments";
import {
  AmenityProps,
  BeverageProps,
  BookingAmenityProps,
  BookingBeverageProps,
  BookingListProps,
  CustomerProps,
  Price,
  PromotionProps,
  TopRevenueWorkspace,
  Workspace,
} from "@/types";
import { toast } from "react-toastify";

export const fetchCustomerDetail = async (
  id: string,
  setCustomer: React.Dispatch<React.SetStateAction<CustomerProps | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await fetch(`${BASE_URL}/users/${Number(id)}`);
    if (!response.ok)
      throw new Error("Có lỗi xảy ra khi tải thông tin khách hàng.");

    const data = await response.json();
    const formatted =
      data.user === null || data.user === undefined ? null : data.user;
    setCustomer(formatted);
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Đã xảy ra lỗi!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "light",
    });
    setCustomer(null);
  } finally {
    setLoading(false);
  }
};

export const fetchPromotionDetail = async (
  id: string,
  setPromotion: React.Dispatch<React.SetStateAction<PromotionProps | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await fetch(`${BASE_URL}/promotions/${Number(id)}`);
    if (!response.ok)
      throw new Error("Có lỗi xảy ra khi tải thông tin khuyến mãi.");

    const data = await response.json();
    const formatted = data === null || data === undefined ? null : data;
    setPromotion(formatted);
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Đã xảy ra lỗi!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "light",
    });
    setPromotion(null);
  } finally {
    setLoading(false);
  }
};

export const fetchWorkspaceDetail = async (
  id: string,
  setWorkspace: React.Dispatch<
    React.SetStateAction<BookingWorkspaceProps | null>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await fetch(`${BASE_URL}/workspaces/${Number(id)}`);
    if (!response.ok) throw new Error("Có lỗi xảy ra khi tải không gian.");

    const data = await response.json();
    setWorkspace({
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
    });
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Đã xảy ra lỗi!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "light",
    });
    setWorkspace(null);
  } finally {
    setLoading(false);
  }
};

export const fetchCustomerList = async (
  id: string | null,
  setCustomerList: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await fetch(`${BASE_URL}/users/owner/${Number(id)}`);
    if (!response.ok)
      throw new Error("Có lỗi xảy ra khi tải danh sách khách hàng.");

    const data = await response.json();
    const formatted =
      data.users === null || data.users === undefined ? [] : data.users;
    setCustomerList(formatted);
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Đã xảy ra lỗi!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "light",
    });
    setCustomerList([]);
  } finally {
    setLoading(false);
  }
};

export const fetchAmenityList = async (
  id: string | null,
  setAmenityList: React.Dispatch<React.SetStateAction<AmenityProps[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await fetch(`${BASE_URL}/amenities/Owner/` + Number(id));

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi tải danh sách tiện ích.");
    }
    const data = await response.json();
    const formatted =
      data.amenities === null || data.amenities === undefined
        ? []
        : data.amenities;
    setAmenityList(formatted);
    setLoading(false);
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Đã xảy ra lỗi!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "light",
    });
    setAmenityList([]);
  } finally {
    setLoading(false);
  }
};

export const fetchBeverageList = async (
  id: string | null,
  setBeverageList: React.Dispatch<React.SetStateAction<BeverageProps[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await fetch(`${BASE_URL}/beverages/Owner/` + Number(id));

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi tải danh sách tiện ích.");
    }
    const data = await response.json();
    const formatted =
      data.beverages === null || data.beverages === undefined
        ? []
        : data.beverages;
    setBeverageList(formatted);
    setLoading(false);
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Đã xảy ra lỗi!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "light",
    });
    setBeverageList([]);
  } finally {
    setLoading(false);
  }
};

export const fetchBookingList = async (
  id: string | null,
  setBookingList: React.Dispatch<React.SetStateAction<BookingListProps[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `${BASE_URL}/getallbookingbyownerid/` + Number(id)
    );

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi tải danh sách đặt chỗ.");
    }
    const data = await response.json();
    const formattedBooking =
      data.bookingByOwnerIdDTOs === null ||
      data.bookingByOwnerIdDTOs === undefined
        ? []
        : data.bookingByOwnerIdDTOs.filter(
            (booking: BookingListProps) => booking.status === "Success"
          );
    setBookingList(formattedBooking);
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
    setBookingList([]);
    setLoading(false);
  }
};

export const fetchWorkspaceList = async (
  id: string | null,
  setWorkspaceList: React.Dispatch<React.SetStateAction<Workspace[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await fetch(`${BASE_URL}/workspaces/owner/` + Number(id));

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi tải danh sách không gian.");
    }
    const data = await response.json();
    const formattedWorkspaces =
      data.workspaces === null || data.workspaces === undefined
        ? []
        : data.workspaces.map((workspace: Workspace) => ({
            ...workspace,
            shortTermPrice:
              workspace.prices.find((price) => price.category === "Giờ")
                ?.price || 0,
            longTermPrice:
              workspace.prices.find((price) => price.category === "Ngày")
                ?.price || 0,
          }));
    setWorkspaceList(formattedWorkspaces);
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
    setWorkspaceList([]);
    setLoading(false);
  }
};

export const fetchBookingAmenityList = async (
  id: string | null,
  setBookingAmenityList: React.Dispatch<
    React.SetStateAction<BookingAmenityProps[]>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/owners/bookings/amenities/` + Number(id)
    );

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi tải danh sách đặt tiện ích.");
    }
    const data = await response.json();
    const formatted =
      data.numberOfBookingAmenitiesDTOs === null ||
      data.numberOfBookingAmenitiesDTOs === undefined
        ? []
        : data.numberOfBookingAmenitiesDTOs;
    setBookingAmenityList(formatted);
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
    setBookingAmenityList([]);
    setLoading(false);
  }
};

export const fetchBookingBeverageList = async (
  id: string | null,
  setBookingBeverageList: React.Dispatch<
    React.SetStateAction<BookingBeverageProps[]>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/owners/bookings/beverages/` + Number(id)
    );

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi tải danh sách đặt món.");
    }
    const data = await response.json();
    const formatted =
      data.numberOfBookingBeveragesDTOs === null ||
      data.numberOfBookingBeveragesDTOs === undefined
        ? []
        : data.numberOfBookingBeveragesDTOs;
    setBookingBeverageList(formatted);
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
    setBookingBeverageList([]);
    setLoading(false);
  }
};

export const fetchTopWorkspaceList = async (
  id: string | null,
  setTopWorkspaceList: React.Dispatch<
    React.SetStateAction<TopRevenueWorkspace[]>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `${BASE_URL}/owners/` + Number(id) + `/workspaces`
    );

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi tải danh sách không gian.");
    }
    const data = await response.json();
    let formatted =
      data.workspaces === null || data.workspaces === undefined
        ? []
        : data.workspaces.map((workspace: TopRevenueWorkspace) => ({
            ...workspace,
            shortTermPrice:
              workspace.prices.find((price) => price.category === "Giờ")
                ?.averagePrice || 0,
            longTermPrice:
              workspace.prices.find((price) => price.category === "Ngày")
                ?.averagePrice || 0,
          }));
    formatted = formatted.sort(
      (a: TopRevenueWorkspace, b: TopRevenueWorkspace) => b.revenue - a.revenue
    );
    setTopWorkspaceList(formatted);
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
    setTopWorkspaceList([]);
    setLoading(false);
  }
};
