import { capitalize, toCommaSeperatedString } from "../../../utils";

/**
 * CustomTooltip: Functional component that renders a custom tooltip
 * for the RevenueDistributionChart with detailed and better formatted info.
 *
 * @returns A JSX element representing the tooltip with user data if
 *          active; otherwise, it returns null
 */
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-3 rounded shadow-lg text-white">
        <p className="font-semibold">{capitalize(payload[0].payload.name)}</p>
        <p style={{ color: payload[0].payload.color }}>
          Revenue: ${toCommaSeperatedString(payload[0].payload.value)}
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
