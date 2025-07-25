import { Venue, OrderSide, OrderType, OrderTiming } from "@/features/orderbook";
import { StringUtils } from "@/shared/utils/strings/stringUtils";

/**
 * Enhanced string validation utilities for the orderbook application
 */
export class StringValidationUtils extends StringUtils {
  /**
   * Validates and formats a trading symbol with detailed error messages
   * @param symbol - The symbol to validate
   * @returns Validation result with formatted symbol or error
   */
  static validateAndFormatSymbol(symbol: string): {
    isValid: boolean;
    formatted?: string;
    error?: string;
    normalized?: string;
  } {
    if (!symbol || typeof symbol !== "string") {
      return {
        isValid: false,
        error: "Symbol is required and must be a string",
      };
    }

    const trimmed = symbol.trim();
    if (trimmed.length === 0) {
      return {
        isValid: false,
        error: "Symbol cannot be empty",
      };
    }

    const normalized = this.normalizeSymbol(trimmed);

    // Check if it's a valid crypto symbol
    if (this.isValidCryptoSymbol(normalized)) {
      return {
        isValid: true,
        formatted: this.formatSymbol(normalized),
        normalized,
      };
    }

    // Check if it follows the basic pattern
    const symbolPattern = /^[A-Z0-9]+(-[A-Z0-9]+)*$/;
    if (!symbolPattern.test(normalized)) {
      return {
        isValid: false,
        error: "Symbol must contain only letters, numbers, and hyphens",
      };
    }

    // If it passes pattern but isn't in our predefined list, warn but allow
    return {
      isValid: true,
      formatted: this.formatSymbol(normalized),
      normalized,
      error: "Symbol not in predefined list but format is valid",
    };
  }

  /**
   * Validates venue with detailed error messages
   * @param venue - The venue to validate
   * @returns Validation result
   */
  static validateVenue(venue: string): {
    isValid: boolean;
    error?: string;
    normalized?: Venue;
  } {
    if (!venue || typeof venue !== "string") {
      return {
        isValid: false,
        error: "Venue is required and must be a string",
      };
    }

    const normalized = venue.trim().toUpperCase() as Venue;

    if (this.isValidVenue(normalized)) {
      return {
        isValid: true,
        normalized,
      };
    }

    return {
      isValid: false,
      error: `Invalid venue. Must be one of: ${["OKX", "Bybit", "Deribit"].join(
        ", "
      )}`,
    };
  }

  /**
   * Validates order side with detailed error messages
   * @param side - The order side to validate
   * @returns Validation result
   */
  static validateOrderSide(side: string): {
    isValid: boolean;
    error?: string;
    normalized?: OrderSide;
  } {
    if (!side || typeof side !== "string") {
      return {
        isValid: false,
        error: "Order side is required and must be a string",
      };
    }

    const normalized = side.trim().toLowerCase() as OrderSide;

    if (this.isValidOrderSide(normalized)) {
      return {
        isValid: true,
        normalized,
      };
    }

    return {
      isValid: false,
      error: 'Order side must be either "buy" or "sell"',
    };
  }

  /**
   * Validates order type with detailed error messages
   * @param type - The order type to validate
   * @returns Validation result
   */
  static validateOrderType(type: string): {
    isValid: boolean;
    error?: string;
    normalized?: OrderType;
  } {
    if (!type || typeof type !== "string") {
      return {
        isValid: false,
        error: "Order type is required and must be a string",
      };
    }

    const normalized = type.trim().toLowerCase() as OrderType;

    if (this.isValidOrderType(normalized)) {
      return {
        isValid: true,
        normalized,
      };
    }

    return {
      isValid: false,
      error: 'Order type must be either "market" or "limit"',
    };
  }

  /**
   * Validates order timing with detailed error messages
   * @param timing - The timing to validate
   * @returns Validation result
   */
  static validateOrderTiming(timing: string): {
    isValid: boolean;
    error?: string;
    normalized?: OrderTiming;
  } {
    if (!timing || typeof timing !== "string") {
      return {
        isValid: false,
        error: "Order timing is required and must be a string",
      };
    }

    const normalized = timing.trim().toLowerCase() as OrderTiming;

    if (this.isValidOrderTiming(normalized)) {
      return {
        isValid: true,
        normalized,
      };
    }

    return {
      isValid: false,
      error: "Order timing must be one of: immediate, 5s, 10s, 30s",
    };
  }

