import MetricCard from "./MetricCard";
import { useFetch } from "../hooks";
import { toClosestUnit } from "../utils";
import { METRICS_URL } from "../constants";
import { AnchorType, Metrics } from "../types";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import useStreamify from "../hooks/useStreamify";
import { FC } from "react";

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

  const slidesPerView = width > 1430 ? 5 : width > 1015 ? 3 : 2;

  const generateContainerClassName = (width: number) => {
    if (width < 400) {
      return "px-4 pt-4 pb-2"
    }
    else if (width < 500) {
      return "px-8 pt-8 pb-4";
    } else {
      return "px-12 pt-12 pb-6";
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={generateContainerClassName(width)}>
          {data ? (
            <Swiper
              slidesPerView={slidesPerView}
              spaceBetween={30}
              scrollbar={{
                hide: true
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
          ) : (
            error && <p>{error}</p>
          )}
        </div>
      )}
    </>
  );
};

export default KeyMetrics;
