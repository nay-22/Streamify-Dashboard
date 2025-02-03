import { createContext } from "react";
import { ScreenSize } from "../types";
import { getScreenSize } from "../utils";

export type StreamifyContextConfig = {
  screen: ScreenSize;
  windowSize: {
    width: number;
    height: number;
  };
};

const StreamifyContext = createContext<StreamifyContextConfig>({
  screen: getScreenSize(window.innerWidth),
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight
  }
});

export default StreamifyContext;
