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
  iconUrl?: string;
  valueIconUrl?: string;
  anchor?: AnchorType;
};

export type AreaChartProps = {
  data: {
    [key: string]: string | number;
  }[];
};

export type ChartCardProps = {
  title: string;
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
