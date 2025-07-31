"use client";

import { AlertTriangle, TrendingUp, Clock, DollarSign } from "lucide-react";
import { OrderImpactMetricsProps } from "../types/orderSimulation";
import { calculateImpactMetrics } from "../utils/impactCalculationUtils";

export default function OrderImpactMetrics({
  simulatedOrder,
  orderbookData,
}: OrderImpactMetricsProps) {
  const metrics = calculateImpactMetrics(simulatedOrder, orderbookData);
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
