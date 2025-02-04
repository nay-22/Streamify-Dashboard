import { createContext } from "react";
import { StreamifyContextConfig } from "../types";
import { getScreenSize } from "../utils";

/**
 * Create StreamifyContext
 */
const StreamifyContext = createContext<StreamifyContextConfig>({
  screen: getScreenSize(window.innerWidth),
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
});

export default StreamifyContext;
