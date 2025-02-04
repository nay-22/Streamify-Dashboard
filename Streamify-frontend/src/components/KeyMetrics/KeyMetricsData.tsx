import MetricCard from "../cards/MetricCard";
import { toClosestUnit } from "../../utils";
import { AnchorType, Metrics } from "../../types";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import useStreamify from "../../hooks/useStreamify";
import { FC } from "react";
import withLoaderAndError, { WithLoaderAndErrorProps } from "../../hoc/withLoaderAndError";

export interface KeyMetricsProps extends WithLoaderAndErrorProps {
  data?: Metrics;
}

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
const KeyMetricsData: FC<KeyMetricsProps> = ({ data }) => {
  const { windowSize } = useStreamify();
  const { width } = windowSize;

  const slidesPerView = width > 1430 ? 5 : width > 1015 ? 3 : 2;

  return (
    <>
        {data && (
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={30}
            scrollbar={{
              hide: true,
            }}
            modules={[Scrollbar]}
          >
            {Object.entries(data.metrics).map(([key, metric]) => (
              <SwiperSlide key={`${key}-${metric.title}-${metric.value}`}>
                <MetricCard
                  {...metric}
                  value={
                    key === "revenue"
                      ? "$" + toClosestUnit(metric.value)
                      : toClosestUnit(metric.value, 2)
                  }
                  anchor={AnchorType.TOP_RIGHT}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
    </>
  );
};

export default withLoaderAndError(KeyMetricsData);
