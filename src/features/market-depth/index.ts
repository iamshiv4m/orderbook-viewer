// Market Depth Feature Slice
// This feature handles market depth visualization and charting

// Components
export { default as MarketDepthChart } from "./components/MarketDepthChart";
export { default as MarketDepthChartSkeleton } from "./components/MarketDepthChartSkeleton";
export { MarketDepthTooltip } from "./components/MarketDepthTooltip";

// Utils
export { prepareDepthData } from "./utils/depthDataUtils";

// Types
export type {
  DepthDataPoint,
  MarketDepthTooltipProps,
  MarketDepthChartProps,
} from "./types/marketDepth";

// Types (re-exported from orderbook feature)
export type { OrderLevel, OrderbookData } from "../orderbook/types/orderbook";
