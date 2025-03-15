import { BookingWorkspaceProps } from "@/components/owner-modal/booking-modal";
import { CustomerProps, Price } from "@/types";
import { toast } from "react-toastify";

export const fetchCustomerDetail = async (
  id: string,
  setCustomer: React.Dispatch<React.SetStateAction<CustomerProps | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await fetch(`https://localhost:5050/users/${Number(id)}`);
    if (!response.ok)
      throw new Error("Có lỗi xảy ra khi tải thông tin khách hàng.");

    const data = await response.json();
    setCustomer(data.user);
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

export const fetchWorkspaceDetail = async (
  id: string,
  setWorkspace: React.Dispatch<React.SetStateAction<BookingWorkspaceProps | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `https://localhost:5050/workspaces/${Number(id)}`
    );
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
