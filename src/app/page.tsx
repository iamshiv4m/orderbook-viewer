"use client";

import { useState, useEffect } from "react";
import { OrderbookViewer, OrderbookViewerSkeleton } from "@/features/orderbook";
import {
  OrderSimulationForm,
  OrderSimulationFormSkeleton,
} from "@/features/order-simulation";
import { ErrorBoundary } from "@/shared";
import { Venue, SimulatedOrder } from "@/features/orderbook";

export default function Home() {
  const [selectedVenue, setSelectedVenue] = useState<Venue>("OKX");
  const [simulatedOrder, setSimulatedOrder] = useState<SimulatedOrder | null>(
    null
  );
  const [isInitializing, setIsInitializing] = useState(true);

  // Simulate initial app loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1500); // Show skeleton for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isInitializing) {
    return (
      <main className="min-h-screen bg-bg-overlay text-text-primary">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-center mb-2">
              Real-Time Orderbook Viewer
            </h1>
            <p className="text-text-tertiary text-center">
              Multi-venue orderbook viewer with order simulation capabilities
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Simulation Form Skeleton */}
            <div className="lg:col-span-1">
              <ErrorBoundary>
                <OrderSimulationFormSkeleton />
              </ErrorBoundary>
            </div>

            {/* Orderbook Viewer Skeleton */}
            <div className="lg:col-span-2">
              <ErrorBoundary>
                <OrderbookViewerSkeleton />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-overlay text-text-primary">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">
            Real-Time Orderbook Viewer
          </h1>
          <p className="text-text-tertiary text-center">
            Multi-venue orderbook viewer with order simulation capabilities
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Simulation Form */}
          <div className="lg:col-span-1">
            <ErrorBoundary>
              <OrderSimulationForm
                selectedVenue={selectedVenue}
                onVenueChange={setSelectedVenue}
                onOrderSimulate={setSimulatedOrder}
              />
            </ErrorBoundary>
          </div>

          {/* Orderbook Viewer */}
          <div className="lg:col-span-2">
            <ErrorBoundary>
              <OrderbookViewer
                venue={selectedVenue}
                simulatedOrder={simulatedOrder}
              />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </main>
  );
}
