"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DataPoint = {
  month: string;
  value: number;
};

type StatisticsChartProps = {
  title: string;
  data: DataPoint[];
  tabs: string[];
  containerClassName?: string;
};

type CustomDotProps = {
  cx?: number;
  cy?: number;
};

const CustomDot: React.FC<CustomDotProps> = ({ cx = 0, cy = 0 }) => {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="white"
      stroke="#2DD4BF"
      strokeWidth={2}
    />
  );
};

const StatisticsChart: React.FC<StatisticsChartProps> = ({
  title,
  data,
  tabs,
  containerClassName,
}) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  return (
    <Card className="bg-background p-0 border-none">
      <div className="flex justify-between items-center mb-6 px-5 mt-4">
        <h2 className="text-zinc-100 text-sm font-medium">{title}</h2>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              size="sm"
              className={`text-xs ${
                activeTab === tab
                  ? "text-teal-500 hover:text-teal-400"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      <div className={cn("h-[300px] w-full", containerClassName)}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              stroke="#333"
              strokeDasharray="none"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666", fontSize: 12 }}
              tickFormatter={(value: number) => `${value / 1000}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #333",
                borderRadius: "6px",
              }}
              itemStyle={{ color: "#fff" }}
              labelStyle={{ color: "#666" }}
              formatter={(value: number) => [
                `${value.toLocaleString()}`,
                "Value",
              ]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2DD4BF"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={{ r: 6, fill: "#2DD4BF" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default StatisticsChart;
