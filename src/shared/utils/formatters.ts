/**
 * Formats a price value with specified decimal places
 * @param price - The price value to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted price string with proper number formatting
 * @example
 * formatPrice(1234.5678, 2) // "1,234.57"
 * formatPrice(100, 4) // "100.0000"
 */
export const formatPrice = (price: number, decimals: number = 2): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(price);
};

/**
 * Formats a size/quantity value with specified decimal places
 * @param size - The size/quantity value to format
 * @param decimals - Number of decimal places (default: 4)
 * @returns Formatted size string with proper number formatting
 * @example
 * formatSize(123.456789, 4) // "123.4568"
 * formatSize(1000, 2) // "1,000.00"
 */
export const formatSize = (size: number, decimals: number = 4): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(size);
};

/**
 * Formats a total value with specified decimal places
 * @param total - The total value to format
 * @param decimals - Number of decimal places (default: 4)
 * @returns Formatted total string with proper number formatting
 * @example
 * formatTotal(12345.6789, 4) // "12,345.6789"
 * formatTotal(100, 2) // "100.00"
 */
export const formatTotal = (total: number, decimals: number = 4): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(total);
};

/**
 * Formats a percentage value with specified decimal places
 * @param value - The percentage value to format
 * @param decimals - Number of decimal places (default: 3)
 * @returns Formatted percentage string with % symbol
 * @example
 * formatPercentage(12.3456, 3) // "12.346%"
 * formatPercentage(5, 1) // "5.0%"
 */
export const formatPercentage = (
  value: number,
  decimals: number = 3
): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Formats a currency amount with proper currency symbol and formatting
 * @param amount - The amount to format
 * @param currency - The currency code (default: "USD")
 * @returns Formatted currency string with proper locale formatting
 * @example
 * formatCurrency(1234.56, "USD") // "$1,234.56"
 * formatCurrency(1000, "EUR") // "€1,000.00"
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats a timestamp into a readable time string
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted time string in 24-hour format
 * @example
 * formatTimestamp(1640995200000) // "00:00:00"
 * formatTimestamp(Date.now()) // Current time in HH:MM:SS format
 */
export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

/**
 * Calculates the spread between best ask and best bid prices
 * @param bestAsk - The best ask (lowest sell) price
 * @param bestBid - The best bid (highest buy) price
 * @returns The absolute spread value
 * @example
 * calculateSpread(100.50, 100.00) // 0.50
 */
export const calculateSpread = (bestAsk: number, bestBid: number): number => {
  return bestAsk - bestBid;
};

/**
 * Calculates the spread percentage relative to the best bid price
 * @param bestAsk - The best ask (lowest sell) price
 * @param bestBid - The best bid (highest buy) price
 * @returns The spread as a percentage of the best bid
 * @example
 * calculateSpreadPercentage(100.50, 100.00) // 0.5 (0.5%)
 */
export const calculateSpreadPercentage = (
  bestAsk: number,
  bestBid: number
): number => {
  return ((bestAsk - bestBid) / bestBid) * 100;
};

/**
 * Calculates the mid price between best ask and best bid
 * @param bestAsk - The best ask (lowest sell) price
 * @param bestBid - The best bid (highest buy) price
 * @returns The mid price (average of ask and bid)
 * @example
 * calculateMidPrice(100.50, 100.00) // 100.25
 */
export const calculateMidPrice = (bestAsk: number, bestBid: number): number => {
  return (bestAsk + bestBid) / 2;
};

/**
 * Calculates the market impact of a large order on the orderbook
 * This function simulates how a large order would affect the market price
 * by walking through the orderbook levels and calculating average fill price
 *
 * @param orderSize - The size of the order to simulate
 * @param orderbookLevels - Array of price levels with their available sizes
 * @param side - Whether this is a "buy" or "sell" order
 * @returns Object containing impact metrics:
 *   - levelsAffected: Number of price levels the order would consume
 *   - averagePrice: Weighted average price of the fills
 *   - slippage: Price impact as a percentage
 *   - fillPercentage: Percentage of the order that would be filled
 *
 * @example
 * const levels = [
 *   { price: 100, size: 10 },
 *   { price: 101, size: 20 },
 *   { price: 102, size: 15 }
 * ];
 * calculateOrderImpact(25, levels, "buy")
 * // Returns: { levelsAffected: 2, averagePrice: 100.4, slippage: 0.4, fillPercentage: 100 }
 */
export const calculateOrderImpact = (
  orderSize: number,
  orderbookLevels: Array<{ price: number; size: number }>,
  side: "buy" | "sell"
): {
  levelsAffected: number;
  averagePrice: number;
  slippage: number;
  fillPercentage: number;
} => {
  let remainingSize = orderSize;
  let totalCost = 0;
  let levelsAffected = 0;

  // Walk through orderbook levels to simulate order execution
  for (const level of orderbookLevels) {
    if (remainingSize <= 0) break;

    const fillSize = Math.min(remainingSize, level.size);
    totalCost += fillSize * level.price;
    remainingSize -= fillSize;
    levelsAffected++;
  }

  const filledSize = orderSize - remainingSize;
  const averagePrice = totalCost / filledSize;
  const bestPrice = orderbookLevels[0].price;

  // Calculate slippage based on order side
  const slippage =
    side === "buy"
      ? ((averagePrice - bestPrice) / bestPrice) * 100
      : ((bestPrice - averagePrice) / bestPrice) * 100;

  return {
    levelsAffected,
    averagePrice,
    slippage: Math.max(0, slippage), // Ensure slippage is non-negative
    fillPercentage: (filledSize / orderSize) * 100,
  };
};

/**
 * Creates a debounced version of a function that delays execution
 * until after a specified wait time has elapsed since the last call
 *
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced version of the original function
 *
 * @example
 * const debouncedSearch = debounce((query) => {
 *   // Perform search
 * }, 300);
 *
 * // Only executes after 300ms of no calls
 * debouncedSearch("bitcoin");
 * debouncedSearch("bitcoin price");
 * debouncedSearch("bitcoin price chart"); // Only this call executes
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Creates a throttled version of a function that limits execution frequency
 * The function will only execute once within the specified time limit
 *
 * @param func - The function to throttle
 * @param limit - The time limit in milliseconds between executions
 * @returns A throttled version of the original function
 *
 * @example
 * const throttledUpdate = throttle((data) => {
 *   // Update UI
 * }, 100);
 *
 * // Will only execute once every 100ms maximum
 * throttledUpdate(data1);
 * throttledUpdate(data2); // Ignored if called within 100ms
 * throttledUpdate(data3); // Ignored if called within 100ms
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
