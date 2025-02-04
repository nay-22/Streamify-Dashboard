export type Metrics = {
  metrics: {
    [key: string]: {
      title: string;
      value: string | number;
      iconUrl?: {
        dark: string;
        light: string;
      };
      valueIconUrl?: {
        dark: string;
        light: string;
      };
    };
  };
};

export type MonthlyUserStats = {
  totalUsers: number;
  activeUsers: number;
};

export type UserGrowth = {
  userGrowth: MonthlyUserStats[];
};

export type TopStreams = {
  topFiveStreams: StreamItem[];
};

export type StreamItem = { name: string; streamCount: number; color: string };

export type RecentStreams = {
  recents: Stream[];
  totalLength: number;
};

export type Stream = {
  "Song Name": string;
  Artist: string;
  "Date Streamed": string;
  "Stream Count": number;
  "User ID": string;
  "Revenue Source": string;
  "Revenue Generated": number;
};

export type RevenueDistribution = {
  revenueDistribution: { [key: string]: RevenueData };
};

export type RevenueData = {
  name: string;
  value: number;
  color: string | "grey";
};
