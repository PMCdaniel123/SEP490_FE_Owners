"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BookingProps } from "@/types";
import dayjs from "dayjs";

const chartConfig = {
  revenue: {
    label: "Doanh thu",
    color: "#27D095",
  },
  other: {
    label: "Doanh thu",
    color: "#F54F5F",
  },
} satisfies ChartConfig;

export default function DashboardLineChart({
  bookingList,
}: {
  bookingList: BookingProps[];
}) {
  const totalPriceByMonth = bookingList.reduce(
    (acc: { [key: string]: number }, booking) => {
      const month = dayjs(booking.created_At).format("MM/YYYY");
      acc[month] = (acc[month] || 0) + Number(booking.price);
      return acc;
    },
    {}
  );

  const chartData = Object.keys(totalPriceByMonth).map((month) => ({
    month,
    revenue: totalPriceByMonth[month],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="mt-4 font-bold">Doanh thu năm 2025</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 40,
              right: 40,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              tickFormatter={(value) => value.slice(0, 7)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="revenue"
              type="natural"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-revenue)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
