"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BookingAmenityProps } from "@/types";

export default function HotAmenityChart({
  bookingAmenityList,
}: {
  bookingAmenityList: BookingAmenityProps[];
}) {
  const chartData = React.useMemo(() => {
    if (!bookingAmenityList || bookingAmenityList.length === 0) return [];

    const colors = ["#67CADF", "#27D095", "#FF8E29", "#F54F5F"];

    const data = bookingAmenityList.slice(0, 4).map((item, index) => ({
      browser: item.amenityName,
      visitors: item.numberOfBooking,
      fill: colors[index] || "#ccc",
    }));

    if (bookingAmenityList.length > 4) {
      const otherVisitors = bookingAmenityList
        .slice(4)
        .reduce((sum, item) => sum + item.numberOfBooking, 0);
      data.push({
        browser: "Khác",
        visitors: otherVisitors,
        fill: "#fcba03",
      });
    }

    return data;
  }, [bookingAmenityList]);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  const chartConfig: ChartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      visitors: { label: "Lượt mua" },
    };

    chartData.forEach((item) => {
      config[item.browser] = { label: item.browser, color: item.fill };
    });

    return config;
  }, [chartData]);

  return (
    <Card className="flex flex-col h-full py-6">
      <CardHeader className="items-center mt-4">
        <CardTitle>Các tiện ích nổi bật</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Lượt mua
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="flex flex-col gap-4 items-start"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
