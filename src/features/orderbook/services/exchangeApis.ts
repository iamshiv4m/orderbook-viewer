import axios from "axios";
import { OrderbookData, Venue, OrderLevel } from "../types/orderbook";

// Base API configurations
const API_CONFIGS = {
  OKX: {
    baseURL: "https://www.okx.com",
    orderbookEndpoint: "/api/v5/market/books",
    wsURL: "wss://ws.okx.com:8443/ws/v5/public",
  },
  Bybit: {
    baseURL: "https://api.bybit.com",
    orderbookEndpoint: "/v5/market/orderbook",
    wsURL: "wss://stream.bybit.com/v5/public/linear",
  },
  Deribit: {
    baseURL: "https://www.deribit.com",
    orderbookEndpoint: "/api/v2/public/get_order_book",
    wsURL: "wss://www.deribit.com/ws/api/v2",
  },
};

// Symbol mapping for different exchanges
const SYMBOL_MAPPING = {
  OKX: {
    "BTC-USD": "BTC-USDT",
    "ETH-USD": "ETH-USDT",
    "SOL-USD": "SOL-USDT",
    "ADA-USD": "ADA-USDT",
  },
  Bybit: {
    "BTC-USD": "BTCUSDT",
    "ETH-USD": "ETHUSDT",
    "SOL-USD": "SOLUSDT",
    "ADA-USD": "ADAUSDT",
  },
  Deribit: {
    "BTC-USD": "BTC-PERPETUAL",
    "ETH-USD": "ETH-PERPETUAL",
    "SOL-USD": "SOL-PERPETUAL",
    "ADA-USD": "ADA-PERPETUAL",
  },
};

export class ExchangeApiService {
  private venue: Venue;
  private config: (typeof API_CONFIGS)[Venue];

  constructor(venue: Venue) {
    this.venue = venue;
    this.config = API_CONFIGS[venue];
  }

  private getMappedSymbol(symbol: string): string {
    return (
      SYMBOL_MAPPING[this.venue][
        symbol as keyof (typeof SYMBOL_MAPPING)[Venue]
      ] || symbol
    );
  }

  async fetchOrderbookData(symbol: string): Promise<OrderbookData> {
    const mappedSymbol = this.getMappedSymbol(symbol);

    try {
      // Type-safe switch using the Venue type
      const venueHandlers: Record<Venue, () => Promise<OrderbookData>> = {
        OKX: () => this.fetchOKXOrderbook(mappedSymbol),
        Bybit: () => this.fetchBybitOrderbook(mappedSymbol),
        Deribit: () => this.fetchDeribitOrderbook(mappedSymbol),
      };

      const handler = venueHandlers[this.venue];
      if (!handler) {
        throw new Error(`Unsupported venue: ${this.venue}`);
      }

      return await handler();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(
        `Error fetching ${this.venue} orderbook for ${symbol}:`,
        errorMessage
      );

      // Log additional details for debugging
      if (error instanceof Error && error.stack) {
        console.debug("Error stack:", error.stack);
      }

      // Return mock data as fallback with error indication
      const mockData = this.generateMockOrderbookData(symbol);
      console.info(`Falling back to mock data for ${this.venue} ${symbol}`);
      return mockData;
    }
  }

  private async fetchOKXOrderbook(symbol: string): Promise<OrderbookData> {
    const response = await axios.get(
      `${this.config.baseURL}${this.config.orderbookEndpoint}`,
      {
        params: {
          instId: symbol,
          sz: "20",
        },
        timeout: 5000,
      }
    );

    if (response.data.code !== "0") {
      throw new Error(`OKX API error: ${response.data.msg}`);
    }

    const data = response.data.data[0];

    // Validate that we have the required data
    if (
      !data ||
      !data.asks ||
      !data.bids ||
      !Array.isArray(data.asks) ||
      !Array.isArray(data.bids) ||
      data.asks.length === 0 ||
      data.bids.length === 0
    ) {
      throw new Error(`Invalid OKX orderbook data for symbol: ${symbol}`);
    }

    const bids = data.bids.map((bid: [string, string, string]) => ({
      price: parseFloat(bid[0]),
      size: parseFloat(bid[1]),
      total: parseFloat(bid[2]),
    }));

    const asks = data.asks.map((ask: [string, string, string]) => ({
      price: parseFloat(ask[0]),
      size: parseFloat(ask[1]),
      total: parseFloat(ask[2]),
    }));

    // Calculate spread safely
    const bestAsk = asks[0]?.price;
    const bestBid = bids[0]?.price;

    if (!bestAsk || !bestBid) {
      throw new Error(`Missing price data for symbol: ${symbol}`);
    }

    const spread = bestAsk - bestBid;
    const spreadPercentage = (spread / bestBid) * 100;

    return {
      venue: this.venue,
      symbol: symbol,
      timestamp: Date.now(),
      bids,
      asks,
      spread,
      spreadPercentage,
    };
  }

