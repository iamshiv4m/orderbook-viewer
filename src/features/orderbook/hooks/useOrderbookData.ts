"use client";

import { useState, useEffect, useCallback } from "react";
import { OrderbookData, Venue } from "../types/orderbook";
import { createExchangeService } from "../services/exchangeApis";

export function useOrderbookData(venue: Venue, symbol: string) {
  const [orderbookData, setOrderbookData] = useState<OrderbookData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const exchangeService = createExchangeService(venue);
      const data = await exchangeService.fetchOrderbookData(symbol);
      setOrderbookData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch orderbook data"
      );
    } finally {
      setLoading(false);
    }
  }, [venue, symbol]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Subscribe to real-time updates
    const exchangeService = createExchangeService(venue);
    const cleanup = exchangeService.setupWebSocketConnection(symbol, (data) => {
      setOrderbookData(data);
    });

    return cleanup;
  }, [venue, symbol]);

  return {
    orderbookData,
    loading,
    error,
    refetch: fetchData,
  };
}
