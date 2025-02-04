import { FC } from "react";
import { useTheme } from "../hooks";

const DataError: FC<{ error: string }> = ({ error }) => {
  const theme = useTheme();
  
  return (
    <div className={`flex items-center justify-center`}>
      <div
        className={`w-fit ${theme.error?.background?.primary} ${theme.error?.text?.primary} p-4 m-4 rounded-xl`}
      >
        <span>Error: {error}</span>
      </div>
    </div>
  );
};

export default DataError;
