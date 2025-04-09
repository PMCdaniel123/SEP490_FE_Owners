import { getRevenuePerDay } from "@/constants/chart-config";
import { BookingListProps } from "@/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Separator } from "../ui/separator";

interface Props {
  bookings: BookingListProps[];
}

const RevenueChart: React.FC<Props> = ({ bookings }) => {
  const data = getRevenuePerDay(bookings);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold mt-4">Doanh thu theo ngày</h1>
      <Separator className="mb-8" />
      {bookings.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Trống
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tickMargin={10} tick={{ fontSize: 10 }} />
            <YAxis
              tick={{ fontSize: 10 }}
              tickMargin={8}
              tickFormatter={(value) =>
                new Intl.NumberFormat("vi-VN").format(value) + " ₫"
              }
            />
            <Tooltip
              formatter={(value: number) =>
                new Intl.NumberFormat("vi-VN").format(value) + " ₫"
              }
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#27D095"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default RevenueChart;
