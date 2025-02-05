import { createContext } from "react";
import { StreamifyContextConfig, ThemeMode } from "../types";
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
  themeMode: ThemeMode.DARK,
});

export default StreamifyContext;