  /**
   * Sanitizes and validates user input for forms
   * @param input - The user input to sanitize
   * @param type - The type of input to validate
   * @returns Sanitized and validated result
   */
  static sanitizeFormInput(
    input: string,
    type: "symbol" | "venue" | "side" | "type" | "timing"
  ): {
    isValid: boolean;
    value?: string;
    error?: string;
  } {
    if (!input || typeof input !== "string") {
      return {
        isValid: false,
        error: "Input is required and must be a string",
      };
    }

    const trimmed = input.trim();

    switch (type) {
      case "symbol":
        const symbolResult = this.validateAndFormatSymbol(trimmed);
        return {
          isValid: symbolResult.isValid,
          value: symbolResult.normalized,
          error: symbolResult.error,
        };

      case "venue":
        const venueResult = this.validateVenue(trimmed);
        return {
          isValid: venueResult.isValid,
          value: venueResult.normalized,
          error: venueResult.error,
        };

      case "side":
        const sideResult = this.validateOrderSide(trimmed);
        return {
          isValid: sideResult.isValid,
          value: sideResult.normalized,
          error: sideResult.error,
        };

      case "type":
        const typeResult = this.validateOrderType(trimmed);
        return {
          isValid: typeResult.isValid,
          value: typeResult.normalized,
          error: typeResult.error,
        };

      case "timing":
        const timingResult = this.validateOrderTiming(trimmed);
        return {
          isValid: timingResult.isValid,
          value: timingResult.normalized,
          error: timingResult.error,
        };

      default:
        return {
          isValid: false,
          error: "Unknown input type",
        };
    }
  }

  /**
   * Formats error messages for display
   * @param errors - Array of validation errors
   * @returns Formatted error message
   */
  static formatValidationErrors(errors: string[]): string {
    if (!errors || errors.length === 0) {
      return "";
    }

    if (errors.length === 1) {
      return errors[0];
    }

    return `Multiple validation errors: ${errors.join("; ")}`;
  }

  /**
   * Creates a display-friendly label for any string value
   * @param value - The value to format
   * @param type - The type of value
   * @returns Formatted display label
   */
  static createDisplayLabel(
    value: string,
    type: "symbol" | "venue" | "side" | "type" | "timing"
  ): string {
    const normalized = value.trim();

    switch (type) {
      case "symbol":
        return this.formatSymbol(normalized);

      case "venue":
        return normalized.toUpperCase();

      case "side":
        return normalized.charAt(0).toUpperCase() + normalized.slice(1);

      case "type":
        return normalized.charAt(0).toUpperCase() + normalized.slice(1);

      case "timing":
        if (normalized === "immediate") {
          return "Immediate";
        }
        return normalized.toUpperCase();

      default:
        return normalized;
    }
  }

  /**
   * Validates a complete order form
   * @param formData - The form data to validate
   * @returns Validation result with all errors
   */
  static validateOrderForm(formData: {
    symbol?: string;
    venue?: string;
    side?: string;
    type?: string;
    timing?: string;
    quantity?: number;
    price?: number;
  }): {
    isValid: boolean;
    errors: string[];
    validatedData?: {
      symbol: string;
      venue: Venue;
      side: OrderSide;
      type: OrderType;
      timing: OrderTiming;
      quantity: number;
      price?: number;
    };
  } {
    const errors: string[] = [];
    const validatedData: {
      symbol?: string;
      venue?: Venue;
      side?: OrderSide;
      type?: OrderType;
      timing?: OrderTiming;
      quantity?: number;
      price?: number;
    } = {};

    // Validate symbol
    if (formData.symbol) {
      const symbolResult = this.validateAndFormatSymbol(formData.symbol);
      if (!symbolResult.isValid) {
        errors.push(symbolResult.error!);
      } else {
        validatedData.symbol = symbolResult.normalized;
      }
    } else {
      errors.push("Symbol is required");
    }

    // Validate venue
    if (formData.venue) {
      const venueResult = this.validateVenue(formData.venue);
      if (!venueResult.isValid) {
        errors.push(venueResult.error!);
      } else {
        validatedData.venue = venueResult.normalized;
      }
    } else {
      errors.push("Venue is required");
    }

    // Validate side
    if (formData.side) {
      const sideResult = this.validateOrderSide(formData.side);
      if (!sideResult.isValid) {
        errors.push(sideResult.error!);
      } else {
        validatedData.side = sideResult.normalized;
      }
    } else {
      errors.push("Order side is required");
    }

    // Validate type
    if (formData.type) {
      const typeResult = this.validateOrderType(formData.type);
      if (!typeResult.isValid) {
        errors.push(typeResult.error!);
      } else {
        validatedData.type = typeResult.normalized;
      }
    } else {
      errors.push("Order type is required");
    }

    // Validate timing
    if (formData.timing) {
      const timingResult = this.validateOrderTiming(formData.timing);
      if (!timingResult.isValid) {
        errors.push(timingResult.error!);
      } else {
        validatedData.timing = timingResult.normalized;
      }
    } else {
      errors.push("Order timing is required");
    }

    // Validate quantity
    if (typeof formData.quantity === "number" && formData.quantity > 0) {
      validatedData.quantity = formData.quantity;
    } else {
      errors.push("Quantity must be a positive number");
    }

    // Validate price (optional for market orders)
    if (formData.type === "limit" && formData.price !== undefined) {
      if (typeof formData.price === "number" && formData.price > 0) {
        validatedData.price = formData.price;
      } else {
        errors.push("Price must be a positive number for limit orders");
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      validatedData:
        errors.length === 0
          ? (validatedData as {
              symbol: string;
              venue: Venue;
              side: OrderSide;
              type: OrderType;
              timing: OrderTiming;
              quantity: number;
              price?: number;
            })
          : undefined,
    };
  }
}
