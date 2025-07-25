// Order Simulation Feature Slice
// This feature handles order simulation, impact analysis, and form validation

// Components
export { default as OrderSimulationForm } from "./components/OrderSimulationForm";
export { default as OrderImpactMetrics } from "./components/OrderImpactMetrics";
export { default as OrderSimulationFormSkeleton } from "./components/OrderSimulationFormSkeleton";
export { default as OrderImpactMetricsSkeleton } from "./components/OrderImpactMetricsSkeleton";

// Types (re-exported from orderbook feature)
export type {
  Venue,
  OrderSide,
  OrderType,
  OrderTiming,
  CryptoSymbol,
  SimulatedOrder,
} from "../orderbook/types/orderbook";

// Utils
export { StringValidationUtils } from "../../shared/utils/strings/stringValidation";
export {
  formatPrice,
  formatSize,
  formatTotal,
  calculateOrderImpact,
} from "../../shared/utils/formatters";
