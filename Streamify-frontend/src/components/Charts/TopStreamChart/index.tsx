import GenericCard from "../../cards/GenericCard";
import { TOP_5_STREAMS_URL } from "../../../constants";
import { useFetch } from "../../../hooks";
import { TopStreams } from "../../../types";
import Actions from "../../Actions";
import Chart from "./Chart";

/**
 * TopStreamChart: Functional component displays a bar chart visualizing the top
 * five streams based on their stream counts.
 * @returns A JSX element representing the bar chart of the top streams.
 */
const TopStreamChart = () => {
  const { data, isLoading, error, refetch } = useFetch<TopStreams>(TOP_5_STREAMS_URL);
  return (
    <GenericCard title="Top Streams" actions={<Actions onClick={refetch} />}>
      <Chart data={data} isLoading={isLoading} error={error} />
    </GenericCard>
  );
};

export default TopStreamChart;
