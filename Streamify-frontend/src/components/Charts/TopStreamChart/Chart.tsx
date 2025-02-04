import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from "recharts";
import { toClosestUnit } from "../../../utils";
import CustomTooltip from "./customs/CustomTooltip";
import withLoaderAndError, {
  WithLoaderAndErrorProps,
} from "../../../hoc/withLoaderAndError";
import { ThemeMode, TopStreams } from "../../../types";
import { useStreamify } from "../../../hooks";

export interface TopStreamChartProps extends WithLoaderAndErrorProps {
  data?: TopStreams;
}

const Chart = ({ data }: TopStreamChartProps) => {
  const { themeMode } = useStreamify();
  const stroke = themeMode === ThemeMode.LIGHT ? "black" : "white";
  return (
    data && (
      <ResponsiveContainer height={250} width={"100%"}>
        <BarChart data={data.topFiveStreams}>
          <XAxis dataKey={"name"} stroke={stroke} tick={false} />
          <YAxis tickFormatter={(v) => toClosestUnit(v, 1)} stroke={stroke} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="streamCount">
            {data.topFiveStreams.map((item) => (
              <Cell key={`cell-${item.name}`} fill={item.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )
  );
};

export default withLoaderAndError(Chart);
