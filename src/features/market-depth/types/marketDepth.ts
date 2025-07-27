import { OrderbookData } from "../../orderbook/types/orderbook";

export interface DepthDataPoint {
  price: number;
  size: number;
  side: string;
  cumulative: number;
}

export interface MarketDepthTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: { side: string };
  }>;
  label?: string;
}

export interface MarketDepthChartProps {
  orderbookData: OrderbookData;
}
