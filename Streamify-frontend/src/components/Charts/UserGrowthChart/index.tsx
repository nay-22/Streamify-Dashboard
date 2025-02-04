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
import { useFetch, useStreamify } from "../../../hooks";
import { ThemeMode, UserGrowth } from "../../../types/";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

/**
 * UserGrowthChart: Functional component displays a chart visualizing user 
 * growth data over a specified period. 
 * 
 * It utilizes the Recharts library to 
 * render an area chart that shows both total users and active users by fetching
 * the data from a specified API endpoint.
 *
 * @returns A JSX element representing the user growth chart
 */
const UserGrowthChart = () => {
  const { data, isLoading, error } = useFetch<UserGrowth>(USER_GROWTH_URL);

  const { themeMode } = useStreamify();

  const c1 = themeMode === ThemeMode.LIGHT ? '#5a4eb0' : '#8884d8';
  const c2 = themeMode === ThemeMode.LIGHT ? '#388e3c' : '#82ca9d ';
  const stroke = themeMode === ThemeMode.LIGHT ? 'black' : 'white'

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
            <stop offset="5%" stopColor={c1} stopOpacity={0.8} />
            <stop offset="95%" stopColor={c1} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={c2} stopOpacity={0.8} />
            <stop offset="95%" stopColor={c2} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke={stroke} />
        <YAxis tickFormatter={(v) => toClosestUnit(v)} stroke={stroke} />
        <Legend verticalAlign="bottom" content={<CustomLegend />} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="Total Users"
          stroke={c1}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="Active Users"
          stroke={c2}
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
