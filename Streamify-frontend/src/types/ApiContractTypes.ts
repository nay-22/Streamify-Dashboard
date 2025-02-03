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

export type MonthlyUserStats = {
  totalUsers: number;
  activeUsers: number;
};

export type UserGrowth = {
  userGrowth: MonthlyUserStats[];
};

export type TopStreams = {
  topFiveStreams: Stream[];
};

export type Stream = { name: string; streamCount: number; color: string };
