import { ReactNode } from "react";
import StreamifyContext, { StreamifyContextConfig } from "..";

const StreamifyProvider = ({
  value,
  children,
}: {
  value: StreamifyContextConfig;
  children: ReactNode;
}) => {
  return (
    <StreamifyContext.Provider value={value}>
      {children}
    </StreamifyContext.Provider>
  );
};

export default StreamifyProvider;
