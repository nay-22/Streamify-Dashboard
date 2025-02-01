import { AnchorType, MetricCardProps } from "../types";

const MetricCard = ({
  title,
  iconUrl,
  value,
  valueIconUrl,
  anchor,
}: MetricCardProps) => {
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

  return (
    <div className="w-72 min-h-32 p-2 rounded-2xl bg-gradient-to-b from-[#6A0E58] to-[#2A0476] flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {iconUrl && <img src={iconUrl} alt="" className="w-5" />}
      </div>
      <div className="flex-grow flex items-center justify-center relative">
        <h1 className="text-[2.3em] font-black overflow-hidden text-ellipsis whitespace-nowrap">
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
