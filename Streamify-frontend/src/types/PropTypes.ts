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
