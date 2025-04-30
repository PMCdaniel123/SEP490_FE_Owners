"use client";

import TopWorkspaceTable from "@/components/table/top-workspace-table";
import { topWorkspaceTableColumns } from "@/constants/table-columns";
import {
  Boxes,
  Minus,
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
  BookingListProps,
  CustomerProps,
  formatCurrency,
  TopRevenueWorkspace,
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
  fetchTopWorkspaceList,
  fetchWorkspaceList,
} from "@/features";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import HotAmenityChart from "@/components/charts/hot-amenity-chart";
import HotBeverageChart from "@/components/charts/hot-beverage-chart";
import RevenueChart from "@/components/charts/revenue-chart";
import RevenueByMonthChart from "@/components/charts/line-chart";

export default function OwnerPage() {
  const [loading, setLoading] = useState(true);
  const [customerList, setCustomerList] = useState<CustomerProps[]>([]);
  const [amenityList, setAmenityList] = useState<AmenityProps[]>([]);
  const [beverageList, setBeverageList] = useState<BeverageProps[]>([]);
  const [bookingList, setBookingList] = useState<BookingListProps[]>([]);
  const [workspaceList, setWorkspaceList] = useState<Workspace[]>([]);
  const [bookingAmenityList, setBookingAmenityList] = useState<
    BookingAmenityProps[]
  >([]);
  const [bookingBeverageList, setBookingBeverageList] = useState<
    BookingBeverageProps[]
  >([]);
  const [topWorkspaceList, setTopWorkspaceList] = useState<
    TopRevenueWorkspace[]
  >([]);
  const { owner } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!owner) return;

    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchCustomerList(owner.id, setCustomerList),
        fetchAmenityList(owner.id, setAmenityList),
        fetchBeverageList(owner.id, setBeverageList),
        fetchBookingList(owner.id, setBookingList),
        fetchWorkspaceList(owner.id, setWorkspaceList),
        fetchBookingAmenityList(owner.id, setBookingAmenityList),
        fetchBookingBeverageList(owner.id, setBookingBeverageList),
        fetchTopWorkspaceList(owner.id, setTopWorkspaceList),
      ]);
      setLoading(false);
    };

    loadData();
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

  const totalRevenue = bookingList.reduce((total, booking) => {
    return total + Number(booking.price);
  }, 0);

  const currentRevenue = currentMonthBookingList.reduce((total, booking) => {
    return total + Number(booking.price);
  }, 0);

  const currentUserIds: Record<string, boolean> = {};
  const previousUserIds: Record<string, boolean> = {};
  let numberCurrentCustomer = 0;
  let numberPreviousCustomer = 0;

  for (const booking of currentMonthBookingList) {
    if (!currentUserIds[booking.userId]) {
      currentUserIds[booking.userId] = true;
      numberCurrentCustomer++;
    }
  }

  const previousRevenue = previousMonthBookingList.reduce((total, booking) => {
    return total + Number(booking.price);
  }, 0);

  for (const booking of previousMonthBookingList) {
    if (!previousUserIds[booking.userId]) {
      previousUserIds[booking.userId] = true;
      numberPreviousCustomer++;
    }
  }

  const percentRevenue =
    (previousRevenue > 0
      ? (currentRevenue - previousRevenue) /
        (previousRevenue === 0 ? 1 : previousRevenue)
      : 1) * 100;

  const percentCustomer =
    (numberPreviousCustomer > 0
      ? (numberCurrentCustomer - numberPreviousCustomer) /
        (numberPreviousCustomer === 0 ? 1 : numberPreviousCustomer)
      : 1) * 100;

  const date = new Date();
  const dateString = `Tháng ${date.getMonth() + 1}/${date.getFullYear()}`;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="col-span-2 rounded-md bg-white grid gap-4 md:grid-cols-4 p-4">
          <div className="col-span-1 flex items-center justify-center bg-[#27D095] rounded-md text-white">
            <PiggyBank size={36} />
          </div>
          <div className="col-span-2 flex flex-col items-start justify-start gap-2">
            <p className="font-bold">Doanh thu</p>
            <p className="text-[#6F757E] text-xl flex items-end gap-2">
              <span>{formatCurrency(currentRevenue ?? 0)}</span> |
              <span className="text-sm">
                Tổng: {formatCurrency(totalRevenue ?? 0)}
              </span>
            </p>
            {percentRevenue === 0 ? (
              <div className="flex gap-1 items-center justify-start text-yellow-500 text-sm">
                <Minus />{" "}
                <span>
                  {percentRevenue?.toFixed(2) ?? "Trống"}% tháng trước
                </span>
              </div>
            ) : percentRevenue >= 0 ? (
              <div className="flex gap-1 items-center justify-start text-green-500 text-sm">
                <TrendingUp />{" "}
                <span>
                  {percentRevenue?.toFixed(2) ?? "Trống"}% tháng trước
                </span>
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

        <div className="col-span-2 rounded-md bg-white grid gap-4 md:grid-cols-4 p-4">
          <div className="col-span-1 flex items-center justify-center bg-[#67CADF] rounded-md text-white">
            <UsersRound size={36} />
          </div>
          <div className="col-span-2 flex flex-col items-start justify-start gap-2">
            <p className="font-bold">Khách hàng</p>
            <p className="text-[#6F757E] text-xl">
              <span>{numberCurrentCustomer ?? "0"} người</span> |{" "}
              <span className="text-sm">
                Tổng: {customerList.length ?? "0"} người
              </span>
            </p>
            {percentCustomer === 0 ? (
              <div className="flex gap-1 items-center justify-start text-yellow-500 text-sm">
                <Minus /> <span>{percentCustomer.toFixed(2)}% tháng trước</span>
              </div>
            ) : percentCustomer > 0 ? (
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
          <div className="col-span-1 rounded-md bg-white grid gap-4 md:grid-cols-3 p-4 md:min-h-28">
            <div className="col-span-1 flex items-center justify-center bg-[#F54F5F] rounded-md text-white">
              <Sofa size={36} />
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center gap-2">
              <p className="font-bold">Số lượng không gian</p>
              <p className="text-[#6F757E] text-xl">
                {workspaceList?.length ?? "0"}
              </p>
            </div>
          </div>
          <div className="col-span-1 rounded-md bg-white grid gap-4 md:grid-cols-3 p-4 md:min-h-28">
            <div className="col-span-1 flex items-center justify-center bg-[#fcba03] rounded-md text-white">
              <Boxes size={36} />
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center gap-2">
              <p className="font-bold">Số lượng tiện ích</p>
              <p className="text-[#6F757E] text-xl">
                {amenityList?.length ?? "0"}
              </p>
            </div>
          </div>
          <div className="col-span-1 rounded-md bg-white grid gap-4 md:grid-cols-3 p-4 md:min-h-28">
            <div className="col-span-1 flex items-center justify-center bg-[#FF8E29] rounded-md text-white">
              <UtensilsCrossed size={36} />
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center gap-2">
              <p className="font-bold">Số lượng món</p>
              <p className="text-[#6F757E] text-xl">
                {beverageList?.length ?? "0"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="col-span-2 h-full bg-white p-4 rounded-md">
          <RevenueByMonthChart bookings={bookingList} />
        </div>
        <div className="col-span-1 h-full">
          <CustomerAnalysisChart customerList={customerList} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3 relative">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-md h-full">
            <TopWorkspaceTable
              columns={topWorkspaceTableColumns}
              data={topWorkspaceList}
            />
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <HotAmenityChart bookingAmenityList={bookingAmenityList} />
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-md h-full">
            <RevenueChart bookings={bookingList} />
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <HotBeverageChart bookingBeverageList={bookingBeverageList} />
        </div>
      </div>
    </div>
  );
}
