import { ReactNode } from "react";

const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => {
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
