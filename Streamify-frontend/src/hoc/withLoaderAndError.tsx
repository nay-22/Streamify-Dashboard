import { ComponentType } from "react";

import { WithLoaderAndErrorProps } from "../types/PropTypes";
import Loader from "../components/Loader";
import DataError from "../components/DataError";

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

    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <DataError error={error} />;
    }

    return <Component {...(rest as P)} />;
  };
};

export default withLoaderAndError;
