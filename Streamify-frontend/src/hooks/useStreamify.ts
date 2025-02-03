import { useContext } from "react";
import StreamifyContext from "../context";

const useStreamify = () => {
  const context = useContext(StreamifyContext);
  return context;
};

export default useStreamify;
