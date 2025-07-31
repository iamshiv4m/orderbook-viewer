"use client";

import { OrderbookData, SimulatedOrder } from "../types/orderbook";
import {
  formatPrice,
  formatSize,
  formatTotal,
} from "../../../shared/utils/formatters";
import { isSimulatedOrderLevel } from "../utils/orderbookUtils";

interface OrderbookTableProps {
  orderbookData: OrderbookData;
  simulatedOrder: SimulatedOrder | null;
}

export default function OrderbookTable({
  orderbookData,
  simulatedOrder,
}: OrderbookTableProps) {
  return (
    <div className="bg-bg-primary rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Orderbook Levels</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Asks (Sell Orders) */}
        <div>
          <h4 className="text-sell font-medium mb-2">Asks (Sell)</h4>
          <div className="space-y-1">
            {orderbookData.asks.slice(0, 15).map((ask, index) => (
              <div
                key={`ask-${index}`}
                className={`flex justify-between text-sm p-1 rounded ${
                  isSimulatedOrderLevel(ask.price, "ask", simulatedOrder)
                    ? "bg-warning/20 border border-warning/50"
                    : "hover:bg-bg-secondary/50"
                }`}
              >
                <span className="text-sell">{formatPrice(ask.price)}</span>
                <span className="text-text-secondary">
                  {formatSize(ask.size)}
                </span>
                <span className="text-text-tertiary">
                  {formatTotal(ask.total)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bids (Buy Orders) */}
        <div>
          <h4 className="text-buy font-medium mb-2">Bids (Buy)</h4>
          <div className="space-y-1">
            {orderbookData.bids.slice(0, 15).map((bid, index) => (
              <div
                key={`bid-${index}`}
                className={`flex justify-between text-sm p-1 rounded ${
                  isSimulatedOrderLevel(bid.price, "bid", simulatedOrder)
                    ? "bg-warning/20 border border-warning/50"
                    : "hover:bg-bg-secondary/50"
                }`}
              >
                <span className="text-buy">{formatPrice(bid.price)}</span>
                <span className="text-text-secondary">
                  {formatSize(bid.size)}
                </span>
                <span className="text-text-tertiary">
                  {formatTotal(bid.total)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simulated Order Indicator */}
      {simulatedOrder && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-warning font-medium">Simulated Order</span>
          </div>
          <div className="text-sm text-text-secondary">
            <span className="capitalize">{simulatedOrder.side}</span>{" "}
            {simulatedOrder.quantity} {orderbookData.symbol}
            {simulatedOrder.type === "limit" && ` @ $${simulatedOrder.price}`}
          </div>
        </div>
      )}
    </div>
  );
}
