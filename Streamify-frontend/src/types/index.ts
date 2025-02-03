import {
  MetricCardProps,
  AnchorType,
  AreaChartProps,
  ChartCardProps,
  FilterFormProps,
  ModalProps,
  PaginatorProps,
} from "./PropTypes";
import {
  Metrics,
  MonthlyUserStats,
  UserGrowth,
  Stream,
  TopStreams,
} from "./ApiContractTypes";
import { ScreenSize } from "./MediaTypes";

export type Options = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
  headers?: {
    [keys: string]: string;
  };
  body?: string | null;
  credentials?: "include" | "omit" | "same-origin";
};

export type QueryOptions = {
  [key: string]: string | number;
};

export type FetchRequest<S, T> = {
  data: T | undefined;
  query: S | undefined;
  addQuery: (query: S) => void;
  deleteQuery: (key: string) => void;
  updateQuery: (key: string, value: string | number) => void;
  isLoading: boolean;
  error: string | null;
};

export type WindowSize = {
  width: number;
  height: number;
};

export type {
  MonthlyUserStats,
  UserGrowth,
  TopStreams,
  Stream,
  Metrics,
  MetricCardProps,
  FilterFormProps,
  PaginatorProps,
  AreaChartProps,
  ChartCardProps,
  ModalProps,
};

export type RecentStreamsQuery = {
  page?: number | undefined;
  limit?: number | undefined;
  artistOrSong?: string | undefined;
  sort?: string | undefined;
};

export { AnchorType, ScreenSize };

export type StreamifyContextConfig = {
  screen: ScreenSize;
  windowSize: {
    width: number;
    height: number;
  };
};
