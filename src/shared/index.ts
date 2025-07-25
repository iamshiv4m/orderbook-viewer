// Shared Module
// This module contains components, utilities, and types shared across all features

// Components
export { default as ErrorBoundary } from "./components/ErrorBoundary";
export { default as LoadingSpinner } from "./components/LoadingSpinner";
export {
  default as Skeleton,
  SkeletonText,
  SkeletonButton,
  SkeletonCard,
} from "./components/Skeleton";

// Utils
export {
  StringUtils,
  isVenue,
  isOrderSide,
  isOrderType,
  isOrderTiming,
  isCryptoSymbol,
} from "./utils/strings/stringUtils";

export { StringValidationUtils } from "./utils/strings/stringValidation";
export { cn } from "./utils/cn";

export {
  formatPrice,
  formatSize,
  formatTotal,
  formatPercentage,
  formatCurrency,
  formatTimestamp,
  calculateSpread,
  calculateSpreadPercentage,
  calculateMidPrice,
  calculateOrderImpact,
  debounce,
  throttle,
} from "./utils/formatters";

// Types (if any shared types exist)
// export type { ... } from './types/...';
