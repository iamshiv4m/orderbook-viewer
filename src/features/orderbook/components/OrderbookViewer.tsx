"use client";

import { useState } from "react";
import { Venue, SimulatedOrder } from "../types/orderbook";
import { useOrderbookData } from "../hooks/useOrderbookData";
import OrderbookTable from "./OrderbookTable";
import MarketDepthChart from "../../market-depth/components/MarketDepthChart";
import OrderImpactMetrics from "../../order-simulation/components/OrderImpactMetrics";
import OrderbookViewerSkeleton from "./OrderbookViewerSkeleton";

interface OrderbookViewerProps {
  venue: Venue;
  simulatedOrder: SimulatedOrder | null;
}

export default function OrderbookViewer({
  venue,
  simulatedOrder,
}: OrderbookViewerProps) {
  const [selectedSymbol, setSelectedSymbol] = useState("BTC-USD");
  const { orderbookData, loading, error } = useOrderbookData(
    venue,
    selectedSymbol
  );

  const symbols = ["BTC-USD", "ETH-USD", "SOL-USD", "ADA-USD"];

  if (loading) {
    return <OrderbookViewerSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-error/20 border border-error rounded-lg p-6">
        <h3 className="text-error font-semibold mb-2">
          Error Loading Orderbook
        </h3>
        <p className="text-error-light text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with symbol selector */}
      <div className="bg-bg-primary rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{venue} Orderbook</h2>
          <div className="flex space-x-2">
            {symbols.map((symbol) => (
              <button
                key={symbol}
                onClick={() => setSelectedSymbol(symbol)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedSymbol === symbol
                    ? "bg-primary text-text-primary"
                    : "bg-bg-secondary text-text-secondary hover:bg-bg-tertiary"
                }`}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>

        {orderbookData && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-tertiary">Spread: </span>
              <span className="text-buy">
                ${orderbookData.spread.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-text-tertiary">Spread %: </span>
              <span className="text-buy">
                {orderbookData.spreadPercentage.toFixed(3)}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Orderbook Table */}
      {orderbookData && (
        <OrderbookTable
          orderbookData={orderbookData}
          simulatedOrder={simulatedOrder}
        />
      )}

      {/* Market Depth Chart */}
      {orderbookData && (
        <div className="bg-bg-primary rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Market Depth</h3>
          <MarketDepthChart orderbookData={orderbookData} />
        </div>
      )}

      {/* Order Impact Metrics */}
      {simulatedOrder && orderbookData && (
        <OrderImpactMetrics
          simulatedOrder={simulatedOrder}
          orderbookData={orderbookData}
        />
      )}
    </div>
  );
}
