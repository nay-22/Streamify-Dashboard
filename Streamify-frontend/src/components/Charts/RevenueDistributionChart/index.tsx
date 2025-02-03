import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useFetch } from "../../../hooks";
import { REVENUE_URL } from "../../../constants";
import { capitalize } from "../../../utils";
import { useState } from "react";
import CustomLabel from "./CustomLabel";
import ActiveShape from "./ActiveShape";
import CustomTooltip from "./CutomTooltip";
import useStreamify from "../../../hooks/useStreamify";
import { LayoutType } from "recharts/types/util/types";
import { VerticalAlignmentType } from "recharts/types/component/DefaultLegendContent";

export type RevenueDistribution = {
  revenueDistribution: { [key: string]: RevenueData };
};

export type RevenueData = {
  name: string;
  value: number;
  color: string | "grey";
};

const RevenueDistributionChart = () => {
  const { data, isLoading, error } = useFetch<RevenueDistribution>(REVENUE_URL);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const { windowSize } = useStreamify();
  const { width } = windowSize;

  const generatePieRadius = (
    width: number
  ): { innerRadius: number; outerRadius: number } => {
    if (width < 400) {
      return {
        outerRadius: 80,
        innerRadius: 30,
      };
    } else if (width < 510) {
      return {
        outerRadius: 90,
        innerRadius: 50,
      };
    } else {
      return {
        outerRadius: 110,
        innerRadius: 70,
      };
    }
  };

  const generatePiePosition = (width: number): { cx: string; cy: string } => {
    if (width < 510) {
      return { cx: "50%", cy: "46%" };
    } else {
      return { cx: "30%", cy: "120" };
    }
  };

  const generateLegendPosition = (width: number): {layout: LayoutType, verticalAlign: VerticalAlignmentType, wrapperStyle: {left: string}} => {
    if (width < 510) {
      return {
        layout: "horizontal",
        verticalAlign: "top",
        wrapperStyle: {
          left: "0",
        },
      };
    } else {
      return {
        layout: "vertical",
        verticalAlign: "middle",
        wrapperStyle: {
          left: "65%",
        },
      };
    }
  };

  const generateRevenueDistributionData = (
    data: RevenueDistribution | undefined
  ): RevenueData[] => {
    return data
      ? Object.entries(data.revenueDistribution).map(([_, val]) => val)
      : [];
  };

  const handlePieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handlePieLeave = () => {
    setActiveIndex(-1);
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : data ? (
    <ResponsiveContainer width={"100%"} height={250}>
      <PieChart>
        <Pie
          data={generateRevenueDistributionData(data)}
          activeIndex={activeIndex}
          activeShape={activeIndex === -1 ? <></> : ActiveShape}
          {...generatePiePosition(width)}
          {...generatePieRadius(width)}
          fill="#8884d8"
          dataKey="value"
          label={CustomLabel}
          labelLine={false}
          onPointerEnter={handlePieEnter}
          onPointerLeave={handlePieLeave}
        >
          {generateRevenueDistributionData(data).map((item) => (
            <Cell key={`cell-${item.name}`} fill={item.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          // verticalAlign="middle"
          // layout="vertical"
          // layout="horizontal"
          // verticalAlign="top"
          formatter={(v: string) => capitalize(v)}
          // wrapperStyle={{
          //   left: "65%",
          // }}
          // wrapperStyle={{
          //   left: "0",
          // }}
          {...generateLegendPosition(width)}
        />
      </PieChart>
    </ResponsiveContainer>
  ) : (
    error && <p>{error}</p>
  );
};

export default RevenueDistributionChart;
