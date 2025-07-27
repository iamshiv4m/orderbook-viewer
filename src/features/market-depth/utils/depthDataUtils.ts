import { OrderbookData } from "../../orderbook/types/orderbook";
import { DepthDataPoint } from "../types/marketDepth";

/**
 * Prepares orderbook data for market depth chart visualization
 * @param orderbookData - The raw orderbook data
 * @param levels - Number of levels to include (default: 20)
 * @returns Array of data points for the depth chart
 */
export const prepareDepthData = (
  orderbookData: OrderbookData,
  levels: number = 20
): DepthDataPoint[] => {
  const asks = orderbookData?.asks
    ?.slice(0, levels)
    ?.reverse()
    ?.map((ask, index) => ({
      price: ask.price,
      size: ask.total,
      side: "ask",
      cumulative: orderbookData?.asks
        ?.slice(0, levels - index)
        ?.reduce((sum, level) => sum + level.total, 0),
    }));

  const bids = orderbookData?.bids?.slice(0, levels)?.map((bid, index) => ({
    price: bid.price,
    size: bid.total,
    side: "bid",
    cumulative: orderbookData?.bids
      ?.slice(0, index + 1)
      ?.reduce((sum, level) => sum + level.total, 0),
  }));

  return [...asks, ...bids]?.sort((a, b) => a.price - b.price);
};
