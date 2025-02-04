import { useContext } from "react";
import { StreamifyContext } from "../context";

/**
 * A custom react hook that returns StreamifyContext object.
 * @returns StreamifyContextConfig object
 */
const useStreamify = () => {
  const context = useContext(StreamifyContext);
  return context;
};

export default useStreamify;
