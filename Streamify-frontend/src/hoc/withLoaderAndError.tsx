import { ComponentType } from "react";

import { WithLoaderAndErrorProps } from "../types/PropTypes";
import { useTheme } from "../hooks";
import Loader from "/loader.gif";

/**
 * withLoaderAndError: Higher Order Component (HOC) that provides generic loading and
 * error handling functionalities.
 *
 * Note: The wrapped component must accept isLoading(boolean) and error(string) as props.
 * In order to facilitate this, the wrapped components props type(interface) may extend
 * WithLoaderAndErroProps.
 * @param Component Component to be wrapped
 * @returns A new component that conditionally renders a loader, an error, or the wrapped
 *          component based on the isLoading and error prop values.
 */
const withLoaderAndError = <P extends object>(Component: ComponentType<P>) => {
  return (props: P & WithLoaderAndErrorProps) => {
    const { isLoading, error, ...rest } = props;
    const theme = useTheme();

    if (isLoading) {
      return (
        <div className={`flex items-center justify-center`}>
          <img src={Loader} alt="Loading..." />
        </div>
      );
    }

    if (error) {
      return (
        <div className={`flex items-center justify-center`}>
          <div
            className={`w-fit ${theme.error?.background?.primary} ${theme.error?.text?.primary} p-4 m-4 rounded-xl`}
          >
            <span>Error: {error}</span>
          </div>
        </div>
      );
    }

    return <Component {...(rest as P)} />;
  };
};

export default withLoaderAndError;
