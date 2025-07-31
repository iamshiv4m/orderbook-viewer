import { OrderbookData, SimulatedOrder } from "../../orderbook/types/orderbook";
import { ImpactMetrics } from "../types/orderSimulation";

/**
 * Calculates order impact metrics based on simulated order and orderbook data
 * @param simulatedOrder - The simulated order data
 * @param orderbookData - The current orderbook data
 * @returns Calculated impact metrics
 */
export const calculateImpactMetrics = (
  simulatedOrder: SimulatedOrder,
  orderbookData: OrderbookData
): ImpactMetrics => {
  const { side, quantity, price, type } = simulatedOrder;

  if (type === "market") {
    // For market orders, calculate slippage and fill percentage
    let totalCost = 0;
    let remainingQuantity = quantity;
    let levelsUsed = 0;

    const levels = side === "buy" ? orderbookData.asks : orderbookData.bids;

    for (const level of levels) {
      if (remainingQuantity <= 0) break;

      const fillQuantity = Math.min(remainingQuantity, level.size);
      totalCost += fillQuantity * level.price;
      remainingQuantity -= fillQuantity;
      levelsUsed++;
    }

    const avgPrice = totalCost / (quantity - remainingQuantity);
    const slippage =
      side === "buy"
        ? ((avgPrice - orderbookData.asks[0].price) /
            orderbookData.asks[0].price) *
          100
        : ((orderbookData.bids[0].price - avgPrice) /
            orderbookData.bids[0].price) *
          100;

    return {
      estimatedFillPercentage:
        ((quantity - remainingQuantity) / quantity) * 100,
      marketImpact: levelsUsed,
      slippage: Math.max(0, slippage),
      timeToFill:
        simulatedOrder.timing === "immediate"
          ? 0
          : simulatedOrder.timing === "5s"
          ? 5
          : simulatedOrder.timing === "10s"
          ? 10
          : 30,
    };
  } else {
    // For limit orders
    const bestPrice =
      side === "buy"
        ? orderbookData.asks[0].price
        : orderbookData.bids[0].price;
    const orderPrice = price || 0;

    let estimatedFillPercentage = 0;
    let marketImpact = 0;

    if (side === "buy" && orderPrice >= bestPrice) {
      // Marketable limit order
      estimatedFillPercentage = 100;
      marketImpact = 1;
    } else if (side === "sell" && orderPrice <= bestPrice) {
      // Marketable limit order
      estimatedFillPercentage = 100;
      marketImpact = 1;
    } else {
      // Non-marketable limit order
      estimatedFillPercentage = 0;
      marketImpact = 0;
    }

    return {
      estimatedFillPercentage,
      marketImpact,
      slippage: 0,
      timeToFill:
        simulatedOrder.timing === "immediate"
          ? 0
          : simulatedOrder.timing === "5s"
          ? 5
          : simulatedOrder.timing === "10s"
          ? 10
          : 30,
    };
  }
};
