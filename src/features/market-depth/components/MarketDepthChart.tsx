"use client";

import { OrderbookData } from "../../orderbook/types/orderbook";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MarketDepthChartProps {
  orderbookData: OrderbookData;
}

export default function MarketDepthChart({
  orderbookData,
}: MarketDepthChartProps) {
  // Prepare data for the depth chart
  const prepareDepthData = () => {
    const asks = orderbookData.asks
      .slice(0, 20)
      .reverse()
      .map((ask, index) => ({
        price: ask.price,
        size: ask.total,
        side: "ask",
        cumulative: orderbookData.asks
          .slice(0, 20 - index)
          .reduce((sum, level) => sum + level.total, 0),
      }));

    const bids = orderbookData.bids.slice(0, 20).map((bid, index) => ({
      price: bid.price,
      size: bid.total,
      side: "bid",
      cumulative: orderbookData.bids
        .slice(0, index + 1)
        .reduce((sum, level) => sum + level.total, 0),
    }));

    return [...asks, ...bids].sort((a, b) => a.price - b.price);
  };

  const depthData = prepareDepthData();

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; payload: { side: string } }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bg-overlay border border-border-secondary rounded-lg p-3">
          <p className="text-text-primary font-medium">Price: ${label}</p>
          <p className="text-text-secondary">
            Cumulative Size: {payload[0].value.toFixed(4)}
          </p>
          <p className="text-text-secondary">
            Side: {payload[0].payload.side === "ask" ? "Ask" : "Bid"}
          </p>
        </div>
      );
    }
    return null;
  };

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
          <Tooltip content={<CustomTooltip />} />
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
