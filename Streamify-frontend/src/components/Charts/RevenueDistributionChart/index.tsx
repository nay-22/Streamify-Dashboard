import { useFetch } from "../../../hooks";
import { REVENUE_URL } from "../../../constants";
import { FC } from "react";

import Chart from "./Chart";
import { RevenueDistribution } from "../../../types/ApiContractTypes";
import GenericCard from "../../cards/GenericCard";
import Actions from "../../Actions";

/**
 * RevenueDistributionChart: Functional component visualizes the distribution of
 * revenue using a pie chart by the Recharts library.
 *
 * @returns A JSX element representing the revenue distribution pie chart
 */
const RevenueDistributionChart: FC = () => {
  const { data, isLoading, error, refetch } = useFetch<RevenueDistribution>(REVENUE_URL);
  return (
    <GenericCard title="Revenue Distribution" actions={<Actions onClick={refetch} />}>
      <Chart data={data} isLoading={isLoading} error={error} />
    </GenericCard>
  );
};

export default RevenueDistributionChart;
