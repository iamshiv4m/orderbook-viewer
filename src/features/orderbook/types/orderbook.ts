// Exchange venues
export type Venue = "OKX" | "Bybit" | "Deribit";

// Trading sides
export type OrderSide = "buy" | "sell";

// Order types
export type OrderType = "market" | "limit";

// Timing options
export type OrderTiming = "immediate" | "5s" | "10s" | "30s";

// Common cryptocurrency symbols
export type CryptoSymbol =
  | "BTC-USD"
  | "BTC-USDT"
  | "BTCUSDT"
  | "BTC-PERPETUAL"
  | "ETH-USD"
  | "ETH-USDT"
  | "ETHUSDT"
  | "ETH-PERPETUAL"
  | "SOL-USD"
  | "SOL-USDT"
  | "SOLUSDT"
  | "SOL-PERPETUAL"
  | "ADA-USD"
  | "ADA-USDT"
  | "ADAUSDT"
  | "ADA-PERPETUAL";

// Symbol mapping for different exchanges
export interface SymbolMapping {
  OKX: { [key: string]: string };
  Bybit: { [key: string]: string };
  Deribit: { [key: string]: string };
}

// Order level in the orderbook
export interface OrderLevel {
  price: number;
  size: number;
  total: number;
}

// Main orderbook data structure
export interface OrderbookData {
  venue: Venue;
  symbol: string;
  timestamp: number;
  bids: OrderLevel[];
  asks: OrderLevel[];
  spread: number;
  spreadPercentage: number;
}

// Simulated order with impact analysis
export interface SimulatedOrder {
  venue: Venue;
  symbol: string;
  side: OrderSide;
  type: OrderType;
  price?: number;
  quantity: number;
  timing: OrderTiming;
  estimatedFillPercentage: number;
  marketImpact: number;
  slippage: number;
  timeToFill?: number;
}

// Orderbook state management
export interface OrderbookState {
  [venue: string]: {
    [symbol: string]: OrderbookData;
  };
}

// API response wrapper
export interface ApiResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

// Utility types for better type inference
export type ValidatedString<T extends string> = T & {
  readonly __brand: "ValidatedString";
};

export type ValidatedSymbol = ValidatedString<CryptoSymbol>;
export type ValidatedVenue = ValidatedString<Venue>;
export type ValidatedOrderSide = ValidatedString<OrderSide>;
export type ValidatedOrderType = ValidatedString<OrderType>;
export type ValidatedOrderTiming = ValidatedString<OrderTiming>;
