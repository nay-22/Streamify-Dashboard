import {
  MetricCardProps,
  AnchorType,
  AreaChartProps,
  GenericCardProps,
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
import { Dispatch, SetStateAction } from "react";

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
  refetch: () => void;
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
  GenericCardProps,
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
  themeMode: ThemeMode;
  setThemeMode: Dispatch<SetStateAction<ThemeMode>>;
};

export enum ThemeMode {
  DARK = "dark",
  LIGHT = "light",
}

export type ThemeType = {
  primary?: string | undefined;
  secondary?: string | undefined;
  tertiary?: string | undefined;
  accent?: string | undefined;
};

export interface BaseThemeOptions {
  text?: ThemeType | undefined;
  background?: ThemeType | undefined;
}

export interface ThemeOptions extends BaseThemeOptions {
  error?: BaseThemeOptions | undefined;
}
