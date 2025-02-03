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

const TopStreamChart = () => {
  const { data, isLoading, error } = useFetch<TopStreams>(TOP_5_STREAMS_URL);

  return isLoading ? (
    <p>Loading...</p>
  ) : data ? (
    <ResponsiveContainer height={250} width={"100%"}>
      <BarChart data={data.topFiveStreams}>
        <XAxis dataKey={"name"} stroke="white" tick={false} />
        <YAxis tickFormatter={(v) => toClosestUnit(v)} stroke="white" />
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
