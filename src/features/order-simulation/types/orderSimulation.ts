import {
  OrderbookData,
  SimulatedOrder,
  Venue,
} from "../../orderbook/types/orderbook";

export interface OrderImpactMetricsProps {
  simulatedOrder: SimulatedOrder;
  orderbookData: OrderbookData;
}

export interface OrderSimulationFormProps {
  selectedVenue: Venue;
  onVenueChange: (venue: Venue) => void;
  onOrderSimulate: (order: SimulatedOrder | null) => void;
}

export interface OrderFormData {
  venue: Venue;
  symbol: string;
  orderType: "market" | "limit";
  side: "buy" | "sell";
  price?: number;
  quantity: number;
  timing: "immediate" | "5s" | "10s" | "30s";
}

export interface ImpactMetrics {
  estimatedFillPercentage: number;
  marketImpact: number;
  slippage: number;
  timeToFill: number;
}
