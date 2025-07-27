"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MarketDepthTooltip } from "./MarketDepthTooltip";
import { prepareDepthData } from "../utils/depthDataUtils";
import { MarketDepthChartProps } from "../types/marketDepth";

export default function MarketDepthChart({
  orderbookData,
}: MarketDepthChartProps) {
  const depthData = prepareDepthData(orderbookData);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={depthData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border-secondary)"
          />
          <XAxis
            dataKey="price"
            stroke="var(--color-text-secondary)"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <YAxis
            stroke="#9CA3AF"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <Tooltip content={<MarketDepthTooltip />} />
          <Area
            type="monotone"
            dataKey="cumulative"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
