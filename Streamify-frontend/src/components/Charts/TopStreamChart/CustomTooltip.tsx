import { toCommaSeperatedString } from "../../../utils";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-3 rounded shadow-lg text-white">
        <p className="font-semibold">{payload[0].payload.name}</p>
        <p style={{ color: payload[0].payload.color }}>
          Streams: {toCommaSeperatedString(payload[0].payload.streamCount)}
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