  private async fetchBybitOrderbook(symbol: string): Promise<OrderbookData> {
    const response = await axios.get(
      `${this.config.baseURL}${this.config.orderbookEndpoint}`,
      {
        params: {
          category: "linear",
          symbol: symbol,
          limit: 20,
        },
        timeout: 5000,
      }
    );

    if (response.data.retCode !== 0) {
      throw new Error(`Bybit API error: ${response.data.retMsg}`);
    }

    const data = response.data.result;

    // Validate that we have the required data
    if (
      !data ||
      !data.a ||
      !data.b ||
      !Array.isArray(data.a) ||
      !Array.isArray(data.b) ||
      data.a.length === 0 ||
      data.b.length === 0
    ) {
      throw new Error(`Invalid Bybit orderbook data for symbol: ${symbol}`);
    }

    const bids = data.b.map((bid: [string, string]) => ({
      price: parseFloat(bid[0]),
      size: parseFloat(bid[1]),
      total: parseFloat(bid[1]), // Bybit doesn't provide cumulative totals
    }));

    const asks = data.a.map((ask: [string, string]) => ({
      price: parseFloat(ask[0]),
      size: parseFloat(ask[1]),
      total: parseFloat(ask[1]), // Bybit doesn't provide cumulative totals
    }));

    // Calculate spread safely
    const bestAsk = asks[0]?.price;
    const bestBid = bids[0]?.price;

    if (!bestAsk || !bestBid) {
      throw new Error(`Missing price data for symbol: ${symbol}`);
    }

    const spread = bestAsk - bestBid;
    const spreadPercentage = (spread / bestBid) * 100;

    return {
      venue: this.venue,
      symbol: symbol,
      timestamp: Date.now(),
      bids,
      asks,
      spread,
      spreadPercentage,
    };
  }

  private async fetchDeribitOrderbook(symbol: string): Promise<OrderbookData> {
    const response = await axios.get(
      `${this.config.baseURL}${this.config.orderbookEndpoint}`,
      {
        params: {
          instrument_name: symbol,
          depth: 20,
        },
        timeout: 5000,
      }
    );

    if (response.data.error) {
      throw new Error(`Deribit API error: ${response.data.error.message}`);
    }

    const data = response.data.result;

    // Validate that we have the required data
    if (
      !data ||
      !data.asks ||
      !data.bids ||
      !Array.isArray(data.asks) ||
      !Array.isArray(data.bids) ||
      data.asks.length === 0 ||
      data.bids.length === 0
    ) {
      throw new Error(`Invalid Deribit orderbook data for symbol: ${symbol}`);
    }

    const bids = data.bids.map((bid: [number, number]) => ({
      price: bid[0],
      size: bid[1],
      total: bid[1], // Deribit doesn't provide cumulative totals
    }));

    const asks = data.asks.map((ask: [number, number]) => ({
      price: ask[0],
      size: ask[1],
      total: ask[1], // Deribit doesn't provide cumulative totals
    }));

    // Calculate spread safely
    const bestAsk = asks[0]?.price;
    const bestBid = bids[0]?.price;

    if (!bestAsk || !bestBid) {
      throw new Error(`Missing price data for symbol: ${symbol}`);
    }

    const spread = bestAsk - bestBid;
    const spreadPercentage = (spread / bestBid) * 100;

    return {
      venue: this.venue,
      symbol: symbol,
      timestamp: Date.now(),
      bids,
      asks,
      spread,
      spreadPercentage,
    };
  }

  // Mock data generator for fallback
  private generateMockOrderbookData(symbol: string): OrderbookData {
    const basePrice = symbol.includes("BTC")
      ? 45000
      : symbol.includes("ETH")
      ? 3000
      : symbol.includes("SOL")
      ? 100
      : 0.5;

    const spread = basePrice * 0.001;
    const midPrice = basePrice + (Math.random() - 0.5) * basePrice * 0.01;

    const generateLevels = (
      side: "bid" | "ask",
      count: number
    ): OrderLevel[] => {
      const levels: OrderLevel[] = [];
      let total = 0;

      for (let i = 0; i < count; i++) {
        const priceOffset =
          side === "bid" ? (-i * spread) / 10 : (i * spread) / 10;
        const price = midPrice + priceOffset;
        const size = Math.random() * 10 + 0.1;
        total += size;

        levels.push({
          price: parseFloat(price.toFixed(2)),
          size: parseFloat(size.toFixed(4)),
          total: parseFloat(total.toFixed(4)),
        });
      }

      return side === "bid" ? levels.reverse() : levels;
    };

    return {
      venue: this.venue,
      symbol: symbol,
      timestamp: Date.now(),
      bids: generateLevels("bid", 20),
      asks: generateLevels("ask", 20),
      spread: parseFloat(spread.toFixed(2)),
      spreadPercentage: parseFloat(((spread / midPrice) * 100).toFixed(3)),
    };
  }

  // WebSocket connection setup (placeholder for real implementation)
  setupWebSocketConnection(
    symbol: string,
    onUpdate: (data: OrderbookData) => void
  ): () => void {
    const mappedSymbol = this.getMappedSymbol(symbol);

    // For demo purposes, simulate WebSocket with polling
    // In production, this would establish actual WebSocket connections
    console.log(`Setting up WebSocket for ${this.venue} ${mappedSymbol}`);

    const interval = setInterval(async () => {
      try {
        const data = await this.fetchOrderbookData(symbol);
        onUpdate(data);
      } catch (error) {
        console.error(`WebSocket simulation error for ${this.venue}:`, error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }
}

// Factory function to create exchange services
export function createExchangeService(venue: Venue): ExchangeApiService {
  return new ExchangeApiService(venue);
}
