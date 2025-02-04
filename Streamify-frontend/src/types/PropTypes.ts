import { ReactNode } from "react";
import { RecentStreamsQuery } from ".";

export enum AnchorType {
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
}

export type MetricCardProps = {
  title: string;
  value: string | number;
  iconUrl?: {
    light: string;
    dark: string;
  };
  valueIconUrl?: {
    light: string;
    dark: string;
  };
  anchor?: AnchorType;
};

export type AreaChartProps = {
  data: {
    [key: string]: string | number;
  }[];
};

export type GenericCardProps = {
  title: string;
  actions?: ReactNode;
  children?: ReactNode;
};

export type FilterFormProps = {
  onSubmit: (query: RecentStreamsQuery) => void;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export type PaginatorProps = {
  dataLength: number;
  limit: number;
  toPage: (pageNo: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onLimitChange: (limit: number) => void;
  disableControls: boolean;
};

export interface WithLoaderAndErrorProps {
  isLoading: boolean;
  error?: string | null;
}
