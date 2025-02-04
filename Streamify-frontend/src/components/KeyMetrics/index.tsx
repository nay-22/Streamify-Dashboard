import { useFetch, useStreamify } from "../../hooks";
import { METRICS_URL } from "../../constants";
import { FC } from "react";
import KeyMetricsData from "./KeyMetricsData";
import { Metrics } from "../../types";
import GenericCard from "../cards/GenericCard";

/**
 * KeyMetrics: Functional component that displays the key performance
 * metrics using KeyMetricCard that is dynamically hydrated using the fetched data.
 * Key Metric:
 *  - Total Users
 *  - Active Users
 *  - Total Streams
 *  - Revenue
 *  - Top Artist
 *
 * The Cards are wrapped using Swiper Carousel Components ensuring responsiveness
 * to all screen sizes.
 *
 * @returns A JSX element that represents the key metrics section of the Streamify Dashboard
 */
const KeyMetrics: FC = () => {
  const { data, isLoading, error } = useFetch<Metrics>(METRICS_URL);

  const { windowSize } = useStreamify();
  const { width } = windowSize;

  const generateContainerClassName = (width: number) => {
    if (width < 400) {
      return "px-4 pt-4 pb-2";
    } else if (width < 500) {
      return "px-8 pt-8 pb-4";
    } else {
      return "px-12 pt-12 pb-6";
    }
  };

  return (
    <div className={generateContainerClassName(width)}>
      <KeyMetricsData data={data} isLoading={isLoading} error={error} />
    </div>
  );
};

export default KeyMetrics;
