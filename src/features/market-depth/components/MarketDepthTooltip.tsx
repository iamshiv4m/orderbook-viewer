import React from "react";
import { MarketDepthTooltipProps } from "../types/marketDepth";

export const MarketDepthTooltip: React.FC<MarketDepthTooltipProps> = ({
  active,
  payload,
  label,
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
