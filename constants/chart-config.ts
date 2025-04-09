import { BookingListProps, RevenuePerDay, RevenuePerMonth } from "@/types";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isoWeek from "dayjs/plugin/isoWeek";
import "dayjs/locale/vi";

dayjs.locale("vi");
dayjs.extend(isBetween);
dayjs.extend(isoWeek);

export function getRevenuePerDay(
  bookings: BookingListProps[]
): RevenuePerDay[] {
  const now = dayjs();
  const isMonday = now.isoWeekday() === 1;

  // Start of current or next week depending on today
  const weekStart = isMonday
    ? now.add(7, "day").startOf("isoWeek")
    : now.startOf("isoWeek");
  const weekEnd = weekStart.add(6, "day");

  // Prepare the result array for each day of the week
  const result: RevenuePerDay[] = Array.from({ length: 7 }, (_, i) => {
    const date = weekStart.add(i, "day");
    return {
      day: date.format("dd"),
      date: date.format("YYYY-MM-DD"), // for exact matching
      revenue: 0,
    };
  });

  // Filter successful bookings within the selected week
  const successfulBookings = bookings.filter((b) => {
    if (b.status !== "Success") return false;
    const bookingDate = dayjs(b.created_At);
    return bookingDate.isBetween(
      weekStart.subtract(1, "second"),
      weekEnd.add(1, "second"),
      null,
      "[]"
    );
  });

  // Sum revenue for each day
  successfulBookings.forEach((booking) => {
    const bookingDate = dayjs(booking.created_At).format("YYYY-MM-DD");
    const day = result.find((d) => d.date === bookingDate);
    if (day) {
      day.revenue += Number(booking.price);
    }
  });

  return result;
}

export function getRevenuePerMonth(
  bookings: BookingListProps[]
): RevenuePerMonth[] {
  const successfulBookings = bookings.filter((b) => b.status === "Success");

  const revenueMap: Record<string, number> = {};

  successfulBookings.forEach((booking) => {
    const month = dayjs(booking.created_At).format("MM/YYYY");

    if (!revenueMap[month]) {
      revenueMap[month] = 0;
    }

    revenueMap[month] += Number(booking.price);
  });

  const result: RevenuePerMonth[] = Object.entries(revenueMap).map(
    ([month, revenue]) => ({
      month,
      revenue,
    })
  );

  // Sort by month (chronologically)
  result.sort((a, b) =>
    dayjs(a.month, "MM/YYYY").diff(dayjs(b.month, "MM/YYYY"))
  );

  return result;
}
