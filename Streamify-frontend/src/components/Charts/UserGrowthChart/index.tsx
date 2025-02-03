import {
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import { toClosestUnit } from "../../../utils";
import { USER_GROWTH_URL, MONTHS } from "../../../constants";
import { useFetch } from "../../../hooks";
import { UserGrowth } from "../../../types/";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const UserGrowthChart = () => {
  const { data, isLoading, error } = useFetch<UserGrowth>(USER_GROWTH_URL);

  const generateTotalUsersArray = (): number[] => {
    return data
      ? [...Array(data.userGrowth.length).keys()].map(
          (_, idx) => data?.userGrowth[idx].totalUsers
        )
      : [];
  };

  const generateActiveUsersArray = (): number[] => {
    return data
      ? [...Array(data.userGrowth.length).keys()].map(
          (_, idx) => data?.userGrowth[idx].activeUsers
        )
      : [];
  };

  const generateData = (): {
    name: string;
    "Total Users": number;
    "Active Users": number;
  }[] => {
    const activeUsers = generateActiveUsersArray();
    const totalUsers = generateTotalUsersArray();
    return data
      ? [...Array(activeUsers.length).keys()].map((_, idx) => ({
          name: MONTHS[idx],
          "Active Users": activeUsers[idx],
          "Total Users": totalUsers[idx],
        }))
      : [];
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : data ? (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={generateData()}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="white" />
        <YAxis tickFormatter={(v) => toClosestUnit(v)} stroke="white" />
        <Legend verticalAlign="bottom" content={<CustomLegend />} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="Total Users"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="Active Users"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  ) : (
    error && <p>{error}</p>
  );
};

export default UserGrowthChart;
