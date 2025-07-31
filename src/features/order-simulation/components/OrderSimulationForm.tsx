"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SimulatedOrder, Venue } from "../../orderbook/types/orderbook";
import { Play, Settings } from "lucide-react";
import {
  OrderSimulationFormProps,
  OrderFormData,
} from "../types/orderSimulation";

const orderFormSchema = z.object({
  venue: z.enum(["OKX", "Bybit", "Deribit"]),
  symbol: z.string().min(1, "Symbol is required"),
  orderType: z.enum(["market", "limit"]),
  side: z.enum(["buy", "sell"]),
  price: z.number().optional(),
  quantity: z.number().positive("Quantity must be positive"),
  timing: z.enum(["immediate", "5s", "10s", "30s"]),
});

export default function OrderSimulationForm({
  selectedVenue,
  onVenueChange,
  onOrderSimulate,
}: OrderSimulationFormProps) {
  const [isSimulating, setIsSimulating] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      venue: selectedVenue,
      symbol: "BTC-USD",
      orderType: "limit",
      side: "buy",
      quantity: 1,
      timing: "immediate",
    },
  });

  const orderType = watch("orderType");

  const onSubmit = async (data: OrderFormData) => {
    setIsSimulating(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const simulatedOrder: SimulatedOrder = {
      venue: data.venue,
      symbol: data.symbol,
      side: data.side,
      type: data.orderType,
      price: data.price,
      quantity: data.quantity,
      timing: data.timing,
      estimatedFillPercentage: data.orderType === "market" ? 100 : 85,
      marketImpact: Math.floor(Math.random() * 5) + 1,
      slippage: data.orderType === "market" ? Math.random() * 2 : 0,
      timeToFill:
        data.timing === "immediate"
          ? 0
          : data.timing === "5s"
          ? 5
          : data.timing === "10s"
          ? 10
          : 30,
    };

    onOrderSimulate(simulatedOrder);
    setIsSimulating(false);
  };

  const handleClear = () => {
    onOrderSimulate(null);
    reset();
  };

  return (
    <div className="bg-bg-primary rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Order Simulation</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Venue Selector */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Venue
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["OKX", "Bybit", "Deribit"] as Venue[]).map((venue) => (
              <button
                key={venue}
                type="button"
                onClick={() => onVenueChange(venue)}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  selectedVenue === venue
                    ? "bg-primary text-text-primary"
                    : "bg-bg-secondary text-text-secondary hover:bg-bg-tertiary"
                }`}
              >
                {venue}
              </button>
            ))}
          </div>
        </div>

        {/* Symbol Input */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Symbol
          </label>
          <input
            type="text"
            {...register("symbol")}
            className="w-full px-3 py-2 bg-bg-secondary border border-border-primary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., BTC-USD"
          />
          {errors.symbol && (
            <p className="text-error text-sm mt-1">{errors.symbol.message}</p>
          )}
        </div>

        {/* Order Type and Side */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Order Type
            </label>
            <select
              {...register("orderType")}
              className="w-full px-3 py-2 bg-bg-secondary border border-border-primary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="limit">Limit</option>
              <option value="market">Market</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Side
            </label>
            <select
              {...register("side")}
              className="w-full px-3 py-2 bg-bg-secondary border border-border-primary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>
        </div>

        {/* Price Input (for limit orders) */}
        {orderType === "limit" && (
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className="w-full px-3 py-2 bg-bg-secondary border border-border-primary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-error text-sm mt-1">{errors.price.message}</p>
            )}
          </div>
        )}

        {/* Quantity Input */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Quantity
          </label>
          <input
            type="number"
            step="0.01"
            {...register("quantity", { valueAsNumber: true })}
            className="w-full px-3 py-2 bg-bg-secondary border border-border-primary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter quantity"
          />
          {errors.quantity && (
            <p className="text-error text-sm mt-1">{errors.quantity.message}</p>
          )}
        </div>

        {/* Timing Controls */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Timing
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(["immediate", "5s", "10s", "30s"] as const).map((timing) => (
              <label key={timing} className="flex items-center">
                <input
                  type="radio"
                  value={timing}
                  {...register("timing")}
                  className="mr-2 text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">
                  {timing === "immediate" ? "Immediate" : timing}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={!isValid || isSimulating}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-text-primary rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Play className="w-4 h-4" />
            {isSimulating ? "Simulating..." : "Simulate Order"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-bg-tertiary text-text-primary rounded-lg font-medium hover:bg-bg-secondary transition-colors"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Form Validation Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="mt-4 p-3 bg-error/20 border border-error/50 rounded-lg">
          <h4 className="text-error font-medium mb-2">
            Please fix the following errors:
          </h4>
          <ul className="text-sm text-error-light space-y-1">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>• {error?.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
