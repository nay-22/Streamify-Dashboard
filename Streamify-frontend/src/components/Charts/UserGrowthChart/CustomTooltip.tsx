import { toCommaSeperatedString } from "../../../utils";

/**
 * CustomTooltip: Functional component that renders a custom tooltip
 * for the UserGrowthChart with detailed and better formatted info.
 * 
 * @returns A JSX element representing the tooltip with user data if
 *          active; otherwise, it returns null
 */
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-3 rounded shadow-lg text-white">
        <p className="font-semibold">{payload[0].payload.name}</p>
        <p style={{ color: "#8884d8" }}>
          Total Users:{" "}
          {toCommaSeperatedString(
            payload.find((p: any) => p.dataKey === "Total Users")?.value
          )}
        </p>
        <p style={{ color: "#82ca9d" }}>
          Active Users:{" "}
          {toCommaSeperatedString(
            payload.find((p: any) => p.dataKey === "Active Users")?.value
          )}
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
