export type Metrics = {
  metrics: {
    [key: string]: {
      title: string;
      value: string | number;
      iconUrl?: string;
      valueIconUrl?: string;
    };
  };
}
