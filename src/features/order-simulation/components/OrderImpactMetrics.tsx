"use client";

import { OrderbookData, SimulatedOrder } from "../../orderbook/types/orderbook";
import { AlertTriangle, TrendingUp, Clock, DollarSign } from "lucide-react";

interface OrderImpactMetricsProps {
  simulatedOrder: SimulatedOrder;
  orderbookData: OrderbookData;
}

export default function OrderImpactMetrics({
  simulatedOrder,
  orderbookData,
}: OrderImpactMetricsProps) {
  const calculateImpactMetrics = () => {
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

  const metrics = calculateImpactMetrics();
  const isHighImpact = metrics.marketImpact > 3 || metrics.slippage > 1;

  return (
    <div className="bg-bg-primary rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Order Impact Analysis</h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-bg-secondary rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-text-tertiary">Fill %</span>
          </div>
          <div className="text-xl font-semibold text-primary">
            {metrics.estimatedFillPercentage.toFixed(1)}%
          </div>
        </div>

        <div className="bg-bg-secondary rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="text-sm text-text-tertiary">Impact</span>
          </div>
          <div className="text-xl font-semibold text-warning">
            {metrics.marketImpact} levels
          </div>
        </div>

        <div className="bg-bg-secondary rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-error" />
            <span className="text-sm text-text-tertiary">Slippage</span>
          </div>
          <div className="text-xl font-semibold text-error">
            {metrics.slippage.toFixed(3)}%
          </div>
        </div>

        <div className="bg-bg-secondary rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-success" />
            <span className="text-sm text-text-tertiary">Time</span>
          </div>
          <div className="text-xl font-semibold text-success">
            {metrics.timeToFill}s
          </div>
        </div>
      </div>

      {/* Warnings */}
      {isHighImpact && (
        <div className="bg-error/20 border border-error/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-error" />
            <span className="text-error font-medium">High Impact Warning</span>
          </div>
          <div className="text-sm text-error-light">
            {metrics.marketImpact > 3 &&
              `This order will impact ${metrics.marketImpact} price levels. `}
            {metrics.slippage > 1 &&
              `Expected slippage of ${metrics.slippage.toFixed(3)}%. `}
            Consider reducing order size or using limit orders.
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div className="mt-4 p-3 bg-primary/20 border border-primary/30 rounded-lg">
        <h4 className="text-primary font-medium mb-2">Order Summary</h4>
        <div className="text-sm text-text-secondary space-y-1">
          <div>
            Type: {simulatedOrder.type.toUpperCase()}{" "}
            {simulatedOrder.side.toUpperCase()}
          </div>
          <div>
            Quantity: {simulatedOrder.quantity} {orderbookData.symbol}
          </div>
          {simulatedOrder.price && <div>Price: ${simulatedOrder.price}</div>}
          <div>Timing: {simulatedOrder.timing}</div>
        </div>
      </div>
    </div>
  );
}
