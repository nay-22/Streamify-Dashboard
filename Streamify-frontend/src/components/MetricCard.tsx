import useStreamify from "../hooks/useStreamify";
import { AnchorType, MetricCardProps } from "../types";

/**
 * MetricCard: Functional component that accepts key metric details as a props and can display them
 * on diverse range of devices.
 * @param props props object for MetricCard
 * @param props.title Card string title
 * @param props.iconUrl Card string icon URL
 * @param props.value Card string/number value
 * @param props.valueIconUrl Card string icon URL for value
 * @param props.anchor Card AnchorType for valueIconURL
 * @returns A JSX element that displays a key metric
 */
const MetricCard = ({
  title,
  iconUrl,
  value,
  valueIconUrl,
  anchor,
}: MetricCardProps) => {
  const { windowSize } = useStreamify();
  const { width } = windowSize;

  const generateValueIconClassName = (anchor?: AnchorType): string => {
    let className = "absolute w-6 ";
    switch (anchor) {
      case AnchorType.TOP_LEFT:
        className += "left-1 top-2 ";
        break;
      case AnchorType.TOP_RIGHT:
        className += "right-1 top-2 ";
        break;
      case AnchorType.BOTTOM_RIGHT:
        className += "right-1 bottom-2 ";
        break;
      case AnchorType.BOTTOM_LEFT:
        className += "left-1 bottom-2 ";
        break;
      default:
        className += "right-1 top-2 ";
        break;
    }
    return className.trim();
  };

  const getMetricTitleFontSize = (): string => {
    return width < 500 ? "text-md" : "text-xl";
  };

  const getMetricPadding = (): string => {
    return width < 400 ? "p-2" : "p-4";
  };

  const getMetricValueFontSize = (): string => {
    return width < 400 ? "text-[1.2em]" : width < 550 ? "text-2xl" : "text-4xl";
  };

  return (
    <div className={`w-full min-h-36 ${getMetricPadding()} rounded-2xl bg-gradient-to-b from-[#6A0E58] to-[#2A0476] flex flex-col justify-between`}>
      <div className="flex items-center justify-between">
        <h2 className={`${getMetricTitleFontSize()} font-bold`}>{title}</h2>
        {iconUrl && <img src={iconUrl} alt="" className="w-5" />}
      </div>
      <div className="flex-grow flex items-center justify-center relative">
        <h1
          className={`${getMetricValueFontSize()} font-black overflow-hidden text-ellipsis whitespace-nowrap`}
        >
          {value}
        </h1>
        {valueIconUrl && (
          <img
            src={valueIconUrl}
            alt=""
            className={generateValueIconClassName(anchor)}
          />
        )}
      </div>
    </div>
  );
};

export default MetricCard;
