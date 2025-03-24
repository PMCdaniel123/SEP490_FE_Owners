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
import { CustomerProps } from "@/types";

const chartConfig = {
  visitors: {
    label: "Phân tích người dùng",
  },
  male: {
    label: "Nam",
    color: "#27D095",
  },
  female: {
    label: "Nữ",
    color: "#FF8E29",
  },
  other: {
    label: "Khác",
    color: "#F54F5F",
  },
} satisfies ChartConfig;

export default function CustomerAnalysisChart({
  customerList,
}: {
  customerList?: CustomerProps[];
}) {
  const safeCustomerList = customerList ?? [];

  const maleCustomer = safeCustomerList.filter(
    (customer) => customer.sex === "Nam"
  );
  const femaleCustomer = safeCustomerList.filter(
    (customer) => customer.sex === "Nữ"
  );
  const otherCustomer = safeCustomerList.filter(
    (customer) => customer.sex === "Khác"
  );

  const chartData = React.useMemo(
    () => [
      {
        browser: "male",
        visitors: maleCustomer.length,
        fill: "var(--color-male)",
      },
      {
        browser: "female",
        visitors: femaleCustomer.length,
        fill: "var(--color-female)",
      },
      {
        browser: "other",
        visitors: otherCustomer.length,
        fill: "var(--color-other)",
      },
    ],
    [maleCustomer.length, femaleCustomer.length, otherCustomer.length]
  );

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col h-full py-6">
      <CardHeader>
        <CardTitle className="mt-4 font-bold">Số lượng khách hàng</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {safeCustomerList.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Trống
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square"
          >
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
                            Khách hàng
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="browser" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
