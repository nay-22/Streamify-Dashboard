import { Payload } from "recharts/types/component/DefaultLegendContent";

const CustomLegend = ({ payload }: { payload: Payload[] } | any) => {
  return (
    <div className="flex items-center justify-center gap-6">
      {payload.map((item: { dataKey: any; color: any }) => (
        <div
          key={`${item.dataKey}-${item.color}`}
          className="flex items-center justify-center gap-1"
        >
          <p>{`${item.dataKey}`}</p>
          <div
            className={`h-3 w-3 rounded-full`}
            style={{ backgroundColor: item.color }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
