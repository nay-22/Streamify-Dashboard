import { ReactNode } from "react";
import StreamifyContext from "..";
import { StreamifyContextConfig } from "../../types";

/**
 * StreamifyProvider is a context provider component that supplies StreamifyContext to
 * its child components when wrapped int it.
 * @param props Props object for the provider
 * @param props.value StreamifyContextConfig object 
 * @param props.children ReactNode children
 * @returns A JSX element that wraps its children with StreamifyContext.Provider
 */
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
