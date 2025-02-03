import ChartCard from "./ChartCard";
import RevenueDistributionChart from "./Charts/RevenueDistributionChart";
import TopStreamChart from "./Charts/TopStreamChart";
import UserGrowthChart from "./Charts/UserGrowthChart";
import useStreamify from "../hooks/useStreamify";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

const DataVisuals = () => {
  const { windowSize } = useStreamify();
  const { width } = windowSize;

  const slidesPerView =
    width > 1430 ? 3 : width > 1015 ? 2 : 1;

  const generateContainerClassName = (width: number) => {
    if (width < 400) {
      return "px-4 pt-2 pb-2"
    }
    else if (width < 500) {
      return "px-8 pt-4 pb-4";
    } else {
      return "px-12 pt-6 pb-6";
    }
  };

  return (
    <div className={generateContainerClassName(width)}>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={30}
        scrollbar={{
          hide: true
        }}
        modules={[Scrollbar]}
      >
        <SwiperSlide>
          <ChartCard title="User Growth">
            <UserGrowthChart />
          </ChartCard>
        </SwiperSlide>
        <SwiperSlide>
          <ChartCard title="Revenue Distribution">
            <RevenueDistributionChart />
          </ChartCard>
        </SwiperSlide>
        <SwiperSlide>
          <ChartCard title="Top 5 Streams">
            <TopStreamChart />
          </ChartCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default DataVisuals;
