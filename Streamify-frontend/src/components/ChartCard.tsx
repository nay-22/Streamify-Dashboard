import { ChartCardProps } from "../types";


/**
 * ChartCard: Functional component to wrap a chart and provide structure
 * @param props props object for ChartCard
 * @param props.title Title string value
 * @param props.children ReactNode children
 * @returns A JSX element with serving as a container/wrapper for the chart component
 */
const ChartCard = ({
  title,
  children,
}: ChartCardProps) => {
  return (
    <div className="bg-dark-bg-secondary rounded-2xl w-full">
      <div className="bg-dark-bg-tertiary px-4 py-2 rounded-t-2xl">
        <h4 className="text-lg">{title}</h4>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
};

export default ChartCard;
