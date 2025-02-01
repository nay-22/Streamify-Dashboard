import MetricCard from "./MetricCard";
import { useFetch } from "../hooks";
import { toClosestUnit } from "../utils";
import { METRICS_URL } from "../constants";
import { AnchorType, Metrics } from "../types";

const KeyMetrics = () => {
  const { data, isLoading, error } = useFetch<Metrics>(METRICS_URL);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex items-center justify-evenly px-8 pt-8 pb-4 gap-8">
          {data
            ? Object.entries(data.metrics).map(([key, metric]) => (
                <MetricCard
                  key={`${key}-${metric.title}-${metric.value}`}
                  {...metric}
                  value={key === 'revenue' ? '$' + toClosestUnit(metric.value) : toClosestUnit(metric.value)}
                  anchor={AnchorType.TOP_RIGHT}
                />
              ))
            : error && <p>{error}</p>}
        </div>
      )}
    </>
  );
};

export default KeyMetrics;
