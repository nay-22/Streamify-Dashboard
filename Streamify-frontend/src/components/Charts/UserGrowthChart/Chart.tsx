import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Area,
} from "recharts";
import { MONTHS } from "../../../constants";
import { useStreamify } from "../../../hooks";
import { ThemeMode, UserGrowth } from "../../../types";
import { toClosestUnit } from "../../../utils";
import CustomLegend from "./customs/CustomLegend";
import CustomTooltip from "./customs/CustomTooltip";
import withLoaderAndError from "../../../hoc/withLoaderAndError";
import { WithLoaderAndErrorProps } from "../../../types/PropTypes";

export interface UserGrowthChartProps extends WithLoaderAndErrorProps {
  data?: UserGrowth;
}

const Chart = ({ data }: UserGrowthChartProps) => {
  const { themeMode } = useStreamify();

  const c1 = themeMode === ThemeMode.LIGHT ? "#5a4eb0" : "#8884d8";
  const c2 = themeMode === ThemeMode.LIGHT ? "#388e3c" : "#82ca9d ";
  const stroke = themeMode === ThemeMode.LIGHT ? "black" : "white";

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
  return (
    data && (
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
    )
  );
};

export default withLoaderAndError(Chart);
