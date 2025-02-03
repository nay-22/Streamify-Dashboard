import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TOP_5_STREAMS_URL } from "../../../constants";
import { useFetch } from "../../../hooks";
import { toClosestUnit } from "../../../utils";
import { TopStreams } from "../../../types";
import CustomTooltip from "./CustomTooltip";

/**
 * TopStreamChart: Functional component displays a bar chart visualizing the top
 * five streams based on their stream counts.
 * @returns A JSX element representing the bar chart of the top streams.
 */
const TopStreamChart = () => {
  const { data, isLoading, error } = useFetch<TopStreams>(TOP_5_STREAMS_URL);

  return isLoading ? (
    <p>Loading...</p>
  ) : data ? (
    <ResponsiveContainer height={250} width={"100%"}>
      <BarChart data={data.topFiveStreams}>
        <XAxis dataKey={"name"} stroke="white" tick={false} />
        <YAxis tickFormatter={(v) => toClosestUnit(v, 1)} stroke="white" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="streamCount">
          {data.topFiveStreams.map((item) => (
            <Cell key={`cell-${item.name}`} fill={item.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  ) : (
    error && <p>{error}</p>
  );
};

export default TopStreamChart;
