import { USER_GROWTH_URL } from "../../../constants";
import { useFetch } from "../../../hooks";
import { UserGrowth } from "../../../types/";
import Chart from "./Chart";

import GenericCard from "../../cards/GenericCard";
import Actions from "../../Actions";

/**
 * UserGrowthChart: Functional component displays a chart visualizing user
 * growth data over a specified period.
 *
 * It utilizes the Recharts library to
 * render an area chart that shows both total users and active users by fetching
 * the data from a specified API endpoint.
 *
 * @returns A JSX element representing the user growth chart
 */
const UserGrowthChart = () => {
  const { data, isLoading, error, refetch } =
    useFetch<UserGrowth>(USER_GROWTH_URL);

  return (
    <GenericCard title="User Growth" actions={<Actions onClick={refetch} />}>
      <Chart data={data} isLoading={isLoading} error={error} />
    </GenericCard>
  );
};

export default UserGrowthChart;
