import {
  Venue,
  OrderSide,
  OrderType,
  OrderTiming,
  CryptoSymbol,
} from "@/features/orderbook";

/**
 * String validation and utility functions
 */
export class StringUtils {
  /**
   * Validates if a string is a valid cryptocurrency symbol
   * @param symbol - The symbol to validate
   * @returns True if valid, false otherwise
   */
  static isValidCryptoSymbol(symbol: string): symbol is CryptoSymbol {
    const validSymbols: CryptoSymbol[] = [
      "BTC-USD",
      "BTC-USDT",
      "BTCUSDT",
      "BTC-PERPETUAL",
      "ETH-USD",
      "ETH-USDT",
      "ETHUSDT",
      "ETH-PERPETUAL",
      "SOL-USD",
      "SOL-USDT",
      "SOLUSDT",
      "SOL-PERPETUAL",
      "ADA-USD",
      "ADA-USDT",
      "ADAUSDT",
      "ADA-PERPETUAL",
    ];
    return validSymbols.includes(symbol as CryptoSymbol);
  }

  /**
   * Validates if a string is a valid venue
   * @param venue - The venue to validate
   * @returns True if valid, false otherwise
   */
  static isValidVenue(venue: string): venue is Venue {
    return ["OKX", "Bybit", "Deribit"].includes(venue);
  }

  /**
   * Validates if a string is a valid order side
   * @param side - The side to validate
   * @returns True if valid, false otherwise
   */
  static isValidOrderSide(side: string): side is OrderSide {
    return ["buy", "sell"].includes(side);
  }

  /**
   * Validates if a string is a valid order type
   * @param type - The type to validate
   * @returns True if valid, false otherwise
   */
  static isValidOrderType(type: string): type is OrderType {
    return ["market", "limit"].includes(type);
  }

  /**
   * Validates if a string is a valid timing option
   * @param timing - The timing to validate
   * @returns True if valid, false otherwise
   */
  static isValidOrderTiming(timing: string): timing is OrderTiming {
    return ["immediate", "5s", "10s", "30s"].includes(timing);
  }

  /**
   * Normalizes a symbol string (removes spaces, converts to uppercase)
   * @param symbol - The symbol to normalize
   * @returns Normalized symbol string
   */
  static normalizeSymbol(symbol: string): string {
    return symbol.trim().toUpperCase().replace(/\s+/g, "");
  }

  /**
   * Formats a symbol for display
   * @param symbol - The symbol to format
   * @returns Formatted symbol string
   */
  static formatSymbol(symbol: string): string {
    const normalized = this.normalizeSymbol(symbol);

    // Add spaces for better readability
    if (normalized.includes("-")) {
      return normalized.replace("-", " / ");
    }

    // For symbols without separators, add space before USD/USDT
    return normalized.replace(/(USD|USDT|PERPETUAL)$/, " / $1");
  }

  /**
   * Extracts the base currency from a symbol
   * @param symbol - The symbol to extract from
   * @returns Base currency (e.g., "BTC" from "BTC-USD")
   */
  static getBaseCurrency(symbol: string): string {
    const normalized = this.normalizeSymbol(symbol);
    return normalized.split(/[-/]/)[0] || "";
  }

  /**
   * Extracts the quote currency from a symbol
   * @param symbol - The symbol to extract from
   * @returns Quote currency (e.g., "USD" from "BTC-USD")
   */
  static getQuoteCurrency(symbol: string): string {
    const normalized = this.normalizeSymbol(symbol);
    const parts = normalized.split(/[-/]/);
    return parts[parts.length - 1] || "";
  }

  /**
   * Validates and sanitizes user input for symbols
   * @param input - The user input to validate
   * @returns Sanitized symbol or null if invalid
   */
  static sanitizeSymbolInput(input: string): string | null {
    if (!input || typeof input !== "string") {
      return null;
    }

    const sanitized = input.trim().toUpperCase();

    // Basic validation pattern
    const symbolPattern = /^[A-Z0-9]+(-[A-Z0-9]+)*$/;

    if (!symbolPattern.test(sanitized)) {
      return null;
    }

    return sanitized;
  }

  /**
   * Converts timing string to milliseconds
   * @param timing - The timing string
   * @returns Time in milliseconds
   */
  static timingToMs(timing: OrderTiming): number {
    switch (timing) {
      case "immediate":
        return 0;
      case "5s":
        return 5000;
      case "10s":
        return 10000;
      case "30s":
        return 30000;
      default:
        return 0;
    }
  }

  /**
   * Converts milliseconds to timing string
   * @param ms - Milliseconds to convert
   * @returns Timing string
   */
  static msToTiming(ms: number): OrderTiming {
    if (ms === 0) return "immediate";
    if (ms <= 5000) return "5s";
    if (ms <= 10000) return "10s";
    return "30s";
  }
}

// Type guards for runtime type checking
export const isVenue = (value: unknown): value is Venue => {
  return StringUtils.isValidVenue(String(value));
};

export const isOrderSide = (value: unknown): value is OrderSide => {
  return StringUtils.isValidOrderSide(String(value));
};

export const isOrderType = (value: unknown): value is OrderType => {
  return StringUtils.isValidOrderType(String(value));
};

export const isOrderTiming = (value: unknown): value is OrderTiming => {
  return StringUtils.isValidOrderTiming(String(value));
};

export const isCryptoSymbol = (value: unknown): value is CryptoSymbol => {
  return StringUtils.isValidCryptoSymbol(String(value));
};
