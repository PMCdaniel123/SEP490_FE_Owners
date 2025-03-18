"use client";

import DashboardLineChart from "@/components/charts/line-chart";
import NewCustomers from "@/components/new-customers-table/new-customers";
import TopWorkspaceTable from "@/components/table/top-workspace-table";
import { topWorkspace } from "@/constants/constant";
import { topWorkspaceTableColumns } from "@/constants/table-columns";
import {
  Boxes,
  PiggyBank,
  Sofa,
  TrendingDown,
  TrendingUp,
  UsersRound,
  UtensilsCrossed,
} from "lucide-react";
import CustomerAnalysisChart from "@/components/charts/customer-analysis-chart";
import {
  AmenityProps,
  BeverageProps,
  BookingAmenityProps,
  BookingBeverageProps,
  BookingProps,
  CustomerProps,
  formatCurrency,
  Workspace,
} from "@/types";
import Loader from "@/components/loader/Loader";
import { useEffect, useState } from "react";
import {
  fetchAmenityList,
  fetchBeverageList,
  fetchBookingAmenityList,
  fetchBookingBeverageList,
  fetchBookingList,
  fetchCustomerList,
  fetchWorkspaceList,
} from "@/features";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import HotAmenityChart from "@/components/charts/hot-amenity-chart";
import HotBeverageChart from "@/components/charts/hot-beverage-chart";

