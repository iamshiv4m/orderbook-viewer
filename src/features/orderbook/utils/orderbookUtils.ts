import { SimulatedOrder } from "../types/orderbook";

/**
 * Checks if a price level matches the simulated order price
 * @param price - The price level to check
 * @param side - The side of the orderbook (bid/ask)
 * @param simulatedOrder - The simulated order data
 * @returns True if the price level matches the simulated order
 */
export const isSimulatedOrderLevel = (
  price: number,
  side: "bid" | "ask",
  simulatedOrder: SimulatedOrder | null
): boolean => {
  if (!simulatedOrder) return false;

  if (simulatedOrder.type === "market") return false;

  if (side === "bid" && simulatedOrder.side === "buy") {
    return Math.abs(price - (simulatedOrder.price || 0)) < 0.01;
  }

  if (side === "ask" && simulatedOrder.side === "sell") {
    return Math.abs(price - (simulatedOrder.price || 0)) < 0.01;
  }

  return false;
};
