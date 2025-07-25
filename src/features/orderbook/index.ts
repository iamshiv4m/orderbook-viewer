// Orderbook Feature Slice
// This feature handles orderbook data fetching, display, and management

// Components
export { default as OrderbookTable } from "./components/OrderbookTable";
export { default as OrderbookViewer } from "./components/OrderbookViewer";
export { default as OrderbookSkeleton } from "./components/OrderbookSkeleton";
export { default as OrderbookViewerSkeleton } from "./components/OrderbookViewerSkeleton";

// Hooks
export { useOrderbookData } from "./hooks/useOrderbookData";

// Services
export {
  ExchangeApiService,
  createExchangeService,
} from "./services/exchangeApis";

// Types
export type {
  Venue,
  OrderSide,
  OrderType,
  OrderTiming,
  CryptoSymbol,
  OrderLevel,
  OrderbookData,
  SimulatedOrder,
  OrderbookState,
  ApiResponse,
  SymbolMapping,
  ValidatedString,
  ValidatedSymbol,
  ValidatedVenue,
  ValidatedOrderSide,
  ValidatedOrderType,
  ValidatedOrderTiming,
} from "./types/orderbook";

// Utils
export {
  StringUtils,
  isVenue,
  isOrderSide,
  isOrderType,
  isOrderTiming,
  isCryptoSymbol,
} from "../../shared/utils/strings/stringUtils";