export default function OwnerPage() {
  const [loading, setLoading] = useState(true);
  const [customerList, setCustomerList] = useState<CustomerProps[]>([]);
  const [amenityList, setAmenityList] = useState<AmenityProps[]>([]);
  const [beverageList, setBeverageList] = useState<BeverageProps[]>([]);
  const [bookingList, setBookingList] = useState<BookingProps[]>([]);
  const [workspaceList, setWorkspaceList] = useState<Workspace[]>([]);
  const [bookingAmenityList, setBookingAmenityList] = useState<BookingAmenityProps[]>([]);
  const [bookingBeverageList, setBookingBeverageList] = useState<BookingBeverageProps[]>([]);
  const { owner } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!owner) return;
    fetchCustomerList(owner.id, setCustomerList, setLoading);
    fetchAmenityList(owner.id, setAmenityList, setLoading);
    fetchBeverageList(owner.id, setBeverageList, setLoading);
    fetchBookingList(owner.id, setBookingList, setLoading);
    fetchWorkspaceList(owner.id, setWorkspaceList, setLoading);
    fetchBookingAmenityList(owner.id, setBookingAmenityList, setLoading);
    fetchBookingBeverageList(owner.id, setBookingBeverageList, setLoading);
  }, [owner]);

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  const currentMonthBookingList = bookingList.filter((booking) => {
    const bookingDate = new Date(booking.created_At);
    const currentDate = new Date();
    return (
      bookingDate.getMonth() === currentDate.getMonth() &&
      bookingDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const previousMonthBookingList = bookingList.filter((booking) => {
    const bookingDate = new Date(booking.created_At);
    const currentDate = new Date();
    return (
      bookingDate.getMonth() === currentDate.getMonth() - 1 &&
      bookingDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const currentRevenue = currentMonthBookingList.reduce((total, booking) => {
    return total + Number(booking.price);
  }, 0);

  const numberCurrentCustomer = currentMonthBookingList.reduce(
    (count, booking, index, array) => {
      if (index === 0 || array[index - 1].userId !== booking.userId) {
        return count + 1;
      }
      return count;
    },
    0
  );

  const previousRevenue = previousMonthBookingList.reduce((total, booking) => {
    return total + Number(booking.price);
  }, 0);

  const numberPreviousCustomer = previousMonthBookingList.reduce(
    (count, booking, index, array) => {
      if (index === 0 || array[index - 1].userId !== booking.userId) {
        return count + 1;
      }
      return count;
    },
    0
  );

  const percentRevenue =
    ((currentRevenue - previousRevenue) /
      (previousRevenue === 0 ? 1 : previousRevenue)) *
    100;

  const percentCustomer =
    ((numberCurrentCustomer - numberPreviousCustomer) /
      (numberPreviousCustomer === 0 ? 1 : numberPreviousCustomer)) *
    100;

  const date = new Date();
  const dateString = `Tháng ${date.getMonth() + 1}/${date.getFullYear()}`;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="col-span-2 rounded-xl bg-white grid gap-4 md:grid-cols-4 p-4">
          <div className="col-span-1 flex items-center justify-center bg-[#27D095] rounded-xl text-white">
            <PiggyBank size={36} />
          </div>
          <div className="col-span-2 flex flex-col items-start justify-start gap-2">
            <p className="font-bold">Doanh thu</p>
            <p className="text-[#6F757E] text-xl">
              {formatCurrency(currentRevenue)}
            </p>
            {percentRevenue >= 0 ? (
              <div className="flex gap-1 items-center justify-start text-green-500 text-sm">
                <TrendingUp />{" "}
                <span>{percentRevenue.toFixed(2)}% tháng trước</span>
              </div>
            ) : (
              <div className="flex gap-1 items-center justify-start text-red-500 text-sm">
                <TrendingDown />{" "}
                <span>{percentRevenue.toFixed(2)}% tháng trước</span>
              </div>
            )}
          </div>
          <div className="col-span-1 text-sm flex items-center justify-center text-[#6F757E] font-bold">
            <p>{dateString}</p>
          </div>
        </div>

        <div className="col-span-2 rounded-xl bg-white grid gap-4 md:grid-cols-4 p-4">
          <div className="col-span-1 flex items-center justify-center bg-[#67CADF] rounded-xl text-white">
            <UsersRound size={36} />
          </div>
          <div className="col-span-2 flex flex-col items-start justify-start gap-2">
            <p className="font-bold">Khách hàng</p>
            <p className="text-[#6F757E] text-xl">{customerList.length}</p>
            {percentCustomer >= 0 ? (
              <div className="flex gap-1 items-center justify-start text-green-500 text-sm">
                <TrendingUp />{" "}
                <span>{percentCustomer.toFixed(2)}% tháng trước</span>
              </div>
            ) : (
              <div className="flex gap-1 items-center justify-start text-red-500 text-sm">
                <TrendingDown />{" "}
                <span>{percentCustomer.toFixed(2)}% tháng trước</span>
              </div>
            )}
          </div>
          <div className="col-span-1 text-sm flex items-center justify-center text-[#6F757E] font-bold">
            <p>{dateString}</p>
          </div>
        </div>

        <div className="col-span-4 grid gap-4 md:grid-cols-3">
          <div className="col-span-1 rounded-xl bg-white grid gap-4 md:grid-cols-3 p-4 md:min-h-28">
            <div className="col-span-1 flex items-center justify-center bg-[#F54F5F] rounded-xl text-white">
              <Sofa size={36} />
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center gap-2">
              <p className="font-bold">Số lượng không gian</p>
              <p className="text-[#6F757E] text-xl">{workspaceList.length}</p>
            </div>
          </div>
          <div className="col-span-1 rounded-xl bg-white grid gap-4 md:grid-cols-3 p-4 md:min-h-28">
            <div className="col-span-1 flex items-center justify-center bg-[#fcba03] rounded-xl text-white">
              <Boxes size={36} />
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center gap-2">
              <p className="font-bold">Số lượng tiện ích</p>
              <p className="text-[#6F757E] text-xl">{amenityList.length}</p>
            </div>
          </div>
          <div className="col-span-1 rounded-xl bg-white grid gap-4 md:grid-cols-3 p-4 md:min-h-28">
            <div className="col-span-1 flex items-center justify-center bg-[#FF8E29] rounded-xl text-white">
              <UtensilsCrossed size={36} />
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center gap-2">
              <p className="font-bold">Số lượng món</p>
              <p className="text-[#6F757E] text-xl">{beverageList.length}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-2">
          <DashboardLineChart bookingList={bookingList} />
        </div>
        <div className="col-span-1">
          <CustomerAnalysisChart customerList={customerList} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-2 bg-white p-4 rounded-xl">
          <TopWorkspaceTable
            columns={topWorkspaceTableColumns}
            data={topWorkspace}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <NewCustomers />
          <HotAmenityChart bookingAmenityList={bookingAmenityList} />
          <HotBeverageChart bookingBeverageList={bookingBeverageList} />
        </div>
      </div>
    </div>
  );
}
